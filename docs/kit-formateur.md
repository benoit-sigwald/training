# Kit formateur — Claude en 12 modules

**Public :** débutants complets, non techniques.
**Format :** 15–20 min par module, 2 à 3 modules par semaine, sur 4 semaines.
**Règle d'or :** chaque participant arrive avec **un vrai dossier de son travail**. Sans ça, le module ne sert à rien.

**Matériel :** le site (`site/index.html`), la feuille du module 00, la feuille d'émargement et le modèle
d'attestation (`docs/attestation.md`).

---

## Comment animer

| Temps | Quoi |
|---|---|
| 2 min | Le problème concret du jour (« combien de temps tu passes à… ? ») |
| 4 min | Démo en direct, écran partagé, sur un cas réel |
| 8 min | Les participants font, toi tu circules |
| 3 min | Un participant montre son résultat, un autre dit ce qui cloche |

Ne fais **jamais** de slides théoriques. Pas de vocabulaire technique : dis « Claude », « la demande », « le document ». Jamais « prompt engineering », « token », « contexte ».

---

## Cadre : l'escalier des usages

Trois niveaux, on ne saute pas de marche. C'est le seul schéma affiché au mur pendant les quatre semaines.

| Niveau | Quoi | Où dans le programme |
|---|---|---|
| 1 · Le prompt | Une instruction ponctuelle dans une conversation. | Découverte, modules 00 à 08 |
| 2 · Les assistants | Méthode, connaissance métier et documents injectés une fois. | Découverte, modules 09 à 11 |
| 3 · Agents & développements | Outils métier connectés, workflows, automatisation. | Parcours avancé |

---

## Obligation réglementaire à annoncer en séance 1

L'article 4 du règlement (UE) 2024/1689 impose aux organisations qui déploient un système d'IA de garantir
un niveau suffisant de **maîtrise de l'IA** pour leur personnel. Applicable depuis le **2 février 2025**,
sans seuil de taille et quel que soit le niveau de risque. Les autorités nationales peuvent contrôler et
sanctionner à partir du **2 août 2026**.

Conséquence pratique pour l'animateur : **la feuille d'émargement et les attestations ne sont pas
administratives, elles sont la preuve**. Voir `docs/attestation.md`.

*Information générale, pas un conseil juridique. Faire valider par le service juridique avant diffusion externe.*

---

# SEMAINE 1 — Prendre en main

## Fiche 00 · Chronomètre : où part ton temps

**Objectif :** établir la mesure d'entrée. Sans elle, le gain final n'est pas démontrable.

**Démo :** remplir la feuille au tableau avec une tâche de l'animateur — intitulé, fréquence hebdomadaire, durée réelle en minutes.

**Exercice (5 min) :** chacun note 3 tâches récurrentes, chronométrées ou estimées honnêtement. La feuille est conservée jusqu'au module 11.

**Erreur fréquente :** estimations complaisantes du type « 5 minutes ». Fais chronométrer la tâche pour de vrai avant la session suivante.

**Message à faire retenir :** ce qui n'est pas mesuré au départ ne sera pas prouvé à l'arrivée.

**Feuille type :**

| Tâche | Fréquence / semaine | Durée réelle (min) | Total / semaine |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

---

## Fiche 01 · Ce que Claude fait et ne fait pas

**Objectif :** oser poser la première question, sans peur ni fausse confiance.

**Démo :** une question métier bien traitée, puis une question où Claude invente un chiffre. Montre les deux.

**Exercice (5 min) :** poser 3 questions sur son propre métier. Repérer la réponse la plus faible et dire pourquoi.

**Erreur fréquente :** le participant teste avec des devinettes ou des blagues. Recadre : « prends une tâche que tu as vraiment à faire aujourd'hui ».

**Message à faire retenir :** ce n'est pas un moteur de recherche, c'est un collègue rapide qui n'a jamais raison par défaut.

**Aller plus loin :** AI Capabilities and Limitations — https://anthropic.skilljar.com/ai-capabilities-and-limitations

---

## Fiche 02 · Écrire une demande qui marche — CRAFT

**Objectif :** installer les 5 ingrédients.

| | | |
|---|---|---|
| **C** | Contexte | La situation, le « pourquoi ». Entreprise en croissance ou en crise : ce n'est pas la même réponse. |
| **R** | Rôle | Qui l'outil doit incarner (« tu es un RH expérimenté »). Oriente le niveau de technicité. |
| **A** | Action | Le livrable attendu, verbe d'action clair : rédige, synthétise, analyse, compare. |
| **F** | Format | La forme du résultat : mail, tableau, PPT de 6 slides. Sans ça, l'outil choisit pour toi. |
| **T** | Tonalité | Le registre : professionnel, bienveillant, direct. Fait que le texte sonne juste. |

**Démo :** « fais-moi un résumé » → résultat médiocre. Puis la même demande en CRAFT → résultat exploitable. Le contraste fait tout le cours.

**Exercice (5 min) :** reprendre une demande ratée du module 01 et la réécrire lettre par lettre.

**Erreur fréquente :** demandes trop courtes, et surtout **Format** et **Tonalité** oubliés — ce sont les deux qui manquent le plus souvent.

**Message à faire retenir :** donne le contexte que tu donnerais à un nouveau collègue.

**Aller plus loin :** Être clair et direct — https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#be-clear-and-direct

---

## Fiche 03 · Ce qu'on ne colle jamais

**Objectif :** poser la règle de confidentialité **avant** que les mauvaises habitudes se prennent.

**Démo :** anonymiser un extrait réel en 30 secondes (remplacer noms, montants, identifiants par des variables).

**Exercice (5 min) :** chaque participant écrit en une phrase ce qu'il ne collera jamais. On compare, on garde la version la plus stricte comme règle d'équipe.

**Erreur fréquente :** croire que « c'est interne, donc pas grave ». Fais valider la règle par le service concerné avant la session.

**Message à faire retenir :** dans le doute, anonymise. Ça prend 30 secondes.

**Aller plus loin :** Utiliser l'IA de manière responsable — https://www.coursera.org/fr-FR/learn/google-use-ai-responsibly

**Confidentialité :** Centre de confidentialité Claude — https://privacy.claude.com/en/

---

# SEMAINE 2 — Écrire et comprendre

## Fiche 04 · Rédiger et reformuler

**Objectif :** produire un mail difficile et faire varier le ton sans changer le fond.

**Démo :** un mail de relance client en version ferme, neutre, chaleureuse.

**Exercice (5 min) :** générer 3 versions d'un vrai mail en attente dans sa boîte, choisir, éditer à la main.

**Erreur fréquente :** copier-coller la première version sans la retoucher. Impose la retouche manuelle.

**Message à faire retenir :** Claude fait le premier jet, jamais la version envoyée.

**Aller plus loin :** Guider par l'exemple — https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#use-examples-effectively

---

## Fiche 05 · Lire un document à ta place

**Objectif :** exploiter un long document sans le lire en entier.

**Démo :** déposer un contrat ou un rapport et demander **les points d'attention**, pas un résumé.

**Exercice (5 min) :** soumettre un document de 20+ pages et en tirer 5 questions à poser en réunion.

**Erreur fréquente :** demander « résume » et obtenir une bouillie. Apprends-leur à demander un angle : risques, engagements, échéances, chiffres.

**Message à faire retenir :** un bon résumé répond à une question. Pose la question.

**Aller plus loin :** Demander sur un long document — https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#long-context-prompting

---

## Fiche 06 · Photo, capture, schéma

**Objectif :** sortir du clavier — exploiter ce qui est sur papier ou à l'écran.

**Démo :** photographier un courrier reçu, le faire transcrire, puis faire rédiger la réponse. Enchaîner sur une capture d'écran d'erreur informatique.

**Exercice (5 min) :** photographier un document papier de son bureau et le transformer en texte exploitable.

**Erreur fréquente :** photo floue ou de travers, puis conclusion que « ça ne marche pas ». Montre le bon cadrage : à plat, bien éclairé, sans ombre portée.

**Message à faire retenir :** si tu peux le photographier, tu peux le traiter.

**Aller plus loin :** Vision — images et PDF — https://platform.claude.com/docs/en/build-with-claude/vision

---

## Fiche 07 · Vérifier avant d'envoyer

**Objectif :** installer le réflexe de contrôle. **C'est le module le plus important du programme.**

**Démo :** montrer les 4 zones à risque — chiffres, noms propres, dates, citations. Demander les sources et vérifier une.

**Exercice (5 min) :** chercher volontairement une erreur dans une réponse produite en séance et la faire corriger.

**Erreur fréquente :** confiance excessive après trois bonnes réponses d'affilée. Provoque l'erreur en séance pour casser cette confiance.

**Message à faire retenir :** tu signes ce que tu envoies.

**Aller plus loin :** Réduire les hallucinations — https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations

---

# SEMAINE 3 — Travailler sur ses fichiers

## Fiche 08 · Tableurs et données

**Objectif :** passer d'un export brut à un tableau lisible.

**Démo :** déposer un CSV mal formé, nettoyer, agréger, sortir un graphique.

**Exercice (5 min) :** transformer un export réel en tableau présentable à son responsable.

**Erreur fréquente :** faire confiance aux totaux sans les recalculer. Impose une vérification sur une ligne au hasard.

**Message à faire retenir :** l'IA met en forme, toi tu contrôles les chiffres.

**Aller plus loin :** Créer et modifier des fichiers — https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude

---

## Fiche 09 · Projects et instructions

**Objectif :** monter sur la **marche 2 de l'escalier** — arrêter de réexpliquer le même contexte à chaque conversation.

**Démo :** créer un Project pour un dossier récurrent, y déposer 2 documents de référence, écrire 5 lignes d'instructions.

**Exercice (5 min) :** chacun crée le Project de son dossier le plus fréquent.

**Erreur fréquente :** instructions trop vagues (« sois professionnel »). Exige du concret : format, longueur, vocabulaire interdit, destinataire type.

**Message à faire retenir :** un Project bien réglé, c'est 10 minutes gagnées à chaque usage.

**Aller plus loin :** Qu'est-ce qu'un Project — https://support.claude.com/en/articles/9517075-what-are-projects

---

# SEMAINE 4 — Devenir autonome

## Fiche 10 · Ta tâche répétitive, une fois pour toutes

**Objectif :** transformer la pire ligne de la feuille du module 00 en modèle réutilisable.

**Démo :** prendre une tâche récurrente de l'équipe et en écrire le modèle de demande, avec les variables entre crochets.

**Exercice (5 min) :** écrire son modèle, le tester deux fois, le déposer dans l'espace partagé de l'équipe.

**Erreur fréquente :** viser trop gros. Une seule tâche, une seule fois par semaine, c'est suffisant pour la première fois.

**Message à faire retenir :** ce que tu fais deux fois, écris-le une fois.

**Aller plus loin :** AI Fluency — les 4D — https://anthropic.skilljar.com/ai-fluency-framework-foundations

---

## Fiche 11 · Démo de 5 minutes

**Objectif :** valider par la preuve, pas par un quiz.

**Format :** chacun présente **avant** (feuille du module 00) **/ après / temps gagné**, chiffré. 5 minutes maximum, questions comprises.

**Exercice :** la démo elle-même.

**Erreur fréquente :** présenter une belle conversation au lieu d'un livrable. Exige le fichier, le mail envoyé, le tableau produit.

**Clôture :** remettre l'**attestation de fin** (modèle dans `docs/attestation.md`) et les liens de certification officielle. Ceux qui veulent continuer s'inscrivent à Anthropic Academy le jour même — l'élan retombe en 48 h.

**Aller plus loin :** Claude 101 — certificat gratuit — https://anthropic.skilljar.com/claude-101

---

## Ce qu'on ne met pas dans ce programme

Volontairement exclus pour ce public : l'API, les appels de fonctions, Zapier/Make, la construction d'agents, MCP. Ce sont des sujets de **piste avancée** (marche 3 de l'escalier), à ouvrir seulement pour les 10 à 20 % qui redemandent après le module 10.

Piste avancée, si besoin :

- Son **module 00 — « Le slash : trois environnements, deux natures »** : ce que fait `/` dans le chat
  claude.ai, dans Claude Code et via les connecteurs, et la différence entre une commande intégrée
  (logique fixe, non personnalisable) et une skill (fichier Markdown chargé dans le contexte).
  [Slash commands](https://code.claude.com/docs/en/slash-commands)
- [Building with the Claude API](https://anthropic.skilljar.com/claude-with-the-anthropic-api)
- [Introduction to Model Context Protocol](https://anthropic.skilljar.com/introduction-to-model-context-protocol)
- [Claude Code 101](https://anthropic.skilljar.com/claude-code-101)

---

## Supports visuels existants

Le jeu de slides interne (`G:\My Drive\Dev\IA\*.png`) est réutilisable tel quel, module par module :

| Slide | Module |
|---|---|
| « IA déjà là », « intelligence humaine », « les choix face à l'IA » | 01 |
| « Prompter efficacement » (matrice CRAFT), « matrice du prompt 2 » | 02 |
| « what is a llm », « comment cela fonctionne » | 01 (optionnel, en clôture) |
| « 3 niveaux d'usage de l'IA » (escalier des usages) | Cadre général, séance 1 |
| « assistant », « mémoire vs type d'IA » | 09 |
| « agent », « usage dans l'entreprise », « enterprise use cases » | Avancé 01 |
| « analyse des tâches redondantes », « gain de temps par l'IA » | 00 et 10 |
| « atelier cas d'usage » | 11 |

---

## Références gratuites et officielles

| Ressource | Langue | Durée | Pour qui |
|---|---|---|---|
| [Claude 101](https://anthropic.skilljar.com/claude-101) | EN | ~1 h | Le cours d'entrée officiel. Certificat gratuit. |
| [AI Capabilities and Limitations](https://anthropic.skilljar.com/ai-capabilities-and-limitations) | EN | ~1 h | Ce que l'IA sait faire et ne sait pas faire. Source du module 01. |
| [AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations) | EN | ~2 h | Les 4D. Source du module 10. |
| [Google · Principes essentiels de l'IA](https://www.coursera.org/fr-FR/specializations/ai-essentials-google) | FR | ~4 h | Cinq cours. Modules 00 et 03 pointent sur deux d'entre eux. |
| [Objectif IA — OpenClassrooms](https://openclassrooms.com/fr/courses/6417031-objectif-ia-initiez-vous-a-l-intelligence-artificielle) | FR | 6 h | Comprendre l'IA avant de l'utiliser. |
| [Bonnes pratiques de prompting](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | EN | — | Référence prompting, à jour en continu. Source des modules 02, 04 et 05. |

Le détail module par module, avec la date de dernière vérification HTTP, est dans
[`docs/liens.md`](liens.md), qui fait foi.
