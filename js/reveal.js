/* ==========================================================================
   Finsera — scroll reveal. Fades/slides sections in as they enter view.
   Adds .reveal to a curated set of below-the-fold blocks, then toggles
   .reveal-in via IntersectionObserver. No-JS users keep content visible.
   ========================================================================== */
(function () {
  'use strict';

  // Respect reduced motion: leave everything visible, do nothing.
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  } catch (e) {}

  var SELECTORS = [
    // Home
    '.pain__head', '.pain__grid', '.pain__bridge',
    '.sol__head', '.sol__box', '.diag', '.method__step',
    '.demo__head', '.demo__row', '.cases__head', '.cases__viewport', '.cta__box',
    // Over
    '.over-band__inner', '.over-team__head', '.over-card', '.over-quote__inner', '.over-cta',
    // Cases
    '.cs-card', '.cs-note',
    // Blog
    '.bl-empty',
    // Contact
    '.ct-card'
  ];

  var nodes = [];
  SELECTORS.forEach(function (sel) {
    var found = document.querySelectorAll(sel);
    for (var i = 0; i < found.length; i++) {
      if (nodes.indexOf(found[i]) === -1) nodes.push(found[i]);
    }
  });
  if (!nodes.length) return;

  // Apply hidden state synchronously (before paint) to avoid a flash.
  nodes.forEach(function (el) { el.classList.add('reveal'); });

  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything.
    nodes.forEach(function (el) { el.classList.add('reveal-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  nodes.forEach(function (el) { io.observe(el); });
})();
