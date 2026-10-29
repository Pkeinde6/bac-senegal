// Fascicules et recueils trouvés en ligne. On ne recopie rien : on renvoie vers l'original, en citant l'auteur.
// pdf: true → lisible dans la liseuse du site ; sinon, la page de l'auteur s'ouvre dans un nouvel onglet.

export const fascicules = [
  { matiere: 'maths', series: ['S2', 'S4', 'S5'], titre: 'Cours et exercices corrigés de Terminale S2', source: 'M. Babacar Djitté (Sunumaths)', url: 'https://sunumaths.com/wp-content/uploads/2021/03/Cours-TS2-Mr-Babacar-DJITTE.pdf', pdf: true },
  { matiere: 'maths', series: ['S2', 'S4', 'S5'], titre: 'Fascicule de mathématiques Terminale S2', source: 'Kamerpower', url: 'https://kamerpower.com/fr/fascicule-mathematiques-terminale-s2-pdf-senegal/', pdf: false },
  { matiere: 'maths', series: ['S1', 'S2', 'S3', 'S4', 'S5'], titre: 'Fichiers de Terminale S (bacs blancs, exercices)', source: 'M. Tall', url: 'https://www.monsieurtall.com/Tle%20S/', pdf: false },
  { matiere: 'pc', series: ['S1', 'S2', 'S3', 'S4', 'S5'], titre: 'Fascicule de physique-chimie TS (exercices, devoirs, compositions)', source: 'M. Tall', url: 'https://www.monsieurtall.com/Tle%20S/', pdf: false },
  { matiere: 'pc', series: ['S1', 'S2', 'S3', 'S4', 'S5'], titre: 'Séries d’exercices de physique TS, par année', source: 'M. Wahab Diop', url: 'https://physiquechimie.godaddysites.com/td-physique-ts', pdf: false },
]
