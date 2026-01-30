
        // Mobile nav toggle (like Home)
        (function () {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.getElementById('navMenu');
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    const open = navMenu.classList.toggle('show');
                    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
                });
            }
            // Active link highlight by path (fallback to current)
            const links = document.querySelectorAll('.nav-links a');
            const here = location.pathname.split('/').pop() || 'courses.html';
            links.forEach(a => { if (a.getAttribute('href') === here) a.classList.add('active'); });
        })();

        // Search + filter (your original logic)
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const typeFilter = document.getElementById('typeFilter');
        const cards = Array.from(document.querySelectorAll('.card'));

        function applyFilters() {
            const q = (searchInput.value || '').trim().toLowerCase();
            const type = typeFilter.value;
            cards.forEach(card => {
                const title = (card.dataset.title || '').toLowerCase();
                const cardType = card.dataset.type;
                const matchesQ = !q || title.includes(q);
                const matchesType = type === 'all' || cardType === type;
                card.style.display = (matchesQ && matchesType) ? 'flex' : 'none';
            });
        }

        searchBtn.addEventListener('click', applyFilters);
        searchInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') applyFilters(); });
        typeFilter.addEventListener('change', applyFilters);
        applyFilters(); // initial
