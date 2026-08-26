/* ==========================================================================
   Finsera — Contact: calendar-first booking flow.
   Pick day -> time slot -> minimal Name/Company/Email -> success.
   Honeypot spam protection. Ported from Contact.dc.html.
   ========================================================================== */
(function () {
  'use strict';

  var LOC = {
    nl: { weekdays: ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'], locale: 'nl-NL', tomorrow: 'morgen' },
    en: { weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], locale: 'en-GB', tomorrow: 'tomorrow' }
  };
  var SLOTS = ['09:00', '10:00', '11:00', '13:30', '15:00', '16:00'];

  function $(id) { return document.getElementById(id); }
  function lang() { return (typeof window.FINSERA_getLang === 'function' ? window.FINSERA_getLang() : 'nl'); }
  function loc() { return LOC[lang()] || LOC.nl; }

  var state = { view: 'cal', monthOffset: 0, date: null, time: null };

  /* ------------------------------------------------- echte agenda -------- */
  // /api/slots geeft de momenten terug waarop er daadwerkelijk ruimte is.
  // Ligt de koppeling eruit, dan blijft `avail.configured` false en vallen
  // we terug op de vaste tijden met handmatige bevestiging. De bezoeker
  // merkt daar niets van; wij bevestigen dan zelf.
  var avail = { configured: false, byDate: {} };

  function pad(n) { return String(n).padStart(2, '0'); }
  function dateKey(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  /** "2026-08-26T09:00:00" — wandkloktijd, zoals de API hem verwacht. */
  function stamp(date, time) {
    return date && time ? dateKey(date) + 'T' + time + ':00' : '';
  }
  /** Tijden die op deze dag te boeken zijn. */
  function timesFor(date) {
    if (!avail.configured) return SLOTS.slice();
    return avail.byDate[dateKey(date)] || [];
  }
  function dayBookable(date) {
    return timesFor(date).length > 0;
  }

  function loadAvailability() {
    return fetch('/api/slots', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.configured || !Array.isArray(d.days)) return;
        var by = {};
        d.days.forEach(function (x) { by[x.date] = x.times; });
        avail = { configured: true, byDate: by };
      })
      .catch(function () { /* terugval blijft staan */ });
  }

  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function dayLabel(dt) {
    return dt ? dt.toLocaleDateString(loc().locale, { weekday: 'long', day: 'numeric', month: 'long' }) : '';
  }
  function summary() {
    return state.date ? dayLabel(state.date) + ' · ' + (state.time || '') : '';
  }

  /* ----------------------------------------------------------- views ----- */
  function setView(v) {
    state.view = v;
    $('viewCal').hidden = v !== 'cal';
    $('viewDetails').hidden = v !== 'details';
    $('viewDone').hidden = v !== 'done';
  }

  /* ------------------------------------------- eerstvolgende momenten ---- */
  // De maandkalender stond hiervoor vooraan, met vrijwel alles grijs. Dat
  // leest als "geen ruimte". Nu tonen we eerst de eerstvolgende zes
  // momenten als directe keuzes; de kalender is de uitwijk daaronder.
  var NEXT_COUNT = 6;
  var PER_DAY = 2;       // spreiden over dagen, anders staat er zes keer "morgen"
  var LEAD_HOURS = 18;   // niets aanbieden binnen deze termijn

  function nextSlots(n) {
    var out = [];
    var now = new Date();
    var earliest = new Date(now.getTime() + LEAD_HOURS * 3600 * 1000);
    var day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var guard = 0;
    while (out.length < n && guard++ < 60) {
      var dow = day.getDay();
      var open = avail.configured ? timesFor(day) : (dow === 0 || dow === 6 ? [] : SLOTS);
      if (open.length) {
        var today = [];
        for (var i = 0; i < open.length; i++) {
          var parts = open[i].split(':');
          var dt = new Date(day.getFullYear(), day.getMonth(), day.getDate(), +parts[0], +parts[1]);
          // De server past de aanlooptijd al toe; lokaal doen we het ook,
          // zodat de terugval zich hetzelfde gedraagt.
          if (avail.configured || dt >= earliest) today.push({ date: dt, time: open[i] });
        }
        // eerste en laatste van de dag: ochtend- en middagoptie
        if (today.length > PER_DAY) {
          today = [today[0], today[today.length - 1]];
        }
        for (var j = 0; j < today.length && out.length < n; j++) out.push(today[j]);
      }
      day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    }
    return out;
  }

  function relativeDay(dt) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    var diff = Math.round((d - today) / 86400000);
    var l = loc();
    if (diff === 1) return l.tomorrow;
    if (diff > 1 && diff < 7) {
      return dt.toLocaleDateString(l.locale, { weekday: 'long' });
    }
    return dt.toLocaleDateString(l.locale, { weekday: 'short', day: 'numeric', month: 'short' });
  }

  function renderNext() {
    var el = $('ctNext');
    if (!el) return;
    el.innerHTML = '';
    nextSlots(NEXT_COUNT).forEach(function (s) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ct-nextslot';
      var d = document.createElement('span');
      d.className = 'ct-nextslot__day';
      d.textContent = relativeDay(s.date);
      var t = document.createElement('span');
      t.className = 'ct-nextslot__time';
      t.textContent = s.time;
      btn.appendChild(d); btn.appendChild(t);
      btn.addEventListener('click', function () {
        state.date = s.date;
        state.time = s.time;
        $('ctSummary').textContent = summary();
        setView('details');
        var name = $('ctName'); if (name) name.focus();
      });
      el.appendChild(btn);
    });
  }

  /* ---------------------------------------------------------- calendar --- */
  function renderCalendar() {
    var l = loc();
    // weekday headers
    var wk = $('ctWeekdays');
    wk.innerHTML = '';
    l.weekdays.forEach(function (w) {
      var d = document.createElement('div'); d.textContent = w; wk.appendChild(d);
    });

    var today = new Date(); today.setHours(0, 0, 0, 0);
    var base = new Date(today.getFullYear(), today.getMonth() + state.monthOffset, 1);
    var year = base.getFullYear(), month = base.getMonth();
    $('ctMonth').textContent = base.toLocaleDateString(l.locale, { month: 'long', year: 'numeric' });

    var firstDow = (base.getDay() + 6) % 7;
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    var days = $('ctDays');
    days.innerHTML = '';
    var i;
    for (i = 0; i < firstDow; i++) { days.appendChild(document.createElement('div')); }
    for (var d = 1; d <= daysInMonth; d++) {
      (function (dayNum) {
        var dt = new Date(year, month, dayNum);
        var dow = dt.getDay();
        // Met de agendakoppeling is een dag alleen klikbaar als er echt
        // nog ruimte is; zonder koppeling zijn alle werkdagen open.
        var disabled = dt < today || dow === 0 || dow === 6 || !dayBookable(dt);
        var selected = sameDay(dt, state.date);
        var cell = document.createElement('div');
        cell.className = 'ct-daycell';
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ct-day' + (disabled ? ' is-disabled' : '') + (selected ? ' is-selected' : '');
        btn.textContent = dayNum;
        if (disabled) { btn.disabled = true; }
        else {
          btn.addEventListener('click', function () {
            state.date = dt; state.time = null;
            renderCalendar();
          });
        }
        cell.appendChild(btn);
        days.appendChild(cell);
      })(d);
    }

    // slots panel
    var hasDate = !!state.date;
    $('ctSlotsWrap').hidden = !hasDate;
    $('ctNoDay').hidden = hasDate;
    if (hasDate) {
      $('ctSelectedDay').textContent = dayLabel(state.date);
      var slotsEl = $('ctSlots');
      slotsEl.innerHTML = '';
      var open = timesFor(state.date);
      if (!open.length) {
        var leeg = document.createElement('div');
        leeg.className = 'ct-noslots';
        var dd = (window.FINSERA_PAGE[lang()] || window.FINSERA_PAGE.nl);
        leeg.textContent = dd.noSlots || 'Op deze dag is niets meer vrij.';
        slotsEl.appendChild(leeg);
      }
      open.forEach(function (s) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ct-slot' + (state.time === s ? ' is-on' : '');
        btn.textContent = s;
        btn.addEventListener('click', function () {
          state.time = s;
          $('ctSummary').textContent = summary();
          setView('details');
        });
        slotsEl.appendChild(btn);
      });
    }
  }

  /* ------------------------------------------------------------ submit --- */
  // De aanvraag gaat naar /api/book. Lukt dat niet, dan zeggen we dat
  // eerlijk en tonen we het e-mailadres — nooit een bevestiging voor een
  // afspraak die nergens is aangekomen.
  var FALLBACK_EMAIL = 'info@finsera.nl';
  var sending = false;

  function showError(msgKey) {
    var el = $('ctError');
    var d = (window.FINSERA_PAGE[lang()] || window.FINSERA_PAGE.nl);
    el.textContent = d[msgKey] || d.error;
    el.hidden = false;
  }

  function submit(ev) {
    if (ev) ev.preventDefault();
    if (sending) return;

    var hp = $('ctHp').value;
    var name = $('ctName').value.trim();
    var company = $('ctCompany').value.trim();
    var email = $('ctEmail').value.trim();
    var validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

    if (hp) { finish(); return; } // bot trap: silently "succeed"
    if (!name || !validEmail) { showError('error'); return; }

    $('ctError').hidden = true;
    sending = true;
    var btn = $('ctSubmit');
    var label = btn.textContent;
    var d = (window.FINSERA_PAGE[lang()] || window.FINSERA_PAGE.nl);
    btn.disabled = true;
    btn.textContent = d.sending || 'Versturen…';

    function restore() {
      sending = false;
      btn.disabled = false;
      btn.textContent = label;
    }

    fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        company: company,
        email: email,
        hp: hp,
        slot: stamp(state.date, state.time),
        slotLabel: summary(),
        lang: lang()
      })
    }).then(function (r) {
      if (r.status === 409) { var e = new Error('taken'); e.taken = true; throw e; }
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json().catch(function () { return {}; });
    }).then(function (data) {
      restore();
      finish(data);
    }).catch(function (err) {
      // Moment is intussen weggeboekt: opnieuw ophalen en terug naar de keuze,
      // in plaats van een bevestiging voor een afspraak die niet past.
      if (err && err.taken) {
        restore();
        loadAvailability().then(function () {
          state.time = null;
          renderNext();
          renderCalendar();
          setView('cal');
          var dd = (window.FINSERA_PAGE[lang()] || window.FINSERA_PAGE.nl);
          var el = $('ctError');
          el.textContent = dd.slotTaken || 'Dat moment is net geboekt. Kies een ander tijdstip.';
          el.hidden = false;
        });
        return;
      }
      restore();
      var el = $('ctError');
      var dd = (window.FINSERA_PAGE[lang()] || window.FINSERA_PAGE.nl);
      el.textContent = '';
      el.appendChild(document.createTextNode((dd.sendFailed || 'Versturen lukte niet. Mail ons direct op ') + ' '));
      var a = document.createElement('a');
      a.href = 'mailto:' + FALLBACK_EMAIL + '?subject=' +
        encodeURIComponent('Afspraakaanvraag' + (summary() ? ' — ' + summary() : ''));
      a.textContent = FALLBACK_EMAIL;
      el.appendChild(a);
      el.hidden = false;
    });
  }

  function finish(data) {
    var d = (window.FINSERA_PAGE[lang()] || window.FINSERA_PAGE.nl);
    var msg = $('ctDoneMsg');
    // Twee verschillende uitkomsten, en dat mag je zien: staat de afspraak
    // echt in de agenda, of moeten wij hem nog bevestigen?
    if (msg) {
      msg.textContent = (data && data.via === 'calendar')
        ? (d.thanksBooked || 'De uitnodiging staat in je mail, met de link voor de videocall.')
        : (d.thanksMsg || 'We nemen binnen één werkdag contact met je op.');
    }
    $('ctDoneSummary').textContent = summary();
    setView('done');
  }

  /* ------------------------------------------------------------- wire ---- */
  $('ctPrevMonth').addEventListener('click', function () {
    state.monthOffset = Math.max(0, state.monthOffset - 1); renderCalendar();
  });
  $('ctNextMonth').addEventListener('click', function () {
    state.monthOffset += 1; renderCalendar();
  });
  $('ctBack').addEventListener('click', function () { setView('cal'); });
  $('ctForm').addEventListener('submit', submit);

  var calToggle = $('ctToggleCal'), calWrap = $('ctCalWrap');
  calToggle.addEventListener('click', function () {
    var open = calWrap.hasAttribute('hidden');
    if (open) calWrap.removeAttribute('hidden'); else calWrap.setAttribute('hidden', '');
    calToggle.setAttribute('aria-expanded', String(open));
  });

  // update placeholders + dynamic labels when language changes
  window.FINSERA_onLang = function () {
    var d = (window.FINSERA_PAGE[lang()] || window.FINSERA_PAGE.nl);
    var n = $('ctName'), c = $('ctCompany');
    if (n && d.phName) n.placeholder = d.phName;
    if (c && d.phCompany) c.placeholder = d.phCompany;
    if (state.date) {
      $('ctSummary').textContent = summary();
      $('ctDoneSummary').textContent = summary();
    }
    renderNext();
    renderCalendar();
  };

  // init — meteen de vaste tijden tonen, en zodra de echte beschikbaarheid
  // binnen is opnieuw tekenen. Zo staat er nooit een lege pagina te wachten
  // op een netwerkverzoek.
  setView('cal');
  renderNext();
  renderCalendar();
  loadAvailability().then(function () {
    if (!avail.configured) return;
    // Een eerder gekozen dag kan intussen vol zitten.
    if (state.date && !dayBookable(state.date)) { state.date = null; state.time = null; }
    renderNext();
    renderCalendar();
  });
})();
