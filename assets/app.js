/* WoCC Guild Boards — application (vanilla JS, no dependencies).
   Everything is computed client-side from data/*.json:
   - PvE boards: "verified first, then time" ordering (see rules page)
   - PvP circuit: points derived from tournament placements
   - overall score (home): PvE points + circuit points
   i18n: English is the base language (inline in HTML); other languages live in
   assets/i18n.js (data-i18n attributes + the t() helper). The picker defaults
   to the browser language when we have it, English otherwise. */

(() => {
  "use strict";

  /* ---------- i18n ---------- */
  const I18N = window.I18N || { default: "en", languages: { en: "English" }, locales: { en: "en-GB" }, strings: {} };
  const LANG_KEY = "boards-lang";
  const LANGS = Object.keys(I18N.languages);

  function detectLang() {
    const p = new URLSearchParams(location.search).get("lang");
    if (p && LANGS.includes(p)) { try { localStorage.setItem(LANG_KEY, p); } catch (e) {} return p; }
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved && LANGS.includes(saved)) return saved;
    } catch (e) {}
    for (const nav of (navigator.languages || [navigator.language || "en"])) {
      const code = String(nav).slice(0, 2).toLowerCase();
      if (LANGS.includes(code)) return code;
    }
    return I18N.default || "en";
  }
  let lang = detectLang();

  const t = (k) => {
    const s = I18N.strings[k];
    return s ? (s[lang] ?? s.en ?? k) : k;
  };

  /* Static texts: English inline in the HTML, translations applied via data-i18n. */
  const enCache = new Map();
  function applyStaticLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (!enCache.has(key)) enCache.set(key, el.innerHTML);
      const s = I18N.strings[key];
      el.innerHTML = (s && s[lang] != null) ? s[lang] : enCache.get(key);
    });
  }

  /* ---------- Nav (single source of truth) ---------- */
  const NAV = [
    { id: "home",     href: "index.html",     key: "nav.home" },
    { id: "guilds",   href: "guildes.html",   key: "nav.guilds" },
    { id: "pve",      href: "pve.html",       key: "nav.pve" },
    { id: "pvp",      href: "pvp.html",       key: "nav.pvp" },
    { id: "tourneys", href: "tournois.html",  key: "nav.tourneys" },
    { id: "rules",    href: "reglement.html", key: "nav.rules" },
  ];

  function renderNav() {
    const nav = document.querySelector("[data-boards-nav]");
    if (!nav) return;
    const cur = nav.dataset.current;
    nav.innerHTML = NAV.map(item =>
      `<a href="${item.href}"${item.id === cur ? ' class="cur"' : ""}>${t(item.key)}</a>`
    ).join("") + `<select class="lang-btn" data-lang-select aria-label="Language">${
      LANGS.map(l => `<option value="${l}"${l === lang ? " selected" : ""}>${I18N.languages[l]}</option>`).join("")
    }</select>`;
    nav.querySelector("[data-lang-select]").addEventListener("change", (e) => {
      lang = e.target.value;
      try { localStorage.setItem(LANG_KEY, lang); } catch (err) {}
      applyStaticLang();
      renderNav();
      renderPage();
    });
  }

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function fmtTime(sec) {
    if (sec == null) return "—";
    const m = Math.floor(sec / 60), s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }
  const locale = () => I18N.locales[lang] || "en-GB";
  function fmtDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(locale(), { day: "numeric", month: "short", year: "numeric" });
  }
  const fmtInt = (n) => n == null ? "—" : n.toLocaleString(locale());

  const statusBadge = (st) => st === "verified"
    ? `<span class="badge verified">✔ ${t("verified")}</span>`
    : `<span class="badge declared">✎ ${t("declared")}</span>`;

  const rankCell = (i) => `<span class="rank r${i + 1}">${i + 1}</span>`;

  function guildCell(g) {
    if (!g) return "?";
    return `<span class="gname">${esc(g.name)}</span><span class="gtag">${esc(g.tag)}</span>`;
  }

  /* ---------- Data ---------- */
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
  const PVE_POINTS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];       // F1 scale per board (boss × difficulty)
  const CIRCUIT_POINTS = {
    major:    { 1: 100, 2: 60, 3: 45, 4: 35, 5: 20 },           // 5 = 5th–8th
    standard: { 1: 50,  2: 30, 3: 22, 4: 18, 5: 10 },
  };

  /* Official comparator: verified first, then timed before untimed, then time
     ascending, then earliest first kill. */
  const cmpRecords = (a, b) =>
    (a.status === "verified" ? 0 : 1) - (b.status === "verified" ? 0 : 1) ||
    (a.timeSeconds == null ? 1 : 0) - (b.timeSeconds == null ? 1 : 0) ||
    (a.timeSeconds ?? 0) - (b.timeSeconds ?? 0) ||
    String(a.firstKill || a.date).localeCompare(String(b.firstKill || b.date));

  /* One board = one (encounter, difficulty) pair; one row = each guild's best attempt. */
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

  /* ---------- Render: home ---------- */
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
      const rows = compositeRows().filter(r => r.total > 0).slice(0, 15);
      board.innerHTML = rows.length === 0
        ? `<p class="section-sub" style="margin:4px 2px">${t("noStandings")}</p>`
        : `<table class="board">
        <thead><tr><th>${t("rank")}</th><th>${t("guild")}</th><th class="num">${t("pvePts")}</th><th class="num">${t("circuitPts")}</th><th class="num">${t("total")}</th></tr></thead>
        <tbody>${rows.map((r, i) => `<tr>
          <td>${rankCell(i)}</td>
          <td>${guildCell(r.guild)}<span class="gsub">${esc(r.guild.motto || "")}</span></td>
          <td class="num">${r.pve}</td><td class="num">${r.pvp}</td>
          <td class="num"><strong>${r.total}</strong></td></tr>`).join("")}</tbody></table>`;
      board.classList.toggle("table-scroll", rows.length > 0);
    }

    const latest = document.querySelector("[data-home-latest]");
    if (latest) {
      const rows = [...DB.records].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);
      latest.innerHTML = rows.length === 0
        ? `<p class="section-sub" style="margin:4px 2px">${t("noLatest")}</p>`
        : `<table class="board">
        <thead><tr><th>${t("date")}</th><th>${t("guild")}</th><th>Boss</th><th class="num">${t("time")}</th><th>${t("proof")}</th></tr></thead>
        <tbody>${rows.map(r => {
          const e = DB.encounters.encounters.find(x => x.id === r.encounter);
          return `<tr><td>${fmtDate(r.date)}</td><td>${guildCell(DB.guildById[r.guild])}</td>
            <td>${esc(e ? e.boss : r.encounter)} <span class="gtag">${t(r.difficulty)}</span></td>
            <td class="num mono">${fmtTime(r.timeSeconds)}</td><td>${statusBadge(r.status)}</td></tr>`;
        }).join("")}</tbody></table>`;
      latest.classList.toggle("table-scroll", rows.length > 0);
    }

    const next = document.querySelector("[data-home-next]");
    if (next) {
      const tn = DB.tourneys.find(x => x.status === "open" || x.status === "ongoing");
      next.innerHTML = tn ? `<div class="card">
        <div class="tourney-head"><h3>${esc(tn.name)}</h3>
          <span class="badge open">${tn.status === "open" ? t("statusOpen") : t("statusOngoing")}</span></div>
        <p class="tourney-meta">${t("mode")}: ${esc(tn.mode)} · ${t(fmtKey(tn.format))} · ${fmtDate(tn.date)} · ${t("organizer")} ${esc(tn.organizer)}</p>
        <a class="register-cta" href="tournois.html#${esc(tn.id)}">${t("seeAll")} →</a></div>`
        : `<p class="section-sub" style="margin:4px 2px">${t("noTourney")}</p>`;
    }
  }

  /* ---------- Render: guilds ---------- */
  const GUILD_SORTS = [
    { id: "srank",   label: () => t("srvRank"),   val: g => g.serverRank != null ? -g.serverRank : -Infinity },
    { id: "members", label: () => t("members"),   val: g => g.members ?? -1 },
    { id: "xp",      label: () => t("totalXp"),   val: g => g.totalXp ?? -1 },
    { id: "level",   label: () => t("topLevel"),  val: g => g.topLevel ?? -1 },
    { id: "age",     label: () => t("seniority"), val: g => g.created ? -new Date(g.created).getTime() : -Infinity },
  ];
  let guildSort = null;

  function renderGuilds() {
    const chips = document.querySelector("[data-guild-chips]");
    const host = document.querySelector("[data-guild-table]");
    if (!host) return;
    if (!guildSort) guildSort = DB.guilds.some(g => g.serverRank != null) ? "srank" : "members";
    if (chips) {
      chips.innerHTML = `<span style="align-self:center;color:var(--faint);font-size:0.82rem">${t("sortBy")}:</span>` +
        GUILD_SORTS.map(s => `<button type="button" class="chip${s.id === guildSort ? " on" : ""}" data-sort="${s.id}">${s.label()}</button>`).join("");
      chips.querySelectorAll("[data-sort]").forEach(b =>
        b.addEventListener("click", () => { guildSort = b.dataset.sort; renderGuilds(); }));
    }
    const sorter = GUILD_SORTS.find(s => s.id === guildSort);
    const rows = [...DB.guilds].sort((a, b) => sorter.val(b) - sorter.val(a));
    host.innerHTML = `<table class="board">
      <thead><tr><th>${t("rank")}</th><th>${t("guild")}</th><th class="num">${t("srvRank")}</th><th>${t("region")}</th>
        <th class="num">${t("members")}</th><th class="num">${t("topLevel")}</th>
        <th class="num">${t("totalXp")}</th><th>${t("since")}</th></tr></thead>
      <tbody>${rows.map((g, i) => `<tr>
        <td>${rankCell(i)}</td>
        <td>${guildCell(g)}<span class="gsub">${esc(g.motto || "")}${g.site ? ` · <a class="video-link" href="${esc(g.site)}">${esc(g.site.replace(/^https?:\/\//, ""))}</a>` : ""}</span></td>
        <td class="num mono">${g.serverRank != null ? "#" + g.serverRank : "—"}</td>
        <td>${g.region ? esc(g.region) : "—"} <span class="gtag">${esc((g.lang || "").toUpperCase())}</span></td>
        <td class="num">${fmtInt(g.members)}</td><td class="num">${fmtInt(g.topLevel)}</td>
        <td class="num mono">${fmtInt(g.totalXp)}</td><td>${fmtDate(g.created)}</td></tr>`).join("")}</tbody></table>`;
  }

  /* ---------- Render: PvE ---------- */
  let pveCat = "all";

  function renderPve() {
    const chips = document.querySelector("[data-pve-chips]");
    const host = document.querySelector("[data-pve-boards]");
    if (!host) return;
    const cats = DB.encounters.categories;
    if (chips) {
      chips.innerHTML = [{ id: "all" }, ...cats].map(c =>
        `<button type="button" class="chip${c.id === pveCat ? " on" : ""}" data-cat="${c.id}">${c.id === "all" ? t("all") : (c[lang] || c.en)}</button>`).join("");
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
                  <td class="num">${r.roster ?? "—"}</td><td>${fmtDate(r.firstKill)}</td><td>${fmtDate(r.date)}</td>
                  <td>${statusBadge(r.status)}${r.video ? ` <a class="video-link" href="${esc(r.video)}" rel="noopener">▶ ${t("watch")}</a>` : ""}</td></tr>`;
              }).join("")}</tbody></table></div>`;
        return `<div class="subhead">${t(d)}</div>${body}`;
      }).join("");
      return `<div class="encounter-head"><h3>${esc(e.boss)}</h3>
          <span class="inst">${esc(e.instance)}</span>
          <span class="meta">${playersTxt}${clearTxt}</span></div>${boards}`;
    }).join("");
  }

  /* ---------- Render: PvP ---------- */
  function renderPvp() {
    const circuit = document.querySelector("[data-pvp-circuit]");
    if (circuit) {
      const pts = circuitPointsByGuild();
      const rows = Object.entries(pts).map(([id, p]) => ({ g: DB.guildById[id], p }))
        .filter(r => r.g).sort((a, b) => b.p - a.p);
      circuit.innerHTML = rows.length === 0
        ? `<p class="section-sub" style="margin:4px 2px">${t("noCircuit")}</p>`
        : `<table class="board">
        <thead><tr><th>${t("rank")}</th><th>${t("guild")}</th><th class="num">${t("points")}</th></tr></thead>
        <tbody>${rows.map((r, i) => `<tr><td>${rankCell(i)}</td><td>${guildCell(r.g)}</td>
          <td class="num"><strong>${r.p}</strong></td></tr>`).join("")}</tbody></table>`;
      circuit.classList.toggle("table-scroll", rows.length > 0);
    }
    const ladders = document.querySelector("[data-pvp-ladders]");
    if (ladders) {
      ladders.innerHTML = DB.pvp.ladders.map(l => {
        const rows = [...l.entries].sort((a, b) => b.rating - a.rating);
        const body = rows.length === 0
          ? `<p class="section-sub" style="margin:6px 2px 0">${t("noLadder")}</p>`
          : `<div class="table-scroll"><table class="board">
          <thead><tr><th>${t("rank")}</th><th>${t("guild")}</th><th>${t("player")}</th>
            <th class="num">${t("rating")}</th><th>${t("date")}</th><th>${t("proof")}</th></tr></thead>
          <tbody>${rows.map((r, i) => `<tr><td>${rankCell(i)}</td>
            <td>${guildCell(DB.guildById[r.guild])}</td><td>${esc(r.player)}</td>
            <td class="num mono"><strong>${r.rating}</strong></td><td>${fmtDate(r.date)}</td>
            <td>${statusBadge(r.status)}</td></tr>`).join("")}</tbody></table></div>`;
        return `<div class="subhead">${esc(l.bracket)}</div>${body}`;
      }).join("");
    }
  }

  /* ---------- Render: tournaments ---------- */
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
      <div class="round-title">${esc(r[lang] || r.en || r.fr || "")}</div>
      <div class="matches">${r.matches.map(m => matchHtml(m, teams)).join("")}</div>
    </div>`).join("")}</div>`;
  }

  /* Standings for a set of matches (pools & Swiss): wins, then score difference. */
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
        ${tn.grandFinal ? `<div class="subhead">${t("grandFinal")}</div>
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
      <p class="tourney-meta">${t("mode")}: ${esc(tn.mode)} · ${t(fmtKey(tn.format))} · ${fmtDate(tn.date)} · ${t("organizer")} ${esc(tn.organizer)}</p>
      ${body}</article>`;
  }

  function renderTourneys() {
    const host = document.querySelector("[data-tourneys]");
    if (!host) return;
    if (DB.tourneys.length === 0) {
      host.innerHTML = `<div class="card"><p class="section-sub" style="margin:0 0 14px">${t("tourneys.empty")}</p>
        <a class="register-cta" href="https://github.com/Reptile-New/guild-leaderbord/issues/new?template=tournament.yml" rel="noopener">${t("tourneys.emptyCta")}</a></div>`;
      return;
    }
    const order = { open: 0, ongoing: 1, finished: 2 };
    const list = [...DB.tourneys].sort((a, b) =>
      (order[a.status] ?? 3) - (order[b.status] ?? 3) || (a.date < b.date ? 1 : -1));
    host.innerHTML = list.map(tourneyHtml).join("");
  }

  /* ---------- Boot ---------- */
  function renderDemoBanner() {
    const hostEl = document.querySelector("[data-demo-banner]");
    if (hostEl) hostEl.innerHTML = (DB && DB.demo) ? `<div>${t("demoBanner")}</div>` : "";
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
      div.innerHTML = `${t("loadError")} <span class="gtag">${esc(err.message)}</span>`;
      hostEl.prepend(div);
    });
  }
})();
