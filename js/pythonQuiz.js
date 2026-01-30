
        window.QUESTIONS_BY_TOPIC = window.QUIZ_DATA?.QUESTIONS_BY_TOPIC || {};
        const $ = (sel, root = document) => root.querySelector(sel);
        const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

        /* ================================
    SIDEBAR HAMBURGER TOGGLE (FIX)
       ================================ */

            // LEFT SIDEBAR
            (function () {
                const btnLeft = document.querySelector('.hamburger-left');
                const sidebarLeft = document.querySelector('.sidebarLeft');

                if (btnLeft && sidebarLeft) {
                    btnLeft.addEventListener('click', (e) => {
                        e.stopPropagation();
                        sidebarLeft.classList.toggle('open');

                        // close right sidebar if open
                        document.querySelector('.sidebarRight')?.classList.remove('open');
                    });
                }
            })();

            // RIGHT SIDEBAR
            (function () {
                const btnRight = document.querySelector('.hamburger-right');
                const sidebarRight = document.querySelector('.sidebarRight');

                if (btnRight && sidebarRight) {
                    btnRight.addEventListener('click', (e) => {
                        e.stopPropagation();
                        sidebarRight.classList.toggle('open');

                        // close left sidebar if open
                        document.querySelector('.sidebarLeft')?.classList.remove('open');
                    });
                }
            })();

            // CLOSE SIDEBARS WHEN CLICKING OUTSIDE
            document.addEventListener('click', (e) => {
                const left = document.querySelector('.sidebarLeft');
                const right = document.querySelector('.sidebarRight');

                if (
                    !e.target.closest('.sidebarLeft') &&
                    !e.target.closest('.hamburger-left')
                ) {
                    left?.classList.remove('open');
                }

                if (
                    !e.target.closest('.sidebarRight') &&
                    !e.target.closest('.hamburger-right')
                ) {
                    right?.classList.remove('open');
                }
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
            /* popuu message for side bar */
            function showmsg(topic) {
                    const backdrop = document.getElementById('simple-backdrop');
                    const body = document.getElementById('simple-body');
                    const title = document.getElementById('simple-title');

                    title.textContent = "Coming Soon 🚧";

                    if (topic === 'perl') {
                        body.textContent = "Perl programming quizzes will be added soon.";
                    } else if (topic === 'ml') {
                        body.textContent = "Machine Learning quizzes are under development.";
                    } else if (topic === 'r') {
                        body.textContent = "R programming quizzes are coming soon.";
                    } else {
                        body.textContent = "This section is under preparation.";
                    }

                    backdrop.style.display = "grid";
                }
            document.getElementById('simple-close')?.addEventListener('click', () => {
    document.getElementById('simple-backdrop').style.display = "none";
});

document.getElementById('simple-ok')?.addEventListener('click', () => {
    document.getElementById('simple-backdrop').style.display = "none";
});


            
        /* =========================================================
        COURSE ORDER (used for Prev / Next navigation)
           ========================================================= */
        const COURSE_ORDER = [
            'python:Introduction',
            'python:Variables',
            'python:DataTypes',
            'python:Strings',
            'python:Operators',
            'python:Lists',
            'python:Tuple',
            'python:Sets',
            'python:Dictionaries',
            'python:Decision Making',
            'python:Match',
            'python:Loops',
            'python:Functions',
            'python:File Handling',
            'python:Biopython',
            'python:Seq Parsing',
            'python:d-p',
            'python:NCBI and BLAST',
            'python:Visualization',
            'python:Pandas'
        ];

        let currentIndex = 0;
        const legacyLoadQuestionsFor = window.loadQuestionsFor;

        function updateTitlesForTopic(key) {
            const top = document.getElementById('top-title');
            const sub = document.getElementById('sub-title');

            if (top) top.textContent = key.split(':')[0]?.toUpperCase() || 'Topic';
            if (sub) sub.textContent = key.includes(':') ? key.split(':')[1] : '';
        }

        function initQuizForTopic(key) {
            const container = document.querySelector('#exercise-container');

            if (window.QuizEngine && typeof QuizEngine.mount === 'function') {
                QuizEngine.mount(container, key, { hideMoveNext: false });
            } else if (typeof legacyLoadQuestionsFor === 'function') {
                legacyLoadQuestionsFor(key);
            } else {
                console.error('No quiz initializer found: QuizEngine.mount or loadQuestionsFor');
            }

            updateTitlesForTopic(key);
        }


        /* =========================================================
        SIDEBAR CLICK COMPATIBILITY FIX
        (HTML uses loadQuestionFor, JS uses loadQuestionsFor)
           ========================================================= */
        function loadQuestionFor(key) {
            const params = new URLSearchParams(location.search);
            params.set('topic', key);
            history.replaceState(null, '', location.pathname + '?' + params.toString());

            if (!window.QUESTIONS_BY_TOPIC[key]) {
                showmsg('comingsoon');
                return;
            }

            const idx = COURSE_ORDER.indexOf(key);
            if (idx >= 0) currentIndex = idx;

            initQuizForTopic(key);
            highlightSidebarFor(key);
        }

        function loadQuestionsFor(key) {
            loadQuestionFor(key);
        }

        /* =========================================================
        CORE NAVIGATION
           ========================================================= */
        function showById(id) {
            if (!id) return;
            loadQuestionFor(id);
        }

        function showSectionByIndex(i) {
                while (i >= 0 && i < COURSE_ORDER.length) {
                    const key = COURSE_ORDER[i];
                    if (window.QUESTIONS_BY_TOPIC[key]) {
                        showById(key);
                        return;
                    }
                    i += (i > currentIndex ? 1 : -1);
                }
            }

        /* =========================================================
        SIDEBAR HIGHLIGHT (HTML-COMPATIBLE)
           ========================================================= */
        function highlightSidebarFor(id) {
            $$('.topic-title.active').forEach(el => el.classList.remove('active'));

            const els = $$('.topic-title');
            for (const el of els) {
                const onclick = el.getAttribute('onclick') || '';
                if (onclick.includes(`'${id}'`) || onclick.includes(`"${id}"`)) {
                    el.classList.add('active');
                    el.scrollIntoView({ block: 'nearest',behavior: 'smooth' });
                    break;
                }
            }
        }

        /* =========================================================
        PREV / NEXT BUTTON HANDLER
           ========================================================= */
        document.addEventListener('click', e => {
            const btn = e.target.closest('[data-dir]');
            if (!btn) return;

            const dir = btn.getAttribute('data-dir');
            if (dir === 'prev') showSectionByIndex(currentIndex - 1);
            if (dir === 'next') showSectionByIndex(currentIndex + 1);
        });

        /* =========================================================
        AUTO LOAD DEFAULT
           ========================================================= */
        document.addEventListener('DOMContentLoaded', () => {
            const params = new URLSearchParams(location.search);
            let topic = params.get('topic') || 'python:Introduction';
            if (!window.QUESTIONS_BY_TOPIC[topic]) topic = 'python:Introduction';
            loadQuestionFor(topic);
        });
