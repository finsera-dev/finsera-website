# Teamfoto's

| Bestandsnaam                  | Persoon            |
|-------------------------------|--------------------|
| `oner-yucel.jpg`              | Öner Yücel         |
| `tomas-van-der-laan.jpg`      | Tomas van der Laan |

**Specificaties**

- Staand, 4:5 of 3:4 (de huidige bestanden zijn 720 × 964).
- **JPEG, niet PNG.** Een portret als PNG is al snel 1 MB; als JPEG op
  kwaliteit 82 is hetzelfde beeld ongeveer 58 KB. Houd het onder de 150 KB.
- Gezicht in de bovenste helft van het kader — de CSS croppt naar 4:5 met
  `object-position: center 18%`.
- Rustige, lichte achtergrond past het best bij de warme beige sectie.

Deze foto's worden op twee plekken gebruikt: de team-sectie op de homepage en
de kaarten op Over Finsera. Vervang je er één, dan verandert hij op beide.

Zolang een bestand ontbreekt, verwijdert de `<img>` zichzelf via `onerror` en
valt de kaart terug op het kleurverloop met initialen. De layout blijft dus
altijd heel.
