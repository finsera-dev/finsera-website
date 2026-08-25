/* ==========================================================================
   Finsera — beschikbare momenten bepalen.

   Losse module zonder netwerk- of Graph-afhankelijkheid, zodat de logica
   met gewone tests te controleren is. Alles rekent in lokale wandkloktijd
   ("2026-08-26T09:00:00"), niet in UTC. Graph geeft zijn tijden ook in
   lokale tijd terug dankzij de Prefer-header, dus een stringvergelijking
   is genoeg en de zomertijdwissel gaat vanzelf goed.
   ========================================================================== */

// Momenten die we aanbieden, op werkdagen.
export const SLOT_TIMES = ['09:00', '10:00', '11:00', '13:30', '15:00', '16:00'];
export const SLOT_MINUTES = 30;

// Niets aanbieden binnen deze termijn: je wilt niet dat iemand een half uur
// van tevoren nog iets in je agenda zet.
export const LEAD_HOURS = 18;

// Hoeveel dagen vooruit we kijken.
export const HORIZON_DAYS = 21;

function pad(n) { return String(n).padStart(2, '0'); }

/** Lokale wandkloktijd als "YYYY-MM-DDTHH:mm:ss" — nooit via toISOString(),
 *  want die schuift naar UTC. */
export function localStamp(d) {
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
    'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}

export function dateKey(d) {
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

/** Alle kandidaat-momenten binnen het venster, vóór we de agenda raadplegen. */
export function candidateSlots(now, horizonDays) {
  const days = horizonDays || HORIZON_DAYS;
  const earliest = new Date(now.getTime() + LEAD_HOURS * 3600 * 1000);
  const out = [];

  for (let i = 0; i <= days; i++) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const dow = day.getDay();
    if (dow === 0 || dow === 6) continue;          // geen weekend

    for (const time of SLOT_TIMES) {
      const [h, m] = time.split(':').map(Number);
      const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m);
      if (start < earliest) continue;
      const end = new Date(start.getTime() + SLOT_MINUTES * 60000);
      out.push({
        date: dateKey(start),
        time,
        start: localStamp(start),
        end: localStamp(end)
      });
    }
  }
  return out;
}

/** Statussen die het moment blokkeren. 'free' en 'workingElsewhere' niet:
 *  bij die laatste is iemand bereikbaar, alleen niet op kantoor. */
const BLOCKING = new Set(['busy', 'oof', 'tentative']);

/** Zet de scheduleItems uit Graph om naar blokken lokale wandkloktijd. */
export function busyBlocks(scheduleResponse) {
  const blocks = [];
  const entries = (scheduleResponse && scheduleResponse.value) || [];
  for (const entry of entries) {
    for (const item of entry.scheduleItems || []) {
      const status = String(item.status || 'busy').toLowerCase();
      if (!BLOCKING.has(status)) continue;
      const s = item.start && item.start.dateTime;
      const e = item.end && item.end.dateTime;
      if (!s || !e) continue;
      // Graph hangt er soms fracties van seconden aan; die knippen we eraf
      // zodat de stringvergelijking blijft kloppen.
      blocks.push({ start: s.slice(0, 19), end: e.slice(0, 19) });
    }
  }
  return blocks;
}

/** Twee blokken overlappen als de een begint voordat de ander eindigt. */
export function overlaps(slot, block) {
  return slot.start < block.end && slot.end > block.start;
}

/** Kandidaten minus alles waar de agenda al vol zit. */
export function freeSlots(candidates, blocks) {
  return candidates.filter(slot => !blocks.some(b => overlaps(slot, b)));
}

/** Groepeer per dag, zodat de frontend zowel de eerstvolgende momenten als
 *  de maandkalender uit één antwoord kan opbouwen. */
export function groupByDay(slots) {
  const map = new Map();
  for (const s of slots) {
    if (!map.has(s.date)) map.set(s.date, []);
    map.get(s.date).push(s.time);
  }
  return Array.from(map, ([date, times]) => ({ date, times }));
}

/** Het venster dat we bij Graph opvragen. */
export function window_(now, horizonDays) {
  const days = horizonDays || HORIZON_DAYS;
  const from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const to = new Date(now.getFullYear(), now.getMonth(), now.getDate() + days + 1);
  return { start: localStamp(from), end: localStamp(to) };
}
