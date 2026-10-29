# Bac Sénégal — Révisions

Site Vue 3 + Vite + Tailwind v4. Séries → matières → exercices (facile/moyen/difficile) et liens vers les épreuves.

- `npm install` puis `npm run dev`
- Publier : `npm run deploy` (build + branche gh-pages)
- Ajouter un exercice : `src/data/exercices.js` ; une série/matière/source : `src/data/catalogue.js`

Les sujets officiels ne sont pas recopiés : on lie vers officedubac.sn et les archives publiques.

## Mettre à jour la liste des épreuves
`scripts/classer.mjs` classe les PDF par année, série et matière. Il lit les pages de session de officedubac.sn, l'index de ses médias (`/wp-json/wp/v2/media?mime_type=application/pdf`), Sigmaths et Cissé Doro. Télécharge ces pages dans un dossier (voir les noms en tête du script), puis :
`node scripts/classer.mjs <dossier> src/data/epreuves.json` (cela écrit aussi `series-exercices.json`).
