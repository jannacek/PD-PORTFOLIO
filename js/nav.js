/* ═══════════════════════════════════════════════════════════════════════════
   NAV — Sidebar active state, theme toggle, mobile menu, scroll spy
   Agustín Martínez Caram PD Portfolio
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ───────────────────────────────────────────────────────────────────────
     1. HIGHLIGHT CURRENT PAGE IN SIDEBAR
     ─────────────────────────────────────────────────────────────────────── */

  function initializeActiveLink() {
    const currentPath = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      // Extract filename from href
      const linkPath = href.split('/').pop();
      // Match current page
      if (linkPath === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ───────────────────────────────────────────────────────────────────────
     2. MOBILE HAMBURGER MENU
     ─────────────────────────────────────────────────────────────────────── */

  function initializeHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (!hamburger || !sidebar) return;

    function toggleMenu() {
      const isOpen = sidebar.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      if (overlay) overlay.classList.toggle('open', isOpen);
    }

    function closeMenu() {
      sidebar.classList.remove('open');
      hamburger.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
    }

    // Hamburger button click
    hamburger.addEventListener('click', toggleMenu);

    // Overlay click to close
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });

    // Close menu when clicking nav links on mobile
    document.querySelectorAll('#sidebar .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          closeMenu();
        }
      });
    });
  }

  /* ───────────────────────────────────────────────────────────────────────
     3. SCROLL SPY FOR IN-PAGE SECTION ANCHORS
     ─────────────────────────────────────────────────────────────────────── */

  function initializeScrollSpy() {
    const sections = document.querySelectorAll('.page-section[id]');

    // Only apply scroll spy if there are multiple sections
    if (sections.length <= 1) {
      return;
    }

    const navLinks = document.querySelectorAll('.nav-link');
    const observerOptions = {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove active from all nav links
          navLinks.forEach(link => link.classList.remove('active'));

          // Find matching nav link for this section
          const sectionId = entry.target.id;
          const matchingLink = Array.from(navLinks).find(link => {
            const href = link.getAttribute('href');
            return href === `#${sectionId}` || href.endsWith(`#${sectionId}`);
          });

          if (matchingLink) {
            matchingLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  /* ───────────────────────────────────────────────────────────────────────
     INITIALIZATION
     ─────────────────────────────────────────────────────────────────────── */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeActiveLink();
      initializeHamburger();
      initializeScrollSpy();
    });
  } else {
    initializeActiveLink();
    initializeHamburger();
    initializeScrollSpy();
  }
})();
