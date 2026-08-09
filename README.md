# training — AI Training (Arx Consulting)

Programme de formation Claude, publié sur **https://arx-consulting.com/AITraining/**.

Ce dépôt est la **source**. La mise en ligne se fait en copiant `site/` dans le dépôt
[`arxWeb`](https://github.com/benoit-sigwald/arxWeb), qui sert déjà `arx-consulting.com`
(site statique déployé par Coolify sur le serveur OCI). Il n'y a **pas** de nginx à éditer.

## Contenu

```
training/
├── site/
│   ├── index.html            # Page FR (autonome, aucune dépendance externe)
│   ├── index-en.html         # Page EN
│   └── arx-logo.png          # Logo Arx (nav + pied de page)
├── docs/
│   ├── kit-formateur.md      # 12 fiches d'animation + mapping des slides existants
│   ├── attestation.md        # Émargement, attestation de fin, registre de suivi
│   └── liens.md              # Table de correspondance sujet → lien profond (source de vérité)
├── deploy/
│   └── publish.ps1           # Copie site/ dans arxWeb/AITraining/ puis commit + push
└── README.md
```

Design language Apple : typographie système SF, fonds `#fbfbfd` / `#f5f5f7`, accent `#0071e3`,
cartes en `border-radius: 18px`, nav translucide `backdrop-filter`. Pas de build, pas de framework, pas de CDN.

## Le programme

| Parcours | Modules | Public |
|---|---|---|
| Découverte | 12 modules, 4 semaines, 15–20 min chacun | Débutants complets, non techniques |
| Avancé | 7 modules, 45–60 min chacun | Uniquement après le module 07 du parcours découverte |
| Kit formateur | 12 fiches d'animation | Animateur interne |

Principe directeur : chaque module se termine par un **livrable réel** apporté par le participant.
Pas de quiz, pas de slides théoriques.

Trois pièces structurent la preuve : la **mesure d'entrée** (module 00), l'**émargement** (chaque
session) et l'**attestation de fin** (module 11).

## Publier

```powershell
.\deploy\publish.ps1
```

Le script copie `site/*.html` dans `<arxWeb>/AITraining/`, commit et push sur `master`.
Coolify redéploie automatiquement au push. Vérification :

```bash
curl -sI https://arx-consulting.com/AITraining/ | head -1
```

## Points d'attention

- **Le chemin `/AITraining` sans slash final** dépend du serveur statique de Coolify. Si `/AITraining`
  renvoie une 404 alors que `/AITraining/` répond 200, communiquer l'URL avec le slash.
- **Liens externes.** Chaque module pointe vers la page exacte de son sujet, pas vers un catalogue.
  La liste, la source et la date de vérification sont dans [`docs/liens.md`](docs/liens.md), qui fait
  foi. À revérifier deux fois par an — les catalogues bougent : `skills.google/paths/2336` a déjà disparu.
- **Mention réglementaire.** L'encart sur l'article 4 du règlement (UE) 2024/1689 est une information
  générale, pas un conseil juridique. À faire valider avant toute diffusion commerciale.
- **Marques.** Claude est une marque d'Anthropic. Le pied de page précise qu'il s'agit d'un support
  pédagogique indépendant, sans certification officielle. Ne pas retirer cette mention.

## Mettre à jour le contenu

Tout le contenu pédagogique est dans les tableaux JavaScript en bas de chaque page :
`decouverte`, `avance`, `reflexes`, `gardefous`, `fiches`. Modifier ces tableaux suffit — aucune
retouche du HTML ou du CSS. Répercuter dans les deux langues.

## Références

- Anthropic Academy — https://anthropic.skilljar.com
- Documentation Claude — https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Google, Principes essentiels de l'IA — https://www.coursera.org/fr-FR/specializations/ai-essentials-google
- Objectif IA, OpenClassrooms — https://openclassrooms.com/fr/courses/6417031-objectif-ia-initiez-vous-a-l-intelligence-artificielle
