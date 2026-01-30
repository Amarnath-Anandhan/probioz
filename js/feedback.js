
            // Defer DOM access until ready
            document.addEventListener('DOMContentLoaded', () => {
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
                // Form logic
                const form = document.getElementById('feedbackForm');
                const msg = document.getElementById('message');
                const counter = document.getElementById('msgCount');
                const toast = document.getElementById('toast');
                const maxChars = 1000;

                // live counter
                function updateCount() {
                    const len = msg.value.length;
                    counter.textContent = `${len}/${maxChars}`;
                }
                msg.addEventListener('input', updateCount);
                updateCount();

                // rating
                const ratingRadios = [...document.querySelectorAll('input[name="rating"]')];
                // simple validation
                function validate() {
                    let ok = true;
                    // clear errors
                    document.querySelectorAll('.error').forEach(e => e.textContent = '');

                    const name = document.getElementById('name');
                    const email = document.getElementById('email');
                    const topic = document.getElementById('topic');
                    const consent = document.getElementById('consent');

                    if (!name.value.trim()) {
                        document.getElementById('err-name').textContent = 'Please enter your name.';
                        ok = false;
                    }
                    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                        document.getElementById('err-email').textContent = 'Please enter a valid email.';
                        ok = false;
                    }
                    if (!topic.value) {
                        document.getElementById('err-topic').textContent = 'Please pick a topic.';
                        ok = false;
                    }
                    if (!ratingRadios.some(r => r.checked)) {
                        document.getElementById('err-rating').textContent = 'Please select a rating.';
                        ok = false;
                    }
                    if (!msg.value.trim()) {
                        document.getElementById('err-message').textContent = 'Please write your feedback.';
                        ok = false;
                    }
                    if (!consent.checked) {
                        document.getElementById('err-consent').textContent = 'Please agree to the terms.';
                        ok = false;
                    }
                    return ok;
                }
                // Prevent Enter key from submitting the form
                form.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                        e.preventDefault();

                        // Move focus to next input/select/textarea
                        const inputs = Array.from(
                            form.querySelectorAll('input, select, textarea')
                        ).filter(el => !el.disabled && el.type !== 'hidden');

                        const index = inputs.indexOf(e.target);
                        if (index > -1 && inputs[index + 1]) {
                            inputs[index + 1].focus();
                        }
                    }
                });

                //submit handler
            form.addEventListener('submit', (e) => {
                    e.preventDefault(); // stop browser auto-submit

                    // VALIDATION FIRST
                    if (!validate()) return;

                    const submitBtn = form.querySelector('button[type="submit"]');
                    submitBtn.disabled = true;
                    submitBtn.textContent = "Submitting…";

                    // Show toast immediately
                    toast.textContent = "Thank you! Your feedback was submitted.";
                    toast.classList.add('show');

                    // Submit to Apps Script (this DOES NOT re-trigger submit event)
                    setTimeout(() => {
                        form.submit();
                    }, 50);

                    // UI cleanup
                    setTimeout(() => {
                        toast.classList.remove('show');
                        form.reset();
                        updateCount();
                        submitBtn.disabled = false;
                        submitBtn.textContent = "Submit feedback";
                    }, 3000);
                });


            });
