/**
 * Shaifly Navbar Framework
 * Handles smooth scroll, glassmorphism, and scroll effects globally.
 */

(function () {
    // 1. Inject Dynamic Navbar CSS
    const navbarStyles = `
        .sticky-top {
            z-index: 1080 !important;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            background: #ffffff !important;
        }

        .navbar-hidden {
            transform: translateY(-100%);
        }

        .navbar {
            padding: 0.8rem 0 !important;
            background: #ffffff !important;
            border-bottom: 1px solid #eeeeee !important;
            box-shadow: none !important;
        }

        .nav-link {
            font-weight: 600 !important;
            color: #333 !important;
            margin: 0 10px !important;
            transition: color 0.3s !important;
        }

        .nav-link:hover, 
        .nav-link.active {
            color: #198754 !important;
        }

        .navbar-toggler {
            border: 1px solid #ddd !important;
        }

        html {
            scroll-behavior: smooth;
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = navbarStyles;
    document.head.appendChild(styleSheet);

    // 2. Initialize Smart Navbar & Rebranding
    function initNavbar() {
        const nav = document.querySelector('.navbar');
        const header = document.querySelector('.sticky-top');
        if (!nav || !header) return;

        // Global Rebranding Hook
        const brandText = nav.querySelector('.navbar-brand span, .navbar-brand');
        // No change needed if user wants Shaifly everywhere.
        // If anything, we would replace Shaifly with Shaifly here, but better to fix HTML.

        // Smart Scroll Logic
        let lastScrollTop = 0;
        window.addEventListener('scroll', function () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scroll Down - Hide
                header.classList.add('navbar-hidden');
            } else {
                // Scroll Up or At Top - Show
                header.classList.remove('navbar-hidden');
            }
            lastScrollTop = scrollTop;
        });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initNavbar();
    } else {
        document.addEventListener('DOMContentLoaded', initNavbar);
    }
})();
