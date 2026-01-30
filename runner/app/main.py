import asyncio
import base64
import json
import os
import tempfile
import time
from pathlib import Path
import shutil
from typing import Dict, Optional, Tuple

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse


app = FastAPI()

RUNNER_TOKEN = os.getenv("RUNNER_TOKEN", "devtoken")
WORK_ROOT = Path(os.getenv("RUNNER_WORK_DIR", "/workspaces"))
UPLOADS_DIR = Path(os.getenv("RUNNER_UPLOADS_DIR", "/uploads"))
STARTER_FILES_DIR = Path(os.getenv("STARTER_FILES_DIR", "")).expanduser()
RUNNER_MAX_UPLOAD_MB = int(os.getenv("RUNNER_MAX_UPLOAD_MB", "50"))
RUNNER_SESSION_UPLOAD_CAP_MB = int(os.getenv("RUNNER_SESSION_UPLOAD_CAP_MB", "300"))
RUNNER_GLOBAL_UPLOAD_CAP_MB = int(os.getenv("RUNNER_GLOBAL_UPLOAD_CAP_MB", "5120"))
RUNNER_SESSION_TTL_SECONDS = int(os.getenv("RUNNER_SESSION_TTL_SECONDS", "86400"))
RUNNER_MAX_RUNTIME_NORMAL = int(os.getenv("RUNNER_MAX_RUNTIME_NORMAL", "90"))
RUNNER_MAX_RUNTIME_HEAVY = int(os.getenv("RUNNER_MAX_RUNTIME_HEAVY", "300"))
RUNNER_MAX_CONCURRENT = int(os.getenv("RUNNER_MAX_CONCURRENT", "40"))

_MAX_UPLOAD_BYTES = RUNNER_MAX_UPLOAD_MB * 1024 * 1024
_SESSION_UPLOAD_CAP_BYTES = RUNNER_SESSION_UPLOAD_CAP_MB * 1024 * 1024
_GLOBAL_UPLOAD_CAP_BYTES = RUNNER_GLOBAL_UPLOAD_CAP_MB * 1024 * 1024
_CONCURRENCY_SEMAPHORE = asyncio.Semaphore(RUNNER_MAX_CONCURRENT)
_SESSIONS: Dict[str, Dict[str, object]] = {}
_UPLOADS_BASE = Path("/uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500", "http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def sanitize_filename(name: str) -> str:
    base = name.replace("\\", "_").replace("/", "_").strip()
    cleaned = "".join(ch for ch in base if ch.isalnum() or ch in "._-")
    return cleaned or "uploaded_file"


def unique_path(target: Path) -> Path:
    if not target.exists():
        return target
    stem = target.stem
    suffix = target.suffix
    parent = target.parent
    idx = 1
    while True:
        candidate = parent / f"{stem} ({idx}){suffix}"
        if not candidate.exists():
            return candidate
        idx += 1


def seed_starter_files(dest: Path) -> None:
    if not STARTER_FILES_DIR or not STARTER_FILES_DIR.exists():
        return
    try:
        for item in STARTER_FILES_DIR.iterdir():
            if not item.is_file():
                continue
            try:
                shutil.copy2(str(item), str(dest / item.name))
            except Exception:
                continue
    except Exception:
        pass


def sanitize_session_id(raw: Optional[str]) -> Optional[str]:
    if not raw:
        return None
    cleaned = "".join(ch for ch in str(raw).strip() if ch.isalnum() or ch in "-_")
    if not cleaned:
        return None
    return cleaned[:64]


def get_session_id_from_request(request: Request) -> str:
    sid = sanitize_session_id(request.query_params.get("sid"))
    if not sid:
        sid = sanitize_session_id(request.headers.get("X-Probioz-Session"))
    return sid or "anon"


def get_session_id_from_ws(ws: WebSocket) -> str:
    sid = sanitize_session_id(ws.query_params.get("sid"))
    return sid or "anon"


def _touch_session(sid: str) -> Path:
    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    session_dir = UPLOADS_DIR / sid
    session_dir.mkdir(parents=True, exist_ok=True)
    _SESSIONS[sid] = {"dir": session_dir, "last_seen": time.time()}
    return session_dir


def _cleanup_expired_sessions(now: Optional[float] = None) -> None:
    if RUNNER_SESSION_TTL_SECONDS <= 0:
        return
    if now is None:
        now = time.time()
    expired = []
    for sid, meta in _SESSIONS.items():
        last_seen = float(meta.get("last_seen", 0))
        if now - last_seen > RUNNER_SESSION_TTL_SECONDS:
            expired.append(sid)
    for sid in expired:
        meta = _SESSIONS.pop(sid, None)
        if not meta:
            continue
        session_dir = meta.get("dir")
        if isinstance(session_dir, Path) and session_dir.exists():
            try:
                shutil.rmtree(session_dir, ignore_errors=True)
            except Exception:
                pass


def _dir_size(path: Path) -> int:
    total = 0
    try:
        for root, _, files in os.walk(path):
            for name in files:
                try:
                    total += (Path(root) / name).stat().st_size
                except Exception:
                    continue
    except Exception:
        return total
    return total


def _is_heavy_code(code: str) -> bool:
    lowered = code.lower()
    heavy_markers = [
        "biopython",
        "from bio",
        "import bio",
        "pandas",
        "numpy",
        "matplotlib",
        "seaborn",
        "entrez",
        "blast",
        "requests",
        "urllib",
        "http",
    ]
    return any(marker in lowered for marker in heavy_markers)


async def _try_acquire_concurrency() -> bool:
    try:
        await asyncio.wait_for(_CONCURRENCY_SEMAPHORE.acquire(), timeout=0.001)
        return True
    except asyncio.TimeoutError:
        return False


@app.post("/uploads")
async def upload_file(request: Request, file: UploadFile = File(...)):
    _cleanup_expired_sessions()
    sid = get_session_id_from_request(request)
    session_dir = _touch_session(sid)
    safe_name = sanitize_filename(file.filename or "")
    target = unique_path(session_dir / safe_name)

    session_used = _dir_size(session_dir)
    if session_used >= _SESSION_UPLOAD_CAP_BYTES:
        raise HTTPException(status_code=413, detail="Session upload cap exceeded")

    global_used = _dir_size(UPLOADS_DIR)
    if global_used >= _GLOBAL_UPLOAD_CAP_BYTES:
        raise HTTPException(status_code=507, detail="Upload storage full")

    bytes_written = 0
    try:
        with target.open("wb") as f:
            while True:
                chunk = await file.read(1024 * 1024)
                if not chunk:
                    break
                bytes_written += len(chunk)
                if bytes_written > _MAX_UPLOAD_BYTES:
                    raise HTTPException(status_code=413, detail="File too large")
                if session_used + bytes_written > _SESSION_UPLOAD_CAP_BYTES:
                    raise HTTPException(status_code=413, detail="Session upload cap exceeded")
                if global_used + bytes_written > _GLOBAL_UPLOAD_CAP_BYTES:
                    raise HTTPException(status_code=507, detail="Upload storage full")
                f.write(chunk)
    except HTTPException:
        try:
            if target.exists():
                target.unlink()
        except Exception:
            pass
        raise

    return {"name": target.name, "path": f"/uploads/{target.name}?sid={sid}"}


@app.get("/uploads/list")
def list_uploads(request: Request):
    _cleanup_expired_sessions()
    sid = get_session_id_from_request(request)
    session_dir = _touch_session(sid)
    files = []
    for item in session_dir.iterdir():
        if item.is_file():
            files.append({"name": item.name, "path": f"/uploads/{item.name}?sid={sid}"})
    return {"files": files}


@app.delete("/uploads/clear")
def clear_uploads(request: Request):
    _cleanup_expired_sessions()
    sid = get_session_id_from_request(request)
    session_dir = _touch_session(sid)
    removed = 0
    for item in session_dir.iterdir():
        if item.is_file():
            try:
                item.unlink()
                removed += 1
            except Exception:
                pass
    return {"removed": removed}


@app.get("/uploads/{filename}")
def download_upload(filename: str, request: Request):
    _cleanup_expired_sessions()
    sid = get_session_id_from_request(request)
    session_dir = _touch_session(sid)
    safe_name = sanitize_filename(filename)
    target = session_dir / safe_name
    if not target.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path=str(target), filename=safe_name)


@app.delete("/uploads/{filename}")
def delete_upload(filename: str, request: Request):
    _cleanup_expired_sessions()
    sid = get_session_id_from_request(request)
    session_dir = _touch_session(sid)
    safe_name = sanitize_filename(filename)
    target = session_dir / safe_name
    if not target.exists():
        raise HTTPException(status_code=404, detail="File not found")
    try:
        target.unlink()
    except Exception:
        raise HTTPException(status_code=500, detail="Delete failed")
    return {"deleted": safe_name}


async def stream_reader(stream, ws: WebSocket, stream_type: str):
    while True:
        data = await stream.read(1024)
        if not data:
            break
        text = data.decode("utf-8", errors="replace")
        await ws.send_json({"type": stream_type, "data": text})


@app.websocket("/ws/run")
async def ws_run(ws: WebSocket):
    token = ws.query_params.get("token", "")
    if token != RUNNER_TOKEN:
        await ws.close(code=1008)
        return

    acquired = await _try_acquire_concurrency()
    if not acquired:
        await ws.accept()
        await ws.send_json({"type": "error", "message": "Server busy, try again."})
        await ws.close(code=1013)
        return

    await ws.accept()

    process = None
    stdout_task = None
    stderr_task = None
    work_dir = None
    sid = get_session_id_from_ws(ws)
    _cleanup_expired_sessions()
    session_dir = _touch_session(sid)

    try:
        first = await ws.receive_text()
        try:
            payload = json.loads(first)
        except json.JSONDecodeError:
            await ws.send_json({"type": "error", "message": "Invalid JSON."})
            return

        if payload.get("type") != "run":
            await ws.send_json({"type": "error", "message": "Expected type=run."})
            return

        code = payload.get("code", "")
        if not isinstance(code, str) or not code.strip():
            await ws.send_json({"type": "error", "message": "Empty code."})
            return

        max_runtime = RUNNER_MAX_RUNTIME_HEAVY if _is_heavy_code(code) else RUNNER_MAX_RUNTIME_NORMAL
        deadline = time.monotonic() + max_runtime

        WORK_ROOT.mkdir(parents=True, exist_ok=True)
        UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
        work_dir = Path(tempfile.mkdtemp(prefix="job_", dir=str(WORK_ROOT)))
        seed_starter_files(work_dir)

        shim = [
            "import builtins, sys, os, atexit",
            "def __probioz_input(prompt=''):",
            "    sys.stderr.write('__PROBIOZ_INPUT__' + str(prompt) + '\\n')",
            "    sys.stderr.flush()",
            "    return sys.stdin.readline().rstrip('\\n')",
            "builtins.input = __probioz_input",
            "",
            "try:",
            "    import matplotlib",
            "    matplotlib.use('Agg')",
            "    import matplotlib.pyplot as _plt",
            "    _probioz_orig_show = _plt.show",
            "except Exception:",
            "    _plt = None",
            "    _probioz_orig_show = None",
            "",
            "def __probioz_save_plots():",
            "    try:",
            "        if _plt is None:",
            "            return",
            "        figs = _plt.get_fignums()",
            "        if not figs:",
            "            return",
            "        work_dir = os.environ.get('PROBIOZ_WORKDIR', '.')",
            "        for idx, num in enumerate(figs, start=1):",
            "            try:",
            "                fig = _plt.figure(num)",
            "                fig.savefig(os.path.join(work_dir, f'plot_{idx}.png'))",
            "            except Exception:",
            "                pass",
            "    except Exception:",
            "        pass",
            "atexit.register(__probioz_save_plots)",
            "",
            "def _probioz_show(*args, **kwargs):",
            "    __probioz_save_plots()",
            "    if _probioz_orig_show:",
            "        return _probioz_orig_show(*args, **kwargs)",
            "    return None",
            "if _plt is not None:",
            "    _plt.show = _probioz_show",
            "",
            "def __probioz_unique_path(path):",
            "    base = path",
            "    stem, ext = os.path.splitext(base)",
            "    i = 1",
            "    while os.path.exists(base):",
            "        base = f\"{stem} ({i}){ext}\"",
            "        i += 1",
            "    return base",
            "",
            "def __probioz_map_uploads(path):",
            "    try:",
            "        uploads_root = os.environ.get('PROBIOZ_UPLOADS', '/uploads')",
            "        p = os.path.abspath(str(path))",
            "        uploads_base = os.path.abspath('/uploads')",
            "        if p.startswith(uploads_base):",
            "            rel = os.path.relpath(p, uploads_base)",
            "            return os.path.join(uploads_root, rel)",
            "        return path",
            "    except Exception:",
            "        return path",
            "",
            "def __probioz_open(file, mode='r', *args, **kwargs):",
            "    try:",
            "        file = __probioz_map_uploads(file)",
            "        if any(ch in mode for ch in ['w','a','x','+']):",
            "            uploads = os.environ.get('PROBIOZ_UPLOADS', '/uploads')",
            "            p = os.path.abspath(str(file))",
            "            if p.startswith(os.path.abspath(uploads)):",
            "                file = __probioz_unique_path(p)",
            "    except Exception:",
            "        pass",
            "    return builtins._probioz_real_open(file, mode, *args, **kwargs)",
            "builtins._probioz_real_open = builtins.open",
            "builtins.open = __probioz_open",
            "",
        ]
        script_path = work_dir / "main.py"
        script_path.write_text("\n".join(shim) + code, encoding="utf-8")

        pre_files = set()
        try:
            pre_files = {p.name for p in work_dir.iterdir() if p.is_file()}
        except Exception:
            pre_files = set()

        process = await asyncio.create_subprocess_exec(
            "python",
            "-u",
            str(script_path),
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=str(work_dir),
            env={
                **os.environ,
                "PROBIOZ_WORKDIR": str(work_dir),
                "PROBIOZ_UPLOADS": str(session_dir),
                "MPLBACKEND": "Agg",
            },
        )

        stdout_task = asyncio.create_task(stream_reader(process.stdout, ws, "stdout"))
        stderr_task = asyncio.create_task(stream_reader(process.stderr, ws, "stderr"))

        while True:
            if process.returncode is not None:
                break
            if time.monotonic() > deadline:
                await ws.send_json({
                    "type": "stderr",
                    "data": f"\n[Runtime limit exceeded: {max_runtime}s. Job terminated.]\n"
                })
                break
            try:
                msg = await asyncio.wait_for(ws.receive_text(), timeout=0.1)
            except asyncio.TimeoutError:
                continue
            except WebSocketDisconnect:
                break

            try:
                data = json.loads(msg)
            except json.JSONDecodeError:
                continue

            if data.get("type") == "stdin":
                if process.stdin is None:
                    continue
                text = data.get("data", "")
                if not text.endswith("\n"):
                    text += "\n"
                process.stdin.write(text.encode("utf-8", errors="replace"))
                try:
                    await process.stdin.drain()
                except Exception:
                    break
            elif data.get("type") == "terminate":
                break

        if process.returncode is None:
            process.terminate()
        await process.wait()

        files_payload = []
        if work_dir and work_dir.exists():
            for item in work_dir.iterdir():
                if not item.is_file():
                    continue
                if item.name in pre_files:
                    continue
                try:
                    data = item.read_bytes()
                except Exception:
                    continue
                if len(data) > 1024 * 1024:
                    files_payload.append({"name": item.name, "skipped": True, "reason": "too_large"})
                    continue
                files_payload.append({
                    "name": item.name,
                    "data_b64": base64.b64encode(data).decode("ascii")
                })
        # Do not include uploaded input files in "Files created"

        if files_payload:
            await ws.send_json({"type": "files", "files": files_payload})

        await ws.send_json({"type": "exit", "code": process.returncode})

        if stdout_task:
            await stdout_task
        if stderr_task:
            await stderr_task
    finally:
        if acquired:
            try:
                _CONCURRENCY_SEMAPHORE.release()
            except Exception:
                pass
        try:
            if process and process.returncode is None:
                process.kill()
        except Exception:
            pass
        try:
            if work_dir and work_dir.exists():
                for item in work_dir.iterdir():
                    try:
                        if item.is_file():
                            item.unlink()
                    except Exception:
                        pass
                work_dir.rmdir()
        except Exception:
            pass
