# Teamfoto's

Plaats hier de twee portretfoto's voor de team-sectie op de homepage:

| Bestandsnaam                  | Persoon            |
|-------------------------------|--------------------|
| `oner-yucel.jpg`              | Öner Yücel         |
| `tomas-van-der-laan.jpg`      | Tomas van der Laan |

**Specificaties**

- Verhouding **4:5** staand (bijv. 640 × 800 px, of 1280 × 1600 px voor retina).
- JPEG, kwaliteit ~80, streef naar < 150 KB per foto.
- Gezicht in de bovenste helft van het kader — de CSS croppt met
  `object-position: center 18%`.
- Rustige, lichte achtergrond past het best bij de warme beige sectie.

Zolang een bestand ontbreekt, verwijdert de `<img>` zichzelf via `onerror` en
valt de kaart terug op het kleurverloop met initialen. De layout blijft dus
altijd heel.
