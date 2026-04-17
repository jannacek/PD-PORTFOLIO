/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATIONS — IntersectionObserver scroll reveals and lab-specific effects
   Agustín Martínez Caram PD Portfolio
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ───────────────────────────────────────────────────────────────────────
     1. REVEAL ELEMENTS (fade up on scroll)
     ─────────────────────────────────────────────────────────────────────── */

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  /* ───────────────────────────────────────────────────────────────────────
     2. REVEAL-STAGGER CONTAINER (cascaded children reveal)
     ─────────────────────────────────────────────────────────────────────── */

  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('.reveal-stagger').forEach(el => {
    staggerObserver.observe(el);

    // For elements already visible on page load (above the fold),
    // mark them as visible immediately
    if (el.getBoundingClientRect().top < window.innerHeight * 1.4) {
      el.classList.add('visible');
    }
  });

  /* ───────────────────────────────────────────────────────────────────────
     3. FEED-FORWARD ANIMATION (line + text + arrow sequenced reveal)
     ─────────────────────────────────────────────────────────────────────── */

  const feedForwardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          feedForwardObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4
    }
  );

  document.querySelectorAll('.feed-forward').forEach(el => {
    feedForwardObserver.observe(el);
  });

  /* ───────────────────────────────────────────────────────────────────────
     4. DRAW-UNDERLINE ANIMATION (line drawing under text)
     ─────────────────────────────────────────────────────────────────────── */

  const drawUnderlineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          drawUnderlineObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  document.querySelectorAll('.draw-underline').forEach(el => {
    drawUnderlineObserver.observe(el);
  });

  /* ───────────────────────────────────────────────────────────────────────
     5. AT-LAB IV ACT-ITEM ANIMATION (atmospheric items reveal)
     ─────────────────────────────────────────────────────────────────────── */

  const actItemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          actItemObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -20px 0px'
    }
  );

  document.querySelectorAll('[data-lab="4"] .act-item').forEach(el => {
    actItemObserver.observe(el);
  });

  /* ───────────────────────────────────────────────────────────────────────
     6. BOUNDARY CONCEPT SEQUENCE ANIMATION (BC sequence pulsing)
     ─────────────────────────────────────────────────────────────────────── */

  function initBCSequence() {
    const bcSequence = document.querySelector('.bc-sequence');
    if (!bcSequence) return;

    // Add animating class after a small delay on page load
    setTimeout(() => {
      bcSequence.classList.add('animating');
    }, 800);
  }

  /* ───────────────────────────────────────────────────────────────────────
     7. AT-LAB I BIOSIGNAL PULSES (orb animations)
     ─────────────────────────────────────────────────────────────────────── */

  function initBioSignalPulses() {
    const bioOrbRings = document.querySelectorAll('.bio-orb-ring, .bio-orb-ring-2');
    // Bio orbs are already animated via CSS keyframes (bio-pulse, bio-pulse-ring)
    // This function ensures they're present and ready
    if (bioOrbRings.length > 0) {
      // Orbs will automatically animate via CSS
    }
  }

  /* ───────────────────────────────────────────────────────────────────────
     8. STAGGER HELPER FOR ABOVE-FOLD ITEMS
     ─────────────────────────────────────────────────────────────────────── */

  function initAboveFoldStagger() {
    document.querySelectorAll('.reveal-stagger').forEach(container => {
      // If container is above fold, mark children as visible immediately
      if (container.getBoundingClientRect().top < window.innerHeight) {
        // Children should already have been marked visible by the observer
        // but this ensures no animation glitch for items already in viewport
        const children = container.querySelectorAll('*');
        children.forEach(child => {
          const style = window.getComputedStyle(child);
          // Only mark as visible if it's not going to be animated by other logic
          if (style.opacity !== '0') {
            child.classList.add('visible');
          }
        });
      }
    });
  }

  /* ───────────────────────────────────────────────────────────────────────
     INITIALIZATION
     ─────────────────────────────────────────────────────────────────────── */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initBCSequence();
      initBioSignalPulses();
      initAboveFoldStagger();
    });
  } else {
    initBCSequence();
    initBioSignalPulses();
    initAboveFoldStagger();
  }
})();
