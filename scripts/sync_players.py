#!/usr/bin/env python3
"""Synchronise data/players.json depuis l'API publique du jeu
(https://worldofclaudecraft.com/api/leaderboard — board personnages par défaut).

Schéma observé (juil. 2026) : realm, metric=lifetimeXp, leaders[] avec
rank, name, cls, level, virtualLevel, lifetimeXp, prestigeRank, title.
On garde le top TOP_N. Lancé par update-guilds.yml (cron 3 h).
"""
import json
import sys
import urllib.request

API = "https://worldofclaudecraft.com/api/leaderboard?page={page}&pageSize=100"
PATH = "data/players.json"
TOP_N = 200


def fetch_top():
    players, realm = [], None
    for page in range(TOP_N // 100):
        req = urllib.request.Request(API.format(page=page), headers={
            "User-Agent": "wocc-guild-boards/1.0 (+https://github.com/Reptile-New/guild-leaderbord)",
            "Accept": "application/json",
        })
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                data = json.load(r)
        except Exception as e:
            print(f"WARN page {page}: {e}", file=sys.stderr)
            break
        realm = data.get("realm") or realm
        batch = data.get("leaders") or []
        players += batch
        if len(batch) < 100:
            break
    return realm, players[:TOP_N]


def main():
    realm, players = fetch_top()
    if not players:
        print("API vide ou injoignable — données actuelles conservées.")
        return 0
    doc = {
        "_help": "Top des personnages du royaume, synchronisé depuis l'API officielle du jeu par scripts/sync_players.py (cron 3 h, update-guilds.yml). Ne pas éditer à la main.",
        "realm": realm,
        "metric": "lifetimeXp",
        "players": [
            {
                "rank": p.get("rank"),
                "name": p.get("name"),
                "cls": p.get("cls"),
                "level": p.get("level"),
                "virtualLevel": p.get("virtualLevel"),
                "lifetimeXp": p.get("lifetimeXp"),
                "prestigeRank": p.get("prestigeRank"),
                "title": p.get("title"),
            }
            for p in players
        ],
    }
    with open(PATH, "w", encoding="utf-8") as f:
        json.dump(doc, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"{len(doc['players'])} personnages synchronisés → {PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
