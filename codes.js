/* =============================================================================
   Backend Migration Guide (frontend-only notes)
   This file is a reference document, not a runtime dependency.
   It contains: (1) ORIGINAL snippets to replace, (2) REPLACEMENT snippets,
   with short explanations in comments.
   ============================================================================= */

/* ============================================================================
   PART A: python.js (single-runner in python.html)
   Target file: js/python.js
   Goal: replace Pyodide runtime with a backend API.
   ============================================================================ */

/* --- ORIGINAL (replace this block in js/python.js)
window.__probiozPyRuntime = window.__probiozPyRuntime || (function () {
    const CDN = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
    let pyodide = null;
    let loadingPromise = null;

    function load() { ...load Pyodide... }

    async function run(userCode) {
        const rt = await load();
        const wrapped = `...exec(userCode)...`;
        const result = await rt.runPythonAsync(wrapped);
        return String(result).replace(/\r\n/g, '\n');
    }

    async function ensurePackages(pkgsArray) {
        const rt = await load();
        await rt.loadPackage(pkgsArray) ... micropip fallback ...
    }

    return { load, run, ensurePackages };
})();
--- END ORIGINAL ----------------------------------------------------------- */

/* --- REPLACEMENT (drop-in runtime that calls your backend)
   This keeps the same API: load(), run(code), ensurePackages(pkgs).
   Explanation:
   - load(): can be a health check or lazy no-op.
   - ensurePackages(): store requested packages for the next run.
   - run(): POST to backend, return stdout/stderr for UI display.
*/
window.__probiozPyRuntime = window.__probiozPyRuntime || (function () {
    const API_BASE = "/api/python"; // change if needed
    let lastPackages = [];
    let sessionId = null;

    async function load() {
        // Optional: create a session so files/plots persist per user.
        if (sessionId) return { sessionId };
        const res = await fetch(API_BASE + "/session", { method: "POST" });
        if (!res.ok) throw new Error("Backend session init failed");
        const data = await res.json();
        sessionId = data.session_id;
        return { sessionId };
    }

    async function ensurePackages(pkgsArray) {
        // Store package list; backend decides whether to preinstall or lazy install.
        if (!Array.isArray(pkgsArray)) return;
        lastPackages = pkgsArray.filter(Boolean);
    }

    async function run(userCode) {
        await load();
        const payload = {
            session_id: sessionId,
            code: String(userCode || ""),
            packages: lastPackages,
            // Provide stdin inputs if you add an input UI later:
            stdin: [] // array of strings
        };
        const res = await fetch(API_BASE + "/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Python run failed");
        const data = await res.json();
        // data: { stdout, stderr, files: [...], plots: [...] }
        const out = (data.stdout || "") + (data.stderr || "");
        return out.replace(/\r\n/g, "\n");
    }

    return { load, run, ensurePackages };
})();
/*--- END REPLACEMENT -------------------------------------------------------- */

/* ============================================================================
   PART B: project_notebook.js (projects runner)
   Target file: projects/project_notebook.js
   Goal: replace Pyodide FS + runPythonAsync with backend APIs.
   ============================================================================ */

/* --- ORIGINAL (examples of the Pyodide-specific areas to replace)
function listFiles(pyodide) {
    return pyodide.FS.readdir(".").filter((name) => name !== "." && name !== "..");
}

async function ensureRuntime(outputTextEl) {
    const pyodide = await loadPyodide({ indexURL: "..." });
    await pyodide.loadPackage(["pandas", "matplotlib"]);
    runtime.pyodide = pyodide;
    runtime.globals = pyodide.globals;
    ...
}

pyodide.setStdout({ batched: (text) => outputController.append(text) });
pyodide.setStderr({ batched: (text) => outputController.append(text) });

await pyodide.runPythonAsync(wrappedCode, { globals: runtime.globals });

const data = pyodide.FS.readFile(name);
--- END ORIGINAL ----------------------------------------------------------- */

/* --- REPLACEMENT (backend-backed runtime + file APIs)
   Explanation:
   - Replace Pyodide FS with backend endpoints.
   - Replace runPythonAsync with a POST /api/notebook/run.
   - Keep the existing UI (cells, output, plots) the same.
*/

// Helper for backend calls
async function apiJson(url, payload) {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload || {})
    });
    if (!res.ok) throw new Error("API request failed: " + res.status);
    return res.json();
}

// Backend runtime/session holder (instead of Pyodide instance)
async function ensureRuntime(outputTextEl) {
    if (window.__probiozPyRuntime && window.__probiozPyRuntime._readyPromise) {
        return window.__probiozPyRuntime._readyPromise;
    }

    const runtime = { sessionId: null };
    const readyPromise = (async () => {
        setOutput(outputTextEl, "Connecting to Python backend...");
        const data = await apiJson("/api/notebook/session", {});
        runtime.sessionId = data.session_id;
        window.__probiozPyRuntime.runtime = runtime;
        return runtime;
    })();

    window.__probiozPyRuntime = { _readyPromise: readyPromise };
    return readyPromise;
}

// File APIs (replace listFiles, writeUploadedFileToFS, readFile, delete, etc.)
async function listFiles(runtime) {
    const data = await apiJson("/api/notebook/files", { session_id: runtime.sessionId });
    return data.files || [];
}

async function writeUploadedFileToServer(runtime, file) {
    const form = new FormData();
    form.append("session_id", runtime.sessionId);
    form.append("file", file, file.name || "upload.bin");
    const res = await fetch("/api/notebook/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.path; // server-side path in workspace
}

async function readFileFromServer(runtime, filename) {
    const res = await fetch("/api/notebook/file?session_id=" +
        encodeURIComponent(runtime.sessionId) + "&name=" + encodeURIComponent(filename));
    if (!res.ok) throw new Error("Download failed");
    return res.arrayBuffer();
}

async function deleteFileOnServer(runtime, filename) {
    await apiJson("/api/notebook/delete", { session_id: runtime.sessionId, name: filename });
}

/* --- REPLACEMENT: runCell() execution
   Explanation:
   - Send code to backend.
   - Backend returns stdout/stderr, new files, plot images.
*/
async function runCell(cell) {
    // ... keep the existing UI setup (buttons, output area) ...
    const outputTextEl = cell.querySelector(".nb-output-text");
    const filesEl = cell.querySelector(".nb-files");
    const plotEl = cell.querySelector(".nb-plot");
    const editor = cell.__nb && cell.__nb.editor;
    if (!editor) return;

    const runtime = await ensureRuntime(outputTextEl);
    const code = editor.getValue();

    // If you still want per-cell input prompts, gather input values here:
    const inputs = []; // fill from your inputManager UI

    const result = await apiJson("/api/notebook/run", {
        session_id: runtime.sessionId,
        code,
        stdin: inputs
    });

    // output
    const combined = (result.stdout || "") + (result.stderr || "");
    setOutput(outputTextEl, combined.replace(/\r\n/g, "\n"));

    // files list
    if (filesEl) {
        filesEl.textContent = "";
        (result.files || []).forEach((name) => {
            const link = document.createElement("a");
            link.href = "/api/notebook/file?session_id=" +
                encodeURIComponent(runtime.sessionId) + "&name=" + encodeURIComponent(name);
            link.download = name;
            link.textContent = name;
            filesEl.appendChild(link);
        });
    }

    // plot images (backend should return base64 or URLs)
    if (plotEl) {
        plotEl.textContent = "";
        (result.plots || []).forEach((b64, i) => {
            const img = document.createElement("img");
            img.alt = "Plot " + (i + 1);
            img.src = "data:image/png;base64," + b64;
            plotEl.appendChild(img);
        });
    }
}
/*--- END REPLACEMENT -------------------------------------------------------- */

/* =============================================================================
   Notes for backend (FastAPI + Postgres + Docker + sandbox)
   - /api/python/session -> create execution session
   - /api/python/run -> run code, return stdout/stderr
   - /api/notebook/session -> create session/workspace
   - /api/notebook/run -> run code, return stdout/stderr + files + plots
   - /api/notebook/files, /api/notebook/upload, /api/notebook/delete
   Backend needs strict resource limits and container isolation.
   ============================================================================= */
