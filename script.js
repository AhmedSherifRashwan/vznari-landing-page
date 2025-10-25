/*
  script.js
  Contains interactive behaviour for the VIZNARI landing page:
  - Smooth scrolling for in‑page navigation
  - IntersectionObserver to animate elements on scroll
*/

// Smooth scroll for anchor links within the page
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('#mainNavbar .nav-link[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      // Only handle on-page anchors
      const targetID = this.getAttribute('href');
      if (targetID && targetID.startsWith('#')) {
        const target = document.querySelector(targetID);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          // Collapse the navbar on small screens after clicking
          const navbarToggler = document.querySelector('.navbar-toggler');
          const navbarCollapse = document.getElementById('navbarNav');
          if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
            navbarToggler.click();
          }
        }
      }
    });
  });

  // IntersectionObserver to reveal elements on scroll
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.2,
  };
  const revealOnScroll = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealOnScroll.observe(el));
});