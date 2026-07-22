/* WoCC Guild Boards — translations.
   English is the base language (inline in the HTML). Every other language lives
   here. To add a language: add its code to LANGUAGES and a matching entry to
   every string below (missing entries silently fall back to English), then open
   a PR. Keys map to elements via data-i18n attributes, or are used from app.js
   via t(key). Values may contain simple HTML (spans, code, strong). */

window.I18N = {
  default: "en",
  languages: { en: "English", fr: "Français", de: "Deutsch", es: "Español" },
  locales: { en: "en-GB", fr: "fr-FR", de: "de-DE", es: "es-ES" },

  strings: {

    /* ---- Navigation & footer ---- */
    "nav.home":     { en: "Home",        fr: "Accueil",    de: "Start",      es: "Inicio" },
    "nav.guilds":   { en: "Guilds",      fr: "Guildes",    de: "Gilden",     es: "Gremios" },
    "nav.pve":      { en: "PvE",         fr: "PvE",        de: "PvE",        es: "PvE" },
    "nav.pvp":      { en: "PvP",         fr: "PvP",        de: "PvP",        es: "PvP" },
    "nav.tourneys": { en: "Tournaments", fr: "Tournois",   de: "Turniere",   es: "Torneos" },
    "nav.rules":    { en: "Rules",       fr: "Règlement",  de: "Regeln",     es: "Reglas" },
    "footer.tagline": {
      en: "WoCC Guild Boards — a community project, not affiliated with levy-street (yet!).",
      fr: "WoCC Guild Boards — projet communautaire, non affilié à levy-street (pour l'instant !).",
      de: "WoCC Guild Boards — ein Community-Projekt, (noch!) nicht mit levy-street verbunden.",
      es: "WoCC Guild Boards — un proyecto comunitario, (¡aún!) no afiliado a levy-street." },

    /* ---- Home ---- */
    "home.title": { en: "WoCC Guild Boards — the inter-guild leaderboard",
      fr: "WoCC Guild Boards — le classement inter-guildes",
      de: "WoCC Guild Boards — die gildenübergreifende Rangliste",
      es: "WoCC Guild Boards — la clasificación entre gremios" },
    "home.tagline": {
      en: "The community leaderboard for World of ClaudeCraft guilds: PvE speed records, the PvP tournament circuit, rosters and XP. Every guild can submit — every record can be proven.",
      fr: "Le classement communautaire des guildes de World of ClaudeCraft : records PvE, circuit de tournois PvP, effectifs et XP. Chaque guilde peut soumettre — chaque record peut être prouvé.",
      de: "Die Community-Rangliste der Gilden von World of ClaudeCraft: PvE-Rekorde, PvP-Turnier-Circuit, Mitgliederzahlen und XP. Jede Gilde kann einreichen — jeder Rekord kann belegt werden.",
      es: "La clasificación comunitaria de los gremios de World of ClaudeCraft: récords PvE, circuito de torneos PvP, plantillas y XP. Cualquier gremio puede participar — cada récord puede probarse." },
    "home.patchline": {
      en: "Boards aligned with game version v0.28.0 — the data lives in the open, on GitHub.",
      fr: "Boards alignés sur la version v0.28.0 du jeu — les données vivent au grand jour, sur GitHub.",
      de: "Boards auf Spielversion v0.28.0 abgestimmt — die Daten liegen offen auf GitHub.",
      es: "Tablas alineadas con la versión v0.28.0 del juego — los datos viven a la vista, en GitHub." },
    "home.overallH": { en: "Overall <span class=\"em\">standings</span>",
      fr: "Classement <span class=\"em\">général</span>",
      de: "<span class=\"em\">Gesamtwertung</span>",
      es: "Clasificación <span class=\"em\">general</span>" },
    "home.overallSub": {
      en: "PvE points (per-board scoring, F1 scale) + PvP circuit points (tournament placements). Member count and XP have their own boards on the Guilds page — they don't affect this score.",
      fr: "Points PvE (barème F1 par tableau) + points du circuit PvP (placements en tournoi). Effectifs et XP ont leurs propres classements sur la page Guildes — ils n'influencent pas ce score.",
      de: "PvE-Punkte (F1-Wertung pro Board) + Punkte des PvP-Circuits (Turnierplatzierungen). Mitgliederzahl und XP haben eigene Ranglisten auf der Gilden-Seite — sie zählen hier nicht.",
      es: "Puntos PvE (baremo F1 por tabla) + puntos del circuito PvP (posiciones en torneos). Los miembros y la XP tienen sus propias tablas en la página Gremios — no afectan a esta puntuación." },
    "home.latestH": { en: "Latest <span class=\"em\">records</span>",
      fr: "Derniers <span class=\"em\">records</span>",
      de: "Neueste <span class=\"em\">Rekorde</span>",
      es: "Últimos <span class=\"em\">récords</span>" },
    "home.nextH": { en: "Next <span class=\"em\">tournament</span>",
      fr: "Prochain <span class=\"em\">tournoi</span>",
      de: "Nächstes <span class=\"em\">Turnier</span>",
      es: "Próximo <span class=\"em\">torneo</span>" },
    "home.exploreH": { en: "Explore the <span class=\"em\">boards</span>",
      fr: "Explorer les <span class=\"em\">boards</span>",
      de: "Die <span class=\"em\">Boards</span> erkunden",
      es: "Explora las <span class=\"em\">tablas</span>" },
    "home.cardPveH": { en: "⚔️ PvE records", fr: "⚔️ Records PvE", de: "⚔️ PvE-Rekorde", es: "⚔️ Récords PvE" },
    "home.cardPveP": {
      en: "Kill times on Nythraxis, dungeons, delves and world bosses — normal and heroic.",
      fr: "Temps de kill sur Nythraxis, les donjons, les gouffres et les boss mondiaux — normal et héroïque.",
      de: "Kill-Zeiten bei Nythraxis, Dungeons, Delves und Weltbossen — normal und heroisch.",
      es: "Tiempos de kill en Nythraxis, mazmorras, delves y jefes de mundo — normal y heroico." },
    "home.cardPvpH": { en: "🛡️ PvP circuit", fr: "🛡️ Circuit PvP", de: "🛡️ PvP-Circuit", es: "🛡️ Circuito PvP" },
    "home.cardPvpP": {
      en: "Tournament circuit points and the best in-game ladder ratings per guild.",
      fr: "Les points du circuit de tournois et les meilleures cotes de ladder par guilde.",
      de: "Punkte des Turnier-Circuits und die besten Ladder-Wertungen jeder Gilde.",
      es: "Puntos del circuito de torneos y las mejores puntuaciones de ladder por gremio." },
    "home.cardTourH": { en: "🏟️ Tournaments", fr: "🏟️ Tournois", de: "🏟️ Turniere", es: "🏟️ Torneos" },
    "home.cardTourP": {
      en: "Single &amp; double elimination, pools, Swiss system — brackets and results.",
      fr: "Élimination directe et double, poules, système suisse — arbres et résultats.",
      de: "Single- &amp; Double-Elimination, Gruppen, Schweizer System — Brackets und Ergebnisse.",
      es: "Eliminación simple y doble, grupos, sistema suizo — cuadros y resultados." },
    "home.cardRulesH": { en: "📜 Rules &amp; submitting", fr: "📜 Règlement &amp; soumission", de: "📜 Regeln &amp; Einreichen", es: "📜 Reglas y envíos" },
    "home.cardRulesP": {
      en: "How records get verified, how to register your guild, how to contest a result.",
      fr: "Comment les records sont vérifiés, comment inscrire sa guilde, comment contester.",
      de: "Wie Rekorde verifiziert werden, wie du deine Gilde registrierst, wie du Ergebnisse anfechtest.",
      es: "Cómo se verifican los récords, cómo registrar tu gremio, cómo impugnar un resultado." },

    /* ---- Guilds page ---- */
    "guilds.title": { en: "Guilds — WoCC Guild Boards", fr: "Guildes — WoCC Guild Boards", de: "Gilden — WoCC Guild Boards", es: "Gremios — WoCC Guild Boards" },
    "guilds.h1": { en: "The guilds", fr: "Les guildes", de: "Die Gilden", es: "Los gremios" },
    "guilds.tagline": {
      en: "Every guild on the server, synced automatically from the game's official leaderboard API (rank, members, XP — every 3 hours). Mottos, websites and languages are declared by guild masters.",
      fr: "Toutes les guildes du serveur, synchronisées automatiquement depuis l'API officielle du classement du jeu (rang, effectif, XP — toutes les 3 heures). Devises, sites et langues sont déclarés par les maîtres de guilde.",
      de: "Alle Gilden des Servers, automatisch über die offizielle Leaderboard-API des Spiels synchronisiert (Rang, Mitglieder, XP — alle 3 Stunden). Mottos, Websites und Sprachen melden die Gildenmeister.",
      es: "Todos los gremios del servidor, sincronizados automáticamente desde la API oficial de clasificación del juego (rango, miembros, XP — cada 3 horas). Los lemas, webs e idiomas los declaran los maestros de gremio." },
    "guilds.missing": {
      en: "Your guild is missing? Register it — see the Rules page.",
      fr: "Ta guilde manque à l'appel ? Inscris-la — voir la page Règlement.",
      de: "Deine Gilde fehlt? Registriere sie — siehe die Regeln-Seite.",
      es: "¿Falta tu gremio? Regístralo — mira la página de Reglas." },

    /* ---- PvE page ---- */
    "pve.title": { en: "PvE records — WoCC Guild Boards", fr: "Records PvE — WoCC Guild Boards", de: "PvE-Rekorde — WoCC Guild Boards", es: "Récords PvE — WoCC Guild Boards" },
    "pve.h1": { en: "PvE records", fr: "Records PvE", de: "PvE-Rekorde", es: "Récords PvE" },
    "pve.tagline": {
      en: "One board per boss and difficulty. Timer runs from pull to kill (full run for delves). The top spot with video proof is the official server record.",
      fr: "Un tableau par boss et par difficulté. Le chrono court du pull au kill (gouffre complet pour les gouffres). La première place avec preuve vidéo est le record officiel du serveur.",
      de: "Ein Board pro Boss und Schwierigkeit. Die Zeit läuft vom Pull bis zum Kill (kompletter Run bei Delves). Platz 1 mit Videobeweis ist der offizielle Server-Rekord.",
      es: "Una tabla por jefe y dificultad. El crono corre del pull al kill (delve completo para los delves). El primer puesto con prueba en vídeo es el récord oficial del servidor." },

    /* ---- PvP page ---- */
    "pvp.title": { en: "PvP circuit — WoCC Guild Boards", fr: "Circuit PvP — WoCC Guild Boards", de: "PvP-Circuit — WoCC Guild Boards", es: "Circuito PvP — WoCC Guild Boards" },
    "pvp.h1": { en: "PvP circuit", fr: "Circuit PvP", de: "PvP-Circuit", es: "Circuito PvP" },
    "pvp.tagline": {
      en: "Guild PvP ranking driven by tournament placements — plus the best in-game ladder ratings (1v1 &amp; 2v2 ranked) claimed by each guild.",
      fr: "Le classement PvP des guildes, alimenté par les placements en tournoi — plus les meilleures cotes des ladders en jeu (1v1 et 2v2 classés) revendiquées par chaque guilde.",
      de: "Die PvP-Rangliste der Gilden, gespeist aus Turnierplatzierungen — plus die besten Ladder-Wertungen im Spiel (1v1 &amp; 2v2 gewertet) jeder Gilde.",
      es: "La clasificación PvP de los gremios, alimentada por las posiciones en torneos — más las mejores puntuaciones de ladder del juego (1v1 y 2v2 clasificatorio) de cada gremio." },
    "pvp.circuitH": { en: "Tournament <span class=\"em\">circuit</span>", fr: "Circuit des <span class=\"em\">tournois</span>", de: "Turnier-<span class=\"em\">Circuit</span>", es: "Circuito de <span class=\"em\">torneos</span>" },
    "pvp.circuitSub": {
      en: "Points earned across inter-guild tournaments (major: 100/60/45/35/20 — standard: 50/30/22/18/10). Computed automatically from tournament results.",
      fr: "Points cumulés sur les tournois inter-guildes (majeur : 100/60/45/35/20 — standard : 50/30/22/18/10). Calculés automatiquement depuis les résultats des tournois.",
      de: "Punkte aus gildenübergreifenden Turnieren (Major: 100/60/45/35/20 — Standard: 50/30/22/18/10). Automatisch aus den Turnierergebnissen berechnet.",
      es: "Puntos acumulados en torneos entre gremios (mayor: 100/60/45/35/20 — estándar: 50/30/22/18/10). Calculados automáticamente a partir de los resultados." },
    "pvp.laddersH": { en: "In-game <span class=\"em\">ladders</span>", fr: "Ladders <span class=\"em\">en jeu</span>", de: "Ladder <span class=\"em\">im Spiel</span>", es: "Ladders <span class=\"em\">del juego</span>" },
    "pvp.laddersSub": {
      en: "Best rating per guild on the ranked ladders (declared by guild masters, screenshot/video for verification). Informative — does not feed the circuit points.",
      fr: "Meilleure cote par guilde sur les ladders classés (déclarée par les maîtres de guilde, capture/vidéo pour vérification). Informatif — n'alimente pas les points du circuit.",
      de: "Beste Wertung jeder Gilde auf den gewerteten Laddern (vom Gildenmeister gemeldet, Screenshot/Video zur Verifizierung). Informativ — zählt nicht für den Circuit.",
      es: "Mejor puntuación por gremio en los ladders clasificatorios (declarada por los maestros de gremio, captura/vídeo para verificación). Informativo — no alimenta los puntos del circuito." },

    /* ---- Tournaments page ---- */
    "tourneys.title": { en: "Tournaments — WoCC Guild Boards", fr: "Tournois — WoCC Guild Boards", de: "Turniere — WoCC Guild Boards", es: "Torneos — WoCC Guild Boards" },
    "tourneys.h1": { en: "Tournaments", fr: "Tournois", de: "Turniere", es: "Torneos" },
    "tourneys.tagline": {
      en: "The inter-guild circuit. Four formats supported: single elimination, double elimination, pools (round robin) and Swiss system. Placements feed the PvP circuit automatically. Any guild can host — majors are run by the Boards.",
      fr: "Le circuit inter-guildes. Quatre formats gérés : élimination directe, double élimination, poules (round robin) et système suisse. Les placements alimentent automatiquement le circuit PvP. Chaque guilde peut organiser — les majeurs sont tenus par les Boards.",
      de: "Der gildenübergreifende Circuit. Vier Formate: Single-Elimination, Double-Elimination, Gruppen (Round Robin) und Schweizer System. Platzierungen fließen automatisch in den PvP-Circuit. Jede Gilde kann ausrichten — Majors organisieren die Boards.",
      es: "El circuito entre gremios. Cuatro formatos: eliminación simple, eliminación doble, grupos (round robin) y sistema suizo. Las posiciones alimentan automáticamente el circuito PvP. Cualquier gremio puede organizar — los mayores los llevan las Boards." },
    "tourneys.empty": {
      en: "No tournament yet — the circuit is waiting for its first one. Any guild can host: open a tournament issue and the Boards will help you set up the bracket.",
      fr: "Aucun tournoi pour l'instant — le circuit attend le premier. Chaque guilde peut organiser : ouvre une issue « Tournoi » et les Boards t'aideront à monter l'arbre.",
      de: "Noch kein Turnier — der Circuit wartet auf das erste. Jede Gilde kann ausrichten: eröffne ein Turnier-Issue und die Boards helfen beim Bracket.",
      es: "Aún no hay torneos — el circuito espera el primero. Cualquier gremio puede organizar: abre una issue de torneo y las Boards te ayudarán con el cuadro." },
    "tourneys.emptyCta": { en: "Propose a tournament", fr: "Proposer un tournoi", de: "Ein Turnier vorschlagen", es: "Proponer un torneo" },

    /* ---- Rules page (long-form blocks; values may contain HTML) ---- */
    "rules.title": { en: "Rules &amp; submitting — WoCC Guild Boards", fr: "Règlement &amp; soumission — WoCC Guild Boards", de: "Regeln &amp; Einreichen — WoCC Guild Boards", es: "Reglas y envíos — WoCC Guild Boards" },
    "rules.h1": { en: "Rules &amp; submitting", fr: "Règlement &amp; soumission", de: "Regeln &amp; Einreichen", es: "Reglas y envíos" },
    "rules.tagline": {
      en: "Simple principle: everyone can play, everything is public, and proof beats trust. The boards live on GitHub — every record is a commit, every dispute is an issue, the whole history is auditable.",
      fr: "Principe simple : tout le monde peut jouer, tout est public, et la preuve l'emporte sur la confiance. Les boards vivent sur GitHub — chaque record est un commit, chaque litige est une issue, tout l'historique est auditable.",
      de: "Einfaches Prinzip: Jeder kann mitmachen, alles ist öffentlich, und Beweise schlagen Vertrauen. Die Boards leben auf GitHub — jeder Rekord ist ein Commit, jeder Streitfall ein Issue, die gesamte Historie ist nachvollziehbar.",
      es: "Principio simple: todos pueden jugar, todo es público y la prueba vence a la confianza. Las tablas viven en GitHub — cada récord es un commit, cada disputa una issue, todo el historial es auditable." },
    "rules.s1h": { en: "1. Verification: two levels of trust", fr: "1. Vérification : deux niveaux de confiance", de: "1. Verifizierung: zwei Vertrauensstufen", es: "1. Verificación: dos niveles de confianza" },
    "rules.s1p": {
      en: "We chose a hybrid system rather than forcing video on everyone or trusting everyone blindly:",
      fr: "Nous avons choisi un système hybride plutôt que d'imposer la vidéo à tous ou de croire tout le monde sur parole :",
      de: "Wir haben uns für ein Hybridsystem entschieden, statt allen Videos vorzuschreiben oder allen blind zu vertrauen:",
      es: "Elegimos un sistema híbrido en lugar de exigir vídeo a todos o confiar ciegamente en todos:" },
    "rules.s1list": {
      en: "<li><span class=\"badge verified\">✔ Verified</span> — the submission includes a video (or unedited VOD) reviewed by a Boards maintainer: full fight visible, timer checkable, roster countable. This is the gold standard.</li><li><span class=\"badge declared\">✎ On honor</span> — the guild master declares the result without proof. The entry is listed and ranked, but visually marked, and…</li>",
      fr: "<li><span class=\"badge verified\">✔ Vérifié</span> — la soumission inclut une vidéo (ou VOD non coupée) relue par un mainteneur des Boards : combat visible en entier, chrono vérifiable, effectif comptable. C'est l'étalon-or.</li><li><span class=\"badge declared\">✎ Sur l'honneur</span> — le maître de guilde déclare le résultat sans preuve. L'entrée est listée et classée, mais marquée visuellement, et…</li>",
      de: "<li><span class=\"badge verified\">✔ Verifiziert</span> — die Einreichung enthält ein Video (oder ungeschnittenes VOD), das ein Maintainer geprüft hat: kompletter Kampf sichtbar, Zeit nachprüfbar, Gruppe zählbar. Das ist der Goldstandard.</li><li><span class=\"badge declared\">✎ Auf Ehrenwort</span> — der Gildenmeister meldet das Ergebnis ohne Beweis. Der Eintrag wird gelistet und gewertet, aber sichtbar markiert, und…</li>",
      es: "<li><span class=\"badge verified\">✔ Verificado</span> — el envío incluye un vídeo (o VOD sin cortes) revisado por un mantenedor de las Boards: combate completo visible, crono comprobable, grupo contable. Es el estándar de oro.</li><li><span class=\"badge declared\">✎ Bajo palabra</span> — el maestro de gremio declara el resultado sin prueba. La entrada se lista y clasifica, pero marcada visualmente, y…</li>" },
    "rules.s1callout": {
      en: "<b>The golden rule:</b> on any board, verified entries always rank above declared ones — even with a slower time. And the #1 spot only carries the “Server record” title if it is verified. No proof, no record. Declaring on honor still gets you on the board and keeps the process light; filming gets you the crown.",
      fr: "<b>La règle d'or :</b> sur chaque tableau, les entrées vérifiées passent toujours devant les déclarées — même avec un temps plus lent. Et la première place ne porte le titre « Record du serveur » que si elle est vérifiée. Pas de preuve, pas de record — mais déclarer sur l'honneur te place quand même au tableau et garde le processus léger ; filmer te donne la couronne.",
      de: "<b>Die goldene Regel:</b> Auf jedem Board stehen verifizierte Einträge immer vor gemeldeten — auch mit langsamerer Zeit. Und Platz 1 trägt den Titel „Server-Rekord“ nur, wenn er verifiziert ist. Kein Beweis, kein Rekord. Auf Ehrenwort zu melden bringt dich trotzdem aufs Board und bleibt unkompliziert; filmen bringt dir die Krone.",
      es: "<b>La regla de oro:</b> en cada tabla, las entradas verificadas siempre van por delante de las declaradas — incluso con un tiempo más lento. Y el primer puesto solo lleva el título de «Récord del servidor» si está verificado. Sin prueba no hay récord. Declarar bajo palabra te pone igualmente en la tabla y mantiene el proceso ligero; grabar te da la corona." },
    "rules.s1why": {
      en: "Why this trade-off? Pure video slows everyone down and kills casual participation; pure trust kills credibility. This way casual guilds post times in 2 minutes, and competitive guilds have a real incentive to record their fights.",
      fr: "Pourquoi ce compromis ? Le tout-vidéo alourdit et décourage la participation détente ; le tout-confiance tue la crédibilité. Ainsi, une guilde tranquille poste son temps en 2 minutes, et une guilde compétitive a une vraie raison de filmer ses kills.",
      de: "Warum dieser Kompromiss? Nur-Video bremst alle aus und schreckt Gelegenheitsgilden ab; blindes Vertrauen zerstört die Glaubwürdigkeit. So postet eine entspannte Gilde ihre Zeit in 2 Minuten, und eine ambitionierte Gilde hat einen echten Grund, ihre Kills aufzunehmen.",
      es: "¿Por qué este equilibrio? El todo-vídeo lo ralentiza todo y desanima la participación casual; la confianza ciega mata la credibilidad. Así, un gremio tranquilo publica su tiempo en 2 minutos, y un gremio competitivo tiene un motivo real para grabar sus kills." },
    "rules.s2h": { en: "2. How to submit", fr: "2. Comment soumettre", de: "2. So reichst du ein", es: "2. Cómo enviar" },
    "rules.s2p": {
      en: "Everything goes through the GitHub repository — no account on any third-party site, no server to maintain:",
      fr: "Tout passe par le dépôt GitHub — aucun compte sur un site tiers, aucun serveur à maintenir :",
      de: "Alles läuft über das GitHub-Repository — kein Konto auf Drittseiten, kein Server zu betreiben:",
      es: "Todo pasa por el repositorio de GitHub — sin cuentas en sitios de terceros, sin servidor que mantener:" },
    "rules.s2list": {
      en: "<li><strong>Register your guild:</strong> open the “Guild registration” issue (name, tag, region, members, average level, total XP). A maintainer merges it into <code>data/guilds.json</code>.</li><li><strong>Submit a PvE record:</strong> “PvE record” issue — boss, difficulty, kill time, roster size, date, video link if available. Or open a PR directly on <code>data/pve-records.json</code>.</li><li><strong>Ladder rating:</strong> same flow, targeting <code>data/pvp.json</code>.</li><li><strong>Tournament results:</strong> the organizer submits the full bracket to <code>data/tournaments.json</code>.</li>",
      fr: "<li><strong>Inscrire sa guilde :</strong> ouvrir l'issue « Guild registration » (nom, tag, région, effectif, niveau moyen, XP totale). Un mainteneur l'intègre dans <code>data/guilds.json</code>.</li><li><strong>Soumettre un record PvE :</strong> issue « PvE record » — boss, difficulté, temps de kill, effectif, date, lien vidéo si disponible. Ou une PR directement sur <code>data/pve-records.json</code>.</li><li><strong>Cote de ladder :</strong> même logique, vers <code>data/pvp.json</code>.</li><li><strong>Résultats de tournoi :</strong> l'organisateur soumet l'arbre complet vers <code>data/tournaments.json</code>.</li>",
      de: "<li><strong>Gilde registrieren:</strong> das Issue „Guild registration“ öffnen (Name, Tag, Region, Mitglieder, Durchschnittslevel, Gesamt-XP). Ein Maintainer trägt sie in <code>data/guilds.json</code> ein.</li><li><strong>PvE-Rekord einreichen:</strong> Issue „PvE record“ — Boss, Schwierigkeit, Kill-Zeit, Gruppengröße, Datum, Videolink falls vorhanden. Oder direkt eine PR auf <code>data/pve-records.json</code>.</li><li><strong>Ladder-Wertung:</strong> gleicher Ablauf, Ziel <code>data/pvp.json</code>.</li><li><strong>Turnierergebnisse:</strong> der Ausrichter reicht das komplette Bracket für <code>data/tournaments.json</code> ein.</li>",
      es: "<li><strong>Registrar tu gremio:</strong> abre la issue «Guild registration» (nombre, tag, región, miembros, nivel medio, XP total). Un mantenedor la integra en <code>data/guilds.json</code>.</li><li><strong>Enviar un récord PvE:</strong> issue «PvE record» — jefe, dificultad, tiempo de kill, tamaño del grupo, fecha, enlace de vídeo si existe. O una PR directa sobre <code>data/pve-records.json</code>.</li><li><strong>Puntuación de ladder:</strong> mismo flujo, hacia <code>data/pvp.json</code>.</li><li><strong>Resultados de torneo:</strong> el organizador envía el cuadro completo a <code>data/tournaments.json</code>.</li>" },
    "rules.s2note": {
      en: "Guild masters (or an officer they name in the registration issue) are the only voices that count for their guild's submissions.",
      fr: "Seuls les maîtres de guilde (ou un officier désigné dans l'issue d'inscription) font foi pour les soumissions de leur guilde.",
      de: "Nur Gildenmeister (oder ein im Registrierungs-Issue benannter Offizier) sind für Einreichungen ihrer Gilde maßgeblich.",
      es: "Solo los maestros de gremio (o un oficial designado en la issue de registro) dan fe de los envíos de su gremio." },
    "rules.s3h": { en: "3. PvE boards", fr: "3. Tableaux PvE", de: "3. PvE-Boards", es: "3. Tablas PvE" },
    "rules.s3list": {
      en: "<li>One board per boss × difficulty (normal / heroic), aligned with the game's content: the Nythraxis raid (10 players), the four dungeons (5 players), the delves (2 players, full clear time) and the world boss Thunzharr.</li><li>The timer runs from pull to death of the boss (from entering to clearing for delves).</li><li>Each guild appears once per board with its best attempt. First-kill dates are tracked too (progress race).</li><li>Per-board scoring towards the overall standings (F1 scale): 25, 18, 15, 12, 10, 8, 6, 4, 2, 1.</li><li>When a game update changes an encounter significantly, the affected boards are archived and restart fresh (the patch is stored on every record).</li>",
      fr: "<li>Un tableau par boss × difficulté (normal / héroïque), aligné sur le contenu du jeu : le raid Nythraxis (10 joueurs), les quatre donjons (5 joueurs), les gouffres (2 joueurs, temps sur le gouffre complet) et le boss mondial Thunzharr.</li><li>Le chrono court du pull à la mort du boss (de l'entrée au clear pour les gouffres).</li><li>Chaque guilde apparaît une fois par tableau avec son meilleur essai. Les dates de premier kill sont aussi suivies (course à la progression).</li><li>Barème par tableau pour le classement général (barème F1) : 25, 18, 15, 12, 10, 8, 6, 4, 2, 1.</li><li>Quand une MAJ du jeu change significativement une rencontre, les tableaux concernés sont archivés et repartent à zéro (la version du jeu est stockée sur chaque record).</li>",
      de: "<li>Ein Board pro Boss × Schwierigkeit (normal / heroisch), am Spielinhalt ausgerichtet: der Nythraxis-Raid (10 Spieler), die vier Dungeons (5 Spieler), die Delves (2 Spieler, komplette Clear-Zeit) und der Weltboss Thunzharr.</li><li>Die Zeit läuft vom Pull bis zum Tod des Bosses (vom Betreten bis zum Clear bei Delves).</li><li>Jede Gilde erscheint einmal pro Board mit ihrem besten Versuch. First-Kill-Daten werden ebenfalls erfasst (Progress-Rennen).</li><li>Wertung pro Board für die Gesamtwertung (F1-Skala): 25, 18, 15, 12, 10, 8, 6, 4, 2, 1.</li><li>Ändert ein Spiel-Update eine Begegnung wesentlich, werden die betroffenen Boards archiviert und neu gestartet (die Spielversion wird bei jedem Rekord gespeichert).</li>",
      es: "<li>Una tabla por jefe × dificultad (normal / heroico), alineada con el contenido del juego: el raid de Nythraxis (10 jugadores), las cuatro mazmorras (5 jugadores), los delves (2 jugadores, tiempo de clear completo) y el jefe de mundo Thunzharr.</li><li>El crono corre del pull a la muerte del jefe (de la entrada al clear en los delves).</li><li>Cada gremio aparece una vez por tabla con su mejor intento. También se registran las fechas de primer kill (carrera de progresión).</li><li>Baremo por tabla para la clasificación general (escala F1): 25, 18, 15, 12, 10, 8, 6, 4, 2, 1.</li><li>Cuando una actualización cambia significativamente un encuentro, las tablas afectadas se archivan y empiezan de cero (la versión del juego se guarda en cada récord).</li>" },
    "rules.s4h": { en: "4. PvP circuit &amp; tournaments", fr: "4. Circuit PvP &amp; tournois", de: "4. PvP-Circuit &amp; Turniere", es: "4. Circuito PvP y torneos" },
    "rules.s4list": {
      en: "<li>Supported formats: single elimination, double elimination, pools (round robin) and Swiss system.</li><li>Circuit points by placement — major tournaments: 100 / 60 / 45 / 35 / 20 (5th–8th); standard: 50 / 30 / 22 / 18 / 10.</li><li>Any guild can host a standard tournament; majors are organized or co-signed by the Boards maintainers.</li><li>In-game ladder ratings (1v1/2v2) are displayed for bragging rights but never feed circuit points — only cross-guild competition does.</li>",
      fr: "<li>Formats gérés : élimination directe, double élimination, poules (round robin) et système suisse.</li><li>Points du circuit par placement — tournois majeurs : 100 / 60 / 45 / 35 / 20 (5e–8e) ; standards : 50 / 30 / 22 / 18 / 10.</li><li>Chaque guilde peut organiser un tournoi standard ; les majeurs sont organisés ou co-signés par les mainteneurs des Boards.</li><li>Les cotes de ladder en jeu (1v1/2v2) sont affichées pour la gloire mais n'alimentent jamais le circuit — seule la compétition inter-guildes compte.</li>",
      de: "<li>Unterstützte Formate: Single-Elimination, Double-Elimination, Gruppen (Round Robin) und Schweizer System.</li><li>Circuit-Punkte nach Platzierung — Major-Turniere: 100 / 60 / 45 / 35 / 20 (5.–8.); Standard: 50 / 30 / 22 / 18 / 10.</li><li>Jede Gilde kann ein Standard-Turnier ausrichten; Majors werden von den Boards-Maintainern organisiert oder mitgetragen.</li><li>Ladder-Wertungen im Spiel (1v1/2v2) werden fürs Prestige angezeigt, zählen aber nie für den Circuit — nur gildenübergreifender Wettbewerb zählt.</li>",
      es: "<li>Formatos: eliminación simple, eliminación doble, grupos (round robin) y sistema suizo.</li><li>Puntos del circuito por posición — torneos mayores: 100 / 60 / 45 / 35 / 20 (5.º–8.º); estándar: 50 / 30 / 22 / 18 / 10.</li><li>Cualquier gremio puede organizar un torneo estándar; los mayores los organizan o avalan los mantenedores de las Boards.</li><li>Las puntuaciones de ladder del juego (1v1/2v2) se muestran por prestigio pero nunca alimentan el circuito — solo cuenta la competición entre gremios.</li>" },
    "rules.s5h": { en: "5. Disputes", fr: "5. Contestations", de: "5. Anfechtungen", es: "5. Disputas" },
    "rules.s5list": {
      en: "<li>Any result can be contested within 7 days via the “Dispute” issue, with an explanation.</li><li>A contested declared entry must produce proof or is removed. A contested verified entry is re-reviewed by two maintainers.</li><li>Proven cheating (edited video, fabricated result) = guild suspended from the boards for one season.</li>",
      fr: "<li>Tout résultat peut être contesté sous 7 jours via l'issue « Dispute », avec explication.</li><li>Une entrée sur l'honneur contestée doit produire une preuve, sinon elle est retirée. Une entrée vérifiée contestée est re-relue par deux mainteneurs.</li><li>Triche avérée (vidéo montée, résultat fabriqué) = guilde suspendue des boards pour une saison.</li>",
      de: "<li>Jedes Ergebnis kann innerhalb von 7 Tagen per „Dispute“-Issue mit Begründung angefochten werden.</li><li>Ein angefochtener Ehrenwort-Eintrag muss einen Beweis liefern oder wird entfernt. Ein angefochtener verifizierter Eintrag wird von zwei Maintainern erneut geprüft.</li><li>Nachgewiesenes Cheaten (geschnittenes Video, erfundenes Ergebnis) = Gilde für eine Saison von den Boards gesperrt.</li>",
      es: "<li>Cualquier resultado puede impugnarse en 7 días mediante la issue «Dispute», con explicación.</li><li>Una entrada bajo palabra impugnada debe aportar prueba o se retira. Una entrada verificada impugnada es revisada de nuevo por dos mantenedores.</li><li>Trampa probada (vídeo editado, resultado fabricado) = gremio suspendido de las tablas una temporada.</li>" },
    "rules.s6h": { en: "6. Why GitHub, and the road to “official”", fr: "6. Pourquoi GitHub, et le chemin vers l'« officiel »", de: "6. Warum GitHub — und der Weg zum „Offiziellen“", es: "6. Por qué GitHub, y el camino a lo «oficial»" },
    "rules.s6p": {
      en: "The whole site is static and free to host (GitHub Pages). There is no database: the JSON files in the repo are the database, and the git history is the audit log. That makes the project trivially transferable: levy-street could fork or adopt the repository, plug real game data (or an API) into the same JSON contracts, and these boards become the official ones without rewriting anything.",
      fr: "Tout le site est statique et gratuit à héberger (GitHub Pages). Il n'y a pas de base de données : les fichiers JSON du dépôt sont la base de données, et l'historique git est le journal d'audit. Le projet est donc trivial à transférer : levy-street peut forker ou adopter le dépôt, brancher les vraies données du jeu (ou une API) sur les mêmes contrats JSON, et ces boards deviennent officiels sans rien réécrire.",
      de: "Die gesamte Seite ist statisch und kostenlos zu hosten (GitHub Pages). Es gibt keine Datenbank: Die JSON-Dateien im Repo sind die Datenbank, die Git-Historie ist das Audit-Log. Damit ist das Projekt trivial übertragbar: levy-street könnte das Repository forken oder übernehmen, echte Spieldaten (oder eine API) an dieselben JSON-Verträge anschließen — und diese Boards werden offiziell, ohne dass etwas neu geschrieben wird.",
      es: "Todo el sitio es estático y gratuito de alojar (GitHub Pages). No hay base de datos: los archivos JSON del repo son la base de datos, y el historial de git es el registro de auditoría. Eso hace el proyecto trivial de transferir: levy-street puede forkear o adoptar el repositorio, conectar los datos reales del juego (o una API) a los mismos contratos JSON, y estas tablas se vuelven oficiales sin reescribir nada." },
    "rules.s6callout": {
      en: "<b>Roadmap if adopted:</b> automatic kill times pushed by the game server (no more video needed), OAuth guild identity, seasons with rewards, and per-class speedrun boards.",
      fr: "<b>Feuille de route si adoption :</b> temps de kill poussés automatiquement par le serveur du jeu (plus besoin de vidéo), identité de guilde via OAuth, saisons avec récompenses, et tableaux de speedrun par classe.",
      de: "<b>Roadmap bei Übernahme:</b> automatisch vom Spielserver gemeldete Kill-Zeiten (kein Video mehr nötig), OAuth-Gildenidentität, Saisons mit Belohnungen und Speedrun-Boards pro Klasse.",
      es: "<b>Hoja de ruta si se adopta:</b> tiempos de kill enviados automáticamente por el servidor del juego (sin necesidad de vídeo), identidad de gremio por OAuth, temporadas con recompensas y tablas de speedrun por clase." },

    /* ---- Dynamic strings (rendered from app.js) ---- */
    "rank":        { en: "Rank", fr: "Rang", de: "Platz", es: "Puesto" },
    "guild":       { en: "Guild", fr: "Guilde", de: "Gilde", es: "Gremio" },
    "time":        { en: "Time", fr: "Temps", de: "Zeit", es: "Tiempo" },
    "roster":      { en: "Roster", fr: "Effectif", de: "Gruppe", es: "Grupo" },
    "date":        { en: "Date", fr: "Date", de: "Datum", es: "Fecha" },
    "firstKill":   { en: "First kill", fr: "Premier kill", de: "First Kill", es: "Primer kill" },
    "proof":       { en: "Proof", fr: "Preuve", de: "Beweis", es: "Prueba" },
    "verified":    { en: "Verified", fr: "Vérifié", de: "Verifiziert", es: "Verificado" },
    "declared":    { en: "On honor", fr: "Sur l'honneur", de: "Auf Ehrenwort", es: "Bajo palabra" },
    "serverRecord":{ en: "Server record", fr: "Record du serveur", de: "Server-Rekord", es: "Récord del servidor" },
    "watch":       { en: "Watch video", fr: "Voir la vidéo", de: "Video ansehen", es: "Ver vídeo" },
    "members":     { en: "Members", fr: "Membres", de: "Mitglieder", es: "Miembros" },
    "avgLevel":    { en: "Avg level", fr: "Niv. moyen", de: "Ø-Level", es: "Nivel medio" },
    "totalXp":     { en: "Total XP", fr: "XP totale", de: "Gesamt-XP", es: "XP total" },
    "since":       { en: "Founded", fr: "Fondée le", de: "Gegründet", es: "Fundado" },
    "region":      { en: "Region", fr: "Région", de: "Region", es: "Región" },
    "points":      { en: "Points", fr: "Points", de: "Punkte", es: "Puntos" },
    "pvePts":      { en: "PvE pts", fr: "Pts PvE", de: "PvE-Pkt.", es: "Pts PvE" },
    "circuitPts":  { en: "PvP circuit pts", fr: "Pts circuit PvP", de: "PvP-Circuit-Pkt.", es: "Pts circuito PvP" },
    "total":       { en: "Total", fr: "Total", de: "Gesamt", es: "Total" },
    "noRecords":   { en: "No record submitted — be the first!", fr: "Aucun record soumis — soyez les premiers !", de: "Noch kein Rekord eingereicht — sei die erste Gilde!", es: "Ningún récord enviado — ¡sed los primeros!" },
    "noLatest":    { en: "No records yet — the boards open today. Yours could be the first entry.", fr: "Pas encore de record — les boards ouvrent tout juste. Le vôtre peut être la première entrée.", de: "Noch keine Rekorde — die Boards öffnen gerade erst. Deiner könnte der erste Eintrag sein.", es: "Aún no hay récords — las tablas acaban de abrir. El vuestro puede ser el primero." },
    "noTourney":   { en: "No tournament scheduled yet — any guild can propose one (see Tournaments).", fr: "Aucun tournoi planifié pour l'instant — chaque guilde peut en proposer un (voir Tournois).", de: "Noch kein Turnier geplant — jede Gilde kann eines vorschlagen (siehe Turniere).", es: "Aún no hay torneos programados — cualquier gremio puede proponer uno (ver Torneos)." },
    "noCircuit":   { en: "No tournament played yet — circuit points will appear after the first one.", fr: "Aucun tournoi joué pour l'instant — les points du circuit apparaîtront après le premier.", de: "Noch kein Turnier gespielt — Circuit-Punkte erscheinen nach dem ersten.", es: "Aún no se ha jugado ningún torneo — los puntos del circuito aparecerán tras el primero." },
    "noLadder":    { en: "No rating claimed yet.", fr: "Aucune cote revendiquée pour l'instant.", de: "Noch keine Wertung gemeldet.", es: "Aún no se ha reclamado ninguna puntuación." },
    "player":      { en: "Player(s)", fr: "Joueur(s)", de: "Spieler", es: "Jugador(es)" },
    "rating":      { en: "Rating", fr: "Cote", de: "Wertung", es: "Puntuación" },
    "normal":      { en: "Normal", fr: "Normal", de: "Normal", es: "Normal" },
    "heroic":      { en: "Heroic", fr: "Héroïque", de: "Heroisch", es: "Heroico" },
    "players":     { en: "players", fr: "joueurs", de: "Spieler", es: "jugadores" },
    "openWorld":   { en: "open world", fr: "monde ouvert", de: "offene Welt", es: "mundo abierto" },
    "clearNote":   { en: "full delve clear time", fr: "temps sur le gouffre complet", de: "komplette Delve-Clear-Zeit", es: "tiempo de delve completo" },
    "wins":        { en: "W", fr: "V", de: "S", es: "V" },
    "losses":      { en: "L", fr: "D", de: "N", es: "D" },
    "diff":        { en: "Diff.", fr: "Diff.", de: "Diff.", es: "Dif." },
    "played":      { en: "P", fr: "J", de: "Sp.", es: "J" },
    "standings":   { en: "Standings", fr: "Classement", de: "Tabelle", es: "Clasificación" },
    "poolPhase":   { en: "Group stage", fr: "Phase de poules", de: "Gruppenphase", es: "Fase de grupos" },
    "playoffs":    { en: "Playoffs", fr: "Phase finale", de: "Finalrunde", es: "Fase final" },
    "rounds":      { en: "Rounds", fr: "Rondes", de: "Runden", es: "Rondas" },
    "bronzeMatch": { en: "Bronze match", fr: "Petite finale", de: "Spiel um Platz 3", es: "Partido por el bronce" },
    "grandFinal":  { en: "Grand final", fr: "Grande finale", de: "Großes Finale", es: "Gran final" },
    "registered":  { en: "Registered teams", fr: "Équipes inscrites", de: "Angemeldete Teams", es: "Equipos inscritos" },
    "registerCta": { en: "Register my team", fr: "Inscrire mon équipe", de: "Mein Team anmelden", es: "Inscribir mi equipo" },
    "statusOpen":  { en: "Registration open", fr: "Inscriptions ouvertes", de: "Anmeldung offen", es: "Inscripción abierta" },
    "statusOngoing":{ en: "Ongoing", fr: "En cours", de: "Läuft", es: "En curso" },
    "statusDone":  { en: "Finished", fr: "Terminé", de: "Beendet", es: "Finalizado" },
    "tierMajor":   { en: "Major", fr: "Majeur", de: "Major", es: "Mayor" },
    "tierStandard":{ en: "Standard", fr: "Standard", de: "Standard", es: "Estándar" },
    "fmtSingle":   { en: "Single elimination", fr: "Élimination directe", de: "Single-Elimination", es: "Eliminación simple" },
    "fmtDouble":   { en: "Double elimination", fr: "Double élimination", de: "Double-Elimination", es: "Eliminación doble" },
    "fmtRR":       { en: "Round robin (pools)", fr: "Poules (round robin)", de: "Round Robin (Gruppen)", es: "Round robin (grupos)" },
    "fmtSwiss":    { en: "Swiss system", fr: "Système suisse", de: "Schweizer System", es: "Sistema suizo" },
    "organizer":   { en: "Hosted by", fr: "Organisé par", de: "Ausgerichtet von", es: "Organizado por" },
    "mode":        { en: "Mode", fr: "Mode", de: "Modus", es: "Modo" },
    "statGuilds":  { en: "registered guilds", fr: "guildes inscrites", de: "registrierte Gilden", es: "gremios registrados" },
    "statRecords": { en: "records submitted", fr: "records soumis", de: "eingereichte Rekorde", es: "récords enviados" },
    "statVerified":{ en: "verified records", fr: "records vérifiés", de: "verifizierte Rekorde", es: "récords verificados" },
    "statTourneys":{ en: "circuit tournaments", fr: "tournois du circuit", de: "Circuit-Turniere", es: "torneos del circuito" },
    "seeAll":      { en: "See all", fr: "Voir tout", de: "Alle ansehen", es: "Ver todo" },
    "all":         { en: "All", fr: "Tout", de: "Alle", es: "Todo" },
    "sortBy":      { en: "Sort by", fr: "Trier par", de: "Sortieren nach", es: "Ordenar por" },
    "seniority":   { en: "Seniority", fr: "Ancienneté", de: "Alter", es: "Antigüedad" },
    "srvRank":     { en: "Server rank", fr: "Rang serveur", de: "Server-Rang", es: "Rango del servidor" },
    "topLevel":    { en: "Top level", fr: "Niveau max", de: "Top-Level", es: "Nivel máx." },
    "noStandings": {
      en: "No points scored yet — points come from PvE records and tournament placements. Submit yours!",
      fr: "Pas encore de points marqués — ils viennent des records PvE et des placements en tournoi. Soumettez les vôtres !",
      de: "Noch keine Punkte — Punkte kommen aus PvE-Rekorden und Turnierplatzierungen. Reicht eure ein!",
      es: "Aún no hay puntos — llegan de los récords PvE y las posiciones en torneos. ¡Enviad los vuestros!" },
    "bestTimeNote":{
      en: "Best time per guild. Verified entries (video) always rank above declared ones.",
      fr: "Meilleur temps par guilde. Les entrées vérifiées (vidéo) passent toujours devant les déclarées.",
      de: "Beste Zeit pro Gilde. Verifizierte Einträge (Video) stehen immer vor gemeldeten.",
      es: "Mejor tiempo por gremio. Las entradas verificadas (vídeo) siempre van por delante de las declaradas." },
    "demoBanner":  {
      en: "⚠ Demo data — the boards are awaiting their first official submissions. Your guild can register now (see Rules).",
      fr: "⚠ Données de démonstration — le circuit attend ses premières soumissions officielles. Votre guilde peut s'inscrire dès maintenant (voir Règlement).",
      de: "⚠ Demo-Daten — die Boards warten auf die ersten offiziellen Einreichungen. Deine Gilde kann sich jetzt registrieren (siehe Regeln).",
      es: "⚠ Datos de demostración — las tablas esperan sus primeros envíos oficiales. Tu gremio puede registrarse ya (ver Reglas)." },
    "loadError": {
      en: "<b>Could not load data.</b> If you opened the site locally, serve it with <code>python3 -m http.server</code> (the <code>file://</code> protocol blocks requests).",
      fr: "<b>Impossible de charger les données.</b> Si vous ouvrez le site en local, servez-le via <code>python3 -m http.server</code> (le protocole <code>file://</code> bloque les requêtes).",
      de: "<b>Daten konnten nicht geladen werden.</b> Lokal geöffnet? Dann per <code>python3 -m http.server</code> ausliefern (das <code>file://</code>-Protokoll blockiert Anfragen).",
      es: "<b>No se pudieron cargar los datos.</b> Si abriste el sitio en local, sírvelo con <code>python3 -m http.server</code> (el protocolo <code>file://</code> bloquea las peticiones)." }
  }
};
