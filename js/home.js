
        // Mobile nav toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.getElementById('navMenu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                const open = navMenu.classList.toggle('show');
                hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
        }
        // SLIDING CUROSAL

        document.addEventListener("DOMContentLoaded", () => {
            const track = document.querySelector(".gist_track");
            if (!track) return;
            const container = track.closest(".gist_cont");
            const cloneCount = 2;
            const originals = Array.from(track.children).filter(el => !el.dataset.clone);
            if (originals.length <= cloneCount) return;

            if (!track.dataset.cloned) {
                const headClones = originals.slice(0, cloneCount).map(el => {
                    const clone = el.cloneNode(true);
                    clone.dataset.clone = "true";
                    return clone;
                });
                const tailClones = originals.slice(-cloneCount).map(el => {
                    const clone = el.cloneNode(true);
                    clone.dataset.clone = "true";
                    return clone;
                });
                tailClones.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));
                headClones.forEach(clone => track.appendChild(clone));
                track.dataset.cloned = "true";
            }

            const panels = Array.from(track.children);
            let step = 0;
            let panelWidth = 0;
            const isMobile = () => window.matchMedia("(max-width: 600px)").matches;

            // start with first original panel active
            let activeIndex = cloneCount;
            let mobileIndex = 0;

            function measureStep() {
                const activePanel = track.querySelector(".panels.active");
                const measureTarget = activePanel || panels.find(p => !p.dataset.clone) || panels[0];
                if (!measureTarget) return;
                const panelRect = measureTarget.getBoundingClientRect();
                const gap = parseFloat(getComputedStyle(track).gap) || 0;
                panelWidth = panelRect.width;
                step = panelRect.width + gap;
            }

            function updateTransform() {
                if (isMobile()) {
                    track.style.transform = "translateX(0px)";
                    return;
                }
                const activePanel = panels[activeIndex] || panels[0];
                if (!activePanel) return;
                const containerRect = container.getBoundingClientRect();
                const panelOffset = activePanel.offsetLeft;
                const panelW = activePanel.offsetWidth || panelWidth || step;
                const centerOffset = (containerRect.width - panelW) / 2;
                track.style.transform = `translateX(${centerOffset - panelOffset}px)`;
            }

            function syncMobileIndex() {
                const raw = activeIndex - cloneCount;
                const normalized = ((raw % originals.length) + originals.length) % originals.length;
                mobileIndex = normalized;
            }

            function applyMobileClasses() {
                syncMobileIndex();
                originals.forEach((p, i) => {
                    p.className = "panels";
                    if (i === mobileIndex) {
                        p.classList.add("mobile-active");
                    }
                });
            }

            function applyClasses() {
                if (isMobile()) {
                    applyMobileClasses();
                    return;
                }
                panels.forEach(p => {
                    p.className = "panels";
                    p.style.setProperty("--mobile-shift", "0px");
                });

                const center = activeIndex;

                if (panels[center]) {
                    panels[center].classList.add("active");
                }
                if (panels[center - 1]) {
                    panels[center - 1].classList.add("left");
                }
                if (panels[center + 1]) {
                    panels[center + 1].classList.add("right");
                }
            }
            function slideNext() {
                if (isMobile()) {
                    const prevIndex = mobileIndex;
                    mobileIndex = (mobileIndex - 1 + originals.length) % originals.length;
                    activeIndex = cloneCount + mobileIndex;

                    const prev = originals[prevIndex];
                    const next = originals[mobileIndex];
                    if (!next) return;

                    originals.forEach(p => p.classList.remove("mobile-active", "mobile-exit"));
                    if (prev && prev !== next) {
                        prev.classList.add("mobile-exit");
                    }
                    next.classList.add("mobile-active");

                    setTimeout(() => {
                        if (prev) prev.classList.remove("mobile-exit");
                    }, 800);
                    return;
                }
                activeIndex--;

                track.style.transition = "transform 0.8s ease";
                updateTransform();

                applyClasses();

                // when we reach clone area ?+' snap back invisibly
                if (activeIndex <= cloneCount - 1) {
                    setTimeout(() => {
                        track.style.transition = "none";
                        activeIndex = cloneCount + originals.length - 1;
                        updateTransform();
                        applyClasses();
                    }, 800);
                }
            }

            applyClasses();
            measureStep();
            updateTransform();
            let autoTimer = null;
            const startAuto = () => {
                if (!autoTimer) {
                    autoTimer = setInterval(slideNext, 2000);
                }
            };
            const stopAuto = () => {
                if (autoTimer) {
                    clearInterval(autoTimer);
                    autoTimer = null;
                }
            };

            startAuto();
            window.addEventListener("resize", () => {
                measureStep();
                updateTransform();
                applyClasses();
            });
        });






        // Set active nav link automatically by path (optional enhancement)
        (function highlightActive() {
            const links = document.querySelectorAll('.nav-links a');
            const here = location.pathname.split('/').pop() || 'home.html';
            links.forEach(a => {
                const target = a.getAttribute('href');
                if (target === here) a.classList.add('active');
            });
        })();
        (function () {
            const art = document.querySelector('.hero-art');
            const canvas = document.querySelector('.bio-canvas');
            if (!art || !canvas) return;
            const ctx = canvas.getContext('2d', { alpha: true });

            let w, h, dpr, particles = [], rafId = null, reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            function resize() {
                dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
                w = canvas.clientWidth; h = canvas.clientHeight;
                canvas.width = Math.floor(w * dpr);
                canvas.height = Math.floor(h * dpr);
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                spawnParticles();
            }

            function rand(a, b) { return Math.random() * (b - a) + a; }

            function spawnParticles() {
                const count = Math.max(16, Math.floor(w * h / 35000)); // responsive density
                particles = [];
                for (let i = 0; i < count; i++) {
                    particles.push({
                        x: rand(0, w),
                        y: rand(0, h),
                        r: rand(2, 5.5),              // radius
                        s: rand(0.2, 0.9),            // speed
                        a: rand(0, Math.PI * 2),        // angle
                        t: rand(0, 360),              // twinkle phase
                        hue: rand(205, 225),          // cool biotech blue
                        sat: rand(60, 85),
                        glow: rand(0.25, 0.6)
                    });
                }
            }

            function drawParticle(p) {
                // twinkle + micro pulsation
                p.t += 0.8;
                const tw = 0.6 + 0.4 * Math.sin(p.t * Math.PI / 180);
                const r = p.r * (0.9 + 0.12 * Math.sin((p.t + 30) * Math.PI / 180));

                // nucleus + membrane look with gradient
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.2);
                g.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${65}%, ${0.65 * tw})`);
                g.addColorStop(0.5, `hsla(${p.hue}, ${p.sat - 15}%, ${55}%, ${0.35 * tw})`);
                g.addColorStop(1, `hsla(${p.hue}, ${p.sat - 25}%, ${48}%, 0)`);

                ctx.beginPath();
                ctx.fillStyle = g;
                ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
                ctx.fill();

                // nucleus dot
                ctx.beginPath();
                ctx.fillStyle = `hsla(${p.hue}, 90%, 92%, ${0.9 * tw})`;
                ctx.arc(p.x - r * 0.2, p.y - r * 0.2, Math.max(1, r * 0.6), 0, Math.PI * 2);
                ctx.fill();

                // glow
                ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, ${p.glow})`;
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, 0.18)`;
                ctx.arc(p.x, p.y, r * 1.4, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            function step() {
                ctx.clearRect(0, 0, w, h);
                // faint grid for futurism
                ctx.save();
                ctx.globalAlpha = 0.06;
                const grid = 32;
                ctx.strokeStyle = '#0b3d91';
                ctx.lineWidth = 1;
                for (let x = 0; x < w; x += grid) {
                    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
                }
                for (let y = 0; y < h; y += grid) {
                    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
                }
                ctx.restore();

                // particles
                particles.forEach(p => {
                    // motion (gentle drift + slight vertical buoyancy)
                    p.x += Math.cos(p.a) * p.s * 0.6;
                    p.y += Math.sin(p.a) * p.s * 0.6 + Math.sin((p.t + p.x) * 0.01) * 0.1;

                    // wrap
                    if (p.x < -10) p.x = w + 10;
                    if (p.x > w + 10) p.x = -10;
                    if (p.y < -10) p.y = h + 10;
                    if (p.y > h + 10) p.y = -10;

                    drawParticle(p);
                });

                rafId = requestAnimationFrame(step);
            }

            // tilt parallax
            let tiltX = 0, tiltY = 0, targetX = 0, targetY = 0;
            function onMove(e) {
                const rect = art.getBoundingClientRect();
                const mx = (e.clientX - rect.left) / rect.width;
                const my = (e.clientY - rect.top) / rect.height;
                targetX = (mx - 0.5) * 10; // deg
                targetY = (0.5 - my) * 10;
            }
            function lerp(a, b, t) { return a + (b - a) * t; }
            function updateTilt() {
                tiltX = lerp(tiltX, targetX, 0.08);
                tiltY = lerp(tiltY, targetY, 0.08);
                art.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
                requestAnimationFrame(updateTilt);
            }

            // init
            const init = () => {
                resize();
                if (!reduceMotion) {
                    step();
                    art.addEventListener('mousemove', onMove);
                    updateTilt();
                }
            };
            window.addEventListener('resize', resize);
            window.addEventListener('load', init);
        })();

        document.addEventListener('DOMContentLoaded', () => {
            const overlay = document.querySelector('.reviews-overlay');
            const modal = overlay?.querySelector('.reviews-modal');
            if (!overlay || !modal) return;

            const openButtons = document.querySelectorAll('[data-open="reviews"]');
            const closeTop = overlay.querySelector('.reviews-close-top');
            const closeBottom = overlay.querySelector('.reviews-close-bottom');
            let previousOverflow = '';

            const openModal = () => {
                overlay.classList.add('is-open');
                overlay.setAttribute('aria-hidden', 'false');
                previousOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
            };

            const closeModal = () => {
                overlay.classList.remove('is-open');
                overlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = previousOverflow;
            };

            openButtons.forEach(button => button.addEventListener('click', openModal));
            if (closeTop) closeTop.addEventListener('click', closeModal);
            if (closeBottom) closeBottom.addEventListener('click', closeModal);

            overlay.addEventListener('click', (event) => {
                if (event.target === overlay) closeModal();
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
                    closeModal();
                }
            });

            const manualOverlay = document.querySelector('.manual-overlay');
            const manualModal = manualOverlay?.querySelector('.manual-modal');
            if (manualOverlay && manualModal) {
                const manualOpenButtons = document.querySelectorAll('[data-open="manual"]');
                const manualCloseTop = manualOverlay.querySelector('.manual-close-top');
                const manualCloseBottom = manualOverlay.querySelector('.manual-close-bottom');
                let manualPrevOverflow = '';

                const openManual = () => {
                    manualOverlay.classList.add('is-open');
                    manualOverlay.setAttribute('aria-hidden', 'false');
                    manualPrevOverflow = document.body.style.overflow;
                    document.body.style.overflow = 'hidden';
                };

                const closeManual = () => {
                    manualOverlay.classList.remove('is-open');
                    manualOverlay.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = manualPrevOverflow;
                };

                manualOpenButtons.forEach(button => button.addEventListener('click', openManual));
                if (manualCloseTop) manualCloseTop.addEventListener('click', closeManual);
                if (manualCloseBottom) manualCloseBottom.addEventListener('click', closeManual);
                manualOverlay.addEventListener('click', (event) => {
                    if (event.target === manualOverlay) closeManual();
                });
                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape' && manualOverlay.classList.contains('is-open')) {
                        closeManual();
                    }
                });
            }

            const reviewCards = Array.from(overlay.querySelectorAll('.review-card'));
            const reviewsTrack = document.querySelector('.showcase-track[data-track="reviews"]');
            const reviewsDots = document.querySelector('#reviewsShowcase .showcase-controls .dots');
            if (!reviewsTrack || !reviewsDots || reviewCards.length === 0) return;

            const buildStars = (rating) => {
                const stars = document.createElement('div');
                stars.className = 'review-stars ReviewStore';
                stars.setAttribute('aria-label', `${rating} out of 5 stars`);
                for (let i = 1; i <= 5; i++) {
                    const star = document.createElement('span');
                    star.className = 'review-star';
                    if (i <= rating) {
                        star.classList.add('is-filled');
                    }
                    star.innerHTML = '&#9733;';
                    stars.appendChild(star);
                }
                return stars;
            };

            const getRating = (card) => {
                const dataRating = parseInt(card.getAttribute('data-rating'), 10);
                if (!Number.isNaN(dataRating) && dataRating > 0) return dataRating;
                const filled = card.querySelectorAll('.review-stars .review-star.is-filled').length;
                if (filled) return filled;
                const total = card.querySelectorAll('.review-stars .review-star').length;
                return total || 5;
            };

            const getAvatarNode = (card, name) => {
                const avatar = document.createElement('div');
                avatar.className = 'review-avatar ReviewAvatar';
                const source = card.querySelector('.review-avatar');
                const img = source?.querySelector('img');
                if (img) {
                    const clone = img.cloneNode(true);
                    clone.removeAttribute('width');
                    clone.removeAttribute('height');
                    avatar.appendChild(clone);
                    return avatar;
                }
                const fallbackText = source?.textContent?.trim() || name.slice(0, 1);
                avatar.textContent = fallbackText.slice(0, 2);
                return avatar;
            };

            const buildSnippet = (text) => {
                const cleaned = text.trim();
                const maxLen = 120;
                if (cleaned.length <= maxLen) return cleaned;
                return `${cleaned.slice(0, maxLen - 3).trim()}...`;
            };

            const DOT_COUNT = 5;

            const createFixedDots = (container, labelPrefix, dataDotValue) => {
                container.innerHTML = '';
                for (let i = 0; i < DOT_COUNT; i++) {
                    const dot = document.createElement('button');
                    dot.className = 'dot';
                    if (i === 0) dot.classList.add('active');
                    dot.type = 'button';
                    dot.setAttribute('aria-label', `${labelPrefix} ${i + 1}`);
                    dot.setAttribute('data-dot', dataDotValue);
                    dot.setAttribute('data-index', i.toString());
                    container.appendChild(dot);
                }
            };

            reviewsTrack.innerHTML = '';
            reviewsDots.innerHTML = '';

            reviewCards.forEach((card, index) => {
                const name = card.querySelector('.review-name')?.textContent?.trim() || 'Reviewer';
                const text = card.querySelector('.review-text')?.textContent?.trim() || '';
                const role = card.querySelector('.review-role')?.textContent?.trim() || '';
                const rating = Math.min(Math.max(getRating(card), 1), 5);

                const slide = document.createElement('div');
                slide.className = 'showcase-slide';

                const slideCard = document.createElement('div');
                slideCard.className = 'review-slide-card';

                const header = document.createElement('div');
                header.className = 'review-slide-header';

                const avatar = getAvatarNode(card, name);
                const nameEl = document.createElement('div');
                nameEl.className = 'review-name ReviewName';
                nameEl.textContent = name;

                header.appendChild(avatar);
                header.appendChild(nameEl);
                header.appendChild(buildStars(rating));

                const roleEl = document.createElement('div');
                roleEl.className = 'review-role role';
                roleEl.textContent = role;

                const textEl = document.createElement('div');
                textEl.className = 'review-text';
                textEl.textContent = buildSnippet(text);

                slideCard.appendChild(header);
                if (role) slideCard.appendChild(roleEl);
                slideCard.appendChild(textEl);
                slide.appendChild(slideCard);
                reviewsTrack.appendChild(slide);

            });

            createFixedDots(reviewsDots, 'Review slide', 'reviews');

            const reviewSlides = Array.from(reviewsTrack.children);
            let reviewIndex = 0;
            let autoTimer = null;

            const updateDots = () => {
                const dots = reviewsDots.querySelectorAll('.dot');
                const maxIndex = Math.max(reviewSlides.length - 1, 1);
                const activeDot = Math.round((reviewIndex * (DOT_COUNT - 1)) / maxIndex);
                dots.forEach((dot, idx) => dot.classList.toggle('active', idx === activeDot));
            };

            const setReviewSlide = (index) => {
                if (reviewSlides.length === 0) return;
                reviewIndex = (index + reviewSlides.length) % reviewSlides.length;
                reviewsTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
                updateDots();
            };

            const resetAuto = () => {
                if (autoTimer) clearInterval(autoTimer);
                if (reviewSlides.length > 1) {
                    autoTimer = setInterval(() => {
                        setReviewSlide(reviewIndex + 1);
                    }, 3000);
                }
            };

            const reviewsNext = document.querySelector('.showcase-next[data-next="reviews"]');
            if (reviewsNext) {
                reviewsNext.addEventListener('click', () => {
                    setReviewSlide(reviewIndex + 1);
                    resetAuto();
                });
            }

            reviewsDots.addEventListener('click', (event) => {
                const target = event.target.closest('.dot');
                if (!target) return;
                const idx = parseInt(target.getAttribute('data-index'), 10);
                if (!Number.isNaN(idx)) {
                    const maxIndex = Math.max(reviewSlides.length - 1, 1);
                    const mappedIndex = Math.round((idx * maxIndex) / (DOT_COUNT - 1));
                    setReviewSlide(mappedIndex);
                    resetAuto();
                }
            });

            setReviewSlide(0);
            resetAuto();

            const manualTrack = document.querySelector('.showcase-track[data-track="manual"]');
            const manualDots = document.querySelector('#manualShowcase .showcase-controls .dots');
            const manualNext = document.querySelector('.showcase-next[data-next="manual"]');
            if (!manualTrack || !manualDots) return;

            const manualSlides = Array.from(manualTrack.children);
            let manualIndex = 0;
            let manualTimer = null;

            createFixedDots(manualDots, 'Manual slide', 'manual');

            const setManualSlide = (index) => {
                if (manualSlides.length === 0) return;
                manualIndex = (index + manualSlides.length) % manualSlides.length;
                manualTrack.style.transform = `translateX(-${manualIndex * 100}%)`;
                const maxIndex = Math.max(manualSlides.length - 1, 1);
                const activeDot = Math.round((manualIndex * (DOT_COUNT - 1)) / maxIndex);
                manualDots.querySelectorAll('.dot').forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === activeDot);
                });
            };

            manualDots.addEventListener('click', (event) => {
                const target = event.target.closest('.dot');
                if (!target) return;
                const idx = parseInt(target.getAttribute('data-index'), 10);
                if (!Number.isNaN(idx)) {
                    const maxIndex = Math.max(manualSlides.length - 1, 1);
                    const mappedIndex = Math.round((idx * maxIndex) / (DOT_COUNT - 1));
                    setManualSlide(mappedIndex);
                }
            });

            if (manualNext) {
                manualNext.addEventListener('click', () => {
                    setManualSlide(manualIndex + 1);
                });
            }

            const resetManualAuto = () => {
                if (manualTimer) clearInterval(manualTimer);
                if (manualSlides.length > 1) {
                    manualTimer = setInterval(() => {
                        setManualSlide(manualIndex + 1);
                    }, 5000);
                }
            };

            setManualSlide(0);
            resetManualAuto();
        });
    