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
