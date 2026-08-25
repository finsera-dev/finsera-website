# finsera.nl

Statische website, zonder buildstap. HTML, CSS en vanilla JS; gehost op Vercel.

## Lokaal draaien

De bestanden werken niet goed als je ze dubbelklikt — paden en `localStorage`
gedragen zich dan anders. Start een servertje vanuit de projectmap:

```bash
python3 -m http.server 8000   # of: npx serve .
```

Open daarna http://localhost:8000.

Let op: `/api/slots` en `/api/book` draaien alleen op Vercel. Lokaal komt er
geen agenda binnen en valt de pagina terug op vaste tijden; het versturen
mislukt en toont het e-mailadres. Dat is correct gedrag, geen bug. Wil je de
hele flow lokaal testen, gebruik dan `vercel dev`.

## Environment variables

Instellen in Vercel onder Project → Settings → Environment Variables, voor
zowel Production als Preview.

### Agendakoppeling (Microsoft 365)

| Variabele | Waarde |
|---|---|
| `MS_TENANT_ID` | Directory (tenant) ID uit Azure |
| `MS_CLIENT_ID` | Application (client) ID van de app-registratie |
| `MS_CLIENT_SECRET` | Client secret van die app-registratie |
| `MS_ORGANIZER_UPN` | De mailbox waarin de afspraken landen, bijv. `oner@finsera.nl` |
| `MS_ALSO_UPNS` | Optioneel. Extra agenda's die meewegen, komma-gescheiden |
| `MS_AVAILABILITY_MODE` | Optioneel. `all` (iedereen vrij, standaard) of `any` (ten minste een) |

Zonder deze vier valt de site terug op vaste tijden met handmatige
bevestiging. Dat is geen storing; het formulier blijft gewoon werken.

### Mail (terugval)

| Variabele | Waarde |
|---|---|
| `RESEND_API_KEY` | API-sleutel van [resend.com](https://resend.com) |
| `FROM_EMAIL` | `Finsera <website@finsera.nl>`; domein geverifieerd in Resend |
| `NOTIFY_EMAIL` | `info@finsera.nl` |

Ontbreken agenda én mail, dan geeft `api/book.js` bewust een 503 terug en
toont het formulier het e-mailadres. Nooit een valse bevestiging.

## Azure: de app-registratie opzetten

Eenmalig, ongeveer twintig minuten. Een uitgebreidere klikroute met
foutentabel staat op de gedeelde setup-pagina; hieronder de korte versie.

1. **Azure Portal → Microsoft Entra ID → App registrations → New
   registration.** Naam bijvoorbeeld `Finsera website booking`. Geen redirect
   URI nodig — de site logt niet namens een gebruiker in.
2. Noteer op de overzichtspagina de **Application (client) ID** en de
   **Directory (tenant) ID**.
3. **Certificates & secrets → New client secret.** Kopieer de waarde meteen;
   hij is daarna niet meer op te vragen. Zet een herinnering voor de
   vervaldatum, want daarna stopt de koppeling zonder waarschuwing.
4. **API permissions → Add a permission → Microsoft Graph → Application
   permissions → `Calendars.ReadWrite`.** Daarna **Grant admin consent**.
   Let op: kies *Application*, niet *Delegated*.
5. **Beperk de reikwijdte.** Een application permission geeft standaard
   toegang tot élke mailbox in de tenant. Beperk dat in Exchange Online
   PowerShell tot de mailbox uit `MS_ORGANIZER_UPN`:

   ```powershell
   New-ApplicationAccessPolicy -AppId <MS_CLIENT_ID> `
     -PolicyScopeGroupId oner@finsera.nl `
     -AccessRight RestrictAccess -Description "Finsera website booking"
   ```

   Sla deze stap niet over. Zonder policy kan de app bij alle agenda's in de
   organisatie.
6. Zet de vier variabelen in Vercel en deploy.
7. **Test het.** Open `https://www.finsera.nl/api/slots` in de browser. Staat er `"configured":
   true` met dagen erin, dan werkt de koppeling. Staat er `false`, kijk dan
   in de Vercel-logs — daar staat waaróm.

### Een of meerdere agenda's

Zonder `MS_ALSO_UPNS` kijkt de site naar een agenda. Zet je er meer in, dan
worden ze in dezelfde Graph-aanroep meegenomen en bepaalt
`MS_AVAILABILITY_MODE` wat er gebeurt:

- **`all`** (standaard) — alleen momenten waarop iedereen vrij is. De afspraak
  komt in de agenda van `MS_ORGANIZER_UPN`, de anderen worden uitgenodigd.
  Past bij de contactpagina, die de foto's van beiden toont.
- **`any`** — momenten waarop ten minste een van jullie kan. De afspraak komt
  in de agenda van degene die op dat moment vrij is.

### Hoe de beschikbaarheid tot stand komt

`api/_slots.js` biedt op werkdagen 09:00, 10:00, 11:00, 13:30, 15:00 en 16:00
aan, telkens 30 minuten, met 18 uur aanlooptijd en 21 dagen vooruit. Daar
gaat alles vanaf wat in de agenda staat als *busy*, *tentative* of *out of
office*. *Working elsewhere* blokkeert niet — dan ben je wel bereikbaar. Wil
je andere tijden, pas `SLOT_TIMES` aan.

Bij het boeken wordt nog één keer gecontroleerd of het moment vrij is, zodat
twee mensen die tegelijk boeken niet in hetzelfde half uur belanden.

Alles rekent in lokale wandkloktijd, niet in UTC. Graph geeft zijn tijden ook
lokaal terug dankzij de `Prefer`-header, waardoor de zomertijdwissel vanzelf
goed gaat.

## Tests

```bash
cd test
TZ=Europe/Amsterdam node slots.test.mjs
TZ=Europe/Amsterdam node api.test.mjs
```

Geen installatie of netwerk nodig; Microsoft Graph wordt nagebouwd. De
faalpaden zijn het belangrijkst: die bewaken dat een bezoeker nooit een
bevestiging ziet voor een afspraak die nergens staat.

## Structuur

```
index.html, Over.html, Diensten.html,     de pagina's
Cases.html, Blog.html, Contact.html
Privacyverklaring.html, 404.html
api/slots.js                              beschikbare momenten uit de agenda
api/book.js                               afspraak inplannen (of mailen)
api/_graph.js                             Microsoft Graph: token en aanroepen
api/_slots.js                             slotlogica, los testbaar
test/                                     tests, zonder netwerk
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

## Domein

De site draait op **www.finsera.nl**. Alle canonicals, Open Graph-URL's,
`sitemap.xml`, `robots.txt` en de JSON-LD verwijzen daarnaar.

De apex `finsera.nl` is in Vercel niet aan dit project gekoppeld. Zolang dat
zo is, komt iemand die `finsera.nl` intypt nergens uit. Koppel de apex in
Vercel en zet hem op redirect naar www; dan sluit alles op elkaar aan.

Verander je ooit van kant, pas dan alle vier de plekken tegelijk aan —
canonicals, OG-tags, sitemap en robots. Een canonical die iets anders zegt
dan de redirect is slechter dan geen canonical.

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

## Een blogartikel toevoegen

Kopieer `blog/dashboard-lost-je-rapportageprobleem-niet-op.html`, pas de
titel, meta-tags, canonical, datum en inhoud aan, en voeg een kaart toe in de
`.bl-list` van `Blog.html`. Zet de nieuwe URL ook in `sitemap.xml`.
