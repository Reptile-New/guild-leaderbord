# Runbook — Boards des Guildes (guild-leaderbord)

Leaderboard inter-guildes de World of ClaudeCraft. Site statique sans build :
`assets/app.js` charge `data/*.json` et calcule tous les classements côté
client. Multilingue : ANGLAIS de base dans le HTML (attributs `data-i18n`),
traductions FR/DE/ES dans `assets/i18n.js` (clé manquante → fallback anglais,
langue par défaut = celle du navigateur). Ajouter une langue = compléter
`LANGUAGES` + chaque chaîne de `i18n.js`, rien d'autre.

## Règles à ne pas casser

- **Tri PvE officiel** : vérifié d'abord, puis temps croissant (`cmpRecords`
  dans `app.js`). C'est une règle du règlement, pas un détail d'implémentation.
- **Le circuit PvP se calcule** depuis `placements` de `data/tournaments.json`
  (barèmes `CIRCUIT_POINTS`). Ne jamais saisir de points à la main.
- **La nav est définie une seule fois** (`NAV` dans `app.js`) — ne pas éditer
  les barres page par page.
- **Les données sont réelles** (plus de démo depuis juillet 2026) : n'ajouter
  une guilde ou un record que sur soumission d'un maître de guilde (issue/PR)
  ou source publique citée dans le champ `source`. `timeSeconds: null` = kill
  daté sans chrono, classé après les entrées chronométrées de même statut.
  Le flag `"_demo": true` dans un fichier de données réaffiche la bannière
  d'avertissement si besoin.

## Tâches courantes

- **Nouvelle MAJ du jeu** : mettre à jour `data/encounters.json` depuis
  `../wocc-knowledge-base/data/` (DUNGEONS, DELVES, WORLD_BOSSES,
  HEROIC_BOSS_LOOT pour savoir qui a un mode héroïque) et le champ `patch`.
  Si une rencontre change significativement, archiver ses records (les retirer
  avec mention dans le commit) — règle « reset au patch » du règlement.
- **Intégrer une soumission (issue)** : reporter les champs de l'issue dans le
  JSON correspondant ; statut `verified` UNIQUEMENT si la vidéo a été regardée
  (combat entier, chrono cohérent, effectif comptable). Sinon `declared`.
- **Nouveau format de tournoi** : ajouter le rendu dans `tourneyHtml()`
  (formats existants : `single_elim`, `double_elim`, `round_robin`, `swiss`).

## Test local

```sh
python3 -m http.server 8000   # fetch() ne marche pas en file://
```

## Branche & déploiement

Développer sur `claude/guild-leaderboard-site-u74tnd`. Le déploiement GitHub
Pages part de `main` (workflow `deploy-pages.yml`, source « GitHub Actions »).
