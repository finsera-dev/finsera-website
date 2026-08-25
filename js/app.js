/* ==========================================================================
   Finsera — Home interactivity + NL/EN i18n
   Ported from Home.dc.html (DCLogic prototype) to vanilla JS.
   ========================================================================== */
(function () {
  'use strict';

  /* --------------------------------------------------------------- i18n --- */
  var I18N = {
    nl: {
      navHome: 'Home', navOver: 'Over Finsera', navDiensten: 'Diensten', navCases: 'Cases', navBlog: 'Blog', navCta: 'Vraag de diagnose aan',
      cta: 'Vraag de diagnose aan',
      diagCta: 'Vraag de diagnose aan',
      diagEyebrowTop: 'Zo starten we · de diagnose',
      diagBespoke: 'De diagnose bepaalt wat jóuw bedrijf nodig heeft — en in welke volgorde.',
      svcShortIntro: 'Eerst grip op je cijfers met dashboards en managementrapportage. Daarna gerichte automatisering, op een fundament dat klopt.',
      svcBespoke: 'Geen generieke tool past feilloos op jouw bedrijf. Daarom bouwen we alles op maat: op jouw systemen, jouw processen en jouw definities.',
      svc1Short: 'Van losse exports en Excel-lijsten naar één betrouwbare bron van waarheid. Finance, directie en operatie kijken naar dezelfde cijfers en sturen op wat er toe doet.',
      svc2Short: 'Pas als het fundament staat, automatiseren we gericht wat tijd kost en steeds terugkomt — met oog voor privacy, betrouwbaarheid en menselijk toezicht.',
      svcMore: 'Meer over onze diensten',
      svc1More: 'Bekijk deze dienst', svc2More: 'Bekijk deze dienst',
      dienstenPageEyebrow: 'Onze diensten', dienstenPageTitle: 'Diensten',
      dienstenPageIntro: 'Eén diagnose als startpunt, plus twee diensten die op elkaar voortbouwen. Hieronder in detail wat je van elk mag verwachten.',
      routeSectionEyebrow: 'Onze aanpak', routeSectionTitle: 'Van diagnose naar fundament naar AI.',
      heroEyebrow: 'Financiële rapportage, dashboards en automatisering voor groeiend MKB',
      heroH1a: 'Grip op je cijfers', heroH1b: 'Ruimte om strategisch te leiden',
      heroSub: 'Finsera helpt groeiende middelgrote bedrijven hun financiële sturing professionaliseren: van betrouwbare managementrapportage en realtime dashboards tot AI-gedreven automatisering.',
      heroSubLead: 'Eerst grip op het fundament. Daarna de hefboom van AI en automatisering.',
      heroCta1: 'Vraag de diagnose aan',
      heroTrust: 'Voor groeiende bedrijven · 10–50 medewerkers · €10M–€50M omzet',
      nDatabron: 'Databron', nRapport: 'Rapportage', nDetail: 'Detailniveau', nDashboard: 'Dashboard', live: 'live',
      detailLow: 'samenvatting', detailHigh: 'detail',
      mOmzet: 'Omzet', mMarge: 'Marge', mCashflow: 'Cashflow', mKlanten: 'Klanten', mVerzuim: 'Verzuim',
      cfIn: 'Instroom', cfOut: 'Uitstroom', cfCum: 'Cumulatief',
      custNew: 'Nieuw', custReturning: 'Terugkerend',
      target: 'Doel', benchmark: 'Benchmark',
      varActual: 'Actueel', varBudget: 'Budget', varPrior: 'Vorig jr', varVsBudget: 'vs. budget',
      denomOmzet: 'Omzet per klant', denomMarge: 'Marge per lijn', denomCashflow: 'DSO (dagen)', denomKlanten: 'Omzet per klant', denomVerzuim: 'Verzuim per FTE',
      painEyebrow: 'Herken je dit?',
      painHeading: 'Vier signalen dat je organisatie haar financiële structuur is ontgroeid.',
      painLeadsTo: 'Waar dit toe leidt',
      bridge: 'Finsera lost deze problemen niet op met nóg een tool, maar door je financiële fundament opnieuw in te richten.',
      aanpakEyebrow: 'Onze aanpak',
      aanpakHeading: 'Eerst grip op je fundament. Daarna slim automatiseren.',
      aanpakIntro: 'We bouwen een financieel fundament dat met je organisatie meegroeit. Geen losse dashboards of AI-proefjes, maar één samenhangende aanpak die rust en overzicht brengt, afgestemd op waar je nu staat.',
      route1Title: 'Diagnose', route1Benefit: 'Een uitvoerbaar adviesrapport', route1Desc: 'We brengen cijfers, processen en datastromen in kaart, en maken het verschil zichtbaar tussen hoe het nu werkt en hoe het zou moeten.',
      route2Title: 'Dashboard & rapportage', route2Benefit: 'Grip op je fundament', route2Desc: 'We brengen je databronnen samen tot één betrouwbare bron van waarheid, zodat je kunt sturen op cijfers die kloppen.',
      route3Title: 'AI-strategie', route3Benefit: 'Efficiënter werken met AI', route3Desc: 'Pas als de basis klopt, automatiseren we gericht wat tijd kost en steeds terugkomt, zodat je team tijd overhoudt.', diagTitle: 'Diagnose & strategisch adviesrapport',
      diagBenefit: 'Een concreet plan voor direct meer grip',
      diagBodyShort: 'In de diagnose brengen we haarscherp in beeld hoe je financiële sturing nu is ingericht: cijfers, processen, systemen en datastromen.',
      diagBodyMore: 'We leggen de huidige situatie naast de gewenste, en laten zien waar het schuurt, wat dat kost en hoe dashboard en managementrapportage beter aansluiten op je doelen. Geen dik rapport voor in de la, maar een direct toepasbaar plan waar finance, directie en IT meteen mee verder kunnen.',
      diagReadMore: 'Meer lezen', diagReadLess: 'Minder lezen',
      diagCheck1: 'Binnen 2–4 weken', diagCheck2: 'Verwachtingen en scope vooraf vastgelegd', diagCheck3: 'Concrete quick wins én prioriteiten', diagCheck4: 'Direct toepasbaar',
      dienstenEyebrow: 'Onze diensten', dienstenHeading: 'Twee diensten die op elkaar voortbouwen.',
      svc1Title: 'Dashboard & managementrapportage', svc1Benefit: 'Grip op je fundament',
      svc1Intro: 'Van losse exports en Excel-lijsten naar één betrouwbare bron van waarheid. We brengen financiële én niet-financiële data samen en geven er betekenis aan, zodat finance, directie en operatie naar dezelfde cijfers kijken. Je weet direct waar het goed gaat en waar bijsturen nodig is.',
      dashTitle: 'Het dashboard', dashTag: 'dagelijks · wekelijks', dashRealtime: 'realtime', dashTrend: 'Omzettrend',
      dashText: 'Een realtime overzicht om dagelijks op te sturen. Het toont in één oogopslag de KPI’s die er voor jou toe doen, afgestemd op jouw rol. Je bent niet langer afhankelijk van anderen; je ziet zelf direct of de organisatie in control is.',
      dashK1: 'Omzet', dashK2: 'Brutomarge', dashK3: 'Omloopsnelheid', dashK4: 'Bezoekers',
      brkOmzet: 'Omzet per land', brkMarge: 'Marge per land', brkBezoekers: 'Bezoekers per land',
      repTitle: 'De managementrapportage', repTag: 'maandelijks · per kwartaal',
      repText: 'Financiële cijfers verrijkt met operationele data. We maken het verband zichtbaar: hoeveel verstuurde offertes leiden tot welke omzet? We rapporteren tegen een heldere norm. Zo stuur je op de afwijkingen die er toe doen, in plaats van te zoeken in een dik rapport.',
      repCardTitle: 'Managementrapportage', repTabTable: 'Tabel', repTabChart: 'Grafiek', repDate: 'maart 2026',
      repFin: 'Financieel', repNonfin: 'Niet-financieel', repActual: 'Actueel', repNorm: 'Norm', repDelta: 'Δ', repTrendCol: 'Trend',
      rOmzet: 'Omzet', rBruto: 'Brutomarge', rKosten: 'Kosten', rResultaat: 'Resultaat',
      rBezoekers: 'Bezoekers', rOffertes: 'Offertes', rConversie: 'Conversie', rVerzuim: 'Ziekteverzuim',
      srcLabel: 'Samengebracht uit:', src1: 'Boekhouding / ERP', src2: 'CRM', src3: 'WMS / voorraad', src4: 'HR / verzuim', src5: 'klantfeedback',
      toolsLabel: 'Waarmee we werken', tool4: 'Maatwerk / ERP',
      svc1Foot: 'Heb je het dashboard al, maar ontbreekt de betrouwbare rapportage eronder? Of andersom? Dan starten we daar. We bouwen voort op wat er al is en herstellen wat niet klopt.',
      svc2Title: 'AI-strategie', svc2Benefit: 'Efficiënter werken met AI',
      svc2IntroShort: 'Goede automatisering begint niet bij een tool, maar bij je proces. Omdat we je processen in de diagnose al hebben doorgrond, zien we exact waar AI écht waarde toevoegt. We vertalen dit direct naar de werkvloer: we bouwen concrete workflows samen met je team, in plaats van een adviesrapport op afstand.',
      svc2IntroMore: 'We focussen op repeterend handwerk. Door dat te automatiseren houdt je team tijd over voor analyse en strategisch advies, het werk waar mensen het verschil maken. Juist nu regelgeving strenger wordt en de concurrentie scherper, loont het om dit doordacht aan te pakken. Geen losse experimenten, maar doordachte en bewezen oplossingen. We bouwen binnen een helder beleid met scherp oog voor privacy, betrouwbaarheid en menselijk toezicht.',
      aiUseHeading: 'Waar levert AI het snelst op?',
      ai1Title: 'Facturen en administratie', ai1Desc: 'Minder repeterend invoer- en controlewerk.',
      ai2Title: 'Rapportage en controles', ai2Desc: 'Sneller klaargezet, met minder kans op fouten.',
      ai3Title: 'Declaraties en onkosten', ai3Desc: 'Automatisch herkennen, controleren en boeken.',
      ai4Title: 'Documenten en contracten', ai4Desc: 'Snel doorzoeken, samenvatten en signaleren.',
      ai5Title: 'Voorraad en inkoop', ai5Desc: 'Vraag voorspellen, bestellen en signaleren.',
      ai6Title: 'Klantvragen en support', ai6Desc: 'Sneller en consistenter beantwoorden.',
      aiUseExtra: 'Dezelfde aanpak werkt ook buiten finance, bijvoorbeeld bij klantvragen, helpdesk of marketing.',
      aiTraining: 'We bouwen niet alleen, we nemen je team mee: van een bewustwordingstraining voor de organisatie tot gerichte begeleiding voor de dagelijkse gebruikers.',
      aiTool5: 'Automatisering',
      svc2Foot: 'Staat je fundament al stevig en wil je vooral repeterend werk automatiseren? Dan starten we daar.',
      diagReportLabel: 'Adviesrapport', diagScan: 'analyse loopt',
      diagReportSub: 'De opbouw',
      diagToc1: 'Datastromen en systemen in kaart',
      diagToc2: 'Cijfers naast definities: waar het schuurt',
      diagToc3: 'Quick wins die direct tijd opleveren',
      diagToc4: 'Prioriteiten en volgorde voor de komende maanden',
      bridgeAlt: 'of bel meteen even:',
      ctaWho: 'Je spreekt direct met Öner of Tomas.',
      ctaTitleD: 'Weten wat bij jou de grootste winst oplevert?',
      ctaTextD: 'De diagnose laat zien welke van deze twee diensten nú het meest oplevert — en in welke volgorde. Eén gesprek is genoeg om te zien of het klikt.',
      casesEyebrow: 'Cases', casesTitle: 'Resultaten uit de praktijk', casesRead: 'Bekijk cases',
      case1Tag: 'E-commerce', case1Title: 'Van sturen op omzet naar sturen op marge.', case1Result: 'Data uit webshop, marketing en boekhouding samengebracht in één Power BI-omgeving.',
      case1Chip1: 'Webshop', case1Chip2: 'Marketing', case1Chip3: 'Boekhouding', case1ChartLabel: 'Marge per merk',
      case2Tag: 'Zorg', case2Title: 'Van achteraf constateren naar aantoonbaar in control.', case2Result: 'Financiële cijfers en cliëntdata in één rapportage, afgezet tegen budget en voorgaande periode.',
      case2Chip1: 'Boekhouding', case2Chip2: 'Cliëntdata', case2ChartLabel: 'Realisatie vs norm', case2Badge: 'AO/IB · audit-proof',
      case2Leg1: 'Realisatie', case2Leg2: 'Budget', case2Leg3: 'Vorige periode',
      teamEyebrow: 'Over ons',
      teamTitleA: 'Twee mensen. Eén doel:',
      teamTitleB: 'jouw bedrijf gezonder maken.',
      teamIntro1: 'Finsera is bewust klein. Je hebt geen accountmanager, geen junior en geen tussenlaag — je hebt óns. Öner brengt de finance-diepgang van jaren als controller mee. Tomas bouwt de tech: van data-integraties tot het dashboard waar je écht op stuurt.',
      teamIntro2: 'Samen zijn we de brug tussen finance, IT en de dagelijkse operatie. We werken persoonlijk, we werken rustig, en we werken alleen als we écht waarde toevoegen.',
      teamCta: 'Ontmoet ons',
      teamRole1: 'Financial & business consultant',
      teamRole2: 'Data analyst & ontwikkelaar',
      teamLinkedin: 'LinkedIn',
      revThanks: 'Bedankt! Je review is geopend in je e-mailprogramma — klik op verzenden om af te ronden.',
      ctaTitle: 'Klaar voor grip op je cijfers?',
      ctaText: 'Geen tijdelijke pleisters of losse tools, maar een fundament dat met je organisatie meegroeit. Laten we in één gesprek verkennen waar de processen nu vastlopen en waar de grootste winst zit, afgestemd op waar je nu staat.',
      footTagline: 'Een financieel fundament dat met je organisatie meegroeit.',
      footNav: 'Navigatie', footRights: 'Alle rechten voorbehouden.', footPrivacy: 'Privacyverklaring', footTerms: 'Algemene voorwaarden',
      painData: [
        ['"Ik vertrouw mijn cijfers niet volledig."', 'Je beslist uiteindelijk op gevoel, en blijft achteraf twijfelen of het klopte.'],
        ['"Ik krijg mijn stuurinformatie te laat."', 'Je stuurt pas achteraf bij, als het moment om in te grijpen al voorbij is.'],
        ['"We hebben te veel Excel en handwerk."', 'Eén fout of één uitval legt je rapportage stil; meegroeien lukt zo niet.'],
        ['"Onze organisatie groeit sneller dan onze financiële structuur."', 'Wat ooit ‘goed genoeg’ was, remt nu je groei in plaats van die te dragen.'],
        ['"IT en finance praten niet dezelfde taal."', 'Je krijgt dashboards die technisch kloppen, maar bedrijfsmatig niets zeggen.'],
        ['"We zijn kwetsbaar bij uitval van sleutelpersonen."', 'Valt iemand weg, dan stokt je rapportage, of niemand kan de cijfers nog uitleggen.'],
        ['"Compliance en audits kosten ons buitensporig veel tijd."', 'Elke controle gaat op aan corrigeren en uitleggen, in plaats van een formaliteit te zijn.'],
        ['"Ik mis realtime inzicht in cashflow en prestaties."', 'Je beslist over investeringen en groei zonder actueel zicht op cashflow en marge.'],
        ['"Ik mis strategische sturing op de cijfers."', 'De cijfers zijn er wel, maar je leest er niet uit waar je moet bijsturen of waar groei vandaan komt.'],
        ['"We gebruiken tools, maar hebben geen samenhangend systeem."', 'Elke bron vertelt net een ander verhaal, en niemand weet welke de waarheid is.']
      ]
    },
    en: {
      navHome: 'Home', navOver: 'About', navDiensten: 'Services', navCases: 'Cases', navBlog: 'Blog', navCta: 'Request the diagnosis',
      cta: 'Request the diagnosis',
      diagCta: 'Request the diagnosis',
      diagEyebrowTop: 'How we start · the diagnosis',
      diagBespoke: 'The diagnosis determines what your company needs — and in what order.',
      svcShortIntro: 'First a grip on your numbers with dashboards and management reporting. Then targeted automation, on a foundation that holds.',
      svcBespoke: 'No generic tool fits your company flawlessly. That’s why we build everything bespoke: to your systems, your processes and your definitions.',
      svc1Short: 'From loose exports and Excel lists to one reliable source of truth. Finance, management and operations look at the same numbers and steer on what matters.',
      svc2Short: 'Only once the foundation holds do we automate what costs time and keeps recurring — with an eye for privacy, reliability and human oversight.',
      svcMore: 'More about our services',
      svc1More: 'View this service', svc2More: 'View this service',
      dienstenPageEyebrow: 'Our services', dienstenPageTitle: 'Services',
      dienstenPageIntro: 'One diagnosis as the starting point, plus two services that build on each other. Below, in detail, what to expect from each.',
      routeSectionEyebrow: 'Our approach', routeSectionTitle: 'From diagnosis to foundation to AI.',
      heroEyebrow: 'Financial reporting, dashboards and automation for growing SMEs',
      heroH1a: 'Control over your numbers', heroH1b: 'Room to lead strategically',
      heroSub: 'Finsera helps growing mid-market companies professionalise their financial steering: from reliable management reporting and real-time dashboards to AI-driven automation.',
      heroSubLead: 'First a grip on the foundation. Then the leverage of AI and automation.',
      heroCta1: 'Request the diagnosis',
      heroTrust: 'For growing companies · 10–50 employees · €10M–€50M revenue',
      nDatabron: 'Data source', nRapport: 'Report', nDetail: 'Detail level', nDashboard: 'Dashboard', live: 'live',
      detailLow: 'summary', detailHigh: 'detail',
      mOmzet: 'Revenue', mMarge: 'Margin', mCashflow: 'Cashflow', mKlanten: 'Customers', mVerzuim: 'Absence',
      cfIn: 'Inflow', cfOut: 'Outflow', cfCum: 'Cumulative',
      custNew: 'New', custReturning: 'Returning',
      target: 'Target', benchmark: 'Benchmark',
      varActual: 'Actual', varBudget: 'Budget', varPrior: 'Prior yr', varVsBudget: 'vs. budget',
      denomOmzet: 'Revenue / client', denomMarge: 'Margin / line', denomCashflow: 'DSO (days)', denomKlanten: 'Revenue / client', denomVerzuim: 'Absence / FTE',
      painEyebrow: 'Sound familiar?',
      painHeading: 'Four signs your organisation has outgrown its financial structure.',
      painLeadsTo: 'Where this leads',
      bridge: 'Finsera doesn’t solve these problems with yet another tool, but by redesigning your financial foundation.',
      aanpakEyebrow: 'Our approach',
      aanpakHeading: 'First a grip on your foundation. Then automate smartly.',
      aanpakIntro: 'We build a financial foundation that grows with your organisation. Not loose dashboards or AI experiments, but one coherent approach that brings calm and overview, tailored to where you stand today.',
      route1Title: 'Diagnosis', route1Benefit: 'An actionable advisory report', route1Desc: 'We map your numbers, processes and data flows, and make the gap visible between how it works now and how it should.',
      route2Title: 'Dashboard & reporting', route2Benefit: 'A grip on your foundation', route2Desc: 'We bring your data sources together into one reliable source of truth, so you can steer on numbers that hold.',
      route3Title: 'AI strategy', route3Benefit: 'Work more efficiently with AI', route3Desc: 'Only once the basics hold do we automate, targeting what costs time and keeps recurring, so your team gains time back.', diagTitle: 'Diagnosis & strategic advisory report',
      diagBenefit: 'A concrete plan for immediate grip',
      diagBodyShort: 'In the diagnosis we map precisely how your financial steering is set up today: numbers, processes, systems and data flows.',
      diagBodyMore: 'We place the current situation next to the desired one, and show where it chafes, what that costs and how dashboards and management reporting can align better with your goals. No thick report for the drawer, but a directly applicable plan that finance, management and IT can run with right away.',
      diagReadMore: 'Read more', diagReadLess: 'Read less',
      diagCheck1: 'Within 2–4 weeks', diagCheck2: 'Expectations and scope set upfront', diagCheck3: 'Concrete quick wins and priorities', diagCheck4: 'Ready to apply',
      dienstenEyebrow: 'Our services', dienstenHeading: 'Two services that build on each other.',
      svc1Title: 'Dashboard & management reporting', svc1Benefit: 'A grip on your foundation',
      svc1Intro: 'From loose exports and Excel lists to one reliable source of truth. We bring financial and non-financial data together and give it meaning, so finance, management and operations look at the same numbers. You know straight away where things go well and where steering is needed.',
      dashTitle: 'The dashboard', dashTag: 'daily · weekly', dashRealtime: 'real-time', dashTrend: 'Revenue trend',
      dashText: 'A real-time overview to steer on daily. It shows at a glance the KPIs that matter to you, tailored to your role. You no longer depend on others; you see for yourself whether the organisation is in control.',
      dashK1: 'Revenue', dashK2: 'Gross margin', dashK3: 'Turnover rate', dashK4: 'Visitors',
      brkOmzet: 'Revenue by country', brkMarge: 'Margin by country', brkBezoekers: 'Visitors by country',
      repTitle: 'The management report', repTag: 'monthly · quarterly',
      repText: 'Financial figures enriched with operational data. We make the link visible: how many sent quotes lead to which revenue? We report against a clear norm. So you steer on the variances that matter, instead of searching through a thick report.',
      repCardTitle: 'Management report', repTabTable: 'Table', repTabChart: 'Chart', repDate: 'March 2026',
      repFin: 'Financial', repNonfin: 'Non-financial', repActual: 'Actual', repNorm: 'Norm', repDelta: 'Δ', repTrendCol: 'Trend',
      rOmzet: 'Revenue', rBruto: 'Gross margin', rKosten: 'Costs', rResultaat: 'Result',
      rBezoekers: 'Visitors', rOffertes: 'Quotes', rConversie: 'Conversion', rVerzuim: 'Absenteeism',
      srcLabel: 'Brought together from:', src1: 'Bookkeeping / ERP', src2: 'CRM', src3: 'WMS / inventory', src4: 'HR / absence', src5: 'customer feedback',
      toolsLabel: 'Tools we work with', tool4: 'Custom / ERP',
      svc1Foot: 'Do you already have the dashboard, but the reliable reporting underneath is missing? Or the other way around? Then that’s where we start. We build on what’s already there and fix what doesn’t add up.',
      svc2Title: 'AI strategy', svc2Benefit: 'Work more efficiently with AI',
      svc2IntroShort: 'Good automation doesn’t start with a tool, but with your process. Because we already understood your processes in the diagnosis, we see exactly where AI truly adds value. We translate this straight to the work floor: we build concrete workflows together with your team, instead of an advisory report at a distance.',
      svc2IntroMore: 'We focus on repetitive manual work. Automating it frees up your team’s time for analysis and strategic advice, the work where people make the difference. Especially now that regulation is tightening and competition is sharpening, it pays to approach this thoughtfully. No loose experiments, but considered and proven solutions. We build within a clear policy with a sharp eye for privacy, reliability and human oversight.',
      aiUseHeading: 'Where does AI pay off fastest?',
      ai1Title: 'Invoices and administration', ai1Desc: 'Less repetitive entry and checking work.',
      ai2Title: 'Reporting and controls', ai2Desc: 'Prepared faster, with less chance of errors.',
      ai3Title: 'Expenses and claims', ai3Desc: 'Automatically recognise, check and book.',
      ai4Title: 'Documents and contracts', ai4Desc: 'Quickly search, summarise and flag.',
      ai5Title: 'Inventory and purchasing', ai5Desc: 'Forecast demand, order and flag.',
      ai6Title: 'Customer questions and support', ai6Desc: 'Answer faster and more consistently.',
      aiUseExtra: 'The same approach works beyond finance too, for example with customer questions, helpdesk or marketing.',
      aiTraining: 'We don’t just build, we bring your team along: from awareness training for the organisation to targeted guidance for daily users.',
      aiTool5: 'Automation',
      svc2Foot: 'Is your foundation already solid and do you mainly want to automate repetitive work? Then that’s where we start.',
      diagReportLabel: 'Advisory report', diagScan: 'analysing',
      diagReportSub: 'What’s inside',
      diagToc1: 'Data flows and systems mapped',
      diagToc2: 'Numbers versus definitions: where it grinds',
      diagToc3: 'Quick wins that free up time right away',
      diagToc4: 'Priorities and sequence for the months ahead',
      bridgeAlt: 'or simply call:',
      ctaWho: 'You’ll speak directly with Öner or Tomas.',
      ctaTitleD: 'Want to know where your biggest gain is?',
      ctaTextD: 'The diagnosis shows which of these two services delivers most right now — and in what order. One conversation is enough to see if it clicks.',
      casesEyebrow: 'Cases', casesTitle: 'Results in practice', casesRead: 'View cases',
      case1Tag: 'E-commerce', case1Title: 'From steering on revenue to steering on margin.', case1Result: 'Data from webshop, marketing and bookkeeping brought together in one Power BI environment.',
      case1Chip1: 'Webshop', case1Chip2: 'Marketing', case1Chip3: 'Bookkeeping', case1ChartLabel: 'Margin per brand',
      case2Tag: 'Healthcare', case2Title: 'From finding out afterwards to demonstrably in control.', case2Result: 'Financial figures and client data in one report, set against budget and the previous period.',
      case2Chip1: 'Bookkeeping', case2Chip2: 'Client data', case2ChartLabel: 'Actual vs norm', case2Badge: 'AO/IB · audit-proof',
      case2Leg1: 'Actual', case2Leg2: 'Budget', case2Leg3: 'Previous period',
      teamEyebrow: 'About us',
      teamTitleA: 'Two people. One goal:',
      teamTitleB: 'a healthier business for you.',
      teamIntro1: 'Finsera is deliberately small. No account manager, no junior and no layer in between — you get us. Öner brings the finance depth of years as a controller. Tomas builds the tech: from data integrations to the dashboard you actually steer by.',
      teamIntro2: 'Together we are the bridge between finance, IT and day-to-day operations. We work personally, we work calmly, and we only take on work where we genuinely add value.',
      teamCta: 'Meet us',
      teamRole1: 'Financial & business consultant',
      teamRole2: 'Data analyst & developer',
      teamLinkedin: 'LinkedIn',
      revThanks: 'Thank you! Your review has opened in your email app — click send to finish.',
      ctaTitle: 'Ready for control over your numbers?',
      ctaText: 'No temporary patches or loose tools, but a foundation that grows with your organisation. Let’s explore in one conversation where the processes get stuck now and where the biggest gains are, tailored to where you stand today.',
      footTagline: 'A financial foundation that grows with your organisation.',
      footNav: 'Navigation', footRights: 'All rights reserved.', footPrivacy: 'Privacy policy', footTerms: 'Terms and conditions',
      painData: [
        ['"I don’t fully trust my numbers."', 'You end up deciding on gut feeling, and keep doubting afterwards whether it was right.'],
        ['"I get my steering information too late."', 'You only adjust after the fact, once the moment to intervene has already passed.'],
        ['"We have too much Excel and manual work."', 'One error or one absence brings your reporting to a halt; scaling up doesn’t work this way.'],
        ['"Our organisation grows faster than our financial structure."', 'What was once ‘good enough’ now slows your growth instead of carrying it.'],
        ['"IT and finance don’t speak the same language."', 'You get dashboards that are technically correct but tell you nothing in business terms.'],
        ['"We are vulnerable when key people drop out."', 'If someone drops out, your reporting stalls, or no one can explain the numbers anymore.'],
        ['"Compliance and audits cost us excessive time."', 'Every audit is spent correcting and explaining, instead of being a formality.'],
        ['"I lack real-time insight into cashflow and performance."', 'You decide on investments and growth without a current view of cashflow and margin.'],
        ['"I lack strategic steering on the numbers."', 'The numbers are there, but you can’t read from them where to adjust or where growth comes from.'],
        ['"We use tools, but have no coherent system."', 'Every source tells a slightly different story, and no one knows which is the truth.']
      ]
    }
  };

  /* ------------------------------------------------------------ helpers --- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  var lang = (function () {
    try { return localStorage.getItem('finsera-lang') || 'nl'; } catch (e) { return 'nl'; }
  })();
  function t() { return I18N[lang]; }

  /* --------------------------------------------------- state for widgets -- */
  var state = {
    sources: { excel: true, erp: true, crm: true },
    metric: 'omzet',
    detail: 1,             // 1 = samenvatting (boardroom), 2 = detail (controller)
    caseIndex: 0
  };

  // Excel + ERP (financieel) + CRM (operationeel) → één bron van waarheid.
  var SOURCE_DEFS = [['excel', 'Excel'], ['erp', 'ERP'], ['crm', 'CRM']];
  var METRIC_DEFS = [['omzet', 'mOmzet'], ['marge', 'mMarge'], ['cashflow', 'mCashflow'], ['klanten', 'mKlanten'], ['verzuim', 'mVerzuim']];

  // Palet — navy/koper/goud voor structuur; groen/rood alléén voor financiële richting.
  var GP = { navy: '#16243D', navy2: '#23375C', copper: '#B0793F', gold: '#C9A14E', green: '#1F8A4C', red: '#C0563F', dim: '#C8CED6' };

  // Elke metric heeft een eigen KPI + een eigen samenvattingsweergave; detail
  // voegt een variantieanalyse toe (actueel vs budget vs vorig jaar) + één
  // operationele noemer.
  var METRICS = {
    omzet:    { key: 'mOmzet',    value: '€ 18,4M', delta: '12,4%', arrow: '▲', pos: true,
                detail: { a: 18.4, b: 17.2, c: 16.1, d: '+7,0%', dPos: true, denomKey: 'denomOmzet', denomVal: '€ 10,0K', denomArrow: '▲' } },
    marge:    { key: 'mMarge',    value: '28,4%',   delta: '3,1pp', arrow: '▲', pos: true,
                detail: { a: 28.4, b: 27.0, c: 26.2, d: '+1,4pp', dPos: true, denomKey: 'denomMarge', denomVal: '+2,3pp', denomArrow: '▲' } },
    cashflow: { key: 'mCashflow', value: '€ 2,4M',  delta: '8,7%',  arrow: '▲', pos: true,
                detail: { a: 2.4, b: 2.1, c: 1.9, d: '+14,3%', dPos: true, denomKey: 'denomCashflow', denomVal: '46', denomArrow: '▼' } },
    klanten:  { key: 'mKlanten',  value: '1.840',   delta: '6,2%',  arrow: '▲', pos: true,
                detail: { a: 1840, b: 1760, c: 1690, d: '+4,5%', dPos: true, denomKey: 'denomKlanten', denomVal: '€ 10,0K', denomArrow: '▲' } },
    verzuim:  { key: 'mVerzuim',  value: '4,1%',    delta: '0,6pp', arrow: '▼', pos: true,
                detail: { a: 4.1, b: 4.5, c: 4.8, d: '−0,4pp', dPos: true, denomKey: 'denomVerzuim', denomVal: '9,4', denomArrow: '▼' } }
  };

  /* ---- mini-chart builders (compacte SVG, gerenderd in de dashboard-tile) -- */
  function sparkPaths(vals, w, h) {
    var n = vals.length, pad = 5, pts = vals.map(function (v, i) {
      return [(i / (n - 1)) * w, (h - pad) - v * (h - 2 * pad)];
    });
    var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    var area = 'M' + pts[0][0].toFixed(1) + ' ' + h + ' ' +
      pts.map(function (p) { return 'L' + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ') + ' L' + w + ' ' + h + ' Z';
    return { line: line, area: area };
  }

  function kpiHead(m) {
    return '<div class="graph__kpi-label">' + t()[m.key] + '</div>' +
           '<div class="graph__kpi-value">' + m.value + '</div>' +
           '<div class="graph__kpi-sub' + (m.pos ? '' : ' is-neg') + '">' + m.arrow + ' ' + m.delta + '</div>';
  }

  // Omzet → grote figuur + trend (area-sparkline, koper).
  function viewOmzet() {
    var sp = sparkPaths([0.28, 0.4, 0.36, 0.52, 0.48, 0.64, 0.6, 0.82], 200, 54);
    return '<div class="gph-viz"><svg class="gph-chart" viewBox="0 0 200 54" preserveAspectRatio="none">' +
      '<defs><linearGradient id="gphFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(176,121,63,0.30)"></stop><stop offset="1" stop-color="rgba(176,121,63,0)"></stop></linearGradient></defs>' +
      '<path d="' + sp.area + '" fill="url(#gphFill)"></path>' +
      '<path d="' + sp.line + '" fill="none" stroke="' + GP.copper + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '</svg></div>';
  }

  // Marge → %-trend met doel-/budgetlijn (gestippeld navy).
  function viewMarge() {
    var sp = sparkPaths([0.46, 0.42, 0.52, 0.5, 0.58, 0.55, 0.64, 0.7], 200, 54);
    var ty = (54 - 5) - 0.62 * (54 - 10);
    return '<div class="gph-viz"><svg class="gph-chart" viewBox="0 0 200 54" preserveAspectRatio="none">' +
      '<line x1="0" y1="' + ty.toFixed(1) + '" x2="200" y2="' + ty.toFixed(1) + '" stroke="' + GP.navy2 + '" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.55"></line>' +
      '<path d="' + sp.line + '" fill="none" stroke="' + GP.copper + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '</svg><div class="gph-note"><span class="gph-note-dash"></span>' + t().target + ' 26%</div></div>';
  }

  // Cashflow → in/uit per periode (groen/rood) + cumulatieve lijn (navy).
  function viewCashflow() {
    var data = [[0.6, 0.35], [0.5, 0.45], [0.7, 0.4], [0.55, 0.5], [0.8, 0.42]];
    var W = 200, base = 46, n = data.length, gw = W / n, bars = '', cum = 0, cumPts = [];
    data.forEach(function (d, i) {
      var cx = i * gw + gw / 2, inH = d[0] * 32, outH = d[1] * 32;
      bars += '<rect x="' + (cx - 9).toFixed(1) + '" y="' + (base - inH).toFixed(1) + '" width="7" height="' + inH.toFixed(1) + '" rx="1.5" fill="' + GP.green + '"></rect>';
      bars += '<rect x="' + (cx + 2).toFixed(1) + '" y="' + (base - outH).toFixed(1) + '" width="7" height="' + outH.toFixed(1) + '" rx="1.5" fill="' + GP.red + '"></rect>';
      cum += d[0] - d[1]; cumPts.push([cx, cum]);
    });
    var cs = cumPts.map(function (p) { return p[1]; });
    var lo = Math.min.apply(null, cs), hi = Math.max.apply(null, cs), rng = (hi - lo) || 1;
    var line = cumPts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + (9 + (1 - (p[1] - lo) / rng) * 15).toFixed(1); }).join(' ');
    return '<div class="gph-viz"><svg class="gph-chart" viewBox="0 0 200 54" preserveAspectRatio="none">' +
      '<line x1="0" y1="' + base + '" x2="200" y2="' + base + '" stroke="rgba(22,36,61,0.12)" stroke-width="1"></line>' + bars +
      '<path d="' + line + '" fill="none" stroke="' + GP.navy + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '</svg><div class="gph-legend">' +
      '<span class="gph-leg"><i style="background:' + GP.green + '"></i>' + t().cfIn + '</span>' +
      '<span class="gph-leg"><i style="background:' + GP.red + '"></i>' + t().cfOut + '</span>' +
      '<span class="gph-leg"><i class="ln" style="background:' + GP.navy + '"></i>' + t().cfCum + '</span></div></div>';
  }

  // Klanten → teller + sparkline, gesplitst nieuw vs terugkerend (gestapeld).
  function viewKlanten() {
    var data = [[0.3, 0.4], [0.32, 0.42], [0.3, 0.5], [0.35, 0.5], [0.34, 0.58], [0.38, 0.6]];
    var W = 200, base = 46, n = data.length, gw = W / n, bw = 11, bars = '';
    data.forEach(function (d, i) {
      var cx = i * gw + gw / 2, rH = d[1] * 40, nH = d[0] * 40, x = (cx - bw / 2).toFixed(1);
      bars += '<rect x="' + x + '" y="' + (base - rH).toFixed(1) + '" width="' + bw + '" height="' + rH.toFixed(1) + '" rx="1.5" fill="' + GP.navy + '"></rect>';
      bars += '<rect x="' + x + '" y="' + (base - rH - nH).toFixed(1) + '" width="' + bw + '" height="' + nH.toFixed(1) + '" rx="1.5" fill="' + GP.copper + '"></rect>';
    });
    return '<div class="gph-viz"><svg class="gph-chart" viewBox="0 0 200 54" preserveAspectRatio="none">' + bars + '</svg>' +
      '<div class="gph-legend"><span class="gph-leg"><i style="background:' + GP.copper + '"></i>' + t().custNew + '</span>' +
      '<span class="gph-leg"><i style="background:' + GP.navy + '"></i>' + t().custReturning + '</span></div></div>';
  }

  // Verzuim → %-trend tegen benchmark (gestippeld koper).
  function viewVerzuim() {
    var sp = sparkPaths([0.7, 0.62, 0.66, 0.5, 0.54, 0.42, 0.46, 0.38], 200, 54);
    var by = (54 - 5) - 0.6 * (54 - 10);
    return '<div class="gph-viz"><svg class="gph-chart" viewBox="0 0 200 54" preserveAspectRatio="none">' +
      '<line x1="0" y1="' + by.toFixed(1) + '" x2="200" y2="' + by.toFixed(1) + '" stroke="' + GP.copper + '" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.6"></line>' +
      '<path d="' + sp.line + '" fill="none" stroke="' + GP.navy + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '</svg><div class="gph-note"><span class="gph-note-dash gph-note-dash--copper"></span>' + t().benchmark + ' 4,8%</div></div>';
  }

  var SUMMARY = { omzet: viewOmzet, marge: viewMarge, cashflow: viewCashflow, klanten: viewKlanten, verzuim: viewVerzuim };

  // Detail (controller-view) → variantieanalyse + operationele noemer.
  function viewDetail(m) {
    var d = m.detail, max = Math.max(d.a, d.b, d.c) * 1.12;
    function bar(v, color, x) { var h = (v / max) * 38; return '<rect x="' + x + '" y="' + (44 - h).toFixed(1) + '" width="26" height="' + h.toFixed(1) + '" rx="2" fill="' + color + '"></rect>'; }
    return '<div class="gph-viz">' +
      '<svg class="gph-chart gph-chart--var" viewBox="0 0 200 50" preserveAspectRatio="none">' +
      bar(d.a, GP.navy, 18) + bar(d.b, GP.copper, 87) + bar(d.c, GP.dim, 156) + '</svg>' +
      '<div class="gph-var-legend"><span>' + t().varActual + '</span><span>' + t().varBudget + '</span><span>' + t().varPrior + '</span></div>' +
      '<div class="gph-delta-line ' + (d.dPos ? 'is-pos' : 'is-neg') + '">Δ ' + t().varVsBudget + ' ' + d.d + '</div>' +
      '<div class="gph-denom"><span class="gph-denom-label">' + t()[d.denomKey] + '</span><span class="gph-denom-val">' + d.denomVal + ' ' + d.denomArrow + '</span></div>' +
      '</div>';
  }

  /* --------------------------------------------------------- apply lang --- */
  function applyLang() {
    document.documentElement.lang = (lang === 'en') ? 'en' : 'nl-NL';
    $all('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t()[key];
      if (val != null) el.textContent = val;
    });
    $all('[data-i18n-ph]').forEach(function (el) {
      var val = t()[el.getAttribute('data-i18n-ph')];
      if (val != null) el.setAttribute('placeholder', val);
    });
    $all('.lang-toggle__btn').forEach(function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-lang') === lang);
    });
    renderPainList();
    renderGraph();
    updateDiagToggle();
    renderDashBreak();
    renderReport();
    updateAiToggle();
  }

  /* --------------------------------------------------- language toggle ---- */
  $all('.lang-toggle__btn').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang');
      try { localStorage.setItem('finsera-lang', lang); } catch (e) {}
      applyLang();
    });
  });

  /* ----------------------------------------------------------- mobile nav - */
  var burger = $('[data-burger]');
  var mobile = $('[data-mobile]');
  if (burger && mobile) {
    var setMenu = function (open) {
      if (open) { mobile.removeAttribute('hidden'); } else { mobile.setAttribute('hidden', ''); }
      burger.setAttribute('aria-expanded', String(open));
    };
    burger.addEventListener('click', function () { setMenu(mobile.hasAttribute('hidden')); });
    mobile.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobile.hasAttribute('hidden')) { setMenu(false); burger.focus(); }
    });
  }

  /* --------------------------------------------------------- pain cards --- */
  // Vier signalen als statische kaarten. Dit was een aanvinklijst met tien
  // signalen en een telring; die vroeg te veel van een bezoeker die al warm
  // binnenkomt en alleen nog wil weten of het klikt.
  var PAIN_SHOWN = 4;
  var painListEl = $('#painList');
  function renderPainList() {
    if (!painListEl) return;
    painListEl.innerHTML = '';
    t().painData.slice(0, PAIN_SHOWN).forEach(function (d) {
      var card = document.createElement('article');
      card.className = 'pain__card';
      card.innerHTML =
        '<div class="pain__card-quote"></div>' +
        '<div class="pain__card-label"></div>' +
        '<p class="pain__card-desc"></p>';
      card.querySelector('.pain__card-quote').textContent = d[0];
      card.querySelector('.pain__card-label').textContent = t().painLeadsTo;
      card.querySelector('.pain__card-desc').textContent = d[1];
      painListEl.appendChild(card);
    });
  }

  /* ------------------------------------------------------- hero graph ----- */
  var chipsEl = $('#sourceChips');
  var metricsEl = $('#metricOptions');
  var rangeEl = $('#detailRange');

  function renderGraph() {
    // source chips
    if (chipsEl) {
      chipsEl.innerHTML = '';
      SOURCE_DEFS.forEach(function (def) {
        var k = def[0];
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'graph__chip' + (state.sources[k] ? ' is-on' : '');
        btn.textContent = def[1];
        btn.addEventListener('click', function () {
          state.sources[k] = !state.sources[k];
          if (!state.sources.excel && !state.sources.erp && !state.sources.crm) state.sources[k] = true;
          renderGraph();
        });
        chipsEl.appendChild(btn);
      });
    }
    // metric radio
    if (metricsEl) {
      metricsEl.innerHTML = '';
      METRIC_DEFS.forEach(function (def) {
        var k = def[0];
        var on = state.metric === k;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'graph__metric' + (on ? ' is-on' : '');
        btn.innerHTML = '<span class="graph__metric-dot"></span><span class="graph__metric-label"></span>';
        btn.querySelector('.graph__metric-label').textContent = t()[def[1]];
        btn.addEventListener('click', function () { state.metric = k; renderGraph(); });
        metricsEl.appendChild(btn);
      });
    }
    // dashboard output — eigen weergave per metric; detail = variantieanalyse
    var m = METRICS[state.metric];
    var body = $('#graphOutBody');
    if (body) {
      var html = kpiHead(m);
      html += (state.detail >= 2) ? viewDetail(m) : SUMMARY[state.metric]();
      html += '<div class="graph__tags">';
      SOURCE_DEFS.filter(function (d) { return state.sources[d[0]]; }).forEach(function (d) {
        html += '<span class="graph__tag">' + d[1] + '</span>';
      });
      html += '</div>';
      body.innerHTML = html;
    }
  }

  if (rangeEl) {
    rangeEl.addEventListener('input', function () { state.detail = +rangeEl.value; renderGraph(); });
  }

  /* --------------------------------------------------------- cases carousel */
  var track = $('#caseTrack');
  var dotsEl = $('#caseDots');
  var SLIDES = 2;                            // exact twee cases: e-commerce + zorg
  var caseTimer = null, casePaused = false;
  var caseReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function renderCarousel() {
    if (track) track.style.transform = 'translateX(-' + (state.caseIndex * 100) + '%)';
    if (dotsEl) {
      dotsEl.innerHTML = '';
      for (var i = 0; i < SLIDES; i++) {
        (function (idx) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'cases__dot' + (idx === state.caseIndex ? ' is-on' : '');
          dot.setAttribute('aria-label', 'case ' + (idx + 1));
          dot.addEventListener('click', function () { state.caseIndex = idx; renderCarousel(); caseStart(); });
          dotsEl.appendChild(dot);
        })(i);
      }
    }
  }
  function caseStart() {
    caseStop();
    if (caseReduce) return;                  // respecteer prefers-reduced-motion: geen autoplay
    caseTimer = setInterval(function () {
      if (!casePaused) { state.caseIndex = (state.caseIndex + 1) % SLIDES; renderCarousel(); }
    }, 7000);                                // auto-advance elke 7s
  }
  function caseStop() { if (caseTimer) { clearInterval(caseTimer); caseTimer = null; } }
  var prev = $('#casePrev'), next = $('#caseNext');
  if (prev) prev.addEventListener('click', function () { state.caseIndex = (state.caseIndex + SLIDES - 1) % SLIDES; renderCarousel(); caseStart(); });
  if (next) next.addEventListener('click', function () { state.caseIndex = (state.caseIndex + 1) % SLIDES; renderCarousel(); caseStart(); });
  var caseViewport = $('.cases__viewport');
  if (caseViewport) {                        // pauze bij hover, hervat bij mouse-leave
    caseViewport.addEventListener('mouseenter', function () { casePaused = true; });
    caseViewport.addEventListener('mouseleave', function () { casePaused = false; });
  }

  /* ------------------------------------------- diagnose read-more toggle -- */
  var diagToggle = $('#diagToggle'), diagMore = $('#diagMore');
  function updateDiagToggle() {
    if (!diagToggle || !diagMore) return;
    var open = !diagMore.hasAttribute('hidden');
    diagToggle.textContent = (open ? t().diagReadLess : t().diagReadMore) + ' ' + (open ? '‹' : '›');
  }
  if (diagToggle && diagMore) {
    diagToggle.addEventListener('click', function () {
      if (diagMore.hasAttribute('hidden')) diagMore.removeAttribute('hidden');
      else diagMore.setAttribute('hidden', '');
      updateDiagToggle();
    });
  }

  /* ----------------------------- service 1: dashboard breakdown (rotates) - */
  var DASH_BREAK = [
    { key: 'brkOmzet', rows: [['NL', 0.92], ['DE', 0.6], ['BE', 0.34], ['FR', 0.2]] },
    { key: 'brkMarge', rows: [['NL', 0.7], ['DE', 0.78], ['BE', 0.5], ['FR', 0.42]] },
    { key: 'brkBezoekers', rows: [['NL', 0.85], ['DE', 0.55], ['BE', 0.4], ['FR', 0.3]] }
  ];
  var dashIdx = 0, dashHover = false;
  var dashBreakEl = $('#dashBreak'), dashTitleEl = $('#dashBreakTitle'), dashDotsEl = $('#dashDots');
  function renderDashBreak() {
    if (!dashBreakEl) return;
    var v = DASH_BREAK[dashIdx];
    if (dashTitleEl) dashTitleEl.textContent = t()[v.key];
    dashBreakEl.innerHTML = v.rows.map(function (r) {
      return '<div class="dash__bar-row"><span class="dash__bar-lbl">' + r[0] + '</span>' +
        '<span class="dash__bar-track"><span class="dash__bar-fill" style="width:' + Math.round(r[1] * 100) + '%"></span></span></div>';
    }).join('');
    if (dashDotsEl) {
      dashDotsEl.innerHTML = DASH_BREAK.map(function (_, i) {
        return '<button type="button" class="dash__dot' + (i === dashIdx ? ' is-on' : '') + '" data-i="' + i + '" aria-label="weergave ' + (i + 1) + '"></button>';
      }).join('');
    }
  }
  function dashGo(i) { dashIdx = (i + DASH_BREAK.length) % DASH_BREAK.length; renderDashBreak(); }
  if (dashBreakEl) {
    if (dashDotsEl) dashDotsEl.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.dash__dot') : null;
      if (b) dashGo(+b.getAttribute('data-i'));
    });
    var dashWidget = $('#dashWidget');
    if (dashWidget) {
      dashWidget.addEventListener('mouseenter', function () { dashHover = true; });
      dashWidget.addEventListener('mouseleave', function () { dashHover = false; });
    }
    setInterval(function () { if (!dashHover) dashGo(dashIdx + 1); }, 4200);  // kalm: ~4s, pauze bij hover
  }

  /* --------------------------- service 1: management report (table/chart) - */
  // [key, actueel, norm, Δ/trend, actueelWaarde, normWaarde, lagerIsBeter]
  var REPORT_FIN = [
    ['rOmzet', '18,4M', '17,2M', '+1,2', 18.4, 17.2, false],
    ['rBruto', '38%', '37%', '+1', 38, 37, false],
    ['rKosten', '4,9M', '4,7M', '+0,2', 4.9, 4.7, true],
    ['rResultaat', '2,1M', '1,9M', '+0,2', 2.1, 1.9, false]
  ];
  var REPORT_NON = [
    ['rBezoekers', '128K', '110K', 'up', 128, 110, false],
    ['rOffertes', '214', '200', 'up', 214, 200, false],
    ['rConversie', '3,1%', '3,0%', 'flat', 3.1, 3.0, false],
    ['rVerzuim', '4,1%', '3,5%', 'up', 4.1, 3.5, true]
  ];
  var reportView = 'tabel';
  var reportBodyEl = $('#reportBody');
  function rGood(r) { return r[6] ? r[4] <= r[5] : r[4] >= r[5]; }
  function renderReport() {
    if (!reportBodyEl) return;
    var head = '<div class="report__date">' + t().repDate + '</div>';
    if (reportView === 'tabel') {
      var finBody = REPORT_FIN.map(function (r) {
        return '<tr><td>' + t()[r[0]] + '</td><td class="num">' + r[1] + '</td><td class="num dim">' + r[2] +
          '</td><td class="num ' + (rGood(r) ? 'is-pos' : 'is-neg') + '">' + r[3] + '</td></tr>';
      }).join('');
      var nonBody = REPORT_NON.map(function (r) {
        var ch = r[3] === 'up' ? '↗' : (r[3] === 'down' ? '↘' : '→');
        return '<tr><td>' + t()[r[0]] + '</td><td class="num">' + r[1] + '</td><td class="num dim">' + r[2] +
          '</td><td class="num ' + (rGood(r) ? 'is-pos' : 'is-neg') + '">' + ch + '</td></tr>';
      }).join('');
      function tbl(hLast, body) {
        return '<table class="report__table"><thead><tr><th></th><th class="num">' + t().repActual + '</th><th class="num">' + t().repNorm + '</th><th class="num">' + hLast + '</th></tr></thead><tbody>' + body + '</tbody></table>';
      }
      reportBodyEl.innerHTML = head + '<div class="report__cols">' +
        '<div class="report__col"><div class="report__col-h">' + t().repFin + '</div>' + tbl(t().repDelta, finBody) + '</div>' +
        '<div class="report__col"><div class="report__col-h">' + t().repNonfin + '</div>' + tbl(t().repTrendCol, nonBody) + '</div></div>';
    } else {
      var all = REPORT_FIN.concat(REPORT_NON);
      var rows = all.map(function (r) {
        var m = Math.max(r[4], r[5]) * 1.14;
        var aw = (r[4] / m) * 100, nw = (r[5] / m) * 100;
        return '<div class="rc__row"><span class="rc__lbl">' + t()[r[0]] + '</span>' +
          '<span class="rc__bars">' +
            '<span class="rc__bar ' + (rGood(r) ? 'is-pos' : 'is-neg') + '" style="width:' + aw.toFixed(1) + '%"></span>' +
            '<span class="rc__bar rc__bar--norm" style="width:' + nw.toFixed(1) + '%"></span>' +
          '</span>' +
          '<span class="rc__val">' + r[1] + ' <span class="rc__norm">/ ' + r[2] + '</span></span></div>';
      }).join('');
      var legAbove = (lang === 'en') ? 'above norm' : 'boven norm';
      var legBelow = (lang === 'en') ? 'below norm' : 'onder norm';
      var legend = '<div class="rc__legend"><span class="rc__leg"><i class="is-pos"></i>' + legAbove + '</span>' +
        '<span class="rc__leg"><i class="is-neg"></i>' + legBelow + '</span>' +
        '<span class="rc__leg"><i class="norm"></i>' + t().repNorm + '</span></div>';
      reportBodyEl.innerHTML = head + '<div class="rc">' + rows + '</div>' + legend;
    }
  }
  $all('.report__tab').forEach(function (b) {
    b.addEventListener('click', function () {
      reportView = b.getAttribute('data-report');
      $all('.report__tab').forEach(function (x) { x.classList.toggle('is-on', x === b); });
      renderReport();
    });
  });

  /* ------------------------------- service 2: AI read-more + use-case panel */
  var aiToggle = $('#aiToggle'), aiMore = $('#aiMore');
  function updateAiToggle() {
    if (!aiToggle || !aiMore) return;
    var open = !aiMore.hasAttribute('hidden');
    aiToggle.textContent = (open ? t().diagReadLess : t().diagReadMore) + ' ' + (open ? '‹' : '›');
  }
  if (aiToggle && aiMore) {
    aiToggle.addEventListener('click', function () {
      if (aiMore.hasAttribute('hidden')) aiMore.removeAttribute('hidden'); else aiMore.setAttribute('hidden', '');
      updateAiToggle();
    });
  }
  var aiUseToggle = $('#aiUsecasesToggle'), aiUse = $('#aiUsecases');
  if (aiUseToggle && aiUse) {
    aiUseToggle.addEventListener('click', function () {
      var open = aiUse.hasAttribute('hidden');
      if (open) aiUse.removeAttribute('hidden'); else aiUse.setAttribute('hidden', '');
      aiUseToggle.setAttribute('aria-expanded', String(open));
      aiUseToggle.classList.toggle('is-open', open);
    });
  }

  /* --------------------------------------------------- scale node graph --- */
  // The graph is authored on a fixed 560x520 canvas; scale it to fit the
  // container so it shrinks proportionally on phones (no overlap).
  var graphEl = $('.graph');
  var graphInner = $('#graphInner');
  function scaleGraph() {
    if (!graphEl || !graphInner) return;
    var w = graphEl.clientWidth;
    if (w > 0) graphInner.style.transform = 'scale(' + (w / 560) + ')';
  }
  if (window.addEventListener) {
    window.addEventListener('resize', scaleGraph);
    window.addEventListener('orientationchange', scaleGraph);
    if (window.ResizeObserver && graphEl) {
      try { new ResizeObserver(scaleGraph).observe(graphEl); } catch (e) {}
    }
  }

  /* ------------------------------------------------------------- init ----- */
  applyLang();
  renderCarousel();
  caseStart();
  scaleGraph();
})();
