
        // right image display
        document.addEventListener("DOMContentLoaded", () => {
            const images = document.querySelectorAll(".feature-img");
            if (!images.length) return;

            let currentIndex = 0;
            images[0].classList.add("active");
            if (images.length > 1) {
                images[1].classList.add("active");
            }

            setInterval(() => {
                images.forEach((img) => img.classList.remove("active"));
                currentIndex = (currentIndex + 2) % images.length;
                const nextIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add("active");
                if (images.length > 1) {
                    images[nextIndex].classList.add("active");
                }
            }, 5000);
        });

        // Mobile nav toggle + active state
        (function () {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.getElementById('navMenu');
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    const open = navMenu.classList.toggle('show');
                    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
                });
            }
            const links = document.querySelectorAll('.nav-links a');
            const here = location.pathname.split('/').pop() || 'home.html';
            links.forEach(a => { if (a.getAttribute('href') === here) a.classList.add('active'); });
        })();

        // ===== Navbar title: show only on Welcome, hide elsewhere =====
        const navbarTitle = document.getElementById('navbarTitle');
        function updateNavTitleFor(id) {
            if (!navbarTitle) return;
            if (id === 'welcome') {
                const sec = document.getElementById(id);
                const h2 = sec ? sec.querySelector('h2') : null;
                navbarTitle.textContent = h2 ? h2.textContent : 'Welcome';
                navbarTitle.style.display = 'block';
            } else {
                navbarTitle.textContent = '';
                navbarTitle.style.display = 'none';
            }
        }

        // Sidebar toggles
        function toggleSubtopics(element) {
            if (!element) return;

            const box = element.parentElement;              // the .topic-box
            const ul = element.nextElementSibling;          // the <ul> with subtopics
            if (!ul) return;

            const isOpen = box.classList.contains('open');  // is this topic already open?

            // 🔹 If it is currently OPEN → just close it and stop
            if (isOpen) {
                ul.style.display = 'none';
                element.classList.remove('active');
                box.classList.remove('open');
                element.setAttribute('aria-expanded', 'false');
                return;  // important: don't run the "open" logic below
            }

            // 🔹 If it is CLOSED → first close all other topics
            document.querySelectorAll('.topic-box').forEach(tb => {
                if (tb !== box) {
                    tb.classList.remove('open');
                    const otherUl = tb.querySelector('.subtopics');
                    const title = tb.querySelector('.topic-title');
                    if (otherUl) otherUl.style.display = 'none';
                    if (title) {
                        title.classList.remove('active');
                        title.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            // 🔹 Now open the clicked one
            ul.style.display = 'block';
            element.classList.add('active');
            box.classList.add('open');
            element.setAttribute('aria-expanded', 'true');
            ul.scrollIntoView({ block: 'nearest' });

            // 🔹 Show the right-side content only when OPENING
            const targetId = element.dataset.topicTarget;
            if (targetId) {
                showContent(targetId);
            }
        }


        // Basic show (will be wrapped to fixed-order)
        function showContent(id) {
            document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
            const selected = document.getElementById(id);
            if (selected) {
                selected.style.display = 'block';
                // (changed) use helper instead of setting navbarTitle directly
                updateNavTitleFor(id);
                document.querySelector('.content').scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        /* ===== FIXED ORDER NAVIGATION ===== */
        const COURSE_ORDER = [
            'topic-intro',
            'sub1',
            'sub2',
            'sub3',
            'sub4',
            'sub5',
            'sub6',
            'sub7',
            'E1',

            'topic-variables',
            'sub8',
            'sub9',
            'sub10',
            'sub11',
            'sub12',
            'sub13',
            'E2',

            'topic-data-types',
            'sub14',
            'sub15',
            'sub16',
            'sub17',
            'sub18',
            'sub19',
            'sub20',
            'E3',

            'topic-strings',
            'sub21',
            'sub22',
            'sub23',
            'sub24',
            'sub25',
            'sub26',
            'sub27',
            'sub28',
            'sub29',
            'E4',

            'topic-operators',
            'sub30',
            'sub31',
            'sub32',
            'sub33',
            'sub34',
            'sub35',
            'sub36',
            'sub37',
            'sub38',
            'E5',

            'topic-list',
            'sub39',
            'sub40',
            'sub41',
            'sub42',
            'sub43',
            'sub44',
            'sub45',
            'E6',

            'topic-tuple',
            'sub46',
            'sub47',
            'sub48',
            'sub49',
            'sub50',
            'E7',

            'topic-set',
            'sub51',
            'sub52',
            'sub53',
            'sub54',
            'sub55',
            'sub56',
            'sub57',
            'E8',

            'topic-dictionaries',
            'sub58',
            'sub59',
            'sub60',
            'sub61',
            'sub62',
            'sub63',
            'sub64',
            'E9',

            'topic-decision-making',
            'sub65',
            'sub66',
            'sub67',
            'sub68',
            'sub69',
            'sub70',
            'sub71',
            'sub72',
            'EX10',

            'topic-Match',
            'sub73',
            'EX11',

            'topic-loops',
            'sub74',
            'sub75',
            'sub76',
            'sub77',
            'sub78',
            'sub79',
            'sub80',
            'sub81',
            'sub82',
            'sub83',
            'sub84',
            'EX12',

            'topic-function',
            'sub85',
            'sub86',
            'sub87',
            'sub88',
            'sub89',
            'sub90',
            'sub91',
            'sub92',
            'sub93',
            'sub94',
            'sub95',
            'sub96',
            'EX13',

            'topic-filehandling',
            'sub97',
            'sub98',
            'sub99',
            'sub100',
            'sub101',
            'sub102',
            'sub103',
            'EX14',

            'topic-biopython',
            'sub104',
            'sub105',
            'sub106',
            'sub107',
            'sub108',
            'sub109',
            'sub110',
            'sub111',
            'sub112',
            'sub113',
            'EX15',

            'topic-sequence-parsing',
            'sub114',
            'sub115',
            'sub116',
            'sub117',
            'sub118',
            'sub119',
            'sub120',
            'sub121',
            'EX16',

            'topic-dna-rna-protein',
            'sub122',
            'sub123',
            'sub124',
            'sub125',
            'sub126',
            'sub127',
            'sub128',
            'sub129',
            'sub130',
            'sub131',
            'sub132',
            'sub133',
            'sub134',
            'sub135',
            'sub136',
            'sub137',
            'EX17',

            'topic-accessing',
            'sub138',
            'sub139',
            'sub140',
            'sub141',
            'sub142',
            'sub143',
            'EX18',

            'topic-visualization',
            'sub144',
            'sub145',
            'sub146',
            'sub147',
            'sub148',
            'sub149',
            'EX19',

            'topic-pandas',
            'sub150',
            'sub151',
            'sub152',
            'sub153',
            'sub154',
            'sub155',
            'sub156',
            'EX20',

            'topic-adv-tools',
            'sub157',
            'sub158',
            'sub159',
            'sub160',
            'sub161',
            'sub162',
            'sub163',
            'EX21'
            ];

        /* ============================================
        COURSE NAVIGATION SYSTEM
        - Controls which lesson/section is shown
        - Handles Prev/Next navigation order
        - Syncs sidebar clicks with section index
        - Ensures only one content-section is visible
        ============================================ */

        const sectionById = {};
        COURSE_ORDER.forEach(id => {
            const el = document.getElementById(id);
            if (el) sectionById[id] = el;
        });

        let currentIndex = 0;

        function showSectionByIndex(i) {
            if (i < 0 || i >= COURSE_ORDER.length) return;
            document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');

            const id = COURSE_ORDER[i];
            const sec = sectionById[id] || document.getElementById(id);
            if (!sec) return;

            sec.style.display = 'block';
            currentIndex = i;

            // (changed) control top title visibility here
            updateNavTitleFor(id);

            const prevBtn = sec.querySelector('[data-dir="prev"]');
            const nextBtn = sec.querySelector('[data-dir="next"]');
            if (prevBtn) prevBtn.style.display = (i > 0) ? 'inline-block' : 'none';
            if (nextBtn) nextBtn.style.display = (i < COURSE_ORDER.length - 1) ? 'inline-block' : 'none';

            document.querySelector('.content').scrollTo({ top: 0, behavior: 'smooth' });
        }

        function showById(id) {
            const idx = COURSE_ORDER.indexOf(id);
            if (idx !== -1) {
                showSectionByIndex(idx);
            } else {
                // fallback (use only if a section is intentionally outside COURSE_ORDER)
                document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
                const sec = document.getElementById(id);
                if (sec) {
                    sec.style.display = 'block';
                    // (changed) control top title for non-ordered sections too
                    updateNavTitleFor(id);
                }
            }
        }
        /* === Sidebar sync: highlight and scroll active topic/subtopic === */
        function findSidebarElementForId(id) {
            // 1) topic-title whose data-topic-target === id
            const topicTitle = document.querySelector(`.topic-title[data-topic-target="${id}"]`);
            if (topicTitle) return topicTitle;

            // 2) subtopic elements that call showContent('id') in inline onclick
            const subtopics = Array.from(document.querySelectorAll('.subtopic'));
            for (const s of subtopics) {
                const onclick = s.getAttribute('onclick') || '';
                // match showContent('sub2') or showContent("sub2")
                if (onclick.includes(`showContent('${id}')`) || onclick.includes(`showContent("${id}")`)) {
                    return s;
                }
                // also check data-target if you later add it
                if (s.dataset.target === id) return s;
            }

            // 3) fallback: element id inside sidebar (rare)
            const fallback = document.querySelector(`#${id}`);
            if (fallback && fallback.closest('.sidebar')) return fallback;

            return null;
        }

        let allowSidebarSync = false;

        function highlightSidebarFor(id) {
            // collapse all topics and clear active states
            document.querySelectorAll('.topic-box').forEach(tb => {
                tb.classList.remove('open');
                const ul = tb.querySelector('.subtopics');
                const title = tb.querySelector('.topic-title');
                if (ul) ul.style.display = 'none';
                if (title) {
                    title.classList.remove('active');
                    title.setAttribute('aria-expanded', 'false');
                }
                tb.querySelectorAll('.subtopic.active').forEach(s => s.classList.remove('active'));
            });

            const el = findSidebarElementForId(id);
            if (!el) return;

            // If a subtopic was found, also add 'active' to its parent topic-title
            if (el.classList.contains('subtopic')) {
                el.classList.add('active');
                const topicBox = el.closest('.topic-box');
                const title = topicBox ? topicBox.querySelector('.topic-title') : null;
                if (title) {
                    title.classList.add('active');
                    title.setAttribute('aria-expanded', 'true');
                }
                // ensure the parent topic is expanded (in case it was collapsed)
                const sublist = title ? title.nextElementSibling : null;
                if (sublist && sublist.classList.contains('subtopics')) {
                    sublist.style.display = 'block';
                    if (topicBox) topicBox.classList.add('open');
                }
            } else if (el.classList.contains('topic-title')) {
                // topic overview selected
                el.classList.add('active');
                el.setAttribute('aria-expanded', 'true');
                const sub = el.nextElementSibling;
                if (sub && sub.classList.contains('subtopics')) {
                    sub.style.display = 'block';
                    const box = el.closest('.topic-box');
                    if (box) box.classList.add('open');
                }
            }

            // === instant scroll + briefly disable transitions to avoid flicker ===
            const sidebar = document.querySelector('.sidebar');
            if (el && sidebar) {
                // disable transition rules on sidebar and the elements involved
                sidebar.classList.add('no-transition');
                el.classList.add('no-transition');

                // instant scroll (no animation). 'block: nearest' will keep it from forcing to top.
                // Note: not using { behavior: 'smooth' } — default is instant.
                el.scrollIntoView({ block: 'nearest', inline: 'nearest' });

                // re-enable transitions after a short tick (use requestAnimationFrame for reliability)
                requestAnimationFrame(() => {
                    // small timeout to ensure layout settled (50ms is conservative)
                    setTimeout(() => {
                        sidebar.classList.remove('no-transition');
                        el.classList.remove('no-transition');
                    }, 50);
                });
            }
        }

        /* Hook into existing navigation functions so the sidebar follows content changes. */
        (function attachSidebarSync() {
            const origShow = window.showSectionByIndex;
            if (typeof origShow === 'function') {
                window.showSectionByIndex = function (i) {
                    origShow(i);
                    const id = COURSE_ORDER[i];
                    if (allowSidebarSync && id) highlightSidebarFor(id);
                };
            }

            const origShowById = window.showById;
            if (typeof origShowById === 'function') {
                window.showById = function (id) {
                    origShowById(id);
                    if (allowSidebarSync) highlightSidebarFor(id);
                };
            }
        })();

        // Wire Prev/Next (global)
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-dir]');
            if (!btn) return;
            const dir = btn.getAttribute('data-dir');
            if (dir === 'prev' && currentIndex > 0) showSectionByIndex(currentIndex - 1);
            if (dir === 'next' && currentIndex < COURSE_ORDER.length - 1) showSectionByIndex(currentIndex + 1);
        });

        // Wrap showContent to keep index in sync
        (function wrapShowContent() {
            const originalShowContent = window.showContent;
            window.showContent = function (id) {
                showById(id); // keeps Prev/Next correct
                // originalShowContent(id); // not needed; uncomment only for non-ordered sections
            };
        })();

        // Ensure topic title clicks also sync index
        (function wrapToggle() {
            const originalToggle = window.toggleSubtopics;
            window.toggleSubtopics = function (el) {
                if (originalToggle) originalToggle(el);
                const targetId = el?.dataset?.topicTarget;
                const box = el ? el.closest('.topic-box') : null;
                const isOpen = box ? box.classList.contains('open') : false;
                if (targetId && isOpen) showById(targetId);
            };
        })();

        // Initialize on load: show the first section in COURSE_ORDER
        document.addEventListener('DOMContentLoaded', () => {
            showSectionByIndex(0); // updateNavTitleFor('welcome') runs inside
            allowSidebarSync = true;
        });

        

        // QUIZ EMBED START
        

        /* ========= Shared Pyodide runtime (singleton) ========= */
        const USE_BACKEND_RUNNER = true;
        const BACKEND_WS_URL = "ws://localhost:9001/ws/run";
        const BACKEND_TOKEN = "devtoken";
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

        const INPUT_MARKER = "__PROBIOZ_INPUT__";

        function normalizeOutputText(text) {
            return String(text || "").replace(/\n{2,}/g, "\n");
        }

        function appendOutput(outputEl, text) {
            if (!outputEl) return;
            let chunk = normalizeOutputText(text);
            if (outputEl.textContent.endsWith("\n")) {
                chunk = chunk.replace(/^\n+/, "\n");
            }
            const node = document.createTextNode(chunk);
            outputEl.appendChild(node);
        }

        function base64ToBlob(base64, mimeType) {
            const binary = atob(base64 || "");
            const len = binary.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i += 1) bytes[i] = binary.charCodeAt(i);
            return new Blob([bytes], { type: mimeType });
        }

        function extractFileNamesFromCode(code) {
            const text = String(code || "");
            const exts = new Set([
                "txt", "csv", "tsv", "json", "fasta", "fa", "fna", "gb", "gbk", "genbank",
                "xlsx", "xls", "png", "jpg", "jpeg", "gif", "pdf", "svg", "html", "xml", "log"
            ]);
            const names = new Set();
            const re = /["']([^"'\n]+?\.[A-Za-z0-9]{1,5})["']/g;
            let match = null;
            while ((match = re.exec(text)) !== null) {
                const raw = match[1];
                if (!raw || raw.startsWith("http://") || raw.startsWith("https://")) continue;
                const base = raw.split(/[\\/]/).pop();
                if (!base || base === "." || base === "..") continue;
                const parts = base.split(".");
                const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
                if (!exts.has(ext)) continue;
                names.add(base);
            }
            return names;
        }

        function ensureFilesBar(outputEl) {
            if (!outputEl || !outputEl.parentNode) return null;
            let bar = outputEl.parentNode.querySelector(".py-files-bar");
            if (!bar) {
                bar = document.createElement("div");
                bar.className = "py-files-bar";
                outputEl.insertAdjacentElement("afterend", bar);
            }
            return bar;
        }

        function ensurePlotBar(outputEl) {
            if (!outputEl || !outputEl.parentNode) return null;
            let bar = outputEl.parentNode.querySelector(".py-plot-bar");
            if (!bar) {
                bar = document.createElement("div");
                bar.className = "py-plot-bar";
                const filesBar = outputEl.parentNode.querySelector(".py-files-bar");
                if (filesBar) {
                    filesBar.insertAdjacentElement("afterend", bar);
                } else {
                    outputEl.insertAdjacentElement("afterend", bar);
                }
            }
            return bar;
        }

        function getOutputOptions(outputEl) {
            const plotTarget = outputEl?.dataset?.plotTarget || "";
            const hideFiles = outputEl?.dataset?.hideFiles === "true";
            return { plotTarget, hideFiles };
        }

        function applyOutputMode(outputEl) {
            if (!outputEl || !outputEl.parentNode) return;
            const { plotTarget, hideFiles } = getOutputOptions(outputEl);
            const filesBar = outputEl.parentNode.querySelector(".py-files-bar");
            const plotBar = outputEl.parentNode.querySelector(".py-plot-bar");
            if (filesBar) {
                filesBar.style.display = (hideFiles || plotTarget === "external") ? "none" : "";
            }
            if (plotBar) {
                plotBar.style.display = (plotTarget === "external") ? "none" : "";
            }
        }

        function getPlotMimeType(filename) {
            const name = String(filename || "").toLowerCase();
            if (name.endsWith(".png")) return "image/png";
            if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
            if (name.endsWith(".gif")) return "image/gif";
            if (name.endsWith(".pdf")) return "application/pdf";
            return "";
        }

        function openExternalPlot(file, outputEl) {
            if (!file || !file.data_b64) return;
            const mimeType = getPlotMimeType(file.name);
            if (!mimeType) return;
            const blob = base64ToBlob(file.data_b64, mimeType);
            const url = URL.createObjectURL(blob);
            const win = window.open(url, "_blank");
            if (!win) {
                appendOutput(outputEl, "\n[Plot pop-up blocked. Allow pop-ups to view plots.]\n");
            }
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }


        function resetInteractiveOutput(outputEl) {
            if (!outputEl) return;
            if (outputEl.__probiozRunState) {
                const state = outputEl.__probiozRunState;
                if (state.inputSpan && state.inputHandler) {
                    state.inputSpan.removeEventListener("keydown", state.inputHandler);
                }
                if (state.inputSpan && state.inputSpan.parentNode) {
                    state.inputSpan.parentNode.removeChild(state.inputSpan);
                }
                if (state.ws && state.ws.readyState === WebSocket.OPEN) {
                    try { state.ws.close(); } catch (err) { /* ignore */ }
                }
                outputEl.__probiozRunState = null;
            }
            outputEl.__probiozFileWhitelist = null;
            outputEl.textContent = "";
            const bar = outputEl.parentNode ? outputEl.parentNode.querySelector(".py-files-bar") : null;
            if (bar) bar.textContent = "";
            const plotBar = outputEl.parentNode ? outputEl.parentNode.querySelector(".py-plot-bar") : null;
            if (plotBar) plotBar.textContent = "";
            applyOutputMode(outputEl);
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
            inputEl.className = "py-inline-input-field";
            inputEl.name = "py_inline_input";
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

        function runInteractive(code, outputEl, statusEl, onDone) {
            if (!outputEl) return;
            resetInteractiveOutput(outputEl);
            applyOutputMode(outputEl);
            outputEl.__probiozFileWhitelist = extractFileNamesFromCode(code);
            if (statusEl) statusEl.textContent = "Running...";

            const state = { ws: null, inputEl: null, inputHandler: null };
            outputEl.__probiozRunState = state;
            const disableInlineInput = () => {
                if (!outputEl) return;
                if (state.inputEl && state.inputHandler) {
                    state.inputEl.removeEventListener("keydown", state.inputHandler);
                }
                if (state.inputEl && state.inputEl.parentNode) {
                    state.inputEl.parentNode.removeChild(state.inputEl);
                }
                state.inputHandler = null;
                state.inputEl = null;
            };

            const wsUrl = `${BACKEND_WS_URL}?token=${encodeURIComponent(BACKEND_TOKEN)}&sid=${encodeURIComponent(getSessionId())}`;
            const ws = new WebSocket(wsUrl);
            state.ws = ws;

            const cleanup = () => {
                disableInlineInput();
                if (statusEl) statusEl.textContent = "Finished";
                if (typeof onDone === "function") onDone();
            };

            ws.addEventListener("open", () => {
                ws.send(JSON.stringify({ type: "run", code: String(code || "") }));
            });

            ws.addEventListener("message", (event) => {
                let msg = null;
                try {
                    msg = JSON.parse(event.data);
                } catch {
                    return;
                }
                const data = String(msg.data || "");
                if (msg.type === "stderr" && data.includes(INPUT_MARKER)) {
                    const parts = data.split(INPUT_MARKER);
                    const before = parts.shift();
                    const prompt = parts.pop() || "";
                    if (before) appendOutput(outputEl, before);
                    disableInlineInput();
                    const handlers = enableInlineInput(outputEl, prompt.trimEnd(), (value) => {
                        disableInlineInput();
                        ws.send(JSON.stringify({ type: "stdin", data: String(value) }));
                    });
                    if (handlers) {
                        state.inputEl = handlers.inputEl;
                        state.inputHandler = handlers.inputHandler;
                    }
                    return;
                }
                if (msg.type === "files") {
                    const { plotTarget, hideFiles } = getOutputOptions(outputEl);
                    const externalPlot = plotTarget === "external";
                    const showFiles = !hideFiles && !externalPlot;
                    const showInlinePlots = !externalPlot;
                    const allowList = outputEl.__probiozFileWhitelist instanceof Set
                        ? outputEl.__probiozFileWhitelist
                        : null;
                    const listFiles = (msg.files || []).filter((file) => {
                        if (!file || !file.name) return false;
                        if (!allowList || allowList.size === 0) return false;
                        const base = String(file.name).split(/[\\/]/).pop();
                        return allowList.has(base);
                    });

                    let bar = null;
                    let plotBar = null;
                    if (showFiles && listFiles.length) {
                        bar = ensureFilesBar(outputEl);
                        if (bar) {
                            bar.style.display = "";
                            bar.textContent = "Files: ";
                        }
                    } else {
                        const existingBar = outputEl.parentNode?.querySelector(".py-files-bar");
                        if (existingBar) {
                            existingBar.style.display = "none";
                            existingBar.textContent = "";
                        }
                    }
                    if (showInlinePlots) {
                        plotBar = ensurePlotBar(outputEl);
                        if (plotBar) {
                            plotBar.style.display = "";
                            plotBar.textContent = "";
                        }
                    }

                    (msg.files || []).forEach((file, idx) => {
                        if (!file || !file.name) return;
                        const isPng = file.name.toLowerCase().endsWith(".png");
                        const isPlotFile = Boolean(getPlotMimeType(file.name));

                        if (externalPlot && isPlotFile) {
                            openExternalPlot(file, outputEl);
                            return;
                        }

                        if (showFiles && bar) {
                            const base = String(file.name).split(/[\\/]/).pop();
                            if (!allowList || !allowList.has(base)) {
                                return;
                            }
                            if (file.skipped) {
                                const span = document.createElement("span");
                                span.textContent = file.name + " (skipped)";
                                bar.appendChild(span);
                                if (idx < msg.files.length - 1) bar.appendChild(document.createTextNode(" "));
                                return;
                            }
                            const blob = base64ToBlob(file.data_b64 || "", "application/octet-stream");
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = file.name;
                            link.textContent = file.name;
                            link.addEventListener("click", () => setTimeout(() => URL.revokeObjectURL(url), 1000));
                            bar.appendChild(link);
                            if (idx < msg.files.length - 1) bar.appendChild(document.createTextNode(" "));
                        }

                        if (showInlinePlots && plotBar && isPng && file.data_b64) {
                            const img = document.createElement("img");
                            img.alt = file.name;
                            img.src = "data:image/png;base64," + file.data_b64;
                            plotBar.appendChild(img);
                        }
                    });
                    return;
                }
                if (msg.type === "stdout" || msg.type === "stderr") {
                    appendOutput(outputEl, data);
                } else if (msg.type === "exit") {
                    cleanup();
                    ws.close();
                } else if (msg.type === "error") {
                    outputEl.textContent += String(msg.message || "Runner error") + "\n";
                    cleanup();
                    ws.close();
                }
            });

            ws.addEventListener("close", cleanup);
        }

        window.__probiozPyRuntime = window.__probiozPyRuntime || (function () {
            const CDN = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
            let pyodide = null;
            let loadingPromise = null;

            function load() {
                if (pyodide) return Promise.resolve(pyodide);
                if (loadingPromise) return loadingPromise;

                loadingPromise = new Promise((resolve, reject) => {
                    const s = document.createElement('script');
                    s.src = CDN;
                    s.async = true;
                    s.onload = async () => {
                        try {
                            if (typeof self.loadPyodide !== 'function') {
                                throw new Error('pyodide loader not found (self.loadPyodide missing).');
                            }
                            pyodide = await self.loadPyodide({
                                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
                            });
                            console.info('Pyodide loaded.');
                            resolve(pyodide);
                        } catch (err) {
                            console.error('Failed to initialize Pyodide:', err);
                            reject(err);
                        }
                    };
                    s.onerror = () => reject(new Error('Failed to load Pyodide script.'));
                    document.head.appendChild(s);
                });

                loadingPromise.catch(() => { loadingPromise = null; });
                return loadingPromise;
            }

            async function run(userCode) {
                const rt = await load().catch(err => { throw new Error('Pyodide load failed: ' + String(err)); });

                if (!rt || typeof rt.runPythonAsync !== 'function') {
                    throw new Error('Pyodide runtime is not available (runPythonAsync missing).');
                }

                // Safely encode the user code as a Python string literal using JSON.stringify
                // (this ensures quotes/newlines are escaped correctly)
                const userCodeJSON = JSON.stringify(String(userCode || ''));

                const wrapped = `
import sys, io, traceback
buf = io.StringIO()
_old_stdout = sys.stdout
_old_stderr = sys.stderr
sys.stdout = buf
sys.stderr = buf
try:
    code = ${userCodeJSON}
    # Execute user code in an empty globals dict to avoid polluting builtin globals.
    exec(code, {})
except Exception:
    traceback.print_exc()
finally:
    sys.stdout = _old_stdout
    sys.stderr = _old_stderr
buf.getvalue()
`.trim();

                try {
                    const result = await rt.runPythonAsync(wrapped);
                    // Normalize CRLF to LF for consistent UI display
                    return String(result === undefined || result === null ? '' : result).replace(/\r\n/g, '\n');
                } catch (err) {
                    console.error('Error running Python code:', err);
                    throw new Error('Runtime error: ' + (err && err.message ? err.message : String(err)));
                }
            }

            async function ensurePackages(pkgsArray) {
                if (!Array.isArray(pkgsArray) || pkgsArray.length === 0) return;
                const rt = await load().catch(err => { throw new Error('Pyodide load failed: ' + String(err)); });
                const pkgs = pkgsArray.filter(Boolean);
                if (!pkgs.length) return;

                try {
                    await rt.loadPackage(pkgs);
                    return;
                } catch (err) {
                    console.warn('loadPackage failed, falling back to micropip.', err);
                }

                const pkgsJSON = JSON.stringify(pkgs);
                const installCode = `
import micropip
await micropip.install(${pkgsJSON})
`.trim();
                await rt.runPythonAsync(installCode);
            }

            return { load, run, ensurePackages };
        })();

        function initCodeEditors() {
            if (!window.CodeMirror) return {};
            const baseOptions = {
                mode: 'python',
                theme: 'material-darker',
                lineNumbers: true,
                indentUnit: 4,
                tabSize: 4,
                lineWrapping: true
            };
            const editors = {};
            const tryTa = document.getElementById('tryPyEditor');
            if (tryTa) {
                editors.try = CodeMirror.fromTextArea(tryTa, baseOptions);
            }
            const fpTa = document.getElementById('fpEditor');
            if (fpTa) {
                editors.fp = CodeMirror.fromTextArea(fpTa, baseOptions);
            }
            return editors;
        }

        const __probiozEditors = initCodeEditors();
        function getEditorValue(which) {
            const cm = __probiozEditors && __probiozEditors[which];
            if (cm) return cm.getValue();
            const ta = document.getElementById(which === 'try' ? 'tryPyEditor' : 'fpEditor');
            return ta ? ta.value : '';
        }
        function setEditorValue(which, value) {
            const cm = __probiozEditors && __probiozEditors[which];
            if (cm) {
                cm.setValue(value);
                cm.refresh();
                cm.focus();
                return;
            }
            const ta = document.getElementById(which === 'try' ? 'tryPyEditor' : 'fpEditor');
            if (ta) {
                ta.value = value;
                ta.focus();
            }
        }
        function refreshEditor(which) {
            const cm = __probiozEditors && __probiozEditors[which];
            if (cm) cm.refresh();
        }

        function decodeAttr(s) {
            const literalToken = '__PROBIOZ_LITERAL_N__';
            return String(s ?? '')
                .replace(/\r\n/g, '\n')
                .replace(/\r/g, '\n')
                .replace(/\\\\n/g, literalToken)
                .replace(/&#10;/g, '\n')
                .replace(/\\n/g, '\n')
                .replace(new RegExp(literalToken, 'g'), '\\n');
        }

        function detectPackages(code) {
            const pkgs = new Set();
            const pkgMap = {
                pandas: 'pandas',
                numpy: 'numpy',
                matplotlib: 'matplotlib',
                seaborn: 'seaborn',
                bio: 'biopython'
            };
            const lines = String(code || '').split('\n');
            lines.forEach(line => {
                const importMatch = line.match(/^\s*import\s+(.+)$/);
                if (importMatch) {
                    importMatch[1].split(',').forEach(part => {
                        const name = part.trim().split(/\s+as\s+/i)[0];
                        const root = name.split('.')[0].trim();
                        const key = root.toLowerCase();
                        if (pkgMap[key]) pkgs.add(pkgMap[key]);
                    });
                }
                const fromMatch = line.match(/^\s*from\s+([A-Za-z0-9_.]+)\s+import\s+/);
                if (fromMatch) {
                    const root = fromMatch[1].split('.')[0].trim();
                    const key = root.toLowerCase();
                    if (pkgMap[key]) pkgs.add(pkgMap[key]);
                }
            });
            return Array.from(pkgs);
        }

        function applyExampleRunOptions(box, panel, outputEl) {
            if (!box) return;
            const plotTarget = decodeAttr(box.getAttribute('data-plot-target')).trim();
            const hideFiles = decodeAttr(box.getAttribute('data-hide-files')).trim();
            if (panel) {
                if (plotTarget) panel.dataset.plotTarget = plotTarget;
                else delete panel.dataset.plotTarget;
                if (hideFiles) panel.dataset.hideFiles = hideFiles;
                else delete panel.dataset.hideFiles;
            }
            if (outputEl) {
                if (plotTarget) outputEl.dataset.plotTarget = plotTarget;
                else delete outputEl.dataset.plotTarget;
                if (hideFiles) outputEl.dataset.hideFiles = hideFiles;
                else delete outputEl.dataset.hideFiles;
            }
        }

        function applyPanelOutputOptions(panel, outputEl) {
            if (!outputEl) return;
            const plotTarget = panel?.dataset?.plotTarget || "";
            const hideFiles = panel?.dataset?.hideFiles || "";
            if (plotTarget) outputEl.dataset.plotTarget = plotTarget;
            else delete outputEl.dataset.plotTarget;
            if (hideFiles) outputEl.dataset.hideFiles = hideFiles;
            else delete outputEl.dataset.hideFiles;
        }



        /* ========= Try-It modal wiring (opens floating panel with code) ========= */
        (function () {
            const $ = (sel, root = document) => root.querySelector(sel);
            const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
            const status = $('#tryPyStatus'), out = $('#tryPyOutput'), ed = $('#tryPyEditor');
            const modal = $('#tryPyBackdrop'), btnRun = $('#tryPyRun'), btnReset = $('#tryPyReset'), btnClose = $('#tryPyClose');
            let initialCode = '';

            function setStatus(msg) { if (status) status.textContent = msg; }
            function closeModal() { modal.style.display = 'none'; modal.setAttribute('aria-hidden', 'true'); }

            // Wire all .try-python blocks to open the floating panel pre-filled
            $$('.try-python').forEach(box => {
                const copyBtn = $('.btn-copy', box);
                const tryBtn = $('.btn-try', box);
                const snippet = decodeAttr(box.getAttribute('data-code'));
                const base = decodeAttr(box.getAttribute('data-base'));
                const pkgString = decodeAttr(box.getAttribute('data-packages')).trim();
                const finalCode = (base && base.trim() ? base.trim() + '\n\n' : '') + snippet.trim();
                const pkgsArray = pkgString ? pkgString.split(',').map(p => p.trim()).filter(Boolean) : [];


                copyBtn?.addEventListener('click', async () => {
                    try { await navigator.clipboard.writeText(snippet); copyBtn.textContent = 'Copied!'; }
                    catch { copyBtn.textContent = 'Failed'; }
                    setTimeout(() => copyBtn.textContent = 'Copy', 1200);
                });

                tryBtn?.addEventListener('click', async () => {
    const panel = document.getElementById('fabRunPanel');
    const out = document.getElementById('fpOutput');
    const stat = document.getElementById('fpStatus');
    setEditorValue('fp', finalCode.trim());
    if (out) resetInteractiveOutput(out);
    if (panel) {
        panel.style.display = 'block';
        panel.classList.remove('minimized');
        panel.dataset.execCode = finalCode;
        panel.dataset.pkgs = pkgString;
    }
    applyExampleRunOptions(box, panel, out);
    if (stat) stat.textContent = 'Loading Python...';
    try {
        await window.__probiozPyRuntime.load();
        if (pkgsArray.length) {
            if (stat) stat.textContent = 'Loading packages...';
            await window.__probiozPyRuntime.ensurePackages(pkgsArray);
        }
        if (stat) stat.textContent = 'Ready';
    } catch {
        if (stat) stat.textContent = 'Load error';
    }
    refreshEditor('fp');
});
            });

            btnClose.addEventListener('click', closeModal);
            btnReset?.addEventListener('click', () => { setEditorValue('try', initialCode); resetInteractiveOutput(out); });

            btnRun?.addEventListener('click', async () => {
                resetInteractiveOutput(out);
                btnRun.disabled = true; btnRun.textContent = 'Running...';
                if (USE_BACKEND_RUNNER) {
                    runInteractive(getEditorValue('try'), out, status, () => {
                        btnRun.disabled = false;
                        btnRun.textContent = 'Run >';
                    });
                    return;
                }
                try {
                    const result = await window.__probiozPyRuntime.run(getEditorValue('try'));
                    out.textContent = result || '(no output)';
                } catch (err) {
                    out.textContent = String(err);
                } finally {
                    btnRun.disabled = false; btnRun.textContent = 'Run ▶';
                }
            });

            window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(); });
        })();
        /* =========================
            EXAMPLES: load data-code into visible code block and wire Copy/Try
            - data-code should have escaped newlines \\n in the attribute; we convert to real \n
            - also handle common HTML-entity newline (&#10;) if present
               ========================= */
        (function examplesInit() {
            const boxes = Array.from(document.querySelectorAll('.try-python'));
            boxes.forEach(box => {
                const raw = decodeAttr(box.getAttribute('data-code')).trim();
                const base = decodeAttr(box.getAttribute('data-base'));
                const pkgString = decodeAttr(box.getAttribute('data-packages')).trim();
                const finalCode = (base && base.trim() ? base.trim() + '\n\n' : '') + raw;
                const pkgsArray = pkgString ? pkgString.split(',').map(p => p.trim()).filter(Boolean) : [];

                // find or create code element to display formatted code
                let codeBlock = box.querySelector('.example-code code');
                if (!codeBlock) {
                    const wrapper = document.createElement('div'); wrapper.className = 'example-code';
                    codeBlock = document.createElement('code');
                    wrapper.appendChild(codeBlock);
                    box.appendChild(wrapper);
                }
                codeBlock.textContent = raw.trim();
                codeBlock.classList.add('language-python');
                if (window.hljs && typeof window.hljs.highlightElement === 'function') {
                    window.hljs.highlightElement(codeBlock);
                }

                const copyBtn = box.querySelector('.btn-copy');
                const tryBtn = box.querySelector('.btn-try');

                copyBtn?.addEventListener('click', async () => {
                    try { await navigator.clipboard.writeText(raw); copyBtn.textContent = 'Copied!'; }
                    catch { copyBtn.textContent = 'Failed'; }
                    setTimeout(() => copyBtn.textContent = 'Copy', 1200);
                });

                tryBtn?.addEventListener('click', async () => {
    const panel = document.getElementById('fabRunPanel');
    const out = document.getElementById('fpOutput');
    const stat = document.getElementById('fpStatus');
    setEditorValue('fp', finalCode.trim());
    if (out) resetInteractiveOutput(out);
    if (panel) {
        panel.style.display = 'block';
        panel.classList.remove('minimized');
        panel.dataset.execCode = finalCode;
        panel.dataset.pkgs = pkgString;
    }
    applyExampleRunOptions(box, panel, out);
    if (stat) stat.textContent = 'Loading Python...';
    try {
        await window.__probiozPyRuntime.load();
        if (pkgsArray.length) {
            if (stat) stat.textContent = 'Loading packages...';
            await window.__probiozPyRuntime.ensurePackages(pkgsArray);
        }
        if (stat) stat.textContent = 'Ready';
    } catch {
        if (stat) stat.textContent = 'Load error';
    }
    refreshEditor('fp');
});
            });
        })();
        (function highlightAllCodeBlocks() {
            if (!window.hljs || typeof window.hljs.highlightElement !== 'function') return;
            document.querySelectorAll('.example-code code').forEach(code => {
                if (!code.classList.contains('language-python')) code.classList.add('language-python');
                window.hljs.highlightElement(code);
            });
        })();


        // Floating action button panel
        (function () {
            const DEFAULT_FP_CODE = 'print("Hello,Welcome to probioz")';
            const fab = document.getElementById('fab-runpy');
            const panel = document.getElementById('fabRunPanel');
            const dragHandle = document.getElementById('fpDragHandle');

            const out = document.getElementById('fpOutput');
            const btnRun = document.getElementById('fpRunBtn');
            const btnCopy = document.getElementById('fpCopyBtn');
            const btnClose = document.getElementById('fpCloseBtn');
            const btnMin = document.getElementById('fpMinBtn');
            const btnMax = document.getElementById('fpMaxBtn');
            const status = document.getElementById('fpStatus');
            const btnReset = document.getElementById('fpResetBtn');
            let lastRect = null;
            let lastMaxRect = null;
            let state = "normal";
            let restoreFromMinimize = false;

            const setStatus = (m) => { if (status) status.textContent = m; };
            const ensureRuntime = () => {
                setStatus('Loading Python…');
                return window.__probiozPyRuntime.load()
                    .then(() => setStatus('Ready'))
                    .catch(() => setStatus('Load error'));
            };

            fab.addEventListener('click', async () => {
                panel.style.display = 'block';
                panel.classList.remove('minimized', 'maximized', 'snapped-left', 'snapped-right');
                panel.style.left = '';
                panel.style.top = '';
                panel.style.right = '';
                panel.style.bottom = '';
                panel.style.width = '';
                panel.style.height = '';
                state = "normal";
                restoreFromMinimize = false;
                updateMaxIcon();
                setEditorValue('fp', DEFAULT_FP_CODE);
                if (out) resetInteractiveOutput(out);
                panel.dataset.execCode = '';
                panel.dataset.pkgs = '';
                delete panel.dataset.plotTarget;
                delete panel.dataset.hideFiles;
                if (out) {
                    delete out.dataset.plotTarget;
                    delete out.dataset.hideFiles;
                }
                refreshEditor('fp');
                await ensureRuntime();
            });

            btnClose.addEventListener('click', () => { panel.style.display = 'none'; });
            let lastNonMinState = "normal";
            btnMin.addEventListener('click', () => {
                if (panel.classList.contains('minimized')) {
                    panel.classList.remove('minimized');
                    restoreFromMinimize = true;
                    setState("maximized");
                    return;
                }
                lastNonMinState = state;
                if (state === "normal") {
                    saveRect();
                    if (lastRect) {
                        lastMaxRect = { left: lastRect.left, width: lastRect.width };
                    }
                }
                if (state === "maximized") {
                    const rect = panel.getBoundingClientRect();
                    lastMaxRect = { left: rect.left + 'px', width: rect.width + 'px' };
                }
                panel.classList.add('minimized');
                panel.style.right = '10px';
                panel.style.top = '100px';
                panel.style.left = 'auto';
                panel.style.bottom = 'auto';
                panel.style.width = 'auto';
                panel.style.height = 'auto';
                panel.classList.remove('maximized', 'snapped-left', 'snapped-right');
            });
            btnMax.addEventListener('click', () => {
                if (panel.classList.contains('minimized')) {
                    panel.classList.remove('minimized');
                    restoreFromMinimize = true;
                    setState("maximized");
                    return;
                }
                if (state === "maximized") {
                    setState("normal");
                    restoreRect();
                    return;
                }
                saveRect();
                setState("maximized");
            });

            btnCopy.addEventListener('click', async () => {
                try { await navigator.clipboard.writeText(getEditorValue('fp')); btnCopy.textContent = 'Copied!'; }
                catch { btnCopy.textContent = 'Failed'; }
                setTimeout(() => btnCopy.textContent = 'Copy', 1200);
            });

            btnReset.addEventListener('click', () => {
                setEditorValue('fp', DEFAULT_FP_CODE);
                if (out) resetInteractiveOutput(out);
                panel.dataset.execCode = '';
                panel.dataset.pkgs = '';
                delete panel.dataset.plotTarget;
                delete panel.dataset.hideFiles;
                if (out) {
                    delete out.dataset.plotTarget;
                    delete out.dataset.hideFiles;
                }
            });

            btnRun.addEventListener('click', async () => {
                applyPanelOutputOptions(panel, out);
                resetInteractiveOutput(out);
                if (USE_BACKEND_RUNNER) {
                    btnRun.disabled = true;
                    btnRun.textContent = 'Running...';
                    const execCode = panel.dataset.execCode;
                    const codeToRun = execCode && execCode.trim() ? execCode : getEditorValue('fp');
                    runInteractive(codeToRun, out, status, () => {
                        btnRun.disabled = false;
                        btnRun.textContent = 'Run >';
                    });
                    return;
                }
                btnRun.disabled = true; btnRun.textContent = 'Running...';
                try {
                    const execCode = panel.dataset.execCode;
                    const codeToRun = execCode && execCode.trim() ? execCode : getEditorValue('fp');
                    const dataPkgs = (panel.dataset.pkgs || '').split(',').map(p => p.trim()).filter(Boolean);
                    const codePkgs = detectPackages(codeToRun);
                    const pkgs = Array.from(new Set([...dataPkgs, ...codePkgs]));
                    if (pkgs.length) {
                        setStatus('Loading packages...');
                        await window.__probiozPyRuntime.ensurePackages(pkgs);
                        setStatus('Ready');
                    }
                    const result = await window.__probiozPyRuntime.run(codeToRun);
                    out.textContent = result || '(no output)';
                } catch (e) {
                    out.textContent = String(e);
                } finally {
                    btnRun.disabled = false; btnRun.textContent = 'Run ▶';
                }
            });

            function saveRect() {
                if (!panel) return;
                const rect = panel.getBoundingClientRect();
                lastRect = {
                    left: panel.style.left || rect.left + 'px',
                    top: panel.style.top || rect.top + 'px',
                    width: panel.style.width || rect.width + 'px',
                    height: panel.style.height || rect.height + 'px'
                };
            }

            function restoreRect() {
                if (!panel || !lastRect) return;
                panel.style.left = lastRect.left;
                panel.style.top = lastRect.top;
                panel.style.width = lastRect.width;
                panel.style.height = lastRect.height;
                panel.style.right = 'auto';
                panel.style.bottom = 'auto';
            }

            function setState(newState) {
                panel.classList.remove('maximized', 'snapped-left', 'snapped-right');
                if (newState === "maximized") {
                    const rect = panel.getBoundingClientRect();
                    if (!restoreFromMinimize) {
                        lastMaxRect = { left: rect.left + 'px', width: rect.width + 'px' };
                    }
                    const maxRect = restoreFromMinimize && lastMaxRect ? lastMaxRect : { left: rect.left + 'px', width: rect.width + 'px' };
                    panel.classList.add(newState);
                    panel.classList.remove('minimized');
                    panel.style.left = maxRect.left;
                    panel.style.width = maxRect.width;
                    panel.style.right = 'auto';
                    panel.style.top = '';
                    panel.style.bottom = '';
                    panel.style.height = '';
                } else if (newState !== "normal") {
                    panel.classList.add(newState);
                    panel.classList.remove('minimized');
                    panel.style.left = '';
                    panel.style.top = '';
                    panel.style.width = '';
                    panel.style.height = '';
                    panel.style.right = '';
                    panel.style.bottom = '';
                }
                state = newState;
                restoreFromMinimize = false;
                updateMaxIcon();
            }

            function updateMaxIcon() {
                if (!btnMax) return;
                if (state === "maximized") {
                    btnMax.textContent = '❐';
                    btnMax.title = 'Restore';
                    btnMax.setAttribute('aria-label', 'Restore');
                    return;
                }
                btnMax.textContent = '⛶';
                btnMax.title = 'Maximize';
                btnMax.setAttribute('aria-label', 'Maximize');
            }

            // Drag to move
            (function dragger() {
                let dragging = false, startX, startY, startLeft, startTop;
                function onDown(e) {
                    dragging = true;
                    const rect = panel.getBoundingClientRect();
                    startLeft = rect.left; startTop = rect.top;
                    startX = e.clientX; startY = e.clientY;
                    document.addEventListener('mousemove', onMove);
                    document.addEventListener('mouseup', onUp);
                }
                function onMove(e) {
                    if (!dragging) return;
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    const newLeft = startLeft + dx;
                    const newTop = startTop + dy;
                    const maxLeft = window.innerWidth - panel.offsetWidth - 10;
                    const maxTop = window.innerHeight - panel.offsetHeight - 10;
                    panel.style.left = Math.max(10, Math.min(newLeft, maxLeft)) + 'px';
                    panel.style.top = Math.max(10, Math.min(newTop, maxTop)) + 'px';
                    panel.style.right = 'auto';
                    panel.style.bottom = 'auto';
                }
                function onUp() {
                    dragging = false;
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                    const rect = panel.getBoundingClientRect();
                    if (rect.left < 20) {
                        saveRect();
                        setState("snapped-left");
                    } else if (rect.right > window.innerWidth - 20) {
                        saveRect();
                        setState("snapped-right");
                    }
                }
                dragHandle.addEventListener('mousedown', onDown);
            })();

            // Resize from any edge
            (function edgeResizer() {
                const edges = panel.querySelectorAll('.resize-edge');
                if (!edges.length) return;

                let resizing = false, edge = null;
                let startX, startY, startW, startH, startLeft, startTop;
                const MIN_W = 360, MIN_H = 200, MARGIN = 10;

                function onDown(e) {
                    panel.style.left = panel.getBoundingClientRect().left + 'px';
                    panel.style.top = panel.getBoundingClientRect().top + 'px';
                    panel.style.right = 'auto';
                    panel.style.bottom = 'auto';
                    const rect = panel.getBoundingClientRect();
                    resizing = true;
                    edge = e.currentTarget.getAttribute('data-edge');
                    startX = e.clientX; startY = e.clientY;
                    startW = rect.width; startH = rect.height;
                    startLeft = rect.left; startTop = rect.top;
                    document.addEventListener('mousemove', onMove);
                    document.addEventListener('mouseup', onUp);
                    e.preventDefault();
                }
                function onMove(e) {
                    if (!resizing) return;
                    let dx = e.clientX - startX;
                    let dy = e.clientY - startY;
                    let newW = startW, newH = startH, newLeft = startLeft, newTop = startTop;

                    if (edge === 'right') newW = Math.max(MIN_W, startW + dx);
                    else if (edge === 'left') { newW = Math.max(MIN_W, startW - dx); newLeft = startLeft + dx; }

                    if (edge === 'bottom') newH = Math.max(MIN_H, startH + dy);
                    else if (edge === 'top') { newH = Math.max(MIN_H, startH - dy); newTop = startTop + dy; }

                    const maxLeft = window.innerWidth - newW - MARGIN;
                    const maxTop = window.innerHeight - newH - MARGIN;

                    newLeft = Math.max(MARGIN, Math.min(newLeft, maxLeft));
                    newTop = Math.max(MARGIN, Math.min(newTop, maxTop));

                    panel.style.width = newW + 'px';
                    panel.style.height = newH + 'px';
                    panel.style.left = newLeft + 'px';
                    panel.style.top = newTop + 'px';
                    panel.style.right = 'auto';
                    panel.style.bottom = 'auto';
                }
                function onUp() {
                    resizing = false;
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                }
                edges.forEach(h => h.addEventListener('mousedown', onDown));
                updateMaxIcon();
                (function () {
                    // LEFT hamburger => toggle sidebar overlay (mobile)
                    (function () {
                        const leftHamb = document.querySelector('.hamburger-left');
                        const sidebar = document.querySelector('.sidebar');

                        if (!leftHamb || !sidebar) return;

                        function closeSidebar() {
                            sidebar.classList.remove('open');
                            leftHamb.setAttribute('aria-expanded', 'false');
                            sidebar.setAttribute('aria-hidden', 'false');
                        }

                        leftHamb.addEventListener('click', (e) => {
                            // toggle open class which the CSS listens to (overlay slide)
                            const opened = sidebar.classList.toggle('open');
                            leftHamb.setAttribute('aria-expanded', opened ? 'true' : 'false');

                            // For accessibility: set aria-hidden accordingly
                            sidebar.setAttribute('aria-hidden', opened ? 'false' : 'true');
                        });

                        document.addEventListener('click', (e) => {
                            if (!sidebar.classList.contains('open')) return;
                            if (e.target.closest('.sidebar') || e.target.closest('.hamburger-left')) return;
                            if (e.target.closest('.content') || e.target.closest('.rightbar')) {
                                closeSidebar();
                            }
                        });

                        // Ensure resizing to large screen clears overlay state
                        window.addEventListener('resize', () => {
                            if (window.innerWidth > 980 && sidebar.classList.contains('open')) {
                                closeSidebar();
                            }
                        });

                        // Optional: allow ESC key to close sidebar (helpful for keyboard users) � remove if you don't want it
                        document.addEventListener('keydown', (e) => {
                            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                                closeSidebar();
                            }

                        });
                    })();

                    // RIGHT nav: close the top nav menu when clicking outside it (so clicking content closes it)
                    (function () {
                        const rightHamb = document.querySelector('.hamburger'); // your existing top-nav toggle
                        const navMenu = document.getElementById('navMenu');

                        // If you already toggle navMenu via hamburger (existing code), add a global click-to-close:
                        document.addEventListener('click', (e) => {
                            // If navMenu isn't open, nothing to do.
                            if (!navMenu || !navMenu.classList.contains('show')) return;

                            // If click is inside navMenu or on the top hamburger, ignore
                            if (e.target.closest('#navMenu') || e.target.closest('.hamburger')) return;

                            // Click was outside: close it
                            navMenu.classList.remove('show');
                            const topHamb = document.querySelector('.hamburger');
                            if (topHamb) topHamb.setAttribute('aria-expanded', 'false');
                        });

                    })();
                    document.addEventListener("DOMContentLoaded", () => {
                        const current = "python.html"; // this page

                        document.querySelectorAll(".subject-bar a").forEach(a => {
                            if (a.getAttribute("href").includes(current)) {
                                a.classList.add("active");
                            }
                        });
                    });


                })();
            })();

            document.addEventListener('keydown', (e) => {
                if (!panel || getComputedStyle(panel).display === 'none') return;
                if (e.altKey && e.key === 'ArrowLeft') {
                    e.preventDefault();
                    if (state === "normal") saveRect();
                    setState("snapped-left");
                    return;
                }
                if (e.altKey && e.key === 'ArrowRight') {
                    e.preventDefault();
                    if (state === "normal") saveRect();
                    setState("snapped-right");
                    return;
                }
                if (e.altKey && e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (state !== "maximized") {
                        saveRect();
                        setState("maximized");
                    }
                    return;
                }
                if (e.key === 'Escape' && (state === "maximized" || state === "snapped-left" || state === "snapped-right")) {
                    e.preventDefault();
                    setState("normal");
                    restoreRect();
                }
            });

        })();
        /*
    Universal wheel handler:
    - If the pointer is over .sidebar, .content or .rightbar -> allow normal scrolling (do nothing).
    - If pointer is over .nav or .subject (or anywhere else) -> prevent default scrolling.
    - Works for mouse wheel and touchpad (wheel event). We attach with {passive:false} so we can preventDefault().
    */

        (function () {
            const scrollables = ['.sidebar', '.content', '.rightbar', '#fabRunPanel', '.subject-bar'];
            const nonScrollables = ['.nav', '.subject'];

            function isInsideSelector(el, selectors) {
                if (!el) return false;
                for (const sel of selectors) {
                    if (el.closest && el.closest(sel)) return true;
                }
                return false;
            }

            // Wheel handler
            document.addEventListener('wheel', function (e) {
                // figure out element under the pointer
                const target = document.elementFromPoint(e.clientX, e.clientY);

                // if over a scrollable panel: allow the event to go through so that panel scrolls
                if (isInsideSelector(target, scrollables)) {
                    return; // allow native scrolling
                }

                // if over header areas (nav/subject) — explicitly prevent scrolling
                if (isInsideSelector(target, nonScrollables)) {
                    e.preventDefault();
                    return;
                }
                if (target && target.closest('.resize-edge')) {
                    return; // allow resizing
                }

                // otherwise (e.g. body/background), prevent default page scroll too
                // If you'd like the page to still scroll when not on any panel, comment out preventDefault here.
                e.preventDefault();
            }, { passive: false });

            // Touch move fallback for touch devices (optional)
            document.addEventListener('touchmove', function (e) {
                const touch = e.touches[0];
                if (!touch) return;
                const target = document.elementFromPoint(touch.clientX, touch.clientY);

                if (isInsideSelector(target, scrollables)) {
                    return; // allow panel scrolling
                }

                if (isInsideSelector(target, nonScrollables)) {
                    e.preventDefault();
                    return;
                }
                if (target && target.closest('.resize-edge')) {
                    return; // allow resizing
                }

                // block page scroll outside panels (optional)
                e.preventDefault();
            }, { passive: false });
        })();
        QuizEngine.mount(document.querySelector('#E1 .py-exercise-quiz'), 'python:Introduction', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#E2 .py-exercise-quiz'), 'python:Variables', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#E3 .py-exercise-quiz'), 'python:DataTypes', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#E4 .py-exercise-quiz'), 'python:Strings', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#E5 .py-exercise-quiz'), 'python:Operators', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#E6 .py-exercise-quiz'), 'python:Lists', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#E7 .py-exercise-quiz'), 'python:Tuple', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#E8 .py-exercise-quiz'), 'python:Sets', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#E9 .py-exercise-quiz'), 'python:Dictionaries', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX10 .py-exercise-quiz'), 'python:Decision Making', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX11 .py-exercise-quiz'), 'python:Match', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX12 .py-exercise-quiz'), 'python:Loops', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX13 .py-exercise-quiz'), 'python:Functions', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX14 .py-exercise-quiz'), 'python:File Handling', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX15 .py-exercise-quiz'), 'python:Biopython', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX16 .py-exercise-quiz'), 'python:Seq Parsing', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX17 .py-exercise-quiz'), 'python:d-p', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX18 .py-exercise-quiz'), 'python:NCBI and BLAST', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX19 .py-exercise-quiz'), 'python:Visualization', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX20 .py-exercise-quiz'), 'python:Pandas', { hideMoveNext: true });
        QuizEngine.mount(document.querySelector('#EX21 .py-exercise-quiz'), 'python:Advance', { hideMoveNext: true });
