/* Boards des Guildes — application (vanilla JS, aucune dépendance).
   Tout est calculé côté client à partir de data/*.json :
   - classements PvE : tri « vérifié d'abord, puis temps » (voir reglement.html)
   - circuit PvP : points dérivés des placements de tournois
   - score composite (accueil) : points PvE + points circuit
   Bilingue : FR par défaut, EN via le bouton de nav (attributs data-en + dict T). */

(() => {
  "use strict";

  /* ---------- i18n ---------- */
  const LANG_KEY = "boards-lang";
  let lang = (() => {
    const p = new URLSearchParams(location.search).get("lang");
    if (p === "en" || p === "fr") { try { localStorage.setItem(LANG_KEY, p); } catch (e) {} return p; }
    try { return localStorage.getItem(LANG_KEY) === "en" ? "en" : "fr"; } catch (e) { return "fr"; }
  })();

  const T = {
    rank:        { fr: "Rang", en: "Rank" },
    guild:       { fr: "Guilde", en: "Guild" },
    time:        { fr: "Temps", en: "Time" },
    roster:      { fr: "Effectif", en: "Roster" },
    date:        { fr: "Date", en: "Date" },
    firstKill:   { fr: "Premier kill", en: "First kill" },
    proof:       { fr: "Preuve", en: "Proof" },
    verified:    { fr: "Vérifié", en: "Verified" },
    declared:    { fr: "Sur l'honneur", en: "On honor" },
    serverRecord:{ fr: "Record du serveur", en: "Server record" },
    watch:       { fr: "Voir la vidéo", en: "Watch video" },
    members:     { fr: "Membres", en: "Members" },
    avgLevel:    { fr: "Niv. moyen", en: "Avg level" },
    totalXp:     { fr: "XP totale", en: "Total XP" },
    since:       { fr: "Fondée le", en: "Founded" },
    region:      { fr: "Région", en: "Region" },
    points:      { fr: "Points", en: "Points" },
    pvePts:      { fr: "Pts PvE", en: "PvE pts" },
    circuitPts:  { fr: "Pts circuit PvP", en: "PvP circuit pts" },
    total:       { fr: "Total", en: "Total" },
    noRecords:   { fr: "Aucun record soumis — soyez les premiers !", en: "No record submitted — be the first!" },
    player:      { fr: "Joueur(s)", en: "Player(s)" },
    rating:      { fr: "Cote", en: "Rating" },
    normal:      { fr: "Normal", en: "Normal" },
    heroic:      { fr: "Héroïque", en: "Heroic" },
    players:     { fr: "joueurs", en: "players" },
    openWorld:   { fr: "monde ouvert", en: "open world" },
    clearNote:   { fr: "temps sur le gouffre complet", en: "full delve clear time" },
    wins:        { fr: "V", en: "W" },
    losses:      { fr: "D", en: "L" },
    diff:        { fr: "Diff.", en: "Diff." },
    played:      { fr: "J", en: "P" },
    standings:   { fr: "Classement", en: "Standings" },
    poolPhase:   { fr: "Phase de poules", en: "Group stage" },
    playoffs:    { fr: "Phase finale", en: "Playoffs" },
    rounds:      { fr: "Rondes", en: "Rounds" },
    bronzeMatch: { fr: "Petite finale", en: "Bronze match" },
    registered:  { fr: "Équipes inscrites", en: "Registered teams" },
    registerCta: { fr: "Inscrire mon équipe", en: "Register my team" },
    statusOpen:  { fr: "Inscriptions ouvertes", en: "Registration open" },
    statusOngoing:{ fr: "En cours", en: "Ongoing" },
    statusDone:  { fr: "Terminé", en: "Finished" },
    tierMajor:   { fr: "Majeur", en: "Major" },
    tierStandard:{ fr: "Standard", en: "Standard" },
    fmtSingle:   { fr: "Élimination directe", en: "Single elimination" },
    fmtDouble:   { fr: "Double élimination", en: "Double elimination" },
    fmtRR:       { fr: "Poules (round robin)", en: "Round robin (pools)" },
    fmtSwiss:    { fr: "Système suisse", en: "Swiss system" },
    organizer:   { fr: "Organisé par", en: "Hosted by" },
    mode:        { fr: "Mode", en: "Mode" },
    demoBanner:  { fr: "⚠ Données de démonstration — le circuit attend ses premières soumissions officielles. Votre guilde peut s'inscrire dès maintenant (voir Règlement).",
                   en: "⚠ Demo data — the boards are awaiting their first official submissions. Your guild can register now (see Rules)." },
    latestRecords:{ fr: "Derniers records", en: "Latest records" },
    nextTourney: { fr: "Prochain tournoi", en: "Next tournament" },
    statGuilds:  { fr: "guildes inscrites", en: "registered guilds" },
    statRecords: { fr: "records soumis", en: "records submitted" },
    statVerified:{ fr: "records vérifiés", en: "verified records" },
    statTourneys:{ fr: "tournois du circuit", en: "circuit tournaments" },
    seeAll:      { fr: "Voir tout", en: "See all" },
    ladders:     { fr: "Ladders en jeu (meilleures cotes par guilde)", en: "In-game ladders (best ratings per guild)" },
    circuit:     { fr: "Circuit des tournois", en: "Tournament circuit" },
    circuitSub:  { fr: "Points cumulés sur les tournois inter-guildes (majeur : 100/60/45/35/20 — standard : 50/30/22/18/10).",
                   en: "Points earned across inter-guild tournaments (major: 100/60/45/35/20 — standard: 50/30/22/18/10)." },
    all:         { fr: "Tout", en: "All" },
    sortBy:      { fr: "Trier par", en: "Sort by" },
    seniority:   { fr: "Ancienneté", en: "Seniority" },
    bestTimeNote:{ fr: "Meilleur temps par guilde. Les entrées vérifiées (vidéo) passent toujours devant les déclarées.",
                   en: "Best time per guild. Verified entries (video) always rank above declared ones." },
  };
  const t = (k) => (T[k] ? T[k][lang] : k);

  /* ---------- Nav (source de vérité unique) ---------- */
  const NAV = [
    { id: "home",     href: "index.html",      fr: "Accueil",   en: "Home" },
    { id: "guilds",   href: "guildes.html",    fr: "Guildes",   en: "Guilds" },
    { id: "pve",      href: "pve.html",        fr: "PvE",       en: "PvE" },
    { id: "pvp",      href: "pvp.html",        fr: "PvP",       en: "PvP" },
    { id: "tourneys", href: "tournois.html",   fr: "Tournois",  en: "Tournaments" },
    { id: "rules",    href: "reglement.html",  fr: "Règlement", en: "Rules" },
  ];

  function renderNav() {
    const nav = document.querySelector("[data-boards-nav]");
    if (!nav) return;
    const cur = nav.dataset.current;
    nav.innerHTML = NAV.map(item =>
      `<a href="${item.href}"${item.id === cur ? ' class="cur"' : ""}>${item[lang]}</a>`
    ).join("") + `<button type="button" class="lang-btn" data-lang-toggle>${lang === "fr" ? "EN" : "FR"}</button>`;
    nav.querySelector("[data-lang-toggle]").addEventListener("click", () => {
      lang = lang === "fr" ? "en" : "fr";
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
      applyStaticLang();
      renderNav();
      renderPage();
    });
  }

  /* Textes statiques : FR dans le HTML, EN dans data-en (convention La Clauderie). */
  function applyStaticLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-en]").forEach(el => {
      if (!el.dataset.fr) el.dataset.fr = el.textContent;
      el.textContent = lang === "en" ? el.dataset.en : el.dataset.fr;
    });
  }

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function fmtTime(sec) {
    const m = Math.floor(sec / 60), s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }
  function fmtDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
  }
  const fmtInt = (n) => n.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB");

  const statusBadge = (st) => st === "verified"
    ? `<span class="badge verified">✔ ${t("verified")}</span>`
    : `<span class="badge declared">✎ ${t("declared")}</span>`;

  const rankCell = (i) => `<span class="rank r${i + 1}">${i + 1}</span>`;

  function guildCell(g) {
    if (!g) return "?";
    return `<span class="gname">${esc(g.name)}</span><span class="gtag">${esc(g.tag)}</span>`;
  }

  /* ---------- Données ---------- */
  let DB = null;
  async function loadData() {
    const files = ["guilds", "encounters", "pve-records", "pvp", "tournaments"];
    const [guilds, encounters, pve, pvp, tourneys] = await Promise.all(
      files.map(f => fetch(`data/${f}.json`).then(r => {
        if (!r.ok) throw new Error(`data/${f}.json → HTTP ${r.status}`);
        return r.json();
      }))
    );
    const byId = {};
    guilds.guilds.forEach(g => { byId[g.id] = g; });
    DB = { guilds: guilds.guilds, guildById: byId, encounters, records: pve.records, pvp, tourneys: tourneys.tournaments,
           demo: !!(guilds._demo || pve._demo || tourneys._demo) };
  }

  /* ---------- Scoring ---------- */
  const PVE_POINTS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];       // barème F1 par tableau (boss × difficulté)
  const CIRCUIT_POINTS = {
    major:    { 1: 100, 2: 60, 3: 45, 4: 35, 5: 20 },           // 5 = 5e-8e
    standard: { 1: 50,  2: 30, 3: 22, 4: 18, 5: 10 },
  };

  /* Comparateur officiel : vérifié d'abord, puis temps croissant, puis date de record. */
  const cmpRecords = (a, b) =>
    (a.status === "verified" ? 0 : 1) - (b.status === "verified" ? 0 : 1) ||
    a.timeSeconds - b.timeSeconds || (a.date < b.date ? -1 : 1);

  /* Un tableau = un couple (encounter, difficulty) ; une ligne = le meilleur essai de chaque guilde. */
  function boardRows(encId, diff) {
    const per = {};
    DB.records.filter(r => r.encounter === encId && r.difficulty === diff)
      .forEach(r => {
        if (!per[r.guild] || cmpRecords(r, per[r.guild]) < 0) per[r.guild] = r;
      });
    return Object.values(per).sort(cmpRecords);
  }

  function pvePointsByGuild() {
    const pts = {};
    DB.encounters.encounters.forEach(e => e.difficulties.forEach(d => {
      boardRows(e.id, d).forEach((r, i) => {
        pts[r.guild] = (pts[r.guild] || 0) + (PVE_POINTS[i] || 0);
      });
    }));
    return pts;
  }

  function circuitPointsByGuild() {
    const pts = {};
    DB.tourneys.filter(tn => tn.status === "finished").forEach(tn => {
      const table = CIRCUIT_POINTS[tn.tier] || CIRCUIT_POINTS.standard;
      (tn.placements || []).forEach(p => {
        const key = Math.min(p.place, 5);
        pts[p.guild] = (pts[p.guild] || 0) + (table[key] || 0);
      });
    });
    return pts;
  }

  function compositeRows() {
    const pve = pvePointsByGuild(), pvp = circuitPointsByGuild();
    return DB.guilds.map(g => ({
      guild: g,
      pve: pve[g.id] || 0,
      pvp: pvp[g.id] || 0,
      total: (pve[g.id] || 0) + (pvp[g.id] || 0),
    })).sort((a, b) => b.total - a.total || b.pve - a.pve || a.guild.name.localeCompare(b.guild.name));
  }

  /* ---------- Rendu : accueil ---------- */
  function renderHome() {
    const stats = document.querySelector("[data-home-stats]");
    if (stats) {
      const nVerified = DB.records.filter(r => r.status === "verified").length;
      stats.innerHTML = [
        [DB.guilds.length, t("statGuilds")],
        [DB.records.length, t("statRecords")],
        [nVerified, t("statVerified")],
        [DB.tourneys.length, t("statTourneys")],
      ].map(([v, l]) => `<div class="stat"><div class="v">${v}</div><div class="l">${l}</div></div>`).join("");
    }

    const board = document.querySelector("[data-home-board]");
    if (board) {
      const rows = compositeRows();
      board.innerHTML = `<table class="board">
        <thead><tr><th>${t("rank")}</th><th>${t("guild")}</th><th class="num">${t("pvePts")}</th><th class="num">${t("circuitPts")}</th><th class="num">${t("total")}</th></tr></thead>
        <tbody>${rows.map((r, i) => `<tr>
          <td>${rankCell(i)}</td>
          <td>${guildCell(r.guild)}<span class="gsub">${esc(r.guild.motto || "")}</span></td>
          <td class="num">${r.pve}</td><td class="num">${r.pvp}</td>
          <td class="num"><strong>${r.total}</strong></td></tr>`).join("")}</tbody></table>`;
    }

    const latest = document.querySelector("[data-home-latest]");
    if (latest) {
      const rows = [...DB.records].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);
      latest.innerHTML = `<table class="board">
        <thead><tr><th>${t("date")}</th><th>${t("guild")}</th><th>Boss</th><th class="num">${t("time")}</th><th>${t("proof")}</th></tr></thead>
        <tbody>${rows.map(r => {
          const e = DB.encounters.encounters.find(x => x.id === r.encounter);
          return `<tr><td>${fmtDate(r.date)}</td><td>${guildCell(DB.guildById[r.guild])}</td>
            <td>${esc(e ? e.boss : r.encounter)} <span class="gtag">${t(r.difficulty)}</span></td>
            <td class="num mono">${fmtTime(r.timeSeconds)}</td><td>${statusBadge(r.status)}</td></tr>`;
        }).join("")}</tbody></table>`;
    }

    const next = document.querySelector("[data-home-next]");
    if (next) {
      const tn = DB.tourneys.find(x => x.status === "open" || x.status === "ongoing");
      next.innerHTML = tn ? `<div class="card">
        <div class="tourney-head"><h3>${esc(tn.name)}</h3>
          <span class="badge open">${tn.status === "open" ? t("statusOpen") : t("statusOngoing")}</span></div>
        <p class="tourney-meta">${t("mode")} : ${esc(tn.mode)} · ${t(fmtKey(tn.format))} · ${fmtDate(tn.date)} · ${t("organizer")} ${esc(tn.organizer)}</p>
        <a class="register-cta" href="tournois.html#${esc(tn.id)}">${t("seeAll")} →</a></div>` : "";
    }
  }

  /* ---------- Rendu : guildes ---------- */
  const GUILD_SORTS = [
    { id: "members", label: () => t("members"),  val: g => g.members },
    { id: "xp",      label: () => t("totalXp"),  val: g => g.totalXp },
    { id: "level",   label: () => t("avgLevel"), val: g => g.avgLevel },
    { id: "age",     label: () => t("seniority"), val: g => -new Date(g.created).getTime() },
  ];
  let guildSort = "members";

  function renderGuilds() {
    const chips = document.querySelector("[data-guild-chips]");
    const host = document.querySelector("[data-guild-table]");
    if (!host) return;
    if (chips) {
      chips.innerHTML = `<span style="align-self:center;color:var(--faint);font-size:0.82rem">${t("sortBy")} :</span>` +
        GUILD_SORTS.map(s => `<button type="button" class="chip${s.id === guildSort ? " on" : ""}" data-sort="${s.id}">${s.label()}</button>`).join("");
      chips.querySelectorAll("[data-sort]").forEach(b =>
        b.addEventListener("click", () => { guildSort = b.dataset.sort; renderGuilds(); }));
    }
    const sorter = GUILD_SORTS.find(s => s.id === guildSort);
    const rows = [...DB.guilds].sort((a, b) => sorter.val(b) - sorter.val(a));
    host.innerHTML = `<table class="board">
      <thead><tr><th>${t("rank")}</th><th>${t("guild")}</th><th>${t("region")}</th>
        <th class="num">${t("members")}</th><th class="num">${t("avgLevel")}</th>
        <th class="num">${t("totalXp")}</th><th>${t("since")}</th></tr></thead>
      <tbody>${rows.map((g, i) => `<tr>
        <td>${rankCell(i)}</td>
        <td>${guildCell(g)}<span class="gsub">${esc(g.motto || "")}${g.site ? ` · <a class="video-link" href="${esc(g.site)}">${esc(g.site.replace(/^https?:\/\//, ""))}</a>` : ""}</span></td>
        <td>${esc(g.region)} <span class="gtag">${esc((g.lang || "").toUpperCase())}</span></td>
        <td class="num">${g.members}</td><td class="num">${g.avgLevel}</td>
        <td class="num mono">${fmtInt(g.totalXp)}</td><td>${fmtDate(g.created)}</td></tr>`).join("")}</tbody></table>`;
  }

  /* ---------- Rendu : PvE ---------- */
  let pveCat = "all";

  function renderPve() {
    const chips = document.querySelector("[data-pve-chips]");
    const host = document.querySelector("[data-pve-boards]");
    if (!host) return;
    const cats = DB.encounters.categories;
    if (chips) {
      chips.innerHTML = [{ id: "all", fr: t("all"), en: t("all") }, ...cats].map(c =>
        `<button type="button" class="chip${c.id === pveCat ? " on" : ""}" data-cat="${c.id}">${c.id === "all" ? t("all") : c[lang]}</button>`).join("");
      chips.querySelectorAll("[data-cat]").forEach(b =>
        b.addEventListener("click", () => { pveCat = b.dataset.cat; renderPve(); }));
    }
    const encs = DB.encounters.encounters.filter(e => pveCat === "all" || e.category === pveCat);
    host.innerHTML = encs.map(e => {
      const playersTxt = e.players ? `${e.players} ${t("players")}` : t("openWorld");
      const clearTxt = e.objective === "clear" ? ` · ${t("clearNote")}` : "";
      const boards = e.difficulties.map(d => {
        const rows = boardRows(e.id, d);
        const body = rows.length === 0
          ? `<p class="section-sub" style="margin:8px 2px 0">${t("noRecords")}</p>`
          : `<div class="table-scroll"><table class="board">
              <thead><tr><th>${t("rank")}</th><th>${t("guild")}</th><th class="num">${t("time")}</th>
                <th class="num">${t("roster")}</th><th>${t("firstKill")}</th><th>${t("date")}</th><th>${t("proof")}</th></tr></thead>
              <tbody>${rows.map((r, i) => {
                const isRecord = i === 0 && r.status === "verified";
                return `<tr><td>${rankCell(i)}</td>
                  <td>${guildCell(DB.guildById[r.guild])}${isRecord ? ` <span class="badge record">🏆 ${t("serverRecord")}</span>` : ""}</td>
                  <td class="num mono"><strong>${fmtTime(r.timeSeconds)}</strong></td>
                  <td class="num">${r.roster}</td><td>${fmtDate(r.firstKill)}</td><td>${fmtDate(r.date)}</td>
                  <td>${statusBadge(r.status)}${r.video ? ` <a class="video-link" href="${esc(r.video)}" rel="noopener">▶ ${t("watch")}</a>` : ""}</td></tr>`;
              }).join("")}</tbody></table></div>`;
        return `<div class="subhead">${t(d)}</div>${body}`;
      }).join("");
      return `<div class="encounter-head"><h3>${esc(e.boss)}</h3>
          <span class="inst">${esc(e.instance)}</span>
          <span class="meta">${playersTxt}${clearTxt}</span></div>${boards}`;
    }).join("");
  }

  /* ---------- Rendu : PvP ---------- */
  function renderPvp() {
    const circuit = document.querySelector("[data-pvp-circuit]");
    if (circuit) {
      const pts = circuitPointsByGuild();
      const rows = Object.entries(pts).map(([id, p]) => ({ g: DB.guildById[id], p }))
        .filter(r => r.g).sort((a, b) => b.p - a.p);
      circuit.innerHTML = `<table class="board">
        <thead><tr><th>${t("rank")}</th><th>${t("guild")}</th><th class="num">${t("points")}</th></tr></thead>
        <tbody>${rows.map((r, i) => `<tr><td>${rankCell(i)}</td><td>${guildCell(r.g)}</td>
          <td class="num"><strong>${r.p}</strong></td></tr>`).join("")}</tbody></table>`;
    }
    const ladders = document.querySelector("[data-pvp-ladders]");
    if (ladders) {
      ladders.innerHTML = DB.pvp.ladders.map(l => {
        const rows = [...l.entries].sort((a, b) => b.rating - a.rating);
        return `<div class="subhead">${esc(l.bracket)}</div>
          <div class="table-scroll"><table class="board">
          <thead><tr><th>${t("rank")}</th><th>${t("guild")}</th><th>${t("player")}</th>
            <th class="num">${t("rating")}</th><th>${t("date")}</th><th>${t("proof")}</th></tr></thead>
          <tbody>${rows.map((r, i) => `<tr><td>${rankCell(i)}</td>
            <td>${guildCell(DB.guildById[r.guild])}</td><td>${esc(r.player)}</td>
            <td class="num mono"><strong>${r.rating}</strong></td><td>${fmtDate(r.date)}</td>
            <td>${statusBadge(r.status)}</td></tr>`).join("")}</tbody></table></div>`;
      }).join("");
    }
  }

  /* ---------- Rendu : tournois ---------- */
  const fmtKey = (f) => ({ single_elim: "fmtSingle", double_elim: "fmtDouble", round_robin: "fmtRR", swiss: "fmtSwiss" }[f] || f);

  function teamById(tn) {
    const m = {};
    (tn.teams || []).forEach(x => { m[x.id] = x; });
    return m;
  }

  function matchHtml(m, teams) {
    const side = (id, score, other) => {
      const tm = teams[id];
      const g = tm ? DB.guildById[tm.guild] : null;
      const win = score != null && other != null && score > other;
      return `<div class="side${win ? " winner" : ""}">
        <span class="mname">${esc(tm ? tm.name : "?")} ${g ? `<span class="mtag">${esc(g.tag)}</span>` : ""}</span>
        <span class="mscore">${score ?? "–"}</span></div>`;
    };
    return `<div class="match">${side(m.a, m.scoreA, m.scoreB)}${side(m.b, m.scoreB, m.scoreA)}</div>`;
  }

  function bracketHtml(rounds, teams) {
    return `<div class="bracket">${rounds.map(r => `<div class="round">
      <div class="round-title">${esc(r[lang] || r.fr || "")}</div>
      <div class="matches">${r.matches.map(m => matchHtml(m, teams)).join("")}</div>
    </div>`).join("")}</div>`;
  }

  /* Classement d'un ensemble de matchs (poules & suisse) : victoires, puis différence de score. */
  function standingsFrom(teamIds, matches) {
    const st = {};
    teamIds.forEach(id => { st[id] = { id, played: 0, wins: 0, losses: 0, diff: 0 }; });
    matches.forEach(m => {
      if (m.scoreA == null || m.scoreB == null) return;
      const a = st[m.a], b = st[m.b];
      if (!a || !b) return;
      a.played++; b.played++;
      a.diff += m.scoreA - m.scoreB; b.diff += m.scoreB - m.scoreA;
      if (m.scoreA > m.scoreB) { a.wins++; b.losses++; } else { b.wins++; a.losses++; }
    });
    return Object.values(st).sort((x, y) => y.wins - x.wins || y.diff - x.diff);
  }

  function standingsTable(rows, teams) {
    return `<div class="table-scroll"><table class="board compact">
      <thead><tr><th>${t("rank")}</th><th>${t("guild")}</th><th class="num">${t("played")}</th>
        <th class="num">${t("wins")}</th><th class="num">${t("losses")}</th><th class="num">${t("diff")}</th></tr></thead>
      <tbody>${rows.map((r, i) => {
        const tm = teams[r.id], g = tm ? DB.guildById[tm.guild] : null;
        return `<tr><td>${rankCell(i)}</td>
          <td><span class="gname">${esc(tm ? tm.name : r.id)}</span>${g ? `<span class="gtag">${esc(g.tag)}</span>` : ""}</td>
          <td class="num">${r.played}</td><td class="num">${r.wins}</td><td class="num">${r.losses}</td>
          <td class="num mono">${r.diff > 0 ? "+" : ""}${r.diff}</td></tr>`;
      }).join("")}</tbody></table></div>`;
  }

  function podiumHtml(tn) {
    if (!tn.placements || !tn.placements.length) return "";
    const medals = ["🥇", "🥈", "🥉"];
    return `<div class="podium">${tn.placements.filter(p => p.place <= 3).map(p => {
      const g = DB.guildById[p.guild];
      return `<span class="step p${p.place}">${medals[p.place - 1] || ""} ${esc(g ? g.name : p.guild)}</span>`;
    }).join("")}</div>`;
  }

  function tourneyHtml(tn) {
    const teams = teamById(tn);
    const status = tn.status === "open" ? `<span class="badge open">${t("statusOpen")}</span>`
      : tn.status === "ongoing" ? `<span class="badge open">${t("statusOngoing")}</span>`
      : `<span class="badge tier">${t("statusDone")}</span>`;
    const tier = `<span class="badge tier">${tn.tier === "major" ? t("tierMajor") : t("tierStandard")}</span>`;
    let body = "";

    if (tn.status === "open") {
      body = `<div class="subhead">${t("registered")} (${(tn.teams || []).length})</div>
        <p class="section-sub">${(tn.teams || []).map(x => {
          const g = DB.guildById[x.guild];
          return `${esc(x.name)}${g ? ` <span class="gtag">${esc(g.tag)}</span>` : ""}`;
        }).join(" · ") || "—"}</p>
        ${tn.registration ? `<a class="register-cta" href="${esc(tn.registration)}" rel="noopener">${t("registerCta")}</a>` : ""}`;
    } else if (tn.format === "round_robin") {
      body = `<div class="subhead">${t("poolPhase")}</div>
        <div class="pools">${(tn.pools || []).map(p => `<div>
          <div class="round-title" style="text-align:left;margin-bottom:8px">${esc(p.name)}</div>
          ${standingsTable(standingsFrom(p.teams, p.matches), teams)}</div>`).join("")}</div>
        ${tn.playoffs && tn.playoffs.length ? `<div class="subhead">${t("playoffs")}</div>${bracketHtml(tn.playoffs, teams)}` : ""}
        ${podiumHtml(tn)}`;
    } else if (tn.format === "swiss") {
      const ids = (tn.teams || []).map(x => x.id);
      const all = (tn.rounds || []).flatMap(r => r.matches);
      body = `<div class="subhead">${t("rounds")}</div>${bracketHtml(tn.rounds || [], teams)}
        <div class="subhead">${t("standings")}</div>${standingsTable(standingsFrom(ids, all), teams)}
        ${podiumHtml(tn)}`;
    } else if (tn.format === "double_elim") {
      body = `${tn.winners ? `<div class="subhead">Winners bracket</div>${bracketHtml(tn.winners, teams)}` : ""}
        ${tn.losers ? `<div class="subhead">Losers bracket</div>${bracketHtml(tn.losers, teams)}` : ""}
        ${tn.grandFinal ? `<div class="subhead">${lang === "fr" ? "Grande finale" : "Grand final"}</div>
          <div class="bracket"><div class="round"><div class="matches">${matchHtml(tn.grandFinal, teams)}</div></div></div>` : ""}
        ${podiumHtml(tn)}`;
    } else { /* single_elim */
      body = `${bracketHtml(tn.rounds || [], teams)}
        ${tn.bronze ? `<div class="subhead">${t("bronzeMatch")}</div>
          <div class="bracket"><div class="round"><div class="matches">${matchHtml(tn.bronze, teams)}</div></div></div>` : ""}
        ${podiumHtml(tn)}`;
    }

    return `<article class="tourney" id="${esc(tn.id)}">
      <div class="tourney-head"><h3>${esc(tn.name)}</h3>${status}${tier}</div>
      <p class="tourney-meta">${t("mode")} : ${esc(tn.mode)} · ${t(fmtKey(tn.format))} · ${fmtDate(tn.date)} · ${t("organizer")} ${esc(tn.organizer)}</p>
      ${body}</article>`;
  }

  function renderTourneys() {
    const host = document.querySelector("[data-tourneys]");
    if (!host) return;
    const order = { open: 0, ongoing: 1, finished: 2 };
    const list = [...DB.tourneys].sort((a, b) =>
      (order[a.status] ?? 3) - (order[b.status] ?? 3) || (a.date < b.date ? 1 : -1));
    host.innerHTML = list.map(tourneyHtml).join("");
  }

  /* ---------- Boot ---------- */
  function renderDemoBanner() {
    const hostEl = document.querySelector("[data-demo-banner]");
    if (hostEl && DB && DB.demo) hostEl.innerHTML = `<div>${t("demoBanner")}</div>`;
    else if (hostEl) hostEl.innerHTML = "";
  }

  function renderPage() {
    if (!DB) return;
    renderDemoBanner();
    const page = document.body.dataset.page;
    if (page === "home") renderHome();
    else if (page === "guilds") renderGuilds();
    else if (page === "pve") renderPve();
    else if (page === "pvp") renderPvp();
    else if (page === "tourneys") renderTourneys();
    document.querySelectorAll("[data-boards-note]").forEach(el => { el.textContent = t("bestTimeNote"); });
  }

  applyStaticLang();
  renderNav();
  if (document.body.dataset.page !== "rules") {
    loadData().then(renderPage).catch(err => {
      const hostEl = document.querySelector("main .wrap") || document.body;
      const div = document.createElement("div");
      div.className = "callout";
      div.innerHTML = lang === "fr"
        ? `<b>Impossible de charger les données.</b> Si vous ouvrez le site en local, servez-le via <code>python3 -m http.server</code> (le protocole <code>file://</code> bloque les requêtes). Détail : ${esc(err.message)}`
        : `<b>Could not load data.</b> If you opened the site locally, serve it with <code>python3 -m http.server</code> (the <code>file://</code> protocol blocks requests). Detail: ${esc(err.message)}`;
      hostEl.prepend(div);
    });
  }
})();
