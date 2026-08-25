/* ==========================================================================
   Finsera — GET /api/slots

   Geeft de momenten terug waarop er daadwerkelijk ruimte is in de agenda.

   Antwoord:
     { configured: true,  days: [ { date: "2026-08-26", times: ["09:00", ...] } ] }
     { configured: false }        agenda niet gekoppeld of tijdelijk onbereikbaar

   Bij configured:false bouwt de frontend zelf de vaste momenten op en
   bevestigen jullie handmatig. De bezoeker loopt dus nooit tegen een dood
   formulier aan, ook niet als Graph eruit ligt.
   ========================================================================== */

import { isConfigured, mailboxes, availabilityMode, graph, TIMEZONE, GraphError } from './_graph.js';
import { candidateSlots, blocksBySchedule, freeSlotsMulti, groupByDay, window_, HORIZON_DAYS } from './_slots.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  // Kort cachen: beschikbaarheid verandert niet per seconde, en dit scheelt
  // een Graph-aanroep per bezoeker.
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120');

  if (!isConfigured()) {
    return res.status(200).json({ configured: false, reason: 'not_configured' });
  }

  const now = new Date();
  const win = window_(now, HORIZON_DAYS);

  const boxes = mailboxes();

  try {
    // getSchedule accepteert meerdere mailboxen in een aanroep, dus de
    // agenda's van iedereen worden in een keer opgehaald.
    const schedule = await graph(
      `/users/${encodeURIComponent(boxes[0])}/calendar/getSchedule`,
      {
        method: 'POST',
        body: {
          schedules: boxes,
          startTime: { dateTime: win.start, timeZone: TIMEZONE },
          endTime: { dateTime: win.end, timeZone: TIMEZONE },
          availabilityViewInterval: 30
        }
      }
    );

    const free = freeSlotsMulti(
      candidateSlots(now, HORIZON_DAYS),
      blocksBySchedule(schedule, boxes),
      boxes,
      availabilityMode()
    );
    return res.status(200).json({ configured: true, days: groupByDay(free) });
  } catch (err) {
    // Bewust geen 500: de frontend valt terug op vaste tijden. Wel loggen,
    // zodat je in de Vercel-logs ziet dat de koppeling eruit ligt.
    // De mailboxen erbij: bij een 403 uit de Application Access Policy zegt
    // Exchange niet wélk adres geweigerd wordt, en dat is nu juist de vraag.
    console.error('slots: graph-aanroep mislukt',
      err instanceof GraphError
        ? { code: err.code, status: err.status, detail: err.detail, secret: err.hint,
            mailboxes: boxes, path: err.path, token: err.token, requestId: err.requestId }
        : err);
    return res.status(200).json({ configured: false, reason: 'graph_unavailable' });
  }
}
