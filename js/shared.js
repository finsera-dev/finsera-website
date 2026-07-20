/* ==========================================================================
   Finsera — shared nav/footer i18n + language toggle + mobile menu.
   Pages set window.FINSERA_PAGE = { nl:{...}, en:{...} } before loading this.
   ========================================================================== */
(function () {
  'use strict';

  var SHARED = {
    nl: {
      navHome: 'Home', navOver: 'Over Finsera', navDiensten: 'Diensten', navCases: 'Cases', navBlog: 'Blog', navCta: 'Plan een gesprek',
      cta: 'Vraag de diagnose aan',
      footTagline: 'Een financieel fundament dat met je organisatie meegroeit.',
      footNav: 'Navigatie', footRights: 'Alle rechten voorbehouden.', footPrivacy: 'Privacyverklaring', footTerms: 'Algemene voorwaarden'
    },
    en: {
      navHome: 'Home', navOver: 'About', navDiensten: 'Services', navCases: 'Cases', navBlog: 'Blog', navCta: 'Book a call',
      cta: 'Request the diagnosis',
      footTagline: 'A financial foundation that grows with your organisation.',
      footNav: 'Navigation', footRights: 'All rights reserved.', footPrivacy: 'Privacy policy', footTerms: 'Terms and conditions'
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
    burger.addEventListener('click', function () {
      var open = mobile.hasAttribute('hidden');
      if (open) mobile.removeAttribute('hidden'); else mobile.setAttribute('hidden', '');
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  window.FINSERA_getLang = function () { return lang; };
  window.FINSERA_applyLang();
})();
