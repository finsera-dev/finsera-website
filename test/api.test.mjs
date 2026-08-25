/* End-to-end test van /api/slots en /api/book tegen een nagebouwde
   Microsoft Graph. Controleert vooral de faalpaden: die bepalen of een
   bezoeker een valse bevestiging krijgt. */
import http from 'node:http';
import assert from 'node:assert/strict';

let pass = 0;
function t(naam, fn) {
  return Promise.resolve().then(fn).then(
    () => { pass++; console.log('  ok  ' + naam); },
    e => { console.log('  FOUT ' + naam + '\n       ' + e.message); process.exitCode = 1; }
  );
}

/* ------------------------------------------------- nagebouwde Graph ----- */
let graphGedrag = 'ok';
let aangemaakteEvents = [];
let laatsteRequest = null;

const mock = http.createServer((req, res) => {
  let body = '';
  req.on('data', c => body += c);
  req.on('end', () => {
    laatsteRequest = { url: req.url, method: req.method, headers: req.headers, body };
    const json = o => { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(o)); };
    const fout = (code, o) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(o)); };

    if (req.url.includes('/oauth2/v2.0/token')) {
      if (graphGedrag === 'token_fout') return fout(401, { error: 'invalid_client' });
      return json({ access_token: 'test-token', expires_in: 3600, token_type: 'Bearer' });
    }
    if (req.url.includes('getSchedule')) {
      if (graphGedrag === 'graph_down') return fout(503, { error: { code: 'ServiceUnavailable' } });
      if (graphGedrag === 'bezet') {
        return json({ value: [{ scheduleItems: [
          { status: 'busy', start: { dateTime: '2026-12-02T09:00:00.0000000' }, end: { dateTime: '2026-12-02T09:30:00.0000000' } }
        ] }] });
      }
      return json({ value: [{ scheduleItems: [] }] });
    }
    if (req.url.includes('/events')) {
      if (graphGedrag === 'event_fout') return fout(403, { error: { code: 'ErrorAccessDenied' } });
      const ev = JSON.parse(body);
      aangemaakteEvents.push(ev);
      return json({ id: 'evt-1', onlineMeeting: { joinUrl: 'https://teams.microsoft.com/l/meetup-join/test' } });
    }
    fout(404, { error: 'niet gevonden' });
  });
});

await new Promise(r => mock.listen(0, r));
const poort = mock.address().port;

process.env.MS_LOGIN_BASE = `http://127.0.0.1:${poort}`;
process.env.MS_GRAPH_BASE = `http://127.0.0.1:${poort}/v1.0`;

/* --------------------------------------------------- nep req/res -------- */
function nepRes() {
  const r = { statusCode: 0, payload: null, headers: {} };
  r.setHeader = (k, v) => { r.headers[k] = v; };
  r.status = c => { r.statusCode = c; return r; };
  r.json = o => { r.payload = o; return r; };
  return r;
}
const roep = async (h, req) => { const res = nepRes(); await h(req, res); return res; };

const BASE = "../api/";

function configureer(aan) {
  if (aan) {
    process.env.MS_TENANT_ID = 'tenant';
    process.env.MS_CLIENT_ID = 'client';
    process.env.MS_CLIENT_SECRET = 'secret';
    process.env.MS_ORGANIZER_UPN = 'oner@finsera.nl';
  } else {
    delete process.env.MS_TENANT_ID; delete process.env.MS_CLIENT_ID;
    delete process.env.MS_CLIENT_SECRET; delete process.env.MS_ORGANIZER_UPN;
  }
}
function mailConfig(aan) {
  if (aan) {
    process.env.RESEND_API_KEY = 'x'; process.env.FROM_EMAIL = 'a@b.nl'; process.env.NOTIFY_EMAIL = 'c@d.nl';
  } else {
    delete process.env.RESEND_API_KEY; delete process.env.FROM_EMAIL; delete process.env.NOTIFY_EMAIL;
  }
}

const { default: slots } = await import(BASE + 'slots.js');
const { default: book } = await import(BASE + 'book.js');
const { resetTokenCache } = await import(BASE + '_graph.js');

const GELDIG = { name: 'Test Persoon', company: 'Testbedrijf', email: 'test@voorbeeld.nl',
                 slot: '2026-12-02T09:00:00', slotLabel: 'woensdag 2 december · 09:00', lang: 'nl' };

console.log('\n/api/slots');
await t('zonder agendakoppeling: configured false, geen fout', async () => {
  configureer(false); resetTokenCache();
  const r = await roep(slots, { method: 'GET' });
  assert.equal(r.statusCode, 200);
  assert.equal(r.payload.configured, false);
  assert.equal(r.payload.reason, 'not_configured');
});
await t('met koppeling: echte momenten terug', async () => {
  configureer(true); resetTokenCache(); graphGedrag = 'ok';
  const r = await roep(slots, { method: 'GET' });
  assert.equal(r.statusCode, 200);
  assert.equal(r.payload.configured, true);
  assert.ok(r.payload.days.length > 0, 'geen dagen terug');
  assert.ok(r.payload.days[0].times.length > 0);
});
await t('Prefer-header vraagt om Amsterdamse tijd', async () => {
  assert.match(laatsteRequest.headers.prefer || '', /Europe\/Amsterdam/);
});
await t('Graph plat: valt terug op configured false, geen 500', async () => {
  configureer(true); resetTokenCache(); graphGedrag = 'graph_down';
  const r = await roep(slots, { method: 'GET' });
  assert.equal(r.statusCode, 200);
  assert.equal(r.payload.configured, false);
  assert.equal(r.payload.reason, 'graph_unavailable');
});
await t('verkeerde inloggegevens: ook terugval, geen 500', async () => {
  configureer(true); resetTokenCache(); graphGedrag = 'token_fout';
  const r = await roep(slots, { method: 'GET' });
  assert.equal(r.statusCode, 200);
  assert.equal(r.payload.configured, false);
});
await t('GET-only', async () => {
  const r = await roep(slots, { method: 'POST' });
  assert.equal(r.statusCode, 405);
});

console.log('\n/api/book — de gelukte route');
await t('maakt een Teams-afspraak aan en geeft de joinUrl terug', async () => {
  configureer(true); resetTokenCache(); graphGedrag = 'ok'; aangemaakteEvents = [];
  const r = await roep(book, { method: 'POST', body: GELDIG });
  assert.equal(r.statusCode, 200);
  assert.equal(r.payload.via, 'calendar');
  assert.ok(r.payload.joinUrl.includes('teams.microsoft.com'));
  assert.equal(aangemaakteEvents.length, 1);
});
await t('afspraak bevat de juiste tijd, duur en tijdzone', async () => {
  const ev = aangemaakteEvents[0];
  assert.equal(ev.start.dateTime, '2026-12-02T09:00:00');
  assert.equal(ev.end.dateTime, '2026-12-02T09:30:00');
  assert.equal(ev.start.timeZone, 'Europe/Amsterdam');
  assert.equal(ev.isOnlineMeeting, true);
  assert.equal(ev.onlineMeetingProvider, 'teamsForBusiness');
});
await t('bezoeker staat als genodigde in de afspraak', async () => {
  const a = aangemaakteEvents[0].attendees;
  assert.equal(a.length, 1);
  assert.equal(a[0].emailAddress.address, 'test@voorbeeld.nl');
  assert.equal(a[0].type, 'required');
});
await t('naam en bedrijf staan in de omschrijving', async () => {
  const c = aangemaakteEvents[0].body.content;
  assert.ok(c.includes('Test Persoon') && c.includes('Testbedrijf'));
});

console.log('\n/api/book — de faalpaden');
await t('dubbele boeking wordt geweigerd met 409', async () => {
  configureer(true); resetTokenCache(); graphGedrag = 'bezet'; aangemaakteEvents = [];
  const r = await roep(book, { method: 'POST', body: GELDIG });
  assert.equal(r.statusCode, 409);
  assert.equal(r.payload.error, 'slot_taken');
  assert.equal(aangemaakteEvents.length, 0, 'toch een afspraak aangemaakt');
});
await t('agenda weigert, mail geconfigureerd: valt terug op mailen', async () => {
  configureer(true); resetTokenCache(); graphGedrag = 'event_fout'; mailConfig(true);
  // Resend is niet bereikbaar in de test, dus dit moet 502 geven — geen 200
  const r = await roep(book, { method: 'POST', body: GELDIG });
  assert.notEqual(r.statusCode, 200, 'valse bevestiging bij mislukte verzending');
});
await t('niets geconfigureerd: 503, nooit een valse bevestiging', async () => {
  configureer(false); mailConfig(false); resetTokenCache();
  const r = await roep(book, { method: 'POST', body: GELDIG });
  assert.equal(r.statusCode, 503);
  assert.equal(r.payload.error, 'not_configured');
});
await t('ongeldig e-mailadres wordt geweigerd', async () => {
  configureer(true); resetTokenCache(); graphGedrag = 'ok';
  const r = await roep(book, { method: 'POST', body: { ...GELDIG, email: 'geenmail' } });
  assert.equal(r.statusCode, 400);
});
await t('lege naam wordt geweigerd', async () => {
  const r = await roep(book, { method: 'POST', body: { ...GELDIG, name: '   ' } });
  assert.equal(r.statusCode, 400);
});
await t('vervormd tijdstip wordt geweigerd', async () => {
  const r = await roep(book, { method: 'POST', body: { ...GELDIG, slot: 'morgen ergens' } });
  assert.equal(r.statusCode, 400);
});
await t('bot in de honeypot krijgt 200 maar er gebeurt niets', async () => {
  configureer(true); resetTokenCache(); graphGedrag = 'ok'; aangemaakteEvents = [];
  const r = await roep(book, { method: 'POST', body: { ...GELDIG, hp: 'spam' } });
  assert.equal(r.statusCode, 200);
  assert.equal(aangemaakteEvents.length, 0, 'bot kreeg een echte afspraak');
});
await t('body als string wordt ook verwerkt', async () => {
  configureer(true); resetTokenCache(); graphGedrag = 'ok'; aangemaakteEvents = [];
  const r = await roep(book, { method: 'POST', body: JSON.stringify(GELDIG) });
  assert.equal(r.statusCode, 200);
  assert.equal(aangemaakteEvents.length, 1);
});
await t('POST-only', async () => {
  const r = await roep(book, { method: 'GET' });
  assert.equal(r.statusCode, 405);
});
await t('XSS in de naam wordt geëscaped in de omschrijving', async () => {
  configureer(true); resetTokenCache(); graphGedrag = 'ok'; aangemaakteEvents = [];
  await roep(book, { method: 'POST', body: { ...GELDIG, name: '<script>alert(1)</script>' } });
  const c = aangemaakteEvents[0].body.content;
  assert.ok(!c.includes('<script>'), 'ongeëscapete script-tag in de afspraak');
  assert.ok(c.includes('&lt;script&gt;'));
});

mock.close();
console.log(`\n${pass} controles geslaagd${process.exitCode ? ' — MET FOUTEN' : ''}\n`);
