/* ==========================================================================
   Finsera — gedeelde Microsoft Graph-helper.

   Praat namens de applicatie met Microsoft Graph (client credentials), niet
   namens een ingelogde gebruiker. Er is dus geen browser-login nodig.

   Benodigde environment variables in Vercel:

     MS_TENANT_ID       tenant-id (GUID) uit Azure
     MS_CLIENT_ID       application (client) id van de app-registratie
     MS_CLIENT_SECRET   client secret van die app-registratie
     MS_ORGANIZER_UPN   de mailbox waarin de afspraken landen,
                        bijv. "oner@finsera.nl"

   Optioneel:
     MS_GRAPH_BASE      andere Graph-basis-URL (gebruikt in tests)
     MS_LOGIN_BASE      andere login-basis-URL (gebruikt in tests)

   Benodigde application permissions op de app-registratie, met admin
   consent: Calendars.ReadWrite.

   BELANGRIJK — beperk de reikwijdte. Een application permission geeft
   standaard toegang tot élke mailbox in de tenant. Beperk dat met een
   Application Access Policy in Exchange Online, zodat de app alleen bij
   de mailbox in MS_ORGANIZER_UPN kan:

     New-ApplicationAccessPolicy -AppId <MS_CLIENT_ID> `
       -PolicyScopeGroupId <mailbox-of-beveiligingsgroep> `
       -AccessRight RestrictAccess -Description "Finsera website booking"

   Ontbreekt een van de variabelen, dan meldt isConfigured() dat en valt de
   site terug op vaste tijden met handmatige bevestiging.
   ========================================================================== */

export const TIMEZONE = 'Europe/Amsterdam';

const LOGIN_BASE = process.env.MS_LOGIN_BASE || 'https://login.microsoftonline.com';
const GRAPH_BASE = process.env.MS_GRAPH_BASE || 'https://graph.microsoft.com/v1.0';

export function isConfigured() {
  return Boolean(
    process.env.MS_TENANT_ID &&
    process.env.MS_CLIENT_ID &&
    process.env.MS_CLIENT_SECRET &&
    process.env.MS_ORGANIZER_UPN
  );
}

export function organizer() {
  return process.env.MS_ORGANIZER_UPN;
}

// Tokens zijn ongeveer een uur geldig. Serverless functions blijven tussen
// aanroepen door soms warm, dus cachen scheelt een tokenverzoek per boeking.
let cached = { token: null, expires: 0 };

export async function getToken(now) {
  const t = typeof now === 'number' ? now : Date.now();
  if (cached.token && cached.expires > t + 60000) return cached.token;

  const body = new URLSearchParams({
    client_id: process.env.MS_CLIENT_ID,
    client_secret: process.env.MS_CLIENT_SECRET,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials'
  });

  const r = await fetch(`${LOGIN_BASE}/${process.env.MS_TENANT_ID}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });

  const json = await r.json().catch(() => ({}));
  if (!r.ok || !json.access_token) {
    throw new GraphError('token_failed', r.status, json);
  }

  cached = {
    token: json.access_token,
    expires: t + (Number(json.expires_in) || 3600) * 1000
  };
  return cached.token;
}

export function resetTokenCache() {
  cached = { token: null, expires: 0 };
}

export class GraphError extends Error {
  constructor(code, status, detail) {
    super(code);
    this.code = code;
    this.status = status;
    this.detail = detail;
  }
}

export async function graph(path, options) {
  const opts = options || {};
  const token = await getToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    // Laat Graph tijden in lokale tijd teruggeven. Zo hoeven we nergens
    // zelf UTC om te rekenen en gaat de zomertijdwissel vanzelf goed.
    Prefer: `outlook.timezone="${TIMEZONE}"`
  };
  if (opts.headers) Object.assign(headers, opts.headers);

  const r = await fetch(`${GRAPH_BASE}${path}`, {
    method: opts.method || 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });

  const text = await r.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (e) { /* geen JSON */ }

  if (!r.ok) {
    throw new GraphError('graph_failed', r.status, json || text);
  }
  return json;
}
