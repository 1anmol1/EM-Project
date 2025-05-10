// js/script.js
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const mainContent = document.querySelector('main'); // To push content down

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents click from immediately closing menu via document listener
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // For animating the hamburger icon itself

            // Optional: Add a class to body to prevent scrolling when menu is open
            // document.body.classList.toggle('no-scroll');

            // Push main content down if header is fixed and nav-links are absolutely positioned
            if (navLinks.classList.contains('active') && getComputedStyle(navLinks).position === 'absolute') {
                const navHeight = navLinks.offsetHeight;
                // This might be needed if your header doesn't account for dropdown space
                // mainContent.style.marginTop = navHeight + 'px';
            } else if (mainContent) {
                // mainContent.style.marginTop = '0px';
            }
        });
    }

    // Close menu when a link is clicked
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    // document.body.classList.remove('no-scroll');
                    // if (mainContent) mainContent.style.marginTop = '0px';
                }
            });
        });
    }

    // Close menu if clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks && navLinks.contains(event.target);
        const isClickOnHamburger = hamburger && hamburger.contains(event.target);

        if (navLinks && navLinks.classList.contains('active') && !isClickInsideNav && !isClickOnHamburger) {
            navLinks.classList.remove('active');
            if (hamburger) {
                 hamburger.classList.remove('active');
            }
            // document.body.classList.remove('no-scroll');
            // if (mainContent) mainContent.style.marginTop = '0px';
        }
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});