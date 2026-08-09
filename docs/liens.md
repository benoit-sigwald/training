# Table de correspondance sujet → lien profond

Un lien par module, vers **la page exacte du sujet** — plus aucun lien générique vers un catalogue.

Source de vérité : schéma **`TRAINING`** sur Oracle ATP `arxdb01` (tables `SUJET` et `LIEN`,
vue `V_MODULE_LIEN`). Les deux pages du site en sont le miroir.
Script de création et de chargement : `db/01-setup-training.js`.

Tous les liens ci-dessous ont été appelés en HTTP le **9 août 2026** et ont répondu **200**.

## Parcours découverte

| Module | Sujet | Fournisseur | Lien exact |
|---|---|---|---|
| 00 | Chronomètre : où part ton temps | Coursera | [Productivité et outils d'IA](https://www.coursera.org/fr-FR/learn/google-maximize-productivity-with-ai-tools) · [EN](https://www.coursera.org/learn/google-maximize-productivity-with-ai-tools) |
| 01 | Ce que Claude fait et ne fait pas | Anthropic Academy | [AI Capabilities and Limitations](https://anthropic.skilljar.com/ai-capabilities-and-limitations) |
| 02 | Écrire une demande — CRAFT | Doc Claude | [Être clair et direct](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#be-clear-and-direct) |
| 03 | Ce qu'on ne colle jamais | Coursera | [Utiliser l'IA de manière responsable](https://www.coursera.org/fr-FR/learn/google-use-ai-responsibly) · [EN](https://www.coursera.org/learn/google-use-ai-responsibly) |
| 03 | *complément* | Anthropic | [Centre de confidentialité Claude](https://privacy.claude.com/en/) |
| 04 | Rédiger et reformuler | Doc Claude | [Guider par l'exemple](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#use-examples-effectively) |
| 05 | Lire un document à ta place | Doc Claude | [Demander sur un long document](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#long-context-prompting) |
| 05 | *complément* | Support Claude | [Déposer des fichiers dans Claude](https://support.claude.com/en/articles/8241126-upload-files-to-claude) |
| 06 | Photo, capture, schéma | Doc Claude | [Vision — images et PDF](https://platform.claude.com/docs/en/build-with-claude/vision) |
| 07 | Vérifier avant d'envoyer | Doc Claude | [Réduire les hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) |
| 08 | Tableurs et données | Support Claude | [Créer et modifier des fichiers](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude) |
| 09 | Projects et instructions | Support Claude | [Qu'est-ce qu'un Project](https://support.claude.com/en/articles/9517075-what-are-projects) |
| 10 | Ta tâche répétitive | Anthropic Academy | [AI Fluency — les 4D](https://anthropic.skilljar.com/ai-fluency-framework-foundations) |
| 10 | *complément* | Anthropic Academy | [AI Fluency for Small Businesses](https://anthropic.skilljar.com/ai-fluency-for-small-businesses) |
| 11 | Démo de 5 minutes | Anthropic Academy | [Claude 101 — certificat](https://anthropic.skilljar.com/claude-101) |

## Parcours avancé

| Module | Sujet | Fournisseur | Lien exact |
|---|---|---|---|
| 01 | Ce qu'est un agent | Anthropic | [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) |
| 01 | *complément* | Anthropic Academy | [Introduction to subagents](https://anthropic.skilljar.com/introduction-to-subagents) |
| 02 | Donner des outils | Doc Claude | [Tool use — vue d'ensemble](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) |
| 02 | *complément* | Anthropic Academy | [Building with the Claude API](https://anthropic.skilljar.com/claude-with-the-anthropic-api) |
| 03 | De Projects à Skills | Anthropic Academy | [Introduction to Agent Skills](https://anthropic.skilljar.com/introduction-to-agent-skills) |
| 04 | MCP et connecteurs | Anthropic Academy | [Introduction to MCP](https://anthropic.skilljar.com/introduction-to-model-context-protocol) |
| 05 | Un agent, de bout en bout | Anthropic Academy | [MCP — Advanced Topics](https://anthropic.skilljar.com/model-context-protocol-advanced-topics) |
| 06 | Tester, chiffrer, encadrer | Doc Claude | [Développer des tests](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) |

## Liens retirés

| Ancien lien | Motif |
|---|---|
| `https://www.skills.google/paths/2336` | Le parcours n'existe plus : redirige vers la racine `skills.google`. Remplacé par l'article support « Créer et modifier des fichiers » au module 08. |
| `https://anthropic.skilljar.com` (catalogue) | Générique — utilisé sur 8 modules. Remplacé par la page de cours exacte de chaque sujet. |
| `https://docs.claude.com/en/docs/...` | Redirige désormais vers `platform.claude.com`. URLs canoniques adoptées. |
| `https://openclassrooms.com/us/courses/...` | Version `/us/` remplacée par `/fr/`. |

## Revérifier

La vue `V_LIEN_A_REVERIFIER` remonte les liens jamais vérifiés, vérifiés il y a plus de 180 jours,
ou dont le dernier statut HTTP n'était pas 200 :

```sql
SELECT * FROM TRAINING.V_LIEN_A_REVERIFIER;
```

Les catalogues bougent : à repasser deux fois par an, puis mettre à jour `HTTP_STATUT` et `VERIFIE_LE`.
