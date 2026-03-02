/* ============================================
   Portfolio — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ──────────────────────
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Mobile nav toggle ─────────────────────────
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('open');
        });
    });

    // ── Smooth scroll for anchor links ────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Intersection Observer — scroll animations ─
    const grids = document.querySelectorAll(
        '.research-grid, .projects-grid, .teaching-grid, .contact-links, .publications-list, .about-grid'
    );
    grids.forEach(grid => grid.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // ── Active nav highlight ──────────────────────
    const sections = document.querySelectorAll('.section, .hero');
    const navItems = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        let current = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            item.classList.toggle('active',
                item.getAttribute('href') === `#${current}`
            );
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

});
