/* ==========================================================================
   Finsera — Contact: calendar-first booking flow.
   Pick day -> time slot -> minimal Name/Company/Email -> success.
   Honeypot spam protection. Ported from Contact.dc.html.
   ========================================================================== */
(function () {
  'use strict';

  var LOC = {
    nl: { weekdays: ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'], locale: 'nl-NL' },
    en: { weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], locale: 'en-GB' }
  };
  var SLOTS = ['09:00', '10:00', '11:00', '13:30', '15:00', '16:00'];

  function $(id) { return document.getElementById(id); }
  function lang() { return (typeof window.FINSERA_getLang === 'function' ? window.FINSERA_getLang() : 'nl'); }
  function loc() { return LOC[lang()] || LOC.nl; }

  var state = { view: 'cal', monthOffset: 0, date: null, time: null };

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
        var disabled = dt < today || dow === 0 || dow === 6;
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
      SLOTS.forEach(function (s) {
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
  function submit() {
    var hp = $('ctHp').value;
    var name = $('ctName').value.trim();
    var email = $('ctEmail').value.trim();
    var validEmail = /.+@.+\..+/.test(email);
    if (hp) { finish(); return; } // bot trap: silently "succeed"
    if (!name || !validEmail) { $('ctError').hidden = false; return; }
    $('ctError').hidden = true;
    finish();
  }
  function finish() {
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
  $('ctSubmit').addEventListener('click', submit);

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
    renderCalendar();
  };

  // init
  setView('cal');
  renderCalendar();
})();
