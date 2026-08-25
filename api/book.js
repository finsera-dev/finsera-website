/* ==========================================================================
   Finsera — POST /api/book

   Zet de afspraak in de agenda en nodigt de bezoeker uit.

   Volgorde:
     1. Agenda gekoppeld  -> Teams-afspraak aanmaken, bezoeker krijgt een
                             agenda-uitnodiging van Outlook.
     2. Anders, mail geconfigureerd -> aanvraag mailen, jullie bevestigen zelf.
     3. Anders -> 503, waarna de frontend het e-mailadres toont.

   Nooit een 200 teruggeven zonder dat er iets is gebeurd: dan denkt de
   bezoeker dat hij een afspraak heeft terwijl die nergens staat.
   ========================================================================== */

import { isConfigured, mailboxes, availabilityMode, graph, TIMEZONE, GraphError } from './_graph.js';
import { SLOT_MINUTES, localStamp, whoIsFree } from './_slots.js';
import { busyByMailbox } from './_agenda.js';

const MAX = { name: 120, company: 160, email: 160, slot: 32 };

function clean(v, max) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** "2026-08-26T09:00:00" -> eindtijd van het gesprek, zelfde notatie. */
function endOf(startStamp) {
  const [d, t] = startStamp.split('T');
  const [y, mo, da] = d.split('-').map(Number);
  const [h, mi] = t.split(':').map(Number);
  const end = new Date(y, mo - 1, da, h, mi + SLOT_MINUTES);
  return localStamp(end);
}

const STAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

/** Stuurt een mail naar NOTIFY_EMAIL via Resend. Geeft false terug wanneer
 *  mail niet is geconfigureerd; gooit wanneer het versturen mislukt. */
async function stuurMail({ onderwerp, html, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !from || !to) return false;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject: onderwerp, html })
  });
  if (!r.ok) throw new Error(`resend gaf ${r.status}: ${await r.text()}`);
  return true;
}

function detailTabel(rijen) {
  return [
    '<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:15px">',
    ...rijen.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`),
    '</table>'
  ].join('');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  // Honeypot: onzichtbaar veld, dus alleen bots vullen het. We geven 200
  // terug zodat de bot denkt dat het gelukt is.
  if (clean(body.hp, 200)) return res.status(200).json({ ok: true });

  const name = clean(body.name, MAX.name);
  const company = clean(body.company, MAX.company);
  const email = clean(body.email, MAX.email);
  const slot = clean(body.slot, MAX.slot);     // "2026-08-26T09:00:00"
  const lang = body.lang === 'en' ? 'en' : 'nl';

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'invalid_input' });
  }
  if (slot && !STAMP.test(slot)) {
    return res.status(400).json({ error: 'invalid_slot' });
  }

  const label = clean(body.slotLabel, 80) || slot;

  /* ------------------------------------------------- 1. agenda-afspraak -- */
  if (isConfigured() && slot) {
    const boxes = mailboxes();
    const mode = availabilityMode();
    try {
      const end = endOf(slot);

      // Opnieuw controleren of het moment nog vrij is. Tussen het laden van
      // de pagina en het versturen kan er iets in de agenda zijn gezet.
      const { via, byMailbox, geweigerd } = await busyByMailbox(boxes, slot, end);
      if (via === 'calendarView') {
        console.warn('book: getSchedule geweigerd, teruggevallen op calendarView', {
          status: geweigerd.status, requestId: geweigerd.requestId
        });
      }

      const free = whoIsFree({ start: slot, end }, byMailbox, boxes);
      const genoeg = mode === 'any' ? free.length > 0 : free.length === boxes.length;
      if (!genoeg) {
        return res.status(409).json({ error: 'slot_taken' });
      }

      // In 'all'-modus staat de afspraak bij de organisator en zijn de
      // anderen genodigde. In 'any'-modus komt hij bij de eerste die vrij is.
      const host = mode === 'any' ? free[0] : boxes[0];
      const collegas = boxes.filter(m => m !== host && free.includes(m));

      const subject = lang === 'en'
        ? `Discovery call — Finsera & ${name}${company ? ` (${company})` : ''}`
        : `Discovery call — Finsera & ${name}${company ? ` (${company})` : ''}`;

      const intro = lang === 'en'
        ? 'Thirty minutes, no obligation. We look at your numbers, your processes and where the quickest gains are.'
        : 'Dertig minuten, vrijblijvend. We kijken naar je cijfers, je processen en waar de snelste winst zit.';

      const event = await graph(`/users/${encodeURIComponent(host)}/events`, {
        method: 'POST',
        body: {
          subject,
          body: {
            contentType: 'HTML',
            content: [
              `<p>${escapeHtml(intro)}</p>`,
              '<hr>',
              `<p><strong>Naam</strong>: ${escapeHtml(name)}<br>`,
              `<strong>Bedrijf</strong>: ${escapeHtml(company || '—')}<br>`,
              `<strong>E-mail</strong>: ${escapeHtml(email)}<br>`,
              `<strong>Aangevraagd via</strong>: finsera.nl (${lang.toUpperCase()})</p>`
            ].join('')
          },
          start: { dateTime: slot, timeZone: TIMEZONE },
          end: { dateTime: end, timeZone: TIMEZONE },
          attendees: [
            { emailAddress: { address: email, name }, type: 'required' },
            ...collegas.map(m => ({ emailAddress: { address: m }, type: 'required' }))
          ],
          isOnlineMeeting: true,
          onlineMeetingProvider: 'teamsForBusiness',
          // Outlook stuurt de uitnodiging automatisch naar de attendee.
          responseRequested: true,
          transactionId: `finsera-${slot}-${email}`.slice(0, 250)
        }
      });

      // De uitnodiging gaat naar de genodigden, maar Outlook mailt de
      // organisator niet over een afspraak in zijn eigen agenda. Daarom
      // apart een melding naar NOTIFY_EMAIL. Mislukt die, dan staat de
      // afspraak er evengoed — dus alleen loggen, nooit de boeking afkeuren.
      try {
        await stuurMail({
          onderwerp: `Nieuwe afspraak — ${name}${company ? ` (${company})` : ''} — ${label}`,
          replyTo: email,
          html: '<h2>Nieuwe afspraak via finsera.nl</h2>' + detailTabel([
            ['Naam', name],
            ['Bedrijf', company || '—'],
            ['E-mail', email],
            ['Moment', label],
            ['In de agenda van', host],
            ['Taal site', lang.toUpperCase()]
          ])
        });
      } catch (e) {
        console.error('book: notificatiemail mislukt (de afspraak staat wel)', e);
      }

      return res.status(200).json({
        ok: true,
        via: 'calendar',
        joinUrl: (event && event.onlineMeeting && event.onlineMeeting.joinUrl) || null
      });
    } catch (err) {
      console.error('book: agenda-afspraak mislukt',
        err instanceof GraphError
          ? { code: err.code, status: err.status, detail: err.detail, secret: err.hint,
              mailboxes: boxes, path: err.path, token: err.token, requestId: err.requestId }
          : err);
      // valt door naar de mailroute hieronder
    }
  }

  /* ----------------------------------------------------- 2. mailroute --- */
  try {
    const verstuurd = await stuurMail({
      onderwerp: `Afspraakaanvraag — ${name}${company ? ` (${company})` : ''}`,
      replyTo: email,
      html: [
        '<h2>Nieuwe afspraakaanvraag via finsera.nl</h2>',
        '<p><em>De agendakoppeling was niet beschikbaar; bevestig deze afspraak handmatig.</em></p>',
        detailTabel([
          ['Naam', name],
          ['Bedrijf', company || '—'],
          ['E-mail', email],
          ['Voorkeursmoment', label || '(geen gekozen)'],
          ['Taal site', lang.toUpperCase()]
        ])
      ].join('')
    });
    if (!verstuurd) {
      console.error('book: geen agenda en geen mail geconfigureerd');
      return res.status(503).json({ error: 'not_configured' });
    }
    return res.status(200).json({ ok: true, via: 'email' });
  } catch (err) {
    console.error('book: mail versturen mislukt', err);
    return res.status(502).json({ error: 'send_failed' });
  }
}
