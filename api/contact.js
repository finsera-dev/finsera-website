/* ==========================================================================
   Finsera — afspraakaanvragen vanaf de contactpagina.

   Vercel serverless function. Ontvangt de gekozen dag en tijd plus de
   contactgegevens en mailt die naar het adres in NOTIFY_EMAIL.

   Benodigde environment variables in Vercel (Project → Settings → Environment
   Variables), voor Production én Preview:

     RESEND_API_KEY   API-sleutel van resend.com
     FROM_EMAIL       afzender op een geverifieerd domein,
                      bijv. "Finsera <website@finsera.nl>"
     NOTIFY_EMAIL     waar de aanvraag heen moet, bijv. "info@finsera.nl"

   Ontbreekt de sleutel, dan geeft deze functie bewust een 503 terug in
   plaats van te doen alsof het gelukt is. De frontend toont dan het
   e-mailadres als terugvaloptie. Stil falen is hier het enige echt
   onacceptabele gedrag: dan denkt de bezoeker dat hij een afspraak heeft.
   ========================================================================== */

const MAX = { name: 120, company: 160, email: 160, day: 80, time: 20 };

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
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

  // Bot trap: het honeypot-veld is onzichtbaar, dus alleen bots vullen het.
  // We geven 200 terug zodat de bot denkt dat het gelukt is.
  if (clean(body.hp, 200)) return res.status(200).json({ ok: true });

  const name = clean(body.name, MAX.name);
  const company = clean(body.company, MAX.company);
  const email = clean(body.email, MAX.email);
  const day = clean(body.day, MAX.day);
  const time = clean(body.time, MAX.time);
  const lang = body.lang === 'en' ? 'en' : 'nl';

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'invalid_input' });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  const to = process.env.NOTIFY_EMAIL;

  if (!key || !from || !to) {
    console.error('contact: ontbrekende env vars', {
      RESEND_API_KEY: !!key, FROM_EMAIL: !!from, NOTIFY_EMAIL: !!to
    });
    return res.status(503).json({ error: 'not_configured' });
  }

  const when = [day, time].filter(Boolean).join(' · ') || '(geen moment gekozen)';
  const html = [
    '<h2>Nieuwe afspraakaanvraag via finsera.nl</h2>',
    '<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:15px">',
    '<tr><td><strong>Naam</strong></td><td>' + escapeHtml(name) + '</td></tr>',
    '<tr><td><strong>Bedrijf</strong></td><td>' + escapeHtml(company || '—') + '</td></tr>',
    '<tr><td><strong>E-mail</strong></td><td>' + escapeHtml(email) + '</td></tr>',
    '<tr><td><strong>Voorkeursmoment</strong></td><td>' + escapeHtml(when) + '</td></tr>',
    '<tr><td><strong>Taal site</strong></td><td>' + lang.toUpperCase() + '</td></tr>',
    '</table>'
  ].join('');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: from,
        to: [to],
        reply_to: email,
        subject: 'Afspraakaanvraag — ' + name + (company ? ' (' + company + ')' : ''),
        html: html
      })
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('contact: resend gaf', r.status, detail);
      return res.status(502).json({ error: 'send_failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact: onverwachte fout', err);
    return res.status(502).json({ error: 'send_failed' });
  }
}
