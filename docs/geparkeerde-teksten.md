# Geparkeerde teksten

Teksten die van een pagina zijn gehaald maar bewaard blijven voor mogelijk
hergebruik. Ze staan hier woordelijk, met de plek waar ze vandaan komen en de
i18n-sleutel waaronder ze eventueel nog in de code staan.

---

## Openingsalinea "Over ons"

**Vandaan:** `over.html`, de alinea onder de bannerhero (`section.over-lead`).
**Weggehaald op:** 26 augustus 2026, op verzoek van de eigenaar.
**Sleutel:** `intro`, staat nog in `window.FINSERA_PAGE` in `over.html` (NL en EN).

### Nederlands

> Finsera is opgericht vanuit een ongebruikelijke combinatie: jarenlange
> ervaring met compliance en interne beheersing, hands-on ondernemerschap, en
> een accountancy-achtergrond in audit en rapportage. Precies het snijvlak waar
> groeiende bedrijven vastlopen: tussen de cijfers, de processen en de
> technologie.

### Engels

> Finsera was founded from an unusual combination: years of experience with
> compliance and internal control, hands-on entrepreneurship, and an
> accountancy background in audit and reporting. Exactly the intersection where
> growing companies get stuck: between the numbers, the processes and the
> technology.

### Terugzetten

De sleutel `intro` bestaat nog in beide woordenlijsten, dus terugzetten is een
kwestie van het element opnieuw plaatsen:

```html
<p data-i18n="intro">Finsera is opgericht vanuit een ongebruikelijke combinatie: …</p>
```

Wordt de tekst ergens anders gebruikt, verplaats de sleutel dan mee naar de
woordenlijst van die pagina, of naar `js/shared.js` als hij op meerdere
pagina's terugkomt.

---

## Missie en "Hoe we werken" — "Over ons"

**Vandaan:** `over.html`, het tweeluik `section.over-band` tussen de bannerhero
en het team.
**Weggehaald op:** 28 augustus 2026, bij de SEO/GEO-herbouw van de pagina. De
sectie "Waar we in geloven" heeft die plek overgenomen.
**Sleutels:** `missionLabel`, `mission`, `howLabel`, `how` — staan nog in
`window.FINSERA_PAGE` in `over.html` (NL en EN).

### Missie

> Wij stellen middelgrote bedrijven in staat om strategisch te leiden — niet
> tactisch te micromanagen — door heldere financiële inzichtelijkheid,
> intelligente dashboards en AI-gedreven automatisering die de dagelijkse
> operatie transformeert.

### Hoe we werken

> Wij geloven dat goede managementrapportage leidt tot betere besluiten. Een
> goed dashboard is geen gadget, maar een professioneel systeem om vanaf hoger
> niveau naar je bedrijf te kijken — in plaats van dagelijks brandjes te
> blussen. Van chaos naar strategische helderheid en slimme uitvoering.

## Teamkop "Bewust boutique."

**Vandaan:** `over.html`, de kop boven de teamsectie.
**Vervangen door:** "Wie doet het werk?" — een vraag, zodat de sectie een
citeerbaar antwoord vormt.
**Sleutel:** `teamHeading`, staat nog in beide woordenlijsten.

## Doelgroepkaartje onder de herofoto

**Vandaan:** `index.html`, het zwevende kaartje onder de foto in de hero.
**Tekst:** "Voor groeiende bedrijven · 10–50 medewerkers · €10M–€50M omzet"
**Waarom weg:** het is een filter, geen belofte. In een campagne op warme leads
werkt zo'n regel vooral tegen: wie er net buiten valt, haakt zelf af. Het
antwoord staat bovendien al in de veelgestelde vragen en op Over ons, en het
omzetbereik klopte niet meer met de rest van de site (daar €5M–€100M).
**Sleutel:** `heroTrust`, staat nog in beide woordenlijsten in `js/app.js`.
De machineleesbare doelgroep zit onveranderd in het `BusinessAudience`-schema,
dus voor zoekmachines verandert er niets.
