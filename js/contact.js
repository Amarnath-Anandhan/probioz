
        document.addEventListener("DOMContentLoaded", () => {

            /* Mobile menu toggle */
            const hamburger = document.querySelector(".hamburger");
            const navLinks = document.querySelector(".nav-links");
            if (hamburger) {
                hamburger.addEventListener("click", () => {
                    navLinks.classList.toggle("show");
                });
            }

            /* Active link highlight */
            const here = location.pathname.split('/').pop();
            document.querySelectorAll(".nav-links a").forEach(link => {
                if (link.getAttribute("href") === here) link.classList.add("active");
            });

        });
        document.addEventListener("DOMContentLoaded", () => {
            const form = document.getElementById("contactForm");
            const toast = document.getElementById("toast");
            const submitBtn = document.getElementById("submitBtn");
            
        form.addEventListener("keydown", (e) => {
                if (e.key !== "Enter") return;

                // Allow Enter inside textarea
                if (e.target.tagName === "TEXTAREA") return;

                e.preventDefault();

                const fields = Array.from(
                    form.querySelectorAll("input, select, textarea")
                ).filter(el => !el.disabled && el.type !== "hidden");

                const index = fields.indexOf(e.target);

                if (index > -1 && index < fields.length - 1) {
                    fields[index + 1].focus();
                }
            });

            //submit handler-------------
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                // Clear old errors
                document.querySelectorAll(".error").forEach(el => el.textContent = "");

                const name = form.querySelector('[name="name"]');
                const email = form.querySelector('[name="email"]');
                const message = form.querySelector('[name="message"]');

                let valid = true;

                if (!name.value.trim()) {
                    document.getElementById("err-name").textContent = "Please enter your name.";
                    valid = false;
                }

                if (
                    !email.value.trim() ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
                ) {
                    document.getElementById("err-email").textContent = "Enter a valid email address.";
                    valid = false;
                }

                if (!message.value.trim()) {
                    document.getElementById("err-message").textContent = "Please write your message.";
                    valid = false;
                }

                if (!valid) return;

                // ---- UI feedback ----
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending…";

                toast.classList.add("show");

                // ---- backend submit ----
                setTimeout(() => form.submit(), 50);

                // ---- reset ----
                setTimeout(() => {
                    toast.classList.remove("show");
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Send message";
                }, 3000);
            });
            
        });
