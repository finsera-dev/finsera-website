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

import { isConfigured, organizer, graph, TIMEZONE, GraphError } from './_graph.js';
import { candidateSlots, busyBlocks, freeSlots, groupByDay, window_, HORIZON_DAYS } from './_slots.js';

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

  try {
    const schedule = await graph(
      `/users/${encodeURIComponent(organizer())}/calendar/getSchedule`,
      {
        method: 'POST',
        body: {
          schedules: [organizer()],
          startTime: { dateTime: win.start, timeZone: TIMEZONE },
          endTime: { dateTime: win.end, timeZone: TIMEZONE },
          availabilityViewInterval: 30
        }
      }
    );

    const free = freeSlots(candidateSlots(now, HORIZON_DAYS), busyBlocks(schedule));
    return res.status(200).json({ configured: true, days: groupByDay(free) });
  } catch (err) {
    // Bewust geen 500: de frontend valt terug op vaste tijden. Wel loggen,
    // zodat je in de Vercel-logs ziet dat de koppeling eruit ligt.
    console.error('slots: graph-aanroep mislukt',
      err instanceof GraphError ? { code: err.code, status: err.status, detail: err.detail } : err);
    return res.status(200).json({ configured: false, reason: 'graph_unavailable' });
  }
}
