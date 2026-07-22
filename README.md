# WoCC Guild Boards

The community-run inter-guild leaderboard for **World of ClaudeCraft**:
PvE speed-kill boards (per boss × difficulty, aligned with the game's real
content), a PvP tournament circuit (single/double elimination, round robin
pools, Swiss system), guild rosters and XP boards. Fully static, free to host
on GitHub Pages, multilingual (EN default — FR, DE, ES, easy to add more).

The JSON files in `data/` **are** the database; the git history is the audit
log; issues are the submission and dispute pipeline. Designed to be adopted by
levy-street as the official boards with zero rewrite: fork the repo, keep the
JSON contracts, optionally feed them from real server data.

> **Résumé FR** — Classement communautaire inter-guildes : records PvE, circuit
> de tournois PvP, effectifs et XP. Site 100 % statique multilingue (anglais
> par défaut, sélecteur EN/FR/DE/ES), hébergé gratuitement sur GitHub Pages.
> Les JSON de `data/` sont la base de données, l'historique git le journal
> d'audit, les issues le canal de soumission.

## Le site

| Page | Contenu |
|---|---|
| `index.html` | Classement général (points PvE + circuit PvP), derniers records, prochain tournoi |
| `guildes.html` | Annuaire des guildes, triable par effectif / niveau moyen / XP totale / ancienneté |
| `pve.html` | Un tableau par boss × difficulté : raid Nythraxis, 4 donjons, 2 gouffres, boss mondial Thunzharr |
| `pvp.html` | Points du circuit (calculés depuis les tournois) + meilleures cotes de ladder 1v1/2v2 |
| `tournois.html` | Arbres et résultats — élimination directe, double élimination, poules, système suisse |
| `reglement.html` | Vérification des records, barèmes, contestations, processus de soumission |

Aucune dépendance, aucun build : `assets/app.js` charge `data/*.json` et calcule
tous les classements côté client. Pour tester en local :

```sh
python3 -m http.server 8000   # puis http://localhost:8000
```

**Langues** : l'anglais est la langue de base (dans le HTML) ; toutes les autres
vivent dans `assets/i18n.js`. La langue par défaut suit celle du navigateur.
Ajouter une langue = ajouter son code à `LANGUAGES` + une entrée par chaîne
(toute entrée manquante retombe sur l'anglais) — les PR de traduction sont
bienvenues.

## Le modèle de confiance (résumé du règlement)

- **✔ Vérifié** : preuve vidéo (combat entier, sans coupe) relue par un mainteneur.
- **✎ Sur l'honneur** : déclaré par le maître de guilde, sans preuve.
- Sur chaque tableau, **les entrées vérifiées passent toujours devant les
  déclarées**, et seul un temps vérifié porte le titre « Record du serveur ».
  Pas de preuve, pas de record — mais déclarer reste possible et léger.
- Contestation sous 7 jours par issue ; triche avérée = suspension une saison.

## Les données

| Fichier | Rôle |
|---|---|
| `data/encounters.json` | Référentiel du contenu PvE, extrait de la [knowledge base WoCC](https://github.com/Reptile-New/wocc-knowledge-base) (aligné `v0.28.0`) |
| `data/guilds.json` | Registre des guildes (inscription par issue ou PR) |
| `data/pve-records.json` | Records PvE ; le site ne garde que le meilleur essai par guilde et par tableau |
| `data/pvp.json` | Meilleures cotes des ladders en jeu (informatif) |
| `data/tournaments.json` | Tournois ; les `placements` alimentent automatiquement les points du circuit |

Les données sont **réelles** : seules les guildes inscrites et les résultats
sourcés y figurent (les premiers kills Nythraxis de La Clauderie viennent de la
page « faits d'armes » de laclauderie.fr). Un record peut exister sans chrono
(`timeSeconds: null`) : il marque la date du kill en attendant un run
chronométré. (Un mode démo existe : `"_demo": true` dans un fichier de données
affiche une bannière d'avertissement sur tout le site.)

## Soumettre

Tout passe par GitHub (formulaires d'issues prêts à l'emploi, en anglais) :

- 🏰 **Guild registration** → `data/guilds.json`
- ⚔️ **PvE record** → `data/pve-records.json`
- 🏟️ **Tournament** (inscription d'équipe, proposition, résultats) → `data/tournaments.json`
- ⚖️ **Dispute** — fenêtre de 7 jours

Chaque record accepté est un commit : l'historique complet des boards est
public et auditable.

## Barèmes

- **PvE** (par tableau, vers le classement général) : 25 / 18 / 15 / 12 / 10 / 8 / 6 / 4 / 2 / 1.
- **Circuit PvP** : majeur 100 / 60 / 45 / 35 / 20 (5e–8e) — standard 50 / 30 / 22 / 18 / 10.
- Les ladders en jeu et les effectifs/XP ne donnent **aucun** point : seuls les
  exploits collectifs comptent pour le classement général.

## Déploiement

`.github/workflows/deploy-pages.yml` publie le site sur GitHub Pages à chaque
push sur `main` (activer Pages → Source : « GitHub Actions » dans les réglages
du dépôt). Coût d'hébergement : zéro.

## Pitch à levy-street (pourquoi adopter ce projet)

1. **Zéro infra** : statique, gratuit, déjà déployable sur l'org GitHub du jeu.
2. **Contrats de données stables** : brancher les vraies données serveur
   (temps de kill authentifiés, effectifs réels) sur les mêmes JSON supprime le
   besoin de preuve vidéo — le reste du site ne change pas.
3. **Confiance intégrée** : en attendant, le modèle vérifié/sur-l'honneur +
   l'audit git donne des boards crédibles sans back-office.
4. **Déjà aligné sur le jeu** : le référentiel PvE est extrait de la knowledge
   base communautaire, mise à jour automatiquement à chaque tag du jeu.

Roadmap si adoption : saisons et récompenses, boards de speedrun par classe,
identité OAuth des maîtres de guilde, ingestion API des résultats de matchs.
