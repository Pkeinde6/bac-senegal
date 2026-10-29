// Séries, matières et liens vers les épreuves (on ne recopie pas les sujets : on renvoie vers la source).

export const matieres = {
  maths: { nom: 'Mathématiques', icone: 'Sigma' },
  pc: { nom: 'Physique-Chimie', icone: 'Atom' },
  svt: { nom: 'SVT', icone: 'Leaf' },
  philo: { nom: 'Philosophie', icone: 'Brain' },
  francais: { nom: 'Français', icone: 'BookOpen' },
  hg: { nom: 'Histoire-Géographie', icone: 'Globe' },
  anglais: { nom: 'Anglais', icone: 'Languages' },
  eco: { nom: 'Économie générale', icone: 'TrendingUp' },
  compta: { nom: 'Comptabilité', icone: 'Calculator' },
  techno: { nom: 'Construction / Technologie', icone: 'Wrench' },
  langues: { nom: 'Langues (LV1, LV2, LLA)', icone: 'MessagesSquare' },
}

export const series = [
  { id: 'L1', nom: 'L1', desc: 'Littéraire, langues anciennes / langues', groupe: 'Littéraires', matieres: ['philo', 'francais', 'hg', 'anglais', 'maths', 'langues'] },
  { id: 'L2', nom: 'L2', desc: 'Littéraire, sciences humaines', groupe: 'Littéraires', matieres: ['philo', 'francais', 'hg', 'anglais', 'maths', 'svt', 'langues'] },
  { id: 'S1', nom: 'S1', desc: 'Maths et sciences physiques renforcées', groupe: 'Scientifiques', matieres: ['maths', 'pc', 'svt', 'philo', 'francais', 'anglais', 'hg', 'langues'] },
  { id: 'S2', nom: 'S2', desc: 'Sciences expérimentales (SVT forte)', groupe: 'Scientifiques', matieres: ['svt', 'pc', 'maths', 'philo', 'francais', 'anglais', 'hg', 'langues'] },
  { id: 'S3', nom: 'S3', desc: 'Sciences et techniques industrielles', groupe: 'Scientifiques', matieres: ['maths', 'pc', 'techno', 'philo', 'francais', 'anglais', 'langues'] },
  { id: 'S4', nom: 'S4', desc: 'Sciences agronomiques', groupe: 'Scientifiques', matieres: ['svt', 'pc', 'maths', 'philo', 'francais', 'anglais', 'langues'] },
  { id: 'S5', nom: 'S5', desc: 'Sciences de l’ingénieur / agro-industrie', groupe: 'Scientifiques', matieres: ['svt', 'pc', 'maths', 'philo', 'francais', 'anglais', 'langues'] },
  { id: 'G', nom: 'G', desc: 'Techniques économiques et de gestion', groupe: 'Techniques', matieres: ['eco', 'compta', 'maths', 'francais', 'philo', 'anglais', 'langues'] },
  { id: 'T1', nom: 'T1', desc: 'Fabrication mécanique', groupe: 'Techniques', matieres: ['techno', 'maths', 'pc', 'francais', 'anglais', 'langues'] },
  { id: 'T2', nom: 'T2', desc: 'Électrotechnique', groupe: 'Techniques', matieres: ['techno', 'maths', 'pc', 'francais', 'anglais', 'langues'] },
  { id: 'F6', nom: 'F6', desc: 'Chimie industrielle', groupe: 'Techniques', matieres: ['techno', 'maths', 'pc', 'francais', 'anglais'] },
]

export const sources = [
  { nom: 'Office du Baccalauréat (officiel)', url: 'https://officedubac.sn/category/epreuves-corriges/', statut: 'Officiel', droits: 'Sujets et corrigés 2023–2026 publiés en PDF par l’Office. Le site renvoie directement vers chaque PDF, sans le recopier.' },
  { nom: 'Sigmaths — sujets de maths du Bac sénégalais', url: 'https://www.sigmaths.net/bac2/Senegal.php', statut: 'Non officiel', droits: 'Archives de maths 2007–2023 avec corrections. Liens directs, pas de copie.' },
  { nom: 'Cissé Doro — sciences physiques Terminale S', url: 'https://cisse-doro.e-monsite.com/pages/terminale-s1-s2.html', statut: 'Professeur', droits: 'Séries d’exercices par chapitre et sujets 2006–2017. Œuvre du professeur : lien uniquement.' },
  { nom: 'Wahab Diop — séries de physique TS', url: 'https://physiquechimie.godaddysites.com/td-physique-ts', statut: 'Professeur', droits: 'Séries d’exercices récentes. Lien uniquement.' },
  { nom: 'Sunumaths — cours et exercices de maths', url: 'https://sunumaths.com/', statut: 'Professeur', droits: 'Cours avec exercices corrigés (TS2). Lien uniquement.' },
  { nom: 'Kamerpower — archives toutes séries', url: 'https://kamerpower.com/fr/epreuves-du-bac-senegal-et-corrections-de-2010-a-2020-pdf-toutes-series/', statut: 'Non officiel', droits: 'Agrégateur : renvoie surtout vers les PDF de l’Office. Lien uniquement.' },
]
