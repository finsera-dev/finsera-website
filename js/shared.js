/* ==========================================================================
   Finsera — shared nav/footer i18n + language toggle + mobile menu.
   Pages set window.FINSERA_PAGE = { nl:{...}, en:{...} } before loading this.
   ========================================================================== */
(function () {
  'use strict';

  var SHARED = {
    nl: {
      navHome: 'Home', navOver: 'Over ons', navDiensten: 'Diensten', navCases: 'Cases', navBlog: 'Blog', navCta: 'Vraag de diagnose aan',
      cta: 'Vraag de diagnose aan',
      footTagline: 'Een financieel fundament dat met je organisatie meegroeit.',
      footNav: 'Navigatie', footRights: 'Alle rechten voorbehouden.', footPrivacy: 'Privacyverklaring',
      ctaWho: 'Je spreekt direct met Öner of Tomas.'
    },
    en: {
      navHome: 'Home', navOver: 'About us', navDiensten: 'Services', navCases: 'Cases', navBlog: 'Blog', navCta: 'Request the diagnosis',
      cta: 'Request the diagnosis',
      footTagline: 'A financial foundation that grows with your organisation.',
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

  window.FINSERA_getLang = function () { return lang; };
  window.FINSERA_applyLang();
})();
