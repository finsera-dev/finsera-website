/* ==========================================================================
   Finsera — Home interactivity + NL/EN i18n
   Ported from Home.dc.html (DCLogic prototype) to vanilla JS.
   ========================================================================== */
(function () {
  'use strict';

  /* --------------------------------------------------------------- i18n --- */
  var I18N = {
    nl: {
      navHome: 'Home', navOver: 'Over ons', navDiensten: 'Diensten', navCases: 'Cases', navBlog: 'Blog', navCta: 'Plan een kennismaking',
      cta: 'Vraag de diagnose aan',
      diagCta: 'Vraag de diagnose aan',
      diagEyebrowTop: 'Zo starten we · de diagnose',
      svcShortIntro: 'Finsera werkt in twee vaste fasen. Eerst creëren we compleet overzicht over je financiële én operationele data. Daarna automatiseren we je processen gericht met AI. Die volgorde is een keiharde eis. Automatiseren op een wankel datafundament zorgt er namelijk alleen maar voor dat processen sneller de mist in gaan.',
      svcBespoke: 'Geen enkele standaardsoftware past feilloos op een groeiend bedrijf. Daarom bouwen we alles op maat: op jouw systemen, jouw processen en jouw definities.',
      svc1Short: 'Een goede rapportage geeft de directie periodiek en feilloos inzicht in de héle bedrijfsvoering. Wij bouwen daarvoor een centrale database die al jouw bestaande software en Excel-data met elkaar verbindt. Van daaruit ontwikkelen we precies wat jouw bedrijf nodig heeft. Denk aan strakke Power BI-dashboards voor strategische MT-beslissingen, maar net zo goed aan specifieke maatwerktools of mini-ERP\'s voor op de werkvloer.',
      svc2Short: 'Repetitieve en handmatige workflows kosten een groeiend bedrijf onnodig veel tijd, geld en frustratie. Wij automatiseren deze processen met AI, maar we doen dit nooit blindelings. We starten altijd met een scherpe analyse en zorgen dat de interne processen (AO/IC) waterdicht zijn. Pas als het fundament logisch en geborgd is, zetten we de techniek aan het werk. Zo verdwijnt het handwerk, terwijl jij als directie de volledige controle behoudt.',
      svcMore: 'Meer over onze diensten',
      svc1More: 'Bekijk deze dienst', svc2More: 'Bekijk deze dienst',
      svcPhaseA: 'Eerst · fundament', svcPhaseB: 'Daarna · hefboom',
      svcC1Meta: 'Dashboard & rapportage', svcC1Phase: 'Fase 1',
      svcC1TitleA: 'Dashboards &', svcC1TitleB: 'maatwerkapplicaties',
      svcC1B1: 'Eén centrale database voor al je systemen, schaalbaar en veilig',
      svcC1B2: 'Maatwerkdashboards of mini-ERP\'s, afgestemd op jouw doelen',
      svcC1B3: 'Heldere stuurgetallen in plaats van abstracte rapportages',
      svcC1B4: 'Verankering in de dagelijkse operatie en in je vaste MT-ritme',
      svcC1Hint: 'Startpunt',
      svcC2Meta: 'AI & automatisering', svcC2Phase: 'Fase 2 · doorlopend',
      svcC2TitleA: 'AI-strategie', svcC2TitleB: '& procesautomatisering',
      svcC2B1: 'Grondige procesanalyse en borging van de interne beheersing (AO/IC)',
      svcC2B2: 'Slimme AI-oplossingen voor repetitieve workflows en handwerk',
      svcC2B3: 'Automatische controles en directe alerts bij afwijkingen',
      svcC2B4: 'Altijd menselijk toezicht ingebouwd zodat jij de regie houdt',
      svcC2Hint: 'Vervolg op fase 1',
      dienstenPageEyebrow: 'Onze diensten', dienstenPageTitle: 'Managementrapportage, dashboards en AI voor het MKB',
      dienstenPageIntro: 'Eén diagnose als startpunt, plus twee diensten die op elkaar voortbouwen. Hieronder in detail wat je van elk mag verwachten.',
      routeSectionEyebrow: 'Onze aanpak', routeSectionTitle: 'Drie diensten, in deze volgorde.',
      heroH1a: 'Grip op je cijfers', heroH1b: 'Ruimte om strategisch te leiden',
      heroSub: 'Finsera helpt snelgroeiende MKB-bedrijven om strategie en de dagelijkse praktijk op één lijn te brengen. Door de brede blik van een business controller te combineren met de technische slagkracht van een programmeur, stroomlijnen we niet alleen je financiën, maar de héle bedrijfsvoering. Welke software je ook gebruikt: wij koppelen al je systemen aan één centrale database. Vanuit daar bouwen we precies wat jij nodig hebt. Van de juiste stuurgetallen en Power BI-dashboards tot maatwerk tools en complete mini-ERP\'s.',
      heroSubLead: 'Zodat jij beslist op basis van harde feiten en niet langer op gevoel.',
      dlHeading: 'Al je systemen en data verbonden in één centrale bron',
      dlIntro: 'Het maakt niet uit welke software je gebruikt. Of het nu Exact Online, AFAS, SnelStart of specifieke verkoopsoftware is. Wij halen de ruwe data uit al je losse pakketten én die onoverzichtelijke berg Excel-bestanden, en brengen dit samen in één stevige database. Vanuit daar bouwen we exact wat jouw bedrijf nodig heeft. Dat kan een helder Power BI-dashboard zijn, maar net zo goed een slimme maatwerk applicatie of een complete mini-ERP.',
      dlIntro2: 'Geen handmatige Excel-chaos of tegenstrijdige lijstjes meer. Je krijgt simpelweg één overzichtelijke plek waar zowel je financiële cijfers zoals marges en cashpositie, als je operationele data zoals openstaande offertes of doorlooptijden altijd actueel zijn.',
      painIntro: 'Je merkt het direct wanneer je huidige processen de groei niet meer kunnen bijbenen. Financiële en operationele data spreken elkaar tegen, de juiste inzichten komen structureel te laat en te veel cruciale kennis zit vast in losse Excel-bestanden. Als je dit herkent, stuur je waarschijnlijk steeds vaker op gevoel. Je administratie is dan een blinde vlek geworden in plaats van het fundament onder je strategie.',
      heroCta2: 'Ontdek onze aanpak',
      teamBio1: 'Combineert een Master in Accountancy & Control (Nyenrode) met jarenlange ervaring als finance manager, zelfstandig ondernemer en specialist bij de overheid. Kijkt verder dan de financiële administratie om de héle bedrijfsvoering te optimaliseren. Snapt exact wat een directie nodig heeft om grip te houden op een snelgroeiende organisatie.',
      teamBio2: 'De technische motor achter onze maatwerkoplossingen. Vertaalt complexe financiële en operationele vraagstukken naar robuuste databases, mini-ERP\'s en feilloze koppelingen. Zorgt ervoor dat al je bedrijfssoftware naadloos met elkaar communiceert, zodat de techniek jouw bedrijfsstrategie volgt in plaats van andersom.',
      heroCta1: 'Plan een kennismakingsgesprek',
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
      painHeading: 'Vier signalen dat je organisatie haar systemen is ontgroeid',
      painLeadsTo: 'Waar dit toe leidt',
      painGevolg: 'Hierdoor reageer je pas op de feiten als het moment om bij te sturen al voorbij is. Eén typefout in een spreadsheet of de uitval van een sleutelpersoon brengt je hele rapportage in gevaar. Wat in de opstartfase werkte, vormt nu een risico.',
      bridge: 'We lossen jouw groeipijn niet op met simpelweg wéér een nieuwe tool, maar door het fundament onder je bedrijf opnieuw in te richten.',
      aanpakEyebrow: 'Onze aanpak',
      aanpakHeading: 'Eerst grip op je fundament. Daarna slim automatiseren.',
      aanpakIntro: 'Elk traject start met de diagnose. Wat daarna komt hangt af van wat daaruit blijkt — en automatiseren doen we pas als het fundament klopt. Hieronder in detail wat je van elke dienst mag verwachten.',
      route1Title: 'Diagnose', route1Benefit: 'Een uitvoerbaar adviesrapport', route1Desc: 'We brengen cijfers, processen en datastromen in kaart, en maken het verschil zichtbaar tussen hoe het nu werkt en hoe het zou moeten.',
      route2Title: 'Dashboard & rapportage', route2Benefit: 'Grip op je fundament', route2Desc: 'We brengen je databronnen samen tot één betrouwbare bron van waarheid, zodat je kunt sturen op cijfers die kloppen.',
      route3Title: 'AI-strategie', route3Benefit: 'Efficiënter werken met AI', route3Desc: 'Pas als de basis klopt, automatiseren we gericht wat tijd kost en steeds terugkomt, zodat je team tijd overhoudt.', diagTitle: 'Diagnose & strategisch adviesrapport',
      diagBenefit: 'Een kraakheldere nulmeting en een concreet plan van aanpak',
      ctaVoorbeeld: 'Bekijk een voorbeeld',
      dgnTitle: 'Diagnose & strategisch adviesrapport',
      dgnIntro: 'Elke samenwerking begint hier. In twee tot vier weken lichten we je financiële processen, systemen en rapportages door. Geen lange theoretische audit, maar een scherpe analyse met aanbevelingen die je meteen kunt uitvoeren — ook als je daarna zelf verder wilt. Zo zie je waarde vóórdat je aan een groter traject begint.',
      dgnColA: 'Wat we doorlichten',
      dgnColB: 'Wat je krijgt',
      dgnA1b: 'Je cijfers en rapportages',
      dgnA1: '— wat er nu wordt opgeleverd, hoe lang dat duurt en waar het schuurt',
      dgnA2b: 'De processen eromheen',
      dgnA2: '— van boeking tot maandafsluiting, inclusief het handwerk dat niemand meer ziet',
      dgnA3b: 'Je systemen en datastromen',
      dgnA3: '— welke bronnen er zijn, hoe ze zich tot elkaar verhouden en waar ze uiteenlopen',
      dgnA4b: 'De vastlegging',
      dgnA4: '— wie waarvoor tekent, en of dat bij een controle standhoudt',
      dgnB1b: 'Een adviesrapport',
      dgnB1: 'met de huidige situatie naast de gewenste, en wat het verschil kost',
      dgnB2b: 'Quick wins',
      dgnB2: 'die je binnen een paar weken zelf kunt doorvoeren',
      dgnB3b: 'Prioriteiten voor de lange termijn',
      dgnB3: ', met een volgorde die hout snijdt',
      dgnB4b: 'Een vaste prijs voor het vervolg',
      dgnB4: ', gebaseerd op wat we hebben gezien in plaats van op een inschatting vooraf',
      dgnF1: 'Doorlooptijd',
      dgnV1: '2 tot 4 weken',
      dgnF2: 'Vorm',
      dgnV2: 'Vaste projectprijs',
      dgnF3: 'Scope',
      dgnV3: 'Vooraf vastgelegd',
      dgnF4: 'Daarna',
      dgnV4: 'Vrij om zelf verder te gaan',
      dgnFoot: 'De diagnose staat op zichzelf. Je zit nergens aan vast, en wat we opleveren is van jou — ook als je besluit het zelf op te pakken.',
      dfaqTitle: 'Wat je meestal nog wilt weten',
      dfaqQ1: 'Wat kost het?',
      dfaqA1: 'Projecten voeren we uit tegen een vaste projectprijs, vooraf afgesproken op basis van de diagnose. Voor doorlopend beheer en doorontwikkeling van dashboards werken we met een abonnement. Omdat elk traject maatwerk is, noemen we pas een bedrag als we weten wat er nodig is.',
      dfaqQ2: 'Hoe lang duurt het?',
      dfaqA2: 'De diagnose duurt twee tot vier weken. Daarna staat een werkend dashboard er meestal binnen vier tot zes weken. We werken met wekelijkse demo’s, zodat je tussentijds ziet wat er gebouwd wordt en direct kunt bijsturen.',
      dfaqQ3: 'We hebben al een dashboard. Wat dan?',
      dfaqA3: 'Dan beginnen we daar. Vaak ontbreekt niet het dashboard maar de betrouwbare rapportage eronder — of andersom. We bouwen voort op wat er staat en herstellen wat niet klopt, in plaats van alles opnieuw te doen.',
      dfaqQ4: 'Vervangen jullie onze boekhouder of controller?',
      dfaqA4: 'Nee. We vervangen geen bestaande functies, we versterken ze. Je administratie blijft waar die is; wij zorgen dat de data eruit stroomt naar bruikbare stuurinformatie. Heb je tijdelijk senior financiële sturing nodig, dan bieden we aanvullend interim controller services op afstand.',
      dfaqQ5: 'Van wie is wat jullie bouwen?',
      dfaqA5: 'Van jou. We bouwen op Power BI en Microsoft Azure, binnen je eigen licenties en tenancy waar dat kan. Geen vendor lock-in: alles wat we opleveren is van jou en gedocumenteerd, zodat je er zelf mee verder kunt.',
      dfaqQ6: 'Moeten we met alle drie beginnen?',
      dfaqA6: 'Nee. De diagnose staat op zichzelf, en veel klanten doen daarna alleen de rapportage. Automatiseren heeft pas zin als het fundament klopt — anders gaan de problemen alleen sneller.',
      diagBodyShort: 'Elke samenwerking start daarom met een grondige nulmeting. In deze diagnose analyseren we jouw complete landschap: van de softwarepakketten die er draaien tot de onderliggende processen en datastromen.',
      diagBodyMore: 'Verwacht van ons geen lange, theoretische audit. Wij leveren een scherpe analyse met direct toepasbare aanbevelingen. Je krijgt een actiegericht plan dat exact vertelt wat er moet gebeuren en in welke logische volgorde. Zo zie je direct de toegevoegde waarde, nog vóórdat je de keuze maakt voor een vervolgtraject.',
      diagReadMore: 'Meer lezen', diagReadLess: 'Minder lezen',
      diagCheck1: 'Heldere doorlooptijd van 2 tot 4 weken.', diagCheck2: 'Volledige inventarisatie van je huidige software en datastromen.', diagCheck3: 'Direct overzicht van quick wins en prioriteiten voor de lange termijn.', diagCheck4: 'Volledig flexibel: voer het plan intern uit, werk met eigen partners of kies voor een hybride uitvoering met Finsera.',
      dienstenEyebrow: 'Onze diensten', dienstenHeading: 'Twee diensten die op elkaar voortbouwen',
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
      svc2Title: 'AI-strategie & gerichte automatisering', svc2Benefit: 'Efficiënter werken met AI',
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
      dlEyebrow: 'Wat we bouwen',
      dlTitleA: 'Grip op je cijfers.', dlTitleB: 'Ruimte om te sturen.',
      dlBody: 'Verkoop via bol, betalingen in Mollie, ERP in AFAS, boekhouding in Exact Online — vier systemen, vier waarheden. Finsera bouwt de tussenlaag: één datalaag op maat, aangevuld met AI, die alles samenbrengt in het dashboard waar jij écht op kunt sturen.',
      dlColA: 'Bronnen', dlColB: 'Finsera · AI', dlColC: 'Eén dashboard',
      dlSrc1: 'boekhouding', dlSrc2: 'ERP · HR', dlSrc3: 'verkoopkanaal', dlSrc4: 'betalingen',
      dlCore: 'datalaag op maat', dlMonth: 'Augustus · overzicht',
      dlK1: 'Omzet MTD', dlK2: 'Brutomarge', dlK3: 'Cashpositie',
      dlChart: 'Omzet vs. begroting', dlFootA: '4 bronnen', dlFootB: '1 dashboard',
      ctaWho: 'Je spreekt direct met Öner of Tomas.',
      ctaTitleD: 'Weten wat bij jou de grootste winst oplevert?',
      ctaTextD: 'De diagnose laat zien welke van deze twee diensten nú het meest oplevert — en in welke volgorde. Eén gesprek is genoeg om te zien of het klikt.',
      casesEyebrow: 'Cases', casesTitle: 'Resultaten uit de praktijk', casesRead: 'Bekijk cases',
      revIntro: 'Finsera werkt onder meer voor e-commercebedrijven en organisaties in de zorg. Twee voorbeelden van wat een goed datafundament in de praktijk oplevert.',
      revResultLabel: 'Resultaat', revNote: 'Resultaten uit de eigen omgeving van de klant',
      revAll: 'Bekijk alle cases',
      faqEyebrow: 'Veelgestelde vragen', faqHeading: 'Veelgestelde vragen over managementrapportage en financiële automatisering',
      faqQ1: 'Voor welke bedrijven werkt Finsera?',
      faqA1: 'Finsera werkt voor snelgroeiende MKB- en mid-market bedrijven met circa 10 tot 50 medewerkers. Bedrijven die de opstartfase voorbij zijn, maar waar de financiële structuur de groei niet kan bijbenen. Sectorervaring hebben wij onder meer in e-commerce en de zorg.',
      faqQ2: 'Hoe snel staat een werkend dashboard?',
      faqA2: 'Meestal binnen 4 tot 6 weken na de start van het traject. We werken met wekelijkse demo’s, zodat je tussentijds ziet wat er gebouwd wordt en direct kunt bijsturen. Daaraan vooraf gaat de diagnose van 2 tot 4 weken, waarin we bepalen wát er gebouwd moet worden.',
      faqQ3: 'Vervangt Finsera onze boekhouder of financieel medewerker?',
      faqA3: 'Nee. Wij vervangen geen bestaande functies, maar versterken ze. Je administratie blijft waar die is; wij zorgen dat de data eruit stroomt naar bruikbare stuurinformatie. Heb je tijdelijk behoefte aan senior financiële sturing, dan bieden we aanvullend interim controller services op afstand.',
      faqQ4: 'Hoe zit het prijsmodel in elkaar?',
      faqA4: 'Projecten voeren we uit tegen een vaste projectprijs, vooraf afgesproken op basis van de diagnose. Voor doorlopend beheer en doorontwikkeling van dashboards werken we met een abonnement. Elk traject is maatwerk — daarom bespreken we je situatie eerst vrijblijvend.',
      faqQ5: 'Waar draait onze data en van wie is die?',
      faqA5: 'Je data blijft van jou en blijft in jouw omgeving. We bouwen op Power BI en Microsoft Azure, binnen jouw eigen licenties en tenancy waar mogelijk. Geen vendor lock-in: alles wat wij bouwen, is van jou en gedocumenteerd.',
      faqFoot: 'Staat je vraag er niet bij?', faqFootCta: 'Stel hem gerust',
      case1Person: 'Charlotte van der Pauw', case1Sector: 'Paardensport',
      case1StatA: 'Van sturen op omzet naar', case1StatB: 'sturen op marge',
      case2Person: 'Miriam Twilt-Mendonça',
      case2StatA: 'Van achteraf constateren naar', case2StatB: 'aantoonbaar in control',
      // Vul deze pas met een citaat dat de klant zelf heeft goedgekeurd en
      // haal dan [hidden] van het blockquote in index.html weg.
      review1Quote: '', review2Quote: '',
      case1Tag: 'E-commerce', case1Title: 'Van sturen op omzet naar sturen op marge.', case1Result: 'Van sturen op omzet naar sturen op marge. Eén Power BI-dashboard bracht verkoop-, voorraad- en financiële data samen — zodat Charlotte van der Pauw per productgroep ziet waar het geld écht verdiend wordt.',
      case1Chip1: 'Webshop', case1Chip2: 'Marketing', case1Chip3: 'Boekhouding', case1ChartLabel: 'Marge per merk',
      case2Tag: 'Zorg', case2Title: 'Van achteraf constateren naar aantoonbaar in control.', case2Result: 'Van achteraf constateren naar aantoonbaar in control. Herontworpen processen en heldere vastlegging (AO/IC) geven Miriam Twilt-Mendonça grip op kwaliteit en compliance — vóórdat de auditor ernaar vraagt.',
      case2Chip1: 'Boekhouding', case2Chip2: 'Cliëntdata', case2ChartLabel: 'Realisatie vs norm', case2Badge: 'AO/IB · audit-proof',
      case2Leg1: 'Realisatie', case2Leg2: 'Budget', case2Leg3: 'Vorige periode',
      teamEyebrow: 'Over ons',
      teamTitleA: 'De visie van een financieel strateeg.',
      teamTitleB: 'De slagkracht van een full-stack developer.',
      teamIntro1: 'Finsera is een boutique consultancybureau zonder onnodige managementlagen of wisselende junior consultants. Je schakelt direct met de experts. Wij combineren strategisch financieel inzicht met keiharde IT-realisatiekracht. Zo dichten we het gat tussen de directiekamer en de systemen op de werkvloer. We doorgronden jouw strategische doelen en bouwen exact de datastructuren en tools die nodig zijn om die groei beheersbaar te maken.',
      teamIntro2: 'Samen zijn we de brug tussen finance, IT en de dagelijkse operatie. We werken persoonlijk, we werken rustig, en we werken alleen als we écht waarde toevoegen.',
      teamCta: 'Ontmoet ons',
      teamRole1: 'Oprichter & financieel strateeg',
      teamRole2: 'Full-stack developer & data-architect',
      teamLinkedin: 'LinkedIn',
      revThanks: 'Bedankt! Je review is geopend in je e-mailprogramma — klik op verzenden om af te ronden.',
      ctaTitle: 'Klaar voor grip op je cijfers?',
      ctaText: 'Geen tijdelijke pleisters of losse tools, maar een fundament dat met je organisatie meegroeit. Laten we in één gesprek verkennen waar de processen nu vastlopen en waar de grootste winst zit, afgestemd op waar je nu staat.',
      footTagline: 'Een financieel fundament dat met je organisatie meegroeit.',
      footCta: 'Neem contact op',
      footDesc: 'Managementrapportage, Power BI-dashboards en AI-automatisering voor groeiend MKB.',
      footNav: 'Navigatie', footRights: 'Alle rechten voorbehouden.', footPrivacy: 'Privacyverklaring', footTerms: 'Algemene voorwaarden',
      painData: [
        ['Je vertrouwt de cijfers niet volledig.', 'Dashboards, administratie en Excel-lijsten spreken elkaar tegen. Elke discussie in het MT begint met de vraag welke cijfers kloppen.'],
        ['Stuurinformatie komt structureel te laat.', 'De maandafsluiting duurt weken. Tegen de tijd dat het rapport er ligt, is de informatie al verouderd.'],
        ['Te veel eilandkennis en handmatig Excel-werk.', 'Cruciale kennis zit bij één of twee personen. Valt er iemand uit, dan valt je rapportage stil.'],
        ['Geen realtime zicht op cashflow en prestaties.', 'Belangrijke beslissingen — investeren, aannemen, financieren — neem je zonder actueel beeld van waar je staat.']
      ]
    },
    en: {
      navHome: 'Home', navOver: 'About us', navDiensten: 'Services', navCases: 'Cases', navBlog: 'Blog', navCta: 'Book an intro call',
      cta: 'Request the diagnosis',
      diagCta: 'Request the diagnosis',
      diagEyebrowTop: 'How we start · the diagnosis',
      svcShortIntro: 'Finsera works in two fixed phases. First we create a complete overview of your financial and operational data. Then we automate your processes with AI, in a targeted way. That order is non-negotiable: automating on a shaky data foundation only makes processes go wrong faster.',
      svcBespoke: 'No off-the-shelf software fits a growing company flawlessly. That is why we build everything to measure: on your systems, your processes and your definitions.',
      svc1Short: 'Good reporting gives the board periodic, flawless insight into the entire operation. We build a central database for that, connecting all your existing software and Excel data. From there we develop exactly what your business needs: crisp Power BI dashboards for strategic board decisions, but just as easily specific custom tools or mini-ERPs for the work floor.',
      svc2Short: 'Repetitive, manual workflows cost a growing company needless time, money and frustration. We automate those processes with AI, but never blindly. We always start with a sharp analysis and make sure the internal processes (internal control) are watertight. Only once the foundation is logical and secured do we put the technology to work. The manual labour disappears while you, as management, keep full control.',
      svcMore: 'More about our services',
      svc1More: 'View this service', svc2More: 'View this service',
      svcPhaseA: 'First · foundation', svcPhaseB: 'Then · leverage',
      svcC1Meta: 'Dashboard & reporting', svcC1Phase: 'Phase 1',
      svcC1TitleA: 'Dashboards &', svcC1TitleB: 'custom applications',
      svcC1B1: 'One central database for all your systems, scalable and secure',
      svcC1B2: 'Custom dashboards or mini-ERPs, matched to your goals',
      svcC1B3: 'Clear steering figures instead of abstract reports',
      svcC1B4: 'Anchored in daily operations and in your fixed board rhythm',
      svcC1Hint: 'Starting point',
      svcC2Meta: 'AI & automation', svcC2Phase: 'Phase 2 · ongoing',
      svcC2TitleA: 'AI strategy', svcC2TitleB: '& process automation',
      svcC2B1: 'Thorough process analysis and secured internal control',
      svcC2B2: 'Smart AI solutions for repetitive workflows and manual work',
      svcC2B3: 'Automatic checks and immediate alerts on deviations',
      svcC2B4: 'Human oversight always built in, so you stay in charge',
      svcC2Hint: 'Follows phase 1',
      dienstenPageEyebrow: 'Our services', dienstenPageTitle: 'Management reporting, dashboards and AI for mid-market companies',
      dienstenPageIntro: 'One diagnosis as the starting point, plus two services that build on each other. Below, in detail, what to expect from each.',
      routeSectionEyebrow: 'Our approach', routeSectionTitle: 'Three services, in this order.',
      heroH1a: 'Control over your numbers', heroH1b: 'Room to lead strategically',
      heroSub: 'Finsera helps fast-growing mid-market companies bring strategy and day-to-day practice into line. By combining the broad view of a business controller with the technical firepower of a developer, we streamline not just your finances but your entire operation. Whatever software you use: we connect all your systems to one central database. From there we build exactly what you need — from the right steering figures and Power BI dashboards to custom tools and complete mini-ERPs.',
      heroSubLead: 'So you decide on hard facts and no longer on gut feeling.',
      dlHeading: 'All your systems and data connected in one central source',
      dlIntro: 'It does not matter which software you use — Exact Online, AFAS, SnelStart or a specific sales package. We pull the raw data out of all your separate systems and that unwieldy pile of Excel files, and bring it together in one solid database. From there we build exactly what your business needs. That can be a clear Power BI dashboard, but just as easily a smart custom application or a complete mini-ERP.',
      dlIntro2: 'No more manual Excel chaos or contradictory lists. You simply get one clear place where both your financial figures, such as margins and cash position, and your operational data, such as open quotes or lead times, are always up to date.',
      painIntro: 'You notice it straight away when your current processes can no longer keep up with growth. Financial and operational data contradict each other, the right insights structurally arrive too late, and too much crucial knowledge is locked in scattered Excel files. If you recognise this, you are probably steering on gut feeling more and more often. Your administration has become a blind spot instead of the foundation under your strategy.',
      heroCta2: 'Discover our approach',
      teamBio1: 'Combines a Master in Accountancy & Control (Nyenrode) with years of experience as a finance manager, independent entrepreneur and specialist within government. Looks beyond the financial administration to optimise the entire operation. Knows exactly what a management team needs to stay in control of a fast-growing organisation.',
      teamBio2: 'The technical engine behind our custom solutions. Translates complex financial and operational questions into robust databases, mini-ERPs and flawless integrations. Makes sure all your business software communicates seamlessly, so the technology follows your business strategy instead of the other way round.',
      heroCta1: 'Book an intro call',
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
      painHeading: 'Four signs your organisation has outgrown its systems',
      painLeadsTo: 'Where this leads',
      painGevolg: 'As a result you only react to the facts once the moment to adjust has passed. A single typo in a spreadsheet, or the loss of one key person, puts your entire reporting at risk. What worked in the start-up phase is now a liability.',
      bridge: 'We do not solve your growing pains with simply yet another new tool, but by redesigning the foundation under your business.',
      aanpakEyebrow: 'Our approach',
      aanpakHeading: 'First a grip on your foundation. Then automate smartly.',
      aanpakIntro: 'Every engagement starts with the diagnosis. What follows depends on what it turns up — and we only automate once the foundation is sound. Below, in detail, what to expect from each service.',
      route1Title: 'Diagnosis', route1Benefit: 'An actionable advisory report', route1Desc: 'We map your numbers, processes and data flows, and make the gap visible between how it works now and how it should.',
      route2Title: 'Dashboard & reporting', route2Benefit: 'A grip on your foundation', route2Desc: 'We bring your data sources together into one reliable source of truth, so you can steer on numbers that hold.',
      route3Title: 'AI strategy', route3Benefit: 'Work more efficiently with AI', route3Desc: 'Only once the basics hold do we automate, targeting what costs time and keeps recurring, so your team gains time back.', diagTitle: 'Diagnosis & strategic advisory report',
      diagBenefit: 'A crystal-clear baseline and a concrete plan of action',
      ctaVoorbeeld: 'See an example',
      dgnTitle: 'Diagnosis & strategic advisory report',
      dgnIntro: 'Every engagement starts here. In two to four weeks we go through your financial processes, systems and reporting. Not a long theoretical audit, but a sharp analysis with recommendations you can act on straight away — including if you want to carry on by yourself afterwards. That way you see value before committing to a larger project.',
      dgnColA: 'What we examine',
      dgnColB: 'What you get',
      dgnA1b: 'Your figures and reports',
      dgnA1: '— what is delivered today, how long it takes and where it chafes',
      dgnA2b: 'The processes around them',
      dgnA2: '— from booking to month-end close, including the manual work nobody notices any more',
      dgnA3b: 'Your systems and data flows',
      dgnA3: '— which sources exist, how they relate and where they diverge',
      dgnA4b: 'The documentation',
      dgnA4: '— who signs off on what, and whether that holds up in an audit',
      dgnB1b: 'An advisory report',
      dgnB1: 'setting the current situation beside the desired one, and what the gap costs',
      dgnB2b: 'Quick wins',
      dgnB2: 'you can implement yourself within a few weeks',
      dgnB3b: 'Long-term priorities',
      dgnB3: ', in an order that makes sense',
      dgnB4b: 'A fixed price for the next step',
      dgnB4: ', based on what we have seen rather than on an estimate up front',
      dgnF1: 'Lead time',
      dgnV1: '2 to 4 weeks',
      dgnF2: 'Format',
      dgnV2: 'Fixed project price',
      dgnF3: 'Scope',
      dgnV3: 'Agreed in advance',
      dgnF4: 'Afterwards',
      dgnV4: 'Free to continue on your own',
      dgnFoot: 'The diagnosis stands on its own. You are not tied to anything, and what we deliver is yours — including if you decide to take it further yourself.',
      dfaqTitle: 'What you usually still want to know',
      dfaqQ1: 'What does it cost?',
      dfaqA1: 'We carry out projects for a fixed project price, agreed in advance on the basis of the diagnosis. For ongoing maintenance and further development of dashboards we work on a subscription. Because every engagement is tailored, we only name a figure once we know what is needed.',
      dfaqQ2: 'How long does it take?',
      dfaqA2: 'The diagnosis takes two to four weeks. After that a working dashboard is usually in place within four to six weeks. We work with weekly demos, so you see what is being built along the way and can steer immediately.',
      dfaqQ3: 'We already have a dashboard. What then?',
      dfaqA3: 'Then that is where we start. Often it is not the dashboard that is missing but the reliable reporting underneath it — or the other way around. We build on what is there and fix what does not add up, rather than starting over.',
      dfaqQ4: 'Do you replace our bookkeeper or controller?',
      dfaqA4: 'No. We do not replace existing roles, we strengthen them. Your administration stays where it is; we make sure the data flows out of it into usable management information. If you need senior financial steering temporarily, we also offer remote interim controller services.',
      dfaqQ5: 'Who owns what you build?',
      dfaqA5: 'You do. We build on Power BI and Microsoft Azure, inside your own licences and tenancy where possible. No vendor lock-in: everything we deliver is yours and documented, so you can carry on with it yourself.',
      dfaqQ6: 'Do we have to start with all three?',
      dfaqA6: 'No. The diagnosis stands on its own, and many clients only do the reporting afterwards. Automating only makes sense once the foundation is sound — otherwise the problems just move faster.',
      diagBodyShort: 'Every engagement therefore starts with a thorough baseline measurement. In this diagnosis we analyse your complete landscape: from the software packages you run to the underlying processes and data flows.',
      diagBodyMore: 'Do not expect a long, theoretical audit from us. We deliver a sharp analysis with directly applicable recommendations. You get an action-oriented plan that states exactly what needs to happen, and in what logical order. So you see the value straight away, before you commit to any follow-up.',
      diagReadMore: 'Read more', diagReadLess: 'Read less',
      diagCheck1: 'A clear lead time of two to four weeks.', diagCheck2: 'A full inventory of your current software and data flows.', diagCheck3: 'An immediate overview of quick wins and long-term priorities.', diagCheck4: 'Fully flexible: run the plan in house, work with your own partners, or opt for hybrid delivery with Finsera.',
      dienstenEyebrow: 'Our services', dienstenHeading: 'Two services that build on each other',
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
      svc2Title: 'AI strategy & targeted automation', svc2Benefit: 'Work more efficiently with AI',
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
      dlEyebrow: 'What we build',
      dlTitleA: 'Control over your numbers.', dlTitleB: 'Room to steer.',
      dlBody: 'Sales through bol, payments in Mollie, ERP in AFAS, bookkeeping in Exact Online — four systems, four versions of the truth. Finsera builds the layer in between: one bespoke data layer, augmented with AI, that brings everything together in the dashboard you can actually steer by.',
      dlColA: 'Sources', dlColB: 'Finsera · AI', dlColC: 'One dashboard',
      dlSrc1: 'bookkeeping', dlSrc2: 'ERP · HR', dlSrc3: 'sales channel', dlSrc4: 'payments',
      dlCore: 'bespoke data layer', dlMonth: 'August · overview',
      dlK1: 'Revenue MTD', dlK2: 'Gross margin', dlK3: 'Cash position',
      dlChart: 'Revenue vs. budget', dlFootA: '4 sources', dlFootB: '1 dashboard',
      ctaWho: 'You’ll speak directly with Öner or Tomas.',
      ctaTitleD: 'Want to know where your biggest gain is?',
      ctaTextD: 'The diagnosis shows which of these two services delivers most right now — and in what order. One conversation is enough to see if it clicks.',
      casesEyebrow: 'Cases', casesTitle: 'Results in practice', casesRead: 'View cases',
      revIntro: 'Finsera works for e-commerce businesses and healthcare organisations, among others. Two examples of what a solid data foundation delivers in practice.',
      revResultLabel: 'Result', revNote: 'Results from the client’s own environment',
      revAll: 'View all cases',
      faqEyebrow: 'Frequently asked questions', faqHeading: 'Frequently asked questions about management reporting and financial automation',
      faqQ1: 'What kind of companies does Finsera work for?',
      faqA1: 'Finsera works for fast-growing mid-market companies with roughly 10 to 50 employees. Companies past the start-up phase, where the financial structure cannot keep up with the growth. We have sector experience in e-commerce and healthcare, among others.',
      faqQ2: 'How quickly is a working dashboard in place?',
      faqA2: 'Usually within four to six weeks of the start of the engagement. We work with weekly demos, so you see what is being built along the way and can steer immediately. That is preceded by the diagnosis of two to four weeks, in which we determine what needs to be built.',
      faqQ3: 'Does Finsera replace our bookkeeper or finance officer?',
      faqA3: 'No. We do not replace existing roles, we strengthen them. Your administration stays where it is; we make sure the data flows out of it into usable steering information. If you temporarily need senior financial steering, we also offer interim controller services remotely.',
      faqQ4: 'How does the pricing model work?',
      faqA4: 'We carry out projects for a fixed project price, agreed in advance on the basis of the diagnosis. For ongoing management and further development of dashboards we work with a subscription. Every engagement is tailored — which is why we discuss your situation first, with no obligation.',
      faqQ5: 'Where does our data run and who owns it?',
      faqA5: 'Your data stays yours and stays in your environment. We build on Power BI and Microsoft Azure, within your own licences and tenancy where possible. No vendor lock-in: everything we build is yours and documented.',
      faqFoot: 'Is your question not listed?', faqFootCta: 'Just ask us',
      case1Person: 'Charlotte van der Pauw', case1Sector: 'Equestrian',
      case1StatA: 'From steering on revenue to', case1StatB: 'steering on margin',
      case2Person: 'Miriam Twilt-Mendonça',
      case2StatA: 'From finding out afterwards to', case2StatB: 'demonstrably in control',
      review1Quote: '', review2Quote: '',
      case1Tag: 'E-commerce', case1Title: 'From steering on revenue to steering on margin.', case1Result: 'From steering on revenue to steering on margin. One Power BI dashboard brought sales, stock and financial data together — so Charlotte van der Pauw can see per product group where the money is actually made.',
      case1Chip1: 'Webshop', case1Chip2: 'Marketing', case1Chip3: 'Bookkeeping', case1ChartLabel: 'Margin per brand',
      case2Tag: 'Healthcare', case2Title: 'From finding out afterwards to demonstrably in control.', case2Result: 'From finding out afterwards to demonstrably in control. Redesigned processes and clear documentation give Miriam Twilt-Mendonça a grip on quality and compliance — before the auditor asks.',
      case2Chip1: 'Bookkeeping', case2Chip2: 'Client data', case2ChartLabel: 'Actual vs norm', case2Badge: 'AO/IB · audit-proof',
      case2Leg1: 'Actual', case2Leg2: 'Budget', case2Leg3: 'Previous period',
      teamEyebrow: 'About us',
      teamTitleA: 'The vision of a financial strategist.',
      teamTitleB: 'The firepower of a full-stack developer.',
      teamIntro1: 'Finsera is a boutique consultancy without needless layers of management or a rotating cast of junior consultants. You deal directly with the experts. We combine strategic financial insight with hard IT delivery, closing the gap between the boardroom and the systems on the work floor. We get to the bottom of your strategic goals and build exactly the data structures and tools needed to keep that growth manageable.',
      teamIntro2: 'Together we are the bridge between finance, IT and day-to-day operations. We work personally, we work calmly, and we only take on work where we genuinely add value.',
      teamCta: 'Meet us',
      teamRole1: 'Founder & financial strategist',
      teamRole2: 'Full-stack developer & data architect',
      teamLinkedin: 'LinkedIn',
      revThanks: 'Thank you! Your review has opened in your email app — click send to finish.',
      ctaTitle: 'Ready for control over your numbers?',
      ctaText: 'No temporary patches or loose tools, but a foundation that grows with your organisation. Let’s explore in one conversation where the processes get stuck now and where the biggest gains are, tailored to where you stand today.',
      footTagline: 'A financial foundation that grows with your organisation.',
      footCta: 'Get in touch',
      footDesc: 'Management reporting, Power BI dashboards and AI automation for growing mid-market companies.',
      footNav: 'Navigation', footRights: 'All rights reserved.', footPrivacy: 'Privacy policy', footTerms: 'Terms and conditions',
      painData: [
        ['You do not fully trust the figures.', 'Dashboards, the administration and Excel lists contradict each other. Every board discussion starts with the question of which figures are right.'],
        ['Steering information structurally arrives too late.', 'The monthly close takes weeks. By the time the report is ready, the information is already out of date.'],
        ['Too much island knowledge and manual Excel work.', 'Crucial knowledge sits with one or two people. If someone drops out, your reporting stops.'],
        ['No real-time view of cash flow and performance.', 'You make important decisions — investing, hiring, financing — without a current picture of where you stand.']
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
  // Vier gekaderde signalen met een icoon. Het gevolg stond eerst per citaat
  // in een tweede kolom, maar vier keer "waar dit toe leidt" verzwakt elk
  // afzonderlijk punt; de gevolgen staan nu gebundeld in één zin onder de rij
  // (painGevolg). De iconen horen bij de volgorde van painData, niet bij de
  // taal, en staan daarom hier los van de woordenlijsten.
  var PAIN_ICONS = [
    // cijfers niet vertrouwen: vraagteken
    '<circle cx="12" cy="12" r="8.4"/><path d="M9.7 9.5a2.4 2.4 0 1 1 3.1 2.7c-.6.2-.9.7-.9 1.3v.4"/><circle cx="11.9" cy="16.5" r=".85" fill="currentColor" stroke="none"/>',
    // te laat: klok
    '<circle cx="12" cy="12" r="8.4"/><path d="M12 7.4V12l3.1 1.9"/>',
    // Excel en handwerk: raster
    '<rect x="3.6" y="4.6" width="16.8" height="14.8" rx="1.4"/><path d="M3.6 9.5h16.8M3.6 14.5h16.8M9.4 4.6v14.8M15 4.6v14.8"/>',
    // groei versus structuur: stijgende lijn boven een gestippeld fundament
    '<path d="M3.5 19.6h17" stroke-dasharray="3 3"/><path d="M5.6 15.8l4.2-4.6 3.3 2.9L19.4 6.6"/><path d="M19.4 6.6h-4.1M19.4 6.6v4.1"/>'
  ];
  function renderPainList() {
    if (!painListEl) return;
    painListEl.innerHTML = '';
    t().painData.slice(0, PAIN_SHOWN).forEach(function (d, i) {
      var card = document.createElement('article');
      card.className = 'pain__card';
      card.innerHTML =
        '<span class="pain__card-ic" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
        'stroke-linecap="round" stroke-linejoin="round">' + (PAIN_ICONS[i] || '') + '</svg>' +
        '</span><p class="pain__card-quote"></p>';
      card.querySelector('.pain__card-quote').textContent = d[0];
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
      animateKpiOnce(body);
    }
  }

  /* Eén kalm optel-moment voor het KPI-cijfer bij de eerste render; daarna
     rust. Respecteert reduced-motion en draait nooit opnieuw. */
  var kpiCounted = false;
  function animateKpiOnce(body) {
    if (kpiCounted) return;
    kpiCounted = true;
    try {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    } catch (e) { return; }
    var el = body.querySelector('.graph__kpi-value');
    if (!el) return;
    var final = el.textContent;
    var m = final.match(/([0-9][0-9.,]*)/);
    if (!m) return;
    var numStr = m[1];
    var decimals = (numStr.match(/,(\d+)$/) || [, ''])[1].length;
    var target = parseFloat(numStr.replace(/\./g, '').replace(',', '.'));
    if (!isFinite(target)) return;
    var t0 = null, DUR = 900;
    function fmt(v) {
      var s = v.toFixed(decimals).replace('.', ',');
      // duizendtallen terug (alleen relevant voor waarden als 1.840)
      var parts = s.split(','), int = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return final.replace(numStr, parts.length > 1 ? int + ',' + parts[1] : int);
    }
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / DUR);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1 && document.contains(el)) requestAnimationFrame(step);
      else if (document.contains(el)) el.textContent = final;
    }
    requestAnimationFrame(step);
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
  var jaar = String(new Date().getFullYear());
  $all('[data-jaar]').forEach(function (e) { e.textContent = jaar; });
  applyLang();
  renderCarousel();
  caseStart();
  scaleGraph();
})();
