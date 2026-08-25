# finsera.nl

Statische website, zonder buildstap. HTML, CSS en vanilla JS; gehost op Vercel.

## Lokaal draaien

De bestanden werken niet goed als je ze dubbelklikt — paden en `localStorage`
gedragen zich dan anders. Start een servertje vanuit de projectmap:

```bash
python3 -m http.server 8000   # of: npx serve .
```

Open daarna http://localhost:8000.

Let op: `/api/contact` draait alleen op Vercel. Lokaal mislukt het versturen
daarom altijd, en toont het formulier het e-mailadres als terugvaloptie. Dat is
correct gedrag, geen bug. Wil je de hele flow lokaal testen, gebruik dan
`vercel dev`.

## Environment variables

**Zonder deze drie komt er geen enkele aanvraag binnen.** Instellen in Vercel
onder Project → Settings → Environment Variables, voor zowel Production als
Preview:

| Variabele | Waarde | Waarvoor |
|---|---|---|
| `RESEND_API_KEY` | API-sleutel van [resend.com](https://resend.com) | Verzending van de e-mail |
| `FROM_EMAIL` | `Finsera <website@finsera.nl>` | Afzender; het domein moet in Resend geverifieerd zijn |
| `NOTIFY_EMAIL` | `info@finsera.nl` | Waar de aanvraag heen gaat |

Ontbreekt er één, dan geeft `api/contact.js` bewust een 503 terug in plaats van
te doen alsof het gelukt is. De bezoeker krijgt dan het e-mailadres te zien.

Test na elke deploy één keer het formulier en kijk of de mail écht aankomt —
ook in de spammap.

## Structuur

```
index.html, Over.html, Diensten.html,     de pagina's
Cases.html, Blog.html, Contact.html
Privacyverklaring.html, 404.html
api/contact.js                            serverless function voor het formulier
css/styles.css                            alle styling
css/fonts.css                             @font-face voor de self-hosted fonts
fonts/                                    Inter + Space Grotesk (woff2, variabel)
js/app.js                                 home + Diensten: i18n en widgets
js/shared.js                              nav, footer, taalwissel op overige pagina's
js/contact.js                             agenda en formulier
js/reveal.js                              scroll-animaties
img/team/                                 portretfoto's (4:5 of 3:4, JPEG)
img/og-finsera.jpg                        deelafbeelding voor LinkedIn
```

## Teksten wijzigen

De site is tweetalig. Teksten staan niet in de HTML maar in
vertaalwoordenboeken; de HTML bevat alleen de Nederlandse variant als
terugval.

- **Home en Diensten**: `js/app.js`, bovenin in `var I18N = { nl: {...}, en: {...} }`
- **Overige pagina's**: onderin de pagina zelf, in `window.FINSERA_PAGE`
- **Navigatie en footer**: `js/shared.js`, in `var SHARED`

Voeg je een sleutel toe, doe dat dan in **beide** talen — anders valt de site
in die taal terug op een lege string.

## Fonts

Inter en Space Grotesk worden vanaf het eigen domein geladen, niet vanaf
Google. Dat is bewust: Google Fonts stuurt het IP-adres van elke bezoeker naar
Google, wat in Nederland een AVG-pijnpunt is. Beide zijn variabele fonts, dus
één bestand per subset dekt alle gewichten.

Wil je een gewicht of subset toevoegen, vervang dan de bestanden in `fonts/` en
werk de `unicode-range` in `css/fonts.css` bij.

## Nog open

- **Casepagina's** bestaan niet; "Bespreek jouw situatie" op Cases.html wijst
  daarom naar Contact.
- **Engelse versie** heeft geen eigen URL's en geen `hreflang`, en wordt dus
  niet door Google geïndexeerd. Vereist `/en/`-pagina's.
- **Algemene voorwaarden** zijn er niet; de link is uit de footer gehaald.
- **Reviews**: de sectie is van de homepage gehaald tot er echte,
  klant-goedgekeurde citaten zijn.
- **Blogartikel** in `blog/` is een concept en moet nog een redactieslag
  krijgen op toon en voorbeelden.
- **De agenda op Contact is niet gekoppeld.** De tijdsloten in
  `js/contact.js` (`SLOTS`) zijn hardcoded en altijd beschikbaar op
  werkdagen. Zolang dat zo is, kan iemand een moment kiezen waarop je al
  bezet bent. Een koppeling met Cal.com of Google Calendar lost dat op.

## Een blogartikel toevoegen

Kopieer `blog/dashboard-lost-je-rapportageprobleem-niet-op.html`, pas de
titel, meta-tags, canonical, datum en inhoud aan, en voeg een kaart toe in de
`.bl-list` van `Blog.html`. Zet de nieuwe URL ook in `sitemap.xml`.
