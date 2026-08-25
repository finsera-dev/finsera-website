/* ==========================================================================
   Finsera — bezette blokken per mailbox ophalen, met terugvalroute.

   Eerste keus is getSchedule: één aanroep voor alle mailboxen tegelijk.
   Maar getSchedule is een samengestelde aanroep waar de Application Access
   Policy (RAOP) in Exchange slecht mee overweg kan: er zijn tenants waar
   die 'm blijft weigeren terwijl Test-ApplicationAccessPolicy "Granted"
   zegt en gewoon agenda-lezen prima werkt. Daarom valt deze module bij een
   403 terug op calendarView per mailbox — zelfde informatie, andere route.

   Geeft terug: { via, byMailbox, geweigerd? }
     via        'getSchedule' of 'calendarView' — voor in de logs
     byMailbox  { "oner@...": [{start,end}], ... }
     geweigerd  de 403 van getSchedule, wanneer de terugval is gebruikt
   ========================================================================== */

import { graph, GraphError, TIMEZONE } from './_graph.js';
import { blocksBySchedule, blocksFromEvents, localStamp } from './_slots.js';

export async function busyByMailbox(boxes, start, end) {
  try {
    const schedule = await graph(
      `/users/${encodeURIComponent(boxes[0])}/calendar/getSchedule`,
      {
        method: 'POST',
        body: {
          schedules: boxes,
          startTime: { dateTime: start, timeZone: TIMEZONE },
          endTime: { dateTime: end, timeZone: TIMEZONE },
          availabilityViewInterval: 30
        }
      }
    );
    return { via: 'getSchedule', byMailbox: blocksBySchedule(schedule, boxes) };
  } catch (err) {
    // Alleen bij een 403 is de omweg zinvol; al het andere (token stuk,
    // Graph plat) treft calendarView net zo hard.
    if (!(err instanceof GraphError) || err.status !== 403) throw err;

    const byMailbox = {};
    for (const box of boxes) {
      byMailbox[box] = blocksFromEvents(await calendarView(box, start, end));
    }
    return { via: 'calendarView', byMailbox, geweigerd: err };
  }
}

async function calendarView(box, start, end) {
  // Zonder offset leest Graph deze parameters als UTC; het venster een dag
  // oprekken aan beide kanten dekt het verschil met Amsterdam ruimschoots.
  // Items buiten het echte venster overlappen toch nergens mee.
  let path = `/users/${encodeURIComponent(box)}/calendarView` +
    `?startDateTime=${encodeURIComponent(plusDays(start, -1))}` +
    `&endDateTime=${encodeURIComponent(plusDays(end, 1))}` +
    '&$select=start,end,showAs,isCancelled&$top=100';

  const items = [];
  // Paginering met een harde grens: 2000 items in drie weken komt niet voor.
  for (let i = 0; path && i < 20; i++) {
    const page = await graph(path);
    items.push(...(page.value || []));
    path = page['@odata.nextLink'] || null;
  }
  return items;
}

function plusDays(stamp, n) {
  const [datum, tijd] = stamp.split('T');
  const [y, mo, d] = datum.split('-').map(Number);
  const [h, mi, s] = tijd.split(':').map(Number);
  return localStamp(new Date(y, mo - 1, d + n, h, mi, s));
}
