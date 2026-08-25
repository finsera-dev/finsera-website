# Deployment

De site staat op Vercel (team `finsera`, project `finsera-website`) en is
gekoppeld aan deze GitHub-repository. Er is geen handmatige stap: elke push
naar GitHub wordt automatisch gebouwd en uitgerold.

## Welke branch komt waar terecht

| Branch          | Wat er gebeurt                                   | URL |
| --------------- | ------------------------------------------------ | --- |
| `main`          | **Productie** — dit is de live site               | `finsera-website.vercel.app` (+ het gekoppelde domein) |
| elke andere branch | **Preview** — een losse omgeving per branch    | `finsera-website-git-<branch>-finsera.vercel.app` |

`main` is de deploy-branch. Publiceren doe je dus niet door ergens op een knop
te drukken, maar door werk naar `main` te mergen. Binnen ongeveer een minuut na
de merge staat het live.

De gebruikelijke gang van zaken:

1. Werk op een aparte branch (`claude/...`, `feature/...`, maakt niet uit).
2. Push die branch. Vercel bouwt automatisch een preview en zet de status bij
   de commit en bij een eventuele pull request.
3. Bekijk de preview-URL, keur goed.
4. Merge naar `main` → productie-deploy.

## Previews zijn afgeschermd

Op het project staat Vercel Authentication aan voor alles behalve het eigen
domein. Preview-URL's zijn dus alleen te openen als je bent ingelogd op een
Vercel-account met toegang tot het team `finsera`. Wil je een preview met
iemand buiten het team delen, dan kan dat op twee manieren: die persoon
toevoegen aan het Vercel-team, of de beveiliging omzetten naar
wachtwoordbeveiliging (Project Settings → Deployment Protection).

## Terugdraaien

Ging er iets mis in productie, dan hoef je niet te wachten op een nieuwe build:
open het project in Vercel, ga naar Deployments, kies de vorige goede
productie-deploy en gebruik **Rollback** ("Promote to Production"). Herstel
daarna alsnog de fout in `main`, anders zet de volgende merge de kapotte versie
er weer overheen.

## Wat `vercel.json` doet

De site is platte HTML/CSS/JS: geen build-stap, geen framework. Daarom staan
`framework`, `buildCommand` en `installCommand` op `null` en is
`outputDirectory` de repo-root. Vercel zet de bestanden dus rechtstreeks op het
CDN.

Wil je voor een specifieke branch géén deploy laten maken (scheelt builds), dan
kan dat in `vercel.json`:

```json
"git": {
  "deploymentEnabled": {
    "naam-van-de-branch": false
  }
}
```

Branches die er niet in staan blijven gewoon deployen.

## Instellingen die alleen in het dashboard kunnen

Een paar dingen staan niet in deze repo maar in Vercel zelf
(vercel.com/finsera/finsera-website/settings):

- **Production Branch** (Settings → Git) — nu `main`. Wil je een andere
  deploy-branch, bijvoorbeeld `production`, dan wijzig je dat hier.
- **Domains** (Settings → Domains) — waar `finsera.nl` aan het project hangt.
- **Environment Variables** — de sleutels die de formulier- en agenda-koppeling
  nodig hebben. Zet ze voor zowel Production als Preview, anders werkt een
  preview van die functionaliteit niet.
