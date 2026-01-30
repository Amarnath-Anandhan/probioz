
        document.addEventListener('DOMContentLoaded', () => {
            // mobile menu
            const burger = document.querySelector('.hamburger');
            const menu = document.getElementById('navMenu');
            if (burger && menu) {
                burger.addEventListener('click', () => {
                    const open = menu.classList.toggle('show');
                    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
                });
            }
            // active link
            const here = location.pathname.split('/').pop() || 'home.html';
            document.querySelectorAll('.nav-links a').forEach(a => {
                if (a.getAttribute('href') === here) a.classList.add('active');
            });
        });
