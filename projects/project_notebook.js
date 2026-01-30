/* Notebook Playground logic for project_1.html */
(function () {
"use strict";

window.PROBIOZ_NOTEBOOK_VERSION = "2026-01-27.1";
if (window.console && console.log) {
    console.log("Probioz notebook JS loaded", window.PROBIOZ_NOTEBOOK_VERSION);
}

const USE_BACKEND_RUNNER = true;
const BACKEND_WS_URL = "ws://localhost:9001/ws/run";
const BACKEND_TOKEN = "devtoken";
const INPUT_MARKER = "__PROBIOZ_INPUT__";
const BACKEND_HTTP_URL = "http://localhost:9001";
const SESSION_STORAGE_KEY = "probioz_session_id";

function getSessionId() {
    try {
        const existing = localStorage.getItem(SESSION_STORAGE_KEY);
        if (existing) return existing;
        const id = (crypto && typeof crypto.randomUUID === "function")
            ? crypto.randomUUID()
            : "sid_" + Math.random().toString(36).slice(2);
        localStorage.setItem(SESSION_STORAGE_KEY, id);
        return id;
    } catch (err) {
        return "sid_" + Math.random().toString(36).slice(2);
    }
}

function backendUrl(path) {
    const sid = encodeURIComponent(getSessionId());
    const joiner = path.includes("?") ? "&" : "?";
    return BACKEND_HTTP_URL + path + joiner + "sid=" + sid;
}

function setOutput(textEl, message) {
    if (textEl) textEl.textContent = message || "";
}

function listFiles(pyodide) {
    try {
    return pyodide.FS.readdir(".").filter((name) => name !== "." && name !== "..");
    } catch (err) {
    return [];
    }
}

function isRegularFile(pyodide, name) {
    try {
        const stat = pyodide.FS.stat(name);
        return pyodide.FS.isFile(stat.mode);
    } catch (err) {
        return false;
    }
}

function base64ToBlob(base64, mimeType) {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mimeType });
}

function indentCode(code) {
    return code.split("\n").map((line) => "    " + line).join("\n");
}

function transformPythonForAsyncInput(code) {
    const replaced = code.replace(/\binput\s*\(/g, "await js_input(");
    return replaced.replace(/await js_input\(([^)]*)\)\s*\./g, "(await js_input($1)).");
}

function createOutputController(outputTextEl) {
    let buffer = "";
    return {
    append: (text) => {
        if (text === null || text === undefined) return;
        const s = String(text);
        if (!s) return;
        buffer += s;
        if (outputTextEl) outputTextEl.textContent = buffer;
    },
    set: (text) => {
        buffer = text ? String(text) : "";
        if (outputTextEl) outputTextEl.textContent = buffer;
    },
    get: () => buffer
    };
}

function stripCommonIndent(code) {
    const lines = String(code || "").replace(/\t/g, "    ").split("\n");
    const indents = [];
    lines.forEach((line) => {
        if (!line.trim()) return;
        const match = line.match(/^(\s+)/);
        indents.push(match ? match[1].length : 0);
    });
    if (!indents.length) return lines.join("\n");
    const nonZero = indents.filter((n) => n > 0);
    const hasZero = indents.some((n) => n === 0);
    const minIndent = hasZero ? 0 : Math.min(...indents);
    if (!minIndent) return lines.join("\n");
    return lines.map((line) => {
        const match = line.match(/^(\s+)/);
        const indent = match ? match[1].length : 0;
        return indent >= minIndent ? line.slice(minIndent) : line;
    }).join("\n");
}

function sanitizeCommonMistakes(code) {
    const lines = String(code || "").split("\n");
    let changed = false;
    const fixed = lines.map((line) => {
        let out = line;
        if (/^\s*\(def\s+/.test(out)) {
            out = out.replace(/^(\s*)\(def\s+/, "$1def ");
            changed = true;
        }
        if (/\)\)\s*$/.test(out)) {
            const open = (out.match(/\(/g) || []).length;
            const close = (out.match(/\)/g) || []).length;
            if (close > open) {
                out = out.replace(/\)\)\s*$/, ")");
                changed = true;
            }
        }
        if (/^\s*def\s+/.test(out)) {
            const parts = out.split("#");
            const head = parts.shift() || "";
            const tail = parts.length ? "#" + parts.join("#") : "";
            if (!head.trimEnd().endsWith(":")) {
                out = head.trimEnd() + ":" + (tail ? " " + tail.trimStart() : "");
                changed = true;
            }
        }
        return out;
    });
    const result = changed ? fixed.join("\n") : String(code || "");
    return { code: result, changed };
}

function appendOutput(outputEl, text) {
    if (!outputEl) return;
    const node = document.createTextNode(String(text || ""));
    outputEl.appendChild(node);
}

function enableInlineInput(outputEl, promptText, onSubmit) {
    if (!outputEl) return null;
    const prompt = promptText ? String(promptText) + " " : "> ";
    const current = outputEl.textContent || "";
    if (current && !current.endsWith("\n")) {
        appendOutput(outputEl, "\n");
    }
    appendOutput(outputEl, prompt);

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.className = "nb-inline-input-field";
    inputEl.name = "nb_inline_input";
    inputEl.setAttribute("aria-label", "Program input");
    inputEl.placeholder = "type here";
    inputEl.autocomplete = "off";
    inputEl.autocapitalize = "off";
    inputEl.autocorrect = "off";
    inputEl.spellcheck = false;
    outputEl.appendChild(inputEl);
    inputEl.focus();

    const handler = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const value = inputEl.value || "";
            if (inputEl.parentNode) inputEl.parentNode.removeChild(inputEl);
            appendOutput(outputEl, value + "\n");
            onSubmit(value);
            return;
        }
    };

    inputEl.addEventListener("keydown", handler);
    return { inputEl, inputHandler: handler };
}

function runViaBackend(cell) {
    const outputTextEl = cell.querySelector(".nb-output-text");
    const outputWrap = cell.querySelector(".nb-output");
    const filesEl = cell.querySelector(".nb-files");
    const plotEl = cell.querySelector(".nb-plot");
    const runButton = cell.querySelector(".nb-run");
    const stopButton = cell.__nb && cell.__nb.stopButton;
    const editor = cell.__nb && cell.__nb.editor;
    if (!outputTextEl || !outputWrap || !runButton || !editor) return;

    const outputController = createOutputController(outputTextEl);
    outputController.set("");
    if (filesEl) filesEl.textContent = "";
    if (plotEl) plotEl.textContent = "";

    let inputEl = null;
    let inputHandler = null;
    const disableInlineInput = () => {
        if (!outputTextEl) return;
        if (inputEl && inputHandler) {
            inputEl.removeEventListener("keydown", inputHandler);
        }
        if (inputEl && inputEl.parentNode) {
            inputEl.parentNode.removeChild(inputEl);
        }
        inputEl = null;
        inputHandler = null;
    };

    runButton.disabled = true;
    runButton.textContent = "Running...";
    if (stopButton) stopButton.disabled = false;

    const wsUrl = `${BACKEND_WS_URL}?token=${encodeURIComponent(BACKEND_TOKEN)}&sid=${encodeURIComponent(getSessionId())}`;
    const ws = new WebSocket(wsUrl);

    const cleanup = () => {
        disableInlineInput();
        if (stopButton) stopButton.disabled = true;
        runButton.disabled = false;
        runButton.textContent = "Run Cell";
    };

    ws.addEventListener("open", () => {
        const sanitized = sanitizeCommonMistakes(editor.getValue());
        if (sanitized.changed) {
            editor.setValue(sanitized.code);
            appendOutput(outputTextEl, "Auto-fix: corrected a common syntax mistake.\n");
        }
        const cleaned = stripCommonIndent(sanitized.code);
        ws.send(JSON.stringify({ type: "run", code: cleaned }));
    });

    ws.addEventListener("message", (event) => {
        let msg = null;
        try {
            msg = JSON.parse(event.data);
        } catch (err) {
            return;
        }
        const data = String(msg.data || "");
        if (msg.type === "stderr" && data.includes(INPUT_MARKER)) {
            const parts = data.split(INPUT_MARKER);
            const before = parts.shift();
            const prompt = parts.pop() || "";
            if (before) appendOutput(outputTextEl, before);
            disableInlineInput();
            inputHandler = enableInlineInput(outputTextEl, prompt.trimEnd(), (value) => {
                disableInlineInput();
                ws.send(JSON.stringify({ type: "stdin", data: String(value) }));
            });
            if (inputHandler && inputHandler.inputEl) {
                inputEl = inputHandler.inputEl;
                inputHandler = inputHandler.inputHandler;
            }
            return;
        }
        if (msg.type === "files") {
            if (filesEl) {
                filesEl.textContent = "";
                const prev = (cell.__nb && cell.__nb.lastFiles) || [];
                const currentFiles = (msg.files || []).filter((file) => file && file.name);
                const newFiles = currentFiles.filter((file) => !prev.includes(file.name));
                if (cell.__nb) {
                    cell.__nb.lastFiles = currentFiles.map((file) => file.name);
                }
                if (!newFiles.length) return;
                const label = document.createElement("div");
                label.textContent = "Files created:";
                filesEl.appendChild(label);
                newFiles.forEach((file) => {
                    if (!file || !file.name) return;
                    if (file.skipped) {
                        const note = document.createElement("div");
                        note.textContent = file.name + " (not available: " + (file.reason || "skipped") + ")";
                        filesEl.appendChild(note);
                        return;
                    }
                    const blob = base64ToBlob(file.data_b64 || "", "application/octet-stream");
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = file.name;
                    link.textContent = file.name;
                    link.addEventListener("click", () => setTimeout(() => URL.revokeObjectURL(url), 1000));
                    filesEl.appendChild(link);
                });
            }
            if (plotEl) {
                plotEl.textContent = "";
                (msg.files || []).forEach((file) => {
                    if (!file || !file.name || !file.data_b64) return;
                    if (!file.name.toLowerCase().endsWith(".png")) return;
                    const img = document.createElement("img");
                    img.alt = file.name;
                    img.src = "data:image/png;base64," + file.data_b64;
                    plotEl.appendChild(img);
                });
            }
            return;
        }
        if (msg.type === "stdout" || msg.type === "stderr") {
            appendOutput(outputTextEl, data);
        } else if (msg.type === "exit") {
            cleanup();
            ws.close();
        } else if (msg.type === "error") {
            outputController.append(String(msg.message || "Runner error") + "\n");
            cleanup();
            ws.close();
        }
    });

    ws.addEventListener("close", cleanup);

    if (stopButton) {
        stopButton.onclick = () => {
            ws.send(JSON.stringify({ type: "terminate" }));
            ws.close();
        };
    }
}

function decodePyodideChunk(decoder, data) {
    if (data === null || data === undefined) return "";
    if (typeof data === "string") return data;
    if (data instanceof Uint8Array) {
    return decoder.decode(data, { stream: true });
    }
    if (data instanceof ArrayBuffer) {
    return decoder.decode(new Uint8Array(data), { stream: true });
    }
    return "";
}

function normalizeNewlines(text) {
    if (text === null || text === undefined) return "";
    return String(text).replace(/\r\n?/g, "\n");
}

function ensureUploadsDir(pyodide) {
    try {
        pyodide.FS.mkdir("/uploads");
    } catch (err) {
        // ignore if already exists
    }
}

function sanitizeFilename(name) {
    const base = name ? String(name).replace(/[\\\/]/g, "_") : "";
    const cleaned = base.replace(/[^A-Za-z0-9._-]+/g, "_");
    return cleaned || "uploaded_file";
}

async function writeUploadedFileToFS(pyodide, file) {
    const buffer = await file.arrayBuffer();
    const data = new Uint8Array(buffer);
    const filename = sanitizeFilename(file && file.name);
    const path = "/uploads/" + filename;
    pyodide.FS.writeFile(path, data);
    return path;
}

function clearUploads(pyodide) {
    ensureUploadsDir(pyodide);
    let entries = [];
    try {
        entries = pyodide.FS.readdir("/uploads");
    } catch (err) {
        return;
    }
    entries.forEach((name) => {
        if (name === "." || name === "..") return;
        try {
            pyodide.FS.unlink("/uploads/" + name);
        } catch (err) {
            // ignore
        }
    });
}

function listUploads(pyodide) {
    ensureUploadsDir(pyodide);
    try {
        return pyodide.FS.readdir("/uploads").filter((name) => name !== "." && name !== "..");
    } catch (err) {
        return [];
    }
}

async function uploadToBackend(file) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(backendUrl("/uploads"), { method: "POST", body: form });
    if (!res.ok) throw new Error("Upload failed");
    return await res.json();
}

async function listBackendUploads() {
    const res = await fetch(backendUrl("/uploads/list"));
    if (!res.ok) throw new Error("List failed");
    const data = await res.json();
    return data.files || [];
}

async function clearBackendUploads() {
    const res = await fetch(backendUrl("/uploads/clear"), { method: "DELETE" });
    if (!res.ok) throw new Error("Clear failed");
    return await res.json();
}

async function deleteBackendUpload(name) {
    const res = await fetch(backendUrl("/uploads/" + encodeURIComponent(name)), { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
    return await res.json();
}

async function openBackendFile(name) {
    const ext = getExt(name);
    const url = backendUrl("/uploads/" + encodeURIComponent(name));
    const res = await fetch(url);
    if (!res.ok) {
        openMessagePreview(name, "Failed to open file.");
        return;
    }
    const blob = await res.blob();
    if (isImage(ext)) {
        const objUrl = URL.createObjectURL(blob);
        openImagePreview(name, objUrl);
        setTimeout(() => URL.revokeObjectURL(objUrl), 10000);
        return;
    }
    if (isPdf(ext)) {
        const objUrl = URL.createObjectURL(blob);
        window.open(objUrl, "_blank", "noopener,noreferrer");
        setTimeout(() => URL.revokeObjectURL(objUrl), 10000);
        return;
    }
    if (isProbablyText(ext)) {
        const text = await blob.text();
        if (text.length > 200000) {
            openMessagePreview(name, "File is too large to preview.");
            return;
        }
        openTextPreview(name, text);
        return;
    }
    const objUrl = URL.createObjectURL(blob);
    window.open(objUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(objUrl), 10000);
}

function getExt(name) {
    const parts = String(name || "").toLowerCase().split(".");
    return parts.length > 1 ? parts.pop() : "";
}

function isProbablyText(ext) {
    return [
        "txt", "py", "md", "json", "csv", "tsv", "log",
        "fasta", "fa", "fastq", "fq", "vcf", "bed", "gff", "gtf", "sam",
        "xml", "html", "css", "js"
    ].includes(ext);
}

function isImage(ext) {
    return ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext);
}

function isPdf(ext) {
    return ext === "pdf";
}

let previewModal = null;

function ensurePreviewModal() {
    if (previewModal) return previewModal;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.bottom = "0";
    overlay.style.background = "rgba(2, 6, 23, 0.75)";
    overlay.style.display = "none";
    overlay.style.zIndex = "9999";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";

    const panel = document.createElement("div");
    panel.style.background = "#0b1020";
    panel.style.border = "1px solid rgba(255, 255, 255, 0.08)";
    panel.style.borderRadius = "10px";
    panel.style.width = "min(860px, 92vw)";
    panel.style.maxHeight = "80vh";
    panel.style.display = "flex";
    panel.style.flexDirection = "column";
    panel.style.boxShadow = "0 18px 38px rgba(6, 6, 6, 0.45)";

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.justifyContent = "space-between";
    header.style.padding = "10px 14px";
    header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.08)";

    const titleEl = document.createElement("div");
    titleEl.style.color = "#e6eef6";
    titleEl.style.fontWeight = "600";
    titleEl.style.fontSize = "14px";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "Close";
    closeBtn.style.background = "transparent";
    closeBtn.style.border = "1px solid rgba(125, 211, 252, 0.4)";
    closeBtn.style.color = "#7dd3fc";
    closeBtn.style.borderRadius = "6px";
    closeBtn.style.padding = "2px 8px";
    closeBtn.style.cursor = "pointer";

    const bodyWrap = document.createElement("div");
    bodyWrap.style.padding = "12px 14px";
    bodyWrap.style.overflow = "auto";

    const bodyPre = document.createElement("pre");
    bodyPre.style.margin = "0";
    bodyPre.style.whiteSpace = "pre-wrap";
    bodyPre.style.wordBreak = "break-word";
    bodyPre.style.color = "#e6eef6";
    bodyPre.style.fontFamily = "\"Ubuntu Mono\", monospace";
    bodyPre.style.fontSize = "13px";

    const bodyImg = document.createElement("img");
    bodyImg.style.display = "none";
    bodyImg.style.maxWidth = "100%";
    bodyImg.style.height = "auto";
    bodyImg.style.borderRadius = "6px";
    bodyImg.style.border = "1px solid rgba(255, 255, 255, 0.08)";

    header.appendChild(titleEl);
    header.appendChild(closeBtn);
    bodyWrap.appendChild(bodyPre);
    bodyWrap.appendChild(bodyImg);
    panel.appendChild(header);
    panel.appendChild(bodyWrap);
    overlay.appendChild(panel);

    const hide = () => {
        overlay.style.display = "none";
    };
    closeBtn.addEventListener("click", hide);
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            hide();
        }
    });

    document.body.appendChild(overlay);
    previewModal = { overlay, titleEl, bodyPre, bodyImg, closeBtn };
    return previewModal;
}

function openTextPreview(filename, text) {
    const modal = ensurePreviewModal();
    modal.titleEl.textContent = filename;
    modal.bodyPre.textContent = text;
    modal.bodyPre.style.display = "block";
    modal.bodyImg.style.display = "none";
    modal.overlay.style.display = "flex";
}

function openMessagePreview(filename, msg) {
    const modal = ensurePreviewModal();
    modal.titleEl.textContent = filename;
    modal.bodyPre.textContent = msg;
    modal.bodyPre.style.display = "block";
    modal.bodyImg.style.display = "none";
    modal.bodyImg.src = "";
    modal.bodyImg.alt = "";
    modal.overlay.style.display = "flex";
}

function openImagePreview(filename, src) {
    const modal = ensurePreviewModal();
    modal.titleEl.textContent = filename;
    modal.bodyPre.textContent = "";
    modal.bodyPre.style.display = "none";
    modal.bodyImg.src = src;
    modal.bodyImg.alt = filename;
    modal.bodyImg.style.display = "block";
    modal.overlay.style.display = "flex";
}

function openUploadFile(pyodide, filename) {
    const path = "/uploads/" + filename;
    const ext = getExt(filename);
    let data = null;
    try {
        data = pyodide.FS.readFile(path);
    } catch (err) {
        openMessagePreview(filename, "Failed to read file.");
        return;
    }

    if (isProbablyText(ext)) {
        const decoder = new TextDecoder("utf-8", { fatal: false });
        let text = decoder.decode(data);
        if (text.length > 200000) {
            text = text.slice(0, 200000) + "\n\n(truncated)";
        }
        openTextPreview(filename, text);
        return;
    }

    let mime = "application/octet-stream";
    if (isPdf(ext)) {
        mime = "application/pdf";
    } else if (isImage(ext)) {
        mime = ext === "jpg" ? "image/jpeg" : "image/" + ext;
    }

    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 10000);

    if (!isPdf(ext) && !isImage(ext)) {
        openMessagePreview(filename, "Preview not supported; opened as download/new tab.");
    }
}

function renderUploadsList(pyodide, listEl) {
    if (!listEl) return;
    listEl.textContent = "";
    if (USE_BACKEND_RUNNER) {
        listBackendUploads()
            .then((entries) => {
                if (!entries.length) {
                    const empty = document.createElement("div");
                    empty.textContent = "No uploaded files";
                    listEl.appendChild(empty);
                    return;
                }
                entries.forEach((item) => {
                    const name = item.name || "";
                    const row = document.createElement("div");
                    row.className = "nb-upload-item";

                    const label = document.createElement("span");
                    label.className = "nb-upload-path";
                    const nameSpan = document.createElement("span");
                    nameSpan.className = "nb-upload-name";
                    nameSpan.textContent = name;
                    const pathSpan = document.createElement("span");
                    pathSpan.className = "nb-upload-path-text";
                    pathSpan.textContent = "path:   /uploads/" + name;
                    label.appendChild(nameSpan);
                    label.appendChild(pathSpan);

                    const actions = document.createElement("div");
                    actions.className = "nb-upload-actions";

                    const openBtn = document.createElement("button");
                    openBtn.type = "button";
                    openBtn.className = "nb-upload-open";
                    openBtn.textContent = "Open";
                    openBtn.addEventListener("click", () => {
                        openBackendFile(name);
                    });

                    const del = document.createElement("button");
                    del.type = "button";
                    del.className = "nb-upload-delete";
                    del.textContent = "Delete";
                    del.addEventListener("click", async () => {
                        try {
                            await deleteBackendUpload(name);
                            await renderUploadsList(null, listEl);
                        } catch (err) {
                            openMessagePreview(name, "Delete failed.");
                        }
                    });

                    actions.appendChild(openBtn);
                    actions.appendChild(del);
                    row.appendChild(label);
                    row.appendChild(actions);
                    listEl.appendChild(row);
                });
            })
            .catch(() => {
                const empty = document.createElement("div");
                empty.textContent = "Failed to load uploads";
                listEl.appendChild(empty);
            });
        return;
    }

    const entries = listUploads(pyodide);
    if (!entries.length) {
        const empty = document.createElement("div");
        empty.textContent = "No uploaded files";
        listEl.appendChild(empty);
        return;
    }
    entries.forEach((name) => {
        const row = document.createElement("div");
        row.className = "nb-upload-item";

        const label = document.createElement("span");
        label.className = "nb-upload-path";
        const nameSpan = document.createElement("span");
        nameSpan.className = "nb-upload-name";
        nameSpan.textContent = name;
        const pathSpan = document.createElement("span");
        pathSpan.className = "nb-upload-path-text";
        pathSpan.textContent = "path:   /uploads/" + name;
        label.appendChild(nameSpan);
        label.appendChild(pathSpan);

        const del = document.createElement("button");
        del.type = "button";
        del.className = "nb-upload-delete";
        del.textContent = "Delete";
        del.addEventListener("click", () => {
            try {
                pyodide.FS.unlink("/uploads/" + name);
            } catch (err) {
                // ignore
            }
            renderUploadsList(pyodide, listEl);
        });

        const actions = document.createElement("div");
        actions.className = "nb-upload-actions";

        const openBtn = document.createElement("button");
        openBtn.type = "button";
        openBtn.className = "nb-upload-open";
        openBtn.textContent = "Open";
        openBtn.addEventListener("click", () => {
            openUploadFile(pyodide, name);
        });

        actions.appendChild(openBtn);
        actions.appendChild(del);

        row.appendChild(label);
        row.appendChild(actions);
        listEl.appendChild(row);
    });
}

function createInputManager(cell, outputController) {
    const outputEl = cell.querySelector(".nb-output");
    let activeRow = null;

    function removeRow() {
    if (activeRow && activeRow.parentNode) activeRow.parentNode.removeChild(activeRow);
    activeRow = null;
    }

    function renderInput(promptText, onSubmit) {
    const token = cell.__nb && cell.__nb.cancelToken;
    if (!token || token.cancelled) {
        onSubmit("");
        return;
    }
    const label = promptText ? String(promptText) : "";
    const displayPrompt = label ? "> " + label : "> ";

    if (!outputEl) {
        onSubmit("");
        return;
    }

    removeRow();
    const buffer = outputController.get();
    if (buffer && !buffer.endsWith("\n")) {
        outputController.append("\n");
    }

    const row = document.createElement("div");
    row.className = "nb-input-row";

    const promptSpan = document.createElement("span");
    promptSpan.className = "nb-input-prompt";
    promptSpan.textContent = displayPrompt;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "nb-input-field";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "nb-input-submit";
    button.textContent = "Enter";

    row.appendChild(promptSpan);
    row.appendChild(input);
    row.appendChild(button);

    // Insert input row after <pre> if possible
    const pre = outputEl.querySelector(".nb-output-text");
    if (pre && pre.parentNode === outputEl) {
        if (pre.nextSibling) outputEl.insertBefore(row, pre.nextSibling);
        else outputEl.appendChild(row);
    } else {
        outputEl.appendChild(row);
    }

    activeRow = row;

    const submit = () => {
        const currentToken = cell.__nb && cell.__nb.cancelToken;
        if (!currentToken || currentToken.cancelled) {
            removeRow();
            onSubmit("");
            return;
        }
        const value = input.value;
        removeRow();
        outputController.append(displayPrompt + value + "\n");
        onSubmit(value);
    };

    button.addEventListener("click", submit);
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") submit();
    });

    input.focus();
    }

    function requestInput(promptText) {
    const token = cell.__nb && cell.__nb.cancelToken;
    if (!token || token.cancelled) {
        return Promise.resolve("");
    }
    return new Promise((resolve) => renderInput(promptText, resolve));
    }

    return { requestInput, renderInput, clear: removeRow };
}

async function ensureRuntime(outputTextEl) {
    if (window.__probiozPyRuntime && window.__probiozPyRuntime._readyPromise) {
    return window.__probiozPyRuntime._readyPromise;
    }

    const runtime = {
    pyodide: null,
    globals: null,
    requestInput: null
    };

    const readyPromise = (async () => {
    setOutput(outputTextEl, "Loading Python runtime...");
    const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
    });

    setOutput(outputTextEl, "Preparing environment (pandas, matplotlib)...");
    try {
        await pyodide.loadPackage(["pandas", "matplotlib"]);
    } catch (err) {
        console.error(err);
        setOutput(outputTextEl, "Failed to prepare environment: " + String(err));
        throw err;
    }

    runtime.pyodide = pyodide;
    runtime.globals = pyodide.globals;
    window.__probiozPyRuntime.runtime = runtime;
    window.__probiozPyRuntime.pyodide = pyodide;

    if (typeof SharedArrayBuffer === "function" && window.crossOriginIsolated && typeof pyodide.setInterruptBuffer === "function") {
        const buf = new SharedArrayBuffer(4);
        const arr = new Int32Array(buf);
        pyodide.setInterruptBuffer(arr);
        runtime._interruptArray = arr;
        window.__probiozPyRuntime._interruptArray = arr;
    }

    runtime.globals.set("js_input", async (promptText) => {
        const message = promptText ? String(promptText) : "";
        if (!runtime.requestInput) {
        return "";
        }
        const response = await runtime.requestInput(message);
        return response === null || response === undefined ? "" : String(response);
    });

    return runtime;
    })();

    window.__probiozPyRuntime = { _readyPromise: readyPromise };
    return readyPromise;
}

async function capturePlot(runtime) {
    const plotCode = [
    "import base64",
    "from io import BytesIO",
    "img_data = None",
    "try:",
    "    import matplotlib.pyplot as plt",
    "    if plt.get_fignums():",
    "        buf = BytesIO()",
    "        plt.savefig(buf, format='png', bbox_inches='tight')",
    "        buf.seek(0)",
    "        img_data = base64.b64encode(buf.read()).decode('ascii')",
    "        plt.close('all')",
    "except Exception:",
    "    img_data = None",
    "img_data"
    ].join("\n");

    try {
    return await runtime.pyodide.runPythonAsync(plotCode, { globals: runtime.globals });
    } catch (err) {
    return null;
    }
}

async function ensureOpenPatch(runtime) {
    if (runtime && runtime._openPatchInstalled) return;
    const py = [
        "import builtins, os, re",
        "",
        "if not hasattr(builtins, '_nb_real_open'):",
        "    builtins._nb_real_open = builtins.open",
        "",
        "def _nb_strip_suffix(stem):",
        "    m = re.match(r'^(.*)\\((\\d+)\\)$', stem)",
        "    return m.group(1) if m else stem",
        "",
        "def _nb_unique_path(path):",
        "    if path is None:",
        "        return path",
        "    p = str(path)",
        "    if p.startswith('/uploads/') or p.startswith('uploads/'):",
        "        return p",
        "    if not os.path.exists(p):",
        "        return p",
        "    dirn = os.path.dirname(p)",
        "    base = os.path.basename(p)",
        "    stem, ext = os.path.splitext(base)",
        "    stem = _nb_strip_suffix(stem)",
        "    i = 1",
        "    while True:",
        "        candidate = f\"{stem}({i}){ext}\"",
        "        full = os.path.join(dirn, candidate) if dirn else candidate",
        "        if not os.path.exists(full):",
        "            return full",
        "        i += 1",
        "",
        "def _nb_open(file, mode='r', *args, **kwargs):",
        "    m = '' if mode is None else str(mode)",
        "    if any(ch in m for ch in ['w','a','x','+']):",
        "        try:",
        "            file = _nb_unique_path(file)",
        "        except Exception:",
        "            pass",
        "    return builtins._nb_real_open(file, mode, *args, **kwargs)",
        "",
        "builtins.open = _nb_open",
        ""
    ].join("\n");
    await runtime.pyodide.runPythonAsync(py, { globals: runtime.globals });
    runtime._openPatchInstalled = true;
}

async function runCell(cell) {
    if (USE_BACKEND_RUNNER) {
        runViaBackend(cell);
        return;
    }
    const runButton = cell.querySelector(".nb-run");
    const stopButton = cell.__nb && cell.__nb.stopButton ? cell.__nb.stopButton : cell.querySelector(".nb-stop");
    const outputTextEl = cell.querySelector(".nb-output-text");
    const filesEl = cell.querySelector(".nb-files");
    const plotEl = cell.querySelector(".nb-plot");
    const editor = cell.__nb && cell.__nb.editor;

    if (!editor || !runButton) return;

    const token = { cancelled: false, runId: Date.now() + Math.random() };
    if (cell.__nb) {
        cell.__nb.cancelToken = token;
        cell.__nb.isRunning = true;
    }

    runButton.disabled = true;
    runButton.textContent = "Running...";
    if (stopButton) stopButton.disabled = false;
    setOutput(outputTextEl, "");
    if (filesEl) filesEl.textContent = "";
    if (plotEl) plotEl.textContent = "";

    let runtime = null;
    let inputManager = null;
    let stopHandler = null;

    try {
    runtime = await ensureRuntime(outputTextEl);
    const pyodide = runtime.pyodide;

    const outputController = createOutputController(outputTextEl);
    inputManager = createInputManager(cell, outputController);
    outputController.set("");
    if (cell.__nb) {
        cell.__nb.inputManager = inputManager;
    }

    pyodide.setStdout({
        batched: (text) => {
        if (text === null || text === undefined) return;
        const s = normalizeNewlines(text);
        if (!s) return;
        if (cell.__nb && (cell.__nb.cancelToken !== token || token.cancelled)) return;
        outputController.append(s.endsWith("\n") ? s : s + "\n");
        }
    });
    pyodide.setStderr({
        batched: (text) => {
        if (text === null || text === undefined) return;
        const s = normalizeNewlines(text);
        if (!s) return;
        if (cell.__nb && (cell.__nb.cancelToken !== token || token.cancelled)) return;
        outputController.append(s.endsWith("\n") ? s : s + "\n");
        }
    });

    runtime.requestInput = inputManager.requestInput;
    if (stopButton) {
        stopHandler = () => {
            if (!cell.__nb || !cell.__nb.isRunning) {
                return;
            }
            token.cancelled = true;
            if (cell.__nb.inputManager) {
                try {
                    cell.__nb.inputManager.clear();
                } catch (err) {
                    // ignore
                }
            }
            try {
                if (window.__probiozPyRuntime && window.__probiozPyRuntime.pyodide) {
                    const py = window.__probiozPyRuntime.pyodide;
                    if (py.setInterruptBuffer && window.__probiozPyRuntime._interruptArray) {
                        window.__probiozPyRuntime._interruptArray[0] = 2;
                    }
                }
            } catch (err) {
                // ignore
            }
            if (stopButton) stopButton.disabled = true;
            runButton.disabled = false;
            runButton.textContent = "Run Cell";
            if (cell.__nb) cell.__nb.isRunning = false;
        };
        stopButton.addEventListener("click", stopHandler);
    }

    const sanitized = sanitizeCommonMistakes(editor.getValue());
    if (sanitized.changed) {
        editor.setValue(sanitized.code);
        outputController.append("Auto-fix: corrected a common syntax mistake.\n");
    }
    const code = sanitized.code;
    const asyncCode = transformPythonForAsyncInput(code);
    const wrappedCode = [
        "import asyncio",
        "async def __nb_main__():",
        indentCode(asyncCode),
        "await __nb_main__()"
    ].join("\n");

    const beforeFiles = listFiles(pyodide).filter((name) => isRegularFile(pyodide, name));
    let execError = null;
    let retriedBio = false;

    const forceNoViewer = [
        "import os",
        "os.environ['MPLBACKEND'] = 'agg'",
        "try:",
        "    import matplotlib",
        "    matplotlib.use('agg', force=True)",
        "except Exception:",
        "    pass",
        ""
    ].join("\n");
    await pyodide.runPythonAsync(forceNoViewer, { globals: runtime.globals });

    const closeAll = [
        "try:",
        "    import matplotlib.pyplot as plt",
        "    plt.close('all')",
        "except Exception:",
        "    pass",
        ""
    ].join("\n");
    await pyodide.runPythonAsync(closeAll, { globals: runtime.globals });

    await ensureOpenPatch(runtime);

    try {
        while (true) {
            try {
                await pyodide.runPythonAsync(wrappedCode, { globals: runtime.globals });
                break;
            } catch (err) {
                const message = String(err);
                const needsBio = message.includes("ModuleNotFoundError") && (message.includes("biopython") || message.includes("Bio"));
                if (needsBio && !retriedBio) {
                    retriedBio = true;
                    if (!token.cancelled) {
                        outputController.append("Installing biopython...\n");
                    }
                    try {
                        await pyodide.loadPackage("biopython");
                        continue;
                    } catch (loadErr) {
                        console.error(loadErr);
                        outputController.append("Failed to install biopython: " + String(loadErr) + "\n");
                        execError = null;
                        break;
                    }
                }
                execError = err;
                break;
            }
        }
    } catch (err) {
        execError = err;
    }

    if (execError && (!cell.__nb || (cell.__nb.cancelToken === token && !token.cancelled))) {
        const message = String(execError);
        outputController.append(message.endsWith("\n") ? message : message + "\n");
    }

    // Plot capture + download
    const plotBase64 = await capturePlot(runtime);

    // File creation detection + download links
    const afterFiles = listFiles(pyodide).filter((name) => isRegularFile(pyodide, name));
    const newFiles = afterFiles.filter((name) => !beforeFiles.includes(name));

    if (newFiles.length && filesEl) {
        const label = document.createElement("div");
        label.textContent = "Files created:";
        filesEl.appendChild(label);

        newFiles.forEach((name) => {
        try {
            const data = pyodide.FS.readFile(name);
            const blob = new Blob([data], { type: "application/octet-stream" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = name;
            link.textContent = name;
            link.addEventListener("click", () => setTimeout(() => URL.revokeObjectURL(url), 1000));
            filesEl.appendChild(link);
        } catch (err) {
            const fallback = document.createElement("div");
            fallback.textContent = name;
            filesEl.appendChild(fallback);
        }
        });
    }

    if (plotBase64 && plotEl && (!cell.__nb || (cell.__nb.cancelToken === token && !token.cancelled))) {
        const img = document.createElement("img");
        img.alt = "Matplotlib output";
        img.src = "data:image/png;base64," + plotBase64;
        plotEl.appendChild(img);

        const plotBlob = base64ToBlob(plotBase64, "image/png");
        const plotUrl = URL.createObjectURL(plotBlob);

        const download = document.createElement("a");
        download.href = plotUrl;
        download.download = "plot_cell_" + (cell.dataset.cell || "output") + ".png";
        download.textContent = "Download plot";
        download.addEventListener("click", () => setTimeout(() => URL.revokeObjectURL(plotUrl), 1000));
        plotEl.appendChild(download);
    }

    } finally {
    if (runtime) runtime.requestInput = null;
    if (inputManager) inputManager.clear();
    if (stopButton && stopHandler) stopButton.removeEventListener("click", stopHandler);
    if (stopButton) stopButton.disabled = true;
    if (cell.__nb) cell.__nb.isRunning = false;
    if (!token.cancelled) {
        runButton.disabled = false;
        runButton.textContent = "Run Cell";
    }
    }
}

function resetCell(cell) {
    const outputTextEl = cell.querySelector(".nb-output-text");
    const filesEl = cell.querySelector(".nb-files");
    const plotEl = cell.querySelector(".nb-plot");
    const editor = cell.__nb && cell.__nb.editor;
    const initial = cell.__nb && cell.__nb.initial;

    if (editor && typeof initial === "string") editor.setValue(initial);
    setOutput(outputTextEl, "");
    if (filesEl) filesEl.textContent = "";
    if (plotEl) plotEl.textContent = "";
}

function getExpandedHeight(editor) {
    const lineCount = editor.lineCount();
    const lineHeight = editor.defaultTextHeight();
    const padding = 16;
    return Math.max(220, lineCount * lineHeight + padding);
}

function applyCell4Visibility(cell, visible) {
    const editor = cell.__nb && cell.__nb.editor;
    const toggleButton = cell.querySelector(".nb-toggle");
    if (!editor || !toggleButton) return;

    const wrapper = editor.getWrapperElement();
    cell.classList.toggle("nb-fullcode-hidden", !visible);

    if (visible) {
    wrapper.style.display = "";
    editor.setSize("100%", getExpandedHeight(editor) + "px");
    editor.refresh();
    toggleButton.textContent = "Hide Full Code";
    } else {
    wrapper.style.display = "none";
    toggleButton.textContent = "Show Full Code";
    }
}

function highlightInlineCode(desc) {
    if (!desc || desc.dataset.nbHighlighted === "true") return;
    if (desc.querySelector("code.nb-inline-code")) {
    desc.dataset.nbHighlighted = "true";
    return;
    }

    const tokenRegex =
    /(?:input\(\)|upper\(\)|lower\(\)|strip\(\)|split\(\)|replace\(\)|""\.join\(\)|isalpha\(\)|len\(\)|int\(\)|float\(\)|round\(\)|set\([^)]+\)|all\(\)|count\(\)|reversed\([^)]+\)|startswith\([^)]+\)|open\([^)]+\)|csv\.writer\(\)|csv\.writerows\(\)|\bwhile True\b|\bif\b|\belif\b)/g;

    const walker = document.createTreeWalker(desc, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) {
    const node = walker.currentNode;
    const parent = node.parentElement;
    if (parent && parent.closest("code")) continue;
    textNodes.push(node);
    }

    textNodes.forEach((node) => {
    const text = node.nodeValue;
    let match = null;
    let lastIndex = 0;
    tokenRegex.lastIndex = 0;

    const fragment = document.createDocumentFragment();
    let hasMatch = false;

    while ((match = tokenRegex.exec(text)) !== null) {
        hasMatch = true;
        const before = text.slice(lastIndex, match.index);
        if (before) fragment.appendChild(document.createTextNode(before));

        const code = document.createElement("code");
        code.className = "nb-inline-code";
        code.textContent = match[0];
        fragment.appendChild(code);

        lastIndex = tokenRegex.lastIndex;
    }

    if (!hasMatch) return;

    const after = text.slice(lastIndex);
    if (after) fragment.appendChild(document.createTextNode(after));
    node.parentNode.replaceChild(fragment, node);
    });

    desc.dataset.nbHighlighted = "true";
}

function initNotebook() {
    const cells = document.querySelectorAll(".nb-cell");
    if (!cells.length || !window.CodeMirror) return;

    cells.forEach((cell) => {
    const textarea = cell.querySelector(".nb-editor");
    const runButton = cell.querySelector(".nb-run");
    const resetButton = cell.querySelector(".nb-reset");
    const clearButton = cell.querySelector(".nb-clear");
    const actions = cell.querySelector(".nb-actions");
    if (!textarea) return;

    const editor = window.CodeMirror.fromTextArea(textarea, {
        mode: "python",
        theme: "material-darker",
        lineNumbers: true,
        indentUnit: 4,
        viewportMargin: Infinity
    });

    cell.__nb = {
        editor,
        initial: textarea.value,
        fullCodeVisible: true,
        isRunning: false,
        cancelToken: { cancelled: false, runId: 0 },
        stopButton: null,
        inputManager: null
    };

    if (actions && !cell.querySelector(".nb-stop")) {
        const stopButton = document.createElement("button");
        stopButton.type = "button";
        stopButton.className = "nb-stop";
        stopButton.textContent = "Stop";
        stopButton.disabled = true;
        actions.appendChild(stopButton);
        cell.__nb.stopButton = stopButton;
    } else if (cell.querySelector(".nb-stop")) {
        cell.__nb.stopButton = cell.querySelector(".nb-stop");
    }

    if (runButton) runButton.addEventListener("click", () => runCell(cell));
    if (resetButton) resetButton.addEventListener("click", () => resetCell(cell));
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            const outputTextEl = cell.querySelector(".nb-output-text");
            if (outputTextEl) outputTextEl.textContent = "";
        });
    }

    if (cell.dataset.cell === "4") {
        const header = cell.querySelector(".nb-cell-header");
        if (header) {
        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.className = "nb-toggle";
        header.appendChild(toggleButton);

        cell.__nb.fullCodeVisible = false;
        applyCell4Visibility(cell, false);

        toggleButton.addEventListener("click", () => {
            cell.__nb.fullCodeVisible = !cell.__nb.fullCodeVisible;
            applyCell4Visibility(cell, cell.__nb.fullCodeVisible);
        });
        }
    }
    });
}

window.initNotebook = initNotebook;

async function initFilebar() {
    const filebar = document.querySelector(".nb-filebar");
    if (!filebar) return;

    const uploadBtn = filebar.querySelector(".nb-upload-global");
    const showBtn = filebar.querySelector(".nb-show-uploads");
    const clearBtn = filebar.querySelector(".nb-clear-uploads-global");
    const statusEl = filebar.querySelector(".nb-upload-status");
    const panel = filebar.querySelector(".nb-uploads-panel");
    const listEl = filebar.querySelector(".nb-uploads-list");
    const refreshBtn = filebar.querySelector(".nb-refresh-uploads");

    const setStatus = (text) => {
        if (!statusEl) return;
        statusEl.textContent = text || "";
        if (text) {
            setTimeout(() => {
                if (statusEl.textContent === text) {
                    statusEl.textContent = "";
                }
            }, 3000);
        }
    };

    const withRuntime = async () => {
        const runtime = await ensureRuntime(null);
        return runtime;
    };

    const refreshList = async () => {
        if (USE_BACKEND_RUNNER) {
            renderUploadsList(null, listEl);
            return;
        }
        const runtime = await withRuntime();
        renderUploadsList(runtime.pyodide, listEl);
    };

    if (uploadBtn) {
        uploadBtn.addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "file";
            input.addEventListener("change", async () => {
                const file = input.files && input.files[0];
                if (!file) return;
                try {
                    if (USE_BACKEND_RUNNER) {
                        const result = await uploadToBackend(file);
                        setStatus("✓ Uploaded: " + (result.name || file.name));
                        if (panel && !panel.hidden) {
                            await refreshList();
                        }
                    } else {
                        const runtime = await withRuntime();
                        ensureUploadsDir(runtime.pyodide);
                        await writeUploadedFileToFS(runtime.pyodide, file);
                        setStatus("✓ Uploaded: " + file.name);
                        if (panel && !panel.hidden) {
                            renderUploadsList(runtime.pyodide, listEl);
                        }
                    }
                } catch (err) {
                    console.error(err);
                    setStatus("Upload failed");
                }
            });
            input.click();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", async () => {
            try {
                if (USE_BACKEND_RUNNER) {
                    await clearBackendUploads();
                    setStatus("✓ Uploads cleared");
                    if (panel && !panel.hidden) {
                        await refreshList();
                    }
                } else {
                    const runtime = await withRuntime();
                    clearUploads(runtime.pyodide);
                    setStatus("✓ Uploads cleared");
                    if (panel && !panel.hidden) {
                        renderUploadsList(runtime.pyodide, listEl);
                    }
                }
            } catch (err) {
                console.error(err);
                setStatus("Clear failed");
            }
        });
    }

    if (showBtn) {
        showBtn.addEventListener("click", async () => {
            if (!panel) return;
            panel.hidden = !panel.hidden;
            showBtn.textContent = panel.hidden ? "Show Uploads" : "Hide Uploads";
            if (!panel.hidden) {
                await refreshList();
            }
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener("click", async () => {
            await refreshList();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.hljs && typeof window.hljs.highlightAll === "function") window.hljs.highlightAll();
    document.querySelectorAll(".nb-cell-desc").forEach((desc) => highlightInlineCode(desc));
    initNotebook();
    initFilebar();
});
})();

