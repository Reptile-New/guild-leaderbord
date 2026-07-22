#!/usr/bin/env python3
"""Synchronise data/guilds.json depuis l'API publique du jeu
(https://worldofclaudecraft.com/api/leaderboard?board=guilds).

- Toutes les guildes du classement serveur sont importées (rang, effectif,
  niveau, XP — selon ce que l'API expose ; les clés candidates couvrent
  plusieurs nommages possibles et le premier enregistrement brut est loggué
  pour affiner le mappage si besoin).
- Les champs éditoriaux (tag, region, lang, site, motto, created) ne sont
  JAMAIS écrasés : ils restent gérés par issues/PR.
- Une guilde disparue du classement garde son entrée mais perd son serverRank.

Lancé par .github/workflows/update-guilds.yml (cron 3 h). Sortie 0 même sans
changement — c'est le workflow qui décide de committer via `git diff`.
"""
import json
import re
import sys
import unicodedata
import urllib.request

API = "https://worldofclaudecraft.com/api/leaderboard?board=guilds&page={page}&pageSize=50"
PATH = "data/guilds.json"
MANUAL_FIELDS = ("tag", "region", "lang", "site", "motto", "created")


def slugify(name):
    ascii_name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", ascii_name.lower())).strip("-")


def pick(d, *keys):
    for k in keys:
        v = d.get(k)
        if v is not None:
            return v
    return None


def fetch_all():
    leaders = []
    for page in range(40):  # 40 × 50 = 2000 guildes max, large
        url = API.format(page=page)
        # L'API refuse le User-Agent par défaut de urllib (403) — on s'annonce.
        req = urllib.request.Request(url, headers={
            "User-Agent": "wocc-guild-boards/1.0 (+https://github.com/Reptile-New/guild-leaderbord)",
            "Accept": "application/json",
        })
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                data = json.load(r)
        except Exception as e:  # réseau/API en vrac : on ne casse rien
            print(f"WARN page {page}: {e}", file=sys.stderr)
            break
        batch = data.get("leaders") or []
        leaders += batch
        if len(batch) < 50:
            break
    return leaders


def main():
    with open(PATH, encoding="utf-8") as f:
        doc = json.load(f)
    by_id = {g["id"]: g for g in doc["guilds"]}

    leaders = fetch_all()
    if not leaders:
        print("API vide ou injoignable — données actuelles conservées.")
        return 0
    print(f"{len(leaders)} guildes relevées ; clés du 1er enregistrement : {sorted(leaders[0].keys())}")
    print("Échantillon brut :", json.dumps(leaders[0], ensure_ascii=False))

    seen = set()
    for e in leaders:
        name = pick(e, "name", "guildName", "guild")
        if not isinstance(name, str) or not name.strip():
            continue
        name = name.strip()
        gid = slugify(name)
        if gid in seen:  # doublon de page : on garde le premier (mieux classé)
            continue
        seen.add(gid)
        g = by_id.setdefault(gid, {
            "id": gid, "name": name,
            **{k: None for k in MANUAL_FIELDS},
            "members": None, "avgLevel": None, "totalXp": None,
        })
        g["name"] = name
        rank = pick(e, "rank", "position", "place")
        g["serverRank"] = int(rank) if rank is not None else None
        members = pick(e, "members", "memberCount", "membersCount", "size", "playerCount")
        level = pick(e, "avgLevel", "averageLevel", "avg_level", "level")
        xp = pick(e, "totalXp", "totalXP", "xp", "score", "points", "value")
        if members is not None:
            g["members"] = int(members)
        if level is not None:
            g["avgLevel"] = round(float(level), 1)
        if xp is not None:
            g["totalXp"] = int(xp)

    for gid, g in by_id.items():
        if gid not in seen:
            g["serverRank"] = None

    doc["guilds"] = sorted(
        by_id.values(),
        key=lambda g: (g.get("serverRank") is None, g.get("serverRank") or 0, g["name"].lower()),
    )
    doc["_sync"] = "Champs serverRank/members/avgLevel/totalXp gérés par scripts/sync_guilds.py (API officielle du jeu, cron 3 h). Champs éditoriaux (tag, region, lang, site, motto, created) : issues/PR uniquement."
    with open(PATH, "w", encoding="utf-8") as f:
        json.dump(doc, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"{len(seen)} guildes synchronisées → {PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
