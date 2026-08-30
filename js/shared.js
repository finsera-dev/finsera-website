/* ==========================================================================
   Finsera — shared nav/footer i18n + language toggle + mobile menu.
   Pages set window.FINSERA_PAGE = { nl:{...}, en:{...} } before loading this.
   ========================================================================== */
(function () {
  'use strict';

  var SHARED = {
    nl: {
      navHome: 'Home', navOver: 'Over ons', navDiensten: 'Diensten', navCases: 'Cases', navBlog: 'Blog', navCta: 'Plan een kennismaking',
      cta: 'Vraag de diagnose aan',
      footTagline: 'Een schaalbaar fundament voor jouw complete bedrijfsvoering.',
      footCta: 'Neem contact op',
      footDesc: 'Van de juiste stuurgetallen en maatwerk datastructuren tot gerichte AI-automatisering voor het snelgroeiende MKB.',
      footNav: 'Navigatie', footRights: 'Alle rechten voorbehouden.', footPrivacy: 'Privacyverklaring',
      ctaWho: 'Je spreekt direct met Öner of Tomas.'
    },
    en: {
      navHome: 'Home', navOver: 'About us', navDiensten: 'Services', navCases: 'Cases', navBlog: 'Blog', navCta: 'Book an intro call',
      cta: 'Request the diagnosis',
      footTagline: 'A scalable foundation for your entire operation.',
      footCta: 'Get in touch',
      footDesc: 'From the right steering figures and bespoke data structures to targeted AI automation for fast-growing mid-market companies.',
      footNav: 'Navigation', footRights: 'All rights reserved.', footPrivacy: 'Privacy policy',
      ctaWho: 'You’ll speak directly with Öner or Tomas.'
    }
  };

  function $all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  var lang = (function () {
    try { return localStorage.getItem('finsera-lang') || 'nl'; } catch (e) { return 'nl'; }
  })();

  var PAGE = window.FINSERA_PAGE || { nl: {}, en: {} };

  function dict() {
    var s = SHARED[lang] || SHARED.nl;
    var p = PAGE[lang] || PAGE.nl || {};
    var out = {};
    for (var k in s) out[k] = s[k];
    for (var j in p) out[j] = p[j];
    return out;
  }

  window.FINSERA_applyLang = function () {
    document.documentElement.lang = (lang === 'en') ? 'en' : 'nl-NL';
    var d = dict();
    $all('[data-i18n]').forEach(function (el) {
      var v = d[el.getAttribute('data-i18n')];
      if (v != null) el.textContent = v;
    });
    $all('.lang-toggle__btn').forEach(function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-lang') === lang);
    });
    if (typeof window.FINSERA_onLang === 'function') window.FINSERA_onLang(lang);
  };

  $all('.lang-toggle__btn').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang');
      try { localStorage.setItem('finsera-lang', lang); } catch (e) {}
      window.FINSERA_applyLang();
    });
  });

  var burger = document.querySelector('[data-burger]');
  var mobile = document.querySelector('[data-mobile]');
  if (burger && mobile) {
    function setMenu(open) {
      if (open) mobile.removeAttribute('hidden'); else mobile.setAttribute('hidden', '');
      burger.setAttribute('aria-expanded', String(open));
    }
    burger.addEventListener('click', function () {
      setMenu(mobile.hasAttribute('hidden'));
    });
    // Sluiten bij het volgen van een link — anders blijft het menu open
    // over de nieuwe pagina heen op browsers die de pagina cachen.
    mobile.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    // En met Escape, zodat je er met het toetsenbord uit komt.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobile.hasAttribute('hidden')) {
        setMenu(false);
        burger.focus();
      }
    });
  }

  var jaar = String(new Date().getFullYear());
  Array.prototype.forEach.call(document.querySelectorAll('[data-jaar]'), function (e) { e.textContent = jaar; });

  window.FINSERA_getLang = function () { return lang; };
  window.FINSERA_applyLang();
})();
