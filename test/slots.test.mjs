import assert from 'node:assert/strict';
import {
  candidateSlots, busyBlocks, freeSlots, groupByDay, overlaps,
  localStamp, window_, SLOT_TIMES, LEAD_HOURS
} from '../api/_slots.js';

let pass = 0;
function t(naam, fn) {
  try { fn(); pass++; console.log('  ok  ' + naam); }
  catch (e) { console.log('  FOUT ' + naam + '\n       ' + e.message); process.exitCode = 1; }
}

console.log('\nlocalStamp — geen UTC-verschuiving');
t('middernacht blijft middernacht', () => {
  // toISOString() zou hier 2 uur terugschuiven in de zomer
  const d = new Date(2026, 7, 26, 0, 0, 0);
  assert.equal(localStamp(d), '2026-08-26T00:00:00');
});
t('enkele cijfers krijgen een nul', () => {
  assert.equal(localStamp(new Date(2026, 0, 5, 9, 5, 0)), '2026-01-05T09:05:00');
});

console.log('\ncandidateSlots');
t('geen weekend', () => {
  const now = new Date(2026, 7, 26, 8, 0);            // woensdag
  const dagen = new Set(candidateSlots(now, 14).map(s => new Date(s.start).getDay()));
  assert.ok(!dagen.has(0) && !dagen.has(6), 'zaterdag of zondag aangeboden');
});
t('respecteert de aanlooptijd van 18 uur', () => {
  const now = new Date(2026, 7, 26, 8, 0);
  const eerste = candidateSlots(now, 14)[0];
  const verschil = (new Date(eerste.start) - now) / 3600000;
  assert.ok(verschil >= LEAD_HOURS, `eerste moment na ${verschil.toFixed(1)}u, moet >= ${LEAD_HOURS}u`);
});
t('wo 20:00 + 18u = do 14:00, dus het eerste moment is do 15:00', () => {
  const now = new Date(2026, 7, 26, 20, 0);           // wo 20:00
  const eerste = candidateSlots(now, 14)[0];
  assert.equal(eerste.start, '2026-08-27T15:00:00');  // 18u later = do 14:00
});
t('duur is 30 minuten', () => {
  const s = candidateSlots(new Date(2026, 7, 26, 8, 0), 5)[0];
  assert.equal((new Date(s.end) - new Date(s.start)) / 60000, 30);
});
t('alle tijden komen uit SLOT_TIMES', () => {
  const tijden = new Set(candidateSlots(new Date(2026, 7, 26, 8, 0), 10).map(s => s.time));
  for (const x of tijden) assert.ok(SLOT_TIMES.includes(x), 'onbekende tijd ' + x);
});

console.log('\nzomertijd — de wissel valt op 25 oktober 2026');
t('rond de wissel blijft 09:00 gewoon 09:00', () => {
  const now = new Date(2026, 9, 22, 8, 0);            // do 22 okt
  const slots = candidateSlots(now, 6);
  const na = slots.filter(s => s.date === '2026-10-26');   // maandag ná de wissel
  assert.ok(na.length > 0, 'geen momenten op 26 oktober');
  assert.equal(na[0].start, '2026-10-26T09:00:00');
  assert.equal(na[0].end, '2026-10-26T09:30:00');
});

console.log('\nbusyBlocks');
const graphAntwoord = {
  value: [{
    scheduleId: 'oner@finsera.nl',
    scheduleItems: [
      { status: 'busy', start: { dateTime: '2026-08-27T09:00:00.0000000' }, end: { dateTime: '2026-08-27T10:00:00.0000000' } },
      { status: 'free', start: { dateTime: '2026-08-27T11:00:00.0000000' }, end: { dateTime: '2026-08-27T12:00:00.0000000' } },
      { status: 'oof', start: { dateTime: '2026-08-28T00:00:00.0000000' }, end: { dateTime: '2026-08-29T00:00:00.0000000' } },
      { status: 'workingElsewhere', start: { dateTime: '2026-08-31T09:00:00.0000000' }, end: { dateTime: '2026-08-31T17:00:00.0000000' } },
      { status: 'tentative', start: { dateTime: '2026-09-01T15:00:00.0000000' }, end: { dateTime: '2026-09-01T15:30:00.0000000' } }
    ]
  }]
};
t('fracties van seconden worden afgeknipt', () => {
  assert.equal(busyBlocks(graphAntwoord)[0].start, '2026-08-27T09:00:00');
});
t('free blokkeert niet', () => {
  assert.ok(!busyBlocks(graphAntwoord).some(b => b.start === '2026-08-27T11:00:00'));
});
t('workingElsewhere blokkeert niet — dan ben je wel bereikbaar', () => {
  assert.ok(!busyBlocks(graphAntwoord).some(b => b.start === '2026-08-31T09:00:00'));
});
t('busy, oof en tentative blokkeren wel', () => {
  const s = busyBlocks(graphAntwoord).map(b => b.start);
  assert.ok(s.includes('2026-08-27T09:00:00'));
  assert.ok(s.includes('2026-08-28T00:00:00'));
  assert.ok(s.includes('2026-09-01T15:00:00'));
});
t('leeg antwoord geeft geen blokken', () => {
  assert.deepEqual(busyBlocks({}), []);
  assert.deepEqual(busyBlocks({ value: [] }), []);
  assert.deepEqual(busyBlocks({ value: [{}] }), []);
});

console.log('\noverlaps — randgevallen');
t('aansluitend is geen overlap', () => {
  assert.equal(overlaps({ start: '2026-08-27T09:30:00', end: '2026-08-27T10:00:00' },
                        { start: '2026-08-27T09:00:00', end: '2026-08-27T09:30:00' }), false);
});
t('gedeeltelijke overlap telt', () => {
  assert.equal(overlaps({ start: '2026-08-27T09:00:00', end: '2026-08-27T09:30:00' },
                        { start: '2026-08-27T09:15:00', end: '2026-08-27T09:45:00' }), true);
});
t('slot volledig binnen een blok', () => {
  assert.equal(overlaps({ start: '2026-08-27T09:00:00', end: '2026-08-27T09:30:00' },
                        { start: '2026-08-27T08:00:00', end: '2026-08-27T17:00:00' }), true);
});

console.log('\nfreeSlots');
t('bezette momenten vallen af, vrije blijven', () => {
  const now = new Date(2026, 7, 26, 8, 0);
  const kandidaten = candidateSlots(now, 10);
  const vrij = freeSlots(kandidaten, busyBlocks(graphAntwoord));
  const heeft = (d, tijd) => vrij.some(s => s.date === d && s.time === tijd);
  assert.equal(heeft('2026-08-27', '09:00'), false, 'bezet 09:00 wordt nog aangeboden');
  assert.equal(heeft('2026-08-27', '11:00'), true, 'vrij 11:00 verdwenen');
  assert.equal(heeft('2026-08-28', '09:00'), false, 'hele dag oof wordt nog aangeboden');
  assert.equal(heeft('2026-08-31', '09:00'), true, 'workingElsewhere blokkeert onterecht');
  assert.equal(heeft('2026-09-01', '15:00'), false, 'tentative blokkeert niet');
});
t('zonder blokken blijft alles staan', () => {
  const k = candidateSlots(new Date(2026, 7, 26, 8, 0), 10);
  assert.equal(freeSlots(k, []).length, k.length);
});

console.log('\ngroupByDay');
t('groepeert per dag, in volgorde', () => {
  const g = groupByDay(freeSlots(candidateSlots(new Date(2026, 7, 26, 8, 0), 10), busyBlocks(graphAntwoord)));
  assert.ok(g.length > 0);
  assert.deepEqual(Object.keys(g[0]).sort(), ['date', 'times']);
  const datums = g.map(d => d.date);
  assert.deepEqual(datums, [...datums].sort(), 'dagen staan niet op volgorde');
  assert.ok(!g.some(d => d.times.length === 0), 'lege dag in de lijst');
});

console.log('\nwindow_');
t('venster begint vandaag en loopt voorbij de horizon', () => {
  const w = window_(new Date(2026, 7, 26, 14, 30), 21);
  assert.equal(w.start, '2026-08-26T00:00:00');
  assert.equal(w.end, '2026-09-17T00:00:00');
});

console.log(`\n${pass} controles geslaagd${process.exitCode ? ' — MET FOUTEN' : ''}\n`);
