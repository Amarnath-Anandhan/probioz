
        function goToPythonQuiz() {
            window.location.href = "pythonQuiz.html";
        }
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

