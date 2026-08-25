# Tests

Draaien zonder installatie of netwerk; Microsoft Graph wordt nagebouwd.

```bash
cd test
TZ=Europe/Amsterdam node slots.test.mjs   # slotlogica, zomertijd, overlap
TZ=Europe/Amsterdam node api.test.mjs     # /api/slots en /api/book, incl. faalpaden
```

`TZ=Europe/Amsterdam` is nodig: de logica rekent in lokale wandkloktijd, en
de tests controleren onder andere de zomertijdwissel van 25 oktober 2026.

De faalpaden zijn het belangrijkst. Ze bewaken dat een bezoeker nooit een
bevestiging ziet voor een afspraak die nergens staat.
