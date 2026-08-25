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

/** Environment variables komen via de Vercel-UI binnen, en daar blijft bij
 *  plakken makkelijk een spatie of regeleinde aan hangen. Azure weigert het
 *  secret dan met AADSTS7000215 — dezelfde foutcode als bij een verkeerd
 *  secret, dus dat is uren zoeken naar iets onzichtbaars. Vandaar overal
 *  trimmen bij het uitlezen. */
function env(naam) {
  const v = process.env[naam];
  return typeof v === 'string' ? v.trim() : '';
}

export function isConfigured() {
  return Boolean(
    env('MS_TENANT_ID') &&
    env('MS_CLIENT_ID') &&
    env('MS_CLIENT_SECRET') &&
    env('MS_ORGANIZER_UPN')
  );
}

export function organizer() {
  return env('MS_ORGANIZER_UPN');
}

/** Alle mailboxen waarvan we de agenda meewegen: de organisator plus
 *  eventuele collega's uit MS_ALSO_UPNS (komma-gescheiden). */
export function mailboxes() {
  const extra = (process.env.MS_ALSO_UPNS || '')
    .split(',').map(s => s.trim()).filter(Boolean);
  return [organizer(), ...extra].filter(Boolean);
}

/** 'all'  = alleen momenten waarop iedereen vrij is (standaard).
 *  'any'  = momenten waarop ten minste een van jullie vrij is; de afspraak
 *           komt dan in de agenda van degene die kan. */
export function availabilityMode() {
  return process.env.MS_AVAILABILITY_MODE === 'any' ? 'any' : 'all';
}

// Tokens zijn ongeveer een uur geldig. Serverless functions blijven tussen
// aanroepen door soms warm, dus cachen scheelt een tokenverzoek per boeking.
let cached = { token: null, expires: 0 };

export async function getToken(now) {
  const t = typeof now === 'number' ? now : Date.now();
  if (cached.token && cached.expires > t + 60000) return cached.token;

  const body = new URLSearchParams({
    client_id: env('MS_CLIENT_ID'),
    client_secret: env('MS_CLIENT_SECRET'),
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials'
  });

  const r = await fetch(`${LOGIN_BASE}/${env('MS_TENANT_ID')}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });

  const json = await r.json().catch(() => ({}));
  if (!r.ok || !json.access_token) {
    // Azure geeft bij elk ongeldig secret dezelfde foutcode, met een tekst
    // die alleen de ID/value-verwisseling noemt. Daarom loggen we hoe het
    // secret erúit ziet — nooit wat erin staat. Dat scheelt gokwerk.
    throw new GraphError('token_failed', r.status, json, secretShape());
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
  constructor(code, status, detail, hint) {
    super(code);
    this.code = code;
    this.status = status;
    this.detail = detail;
    if (hint) this.hint = hint;
  }
}

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Beschrijft de vórm van het client secret, nooit de inhoud. Genoeg om de
 *  drie klassieke fouten uit elkaar te houden:
 *    lijktOpSecretId      -> de Secret ID geplakt in plaats van de Value
 *    lengte veel < 40     -> afgekapt bij het selecteren met de muis
 *    witruimteVerwijderd  -> spatie of regeleinde meegeplakt
 *  Bij een goede Value zie je iets als: lengte 40, GUID false, ~ true. */
export function secretShape() {
  const ruw = process.env.MS_CLIENT_SECRET;
  if (typeof ruw !== 'string') return { aanwezig: false };
  const s = ruw.trim();
  return {
    aanwezig: true,
    lengte: s.length,
    lijktOpSecretId: GUID.test(s),
    bevatTilde: s.includes('~'),
    witruimteVerwijderd: s.length !== ruw.length,
    clientIdLengte: env('MS_CLIENT_ID').length,
    tenantIdIsGuid: GUID.test(env('MS_TENANT_ID'))
  };
}

/** Leest de payload van het token (base64url-JSON), zonder verificatie.
 *  Nooit het token zelf loggen — wel bij welke app, tenant en rollen het
 *  hoort. Daarmee zie je in één oogopslag of Vercel met dezelfde app praat
 *  als degene die in de Application Access Policy staat. */
export function tokenClaims(token) {
  try {
    const json = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf8'));
    return {
      appId: json.appid,
      tenant: json.tid,
      roles: json.roles,
      afgegeven: json.iat ? new Date(json.iat * 1000).toISOString() : undefined,
      verloopt: json.exp ? new Date(json.exp * 1000).toISOString() : undefined
    };
  } catch (e) {
    return { onleesbaar: true };
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
    const err = new GraphError('graph_failed', r.status, json || text);
    // Extra context voor in de logs: welk pad, welke app/rollen, en Microsofts
    // eigen request-id — dat laatste heb je nodig als je een ticket opent.
    err.path = path;
    err.token = tokenClaims(token);
    err.requestId = r.headers.get('request-id') || undefined;
    throw err;
  }
  return json;
}
