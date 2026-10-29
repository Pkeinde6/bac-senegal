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
}

export const series = [
  { id: 'L1', nom: 'L1', desc: 'Littéraire, langues anciennes / langues', groupe: 'Littéraires', matieres: ['philo', 'francais', 'hg', 'anglais', 'maths'] },
  { id: 'L2', nom: 'L2', desc: 'Littéraire, sciences humaines', groupe: 'Littéraires', matieres: ['philo', 'francais', 'hg', 'anglais', 'maths', 'svt'] },
  { id: 'S1', nom: 'S1', desc: 'Maths et sciences physiques renforcées', groupe: 'Scientifiques', matieres: ['maths', 'pc', 'svt', 'philo', 'francais', 'anglais', 'hg'] },
  { id: 'S2', nom: 'S2', desc: 'Sciences expérimentales (SVT forte)', groupe: 'Scientifiques', matieres: ['svt', 'pc', 'maths', 'philo', 'francais', 'anglais', 'hg'] },
  { id: 'S3', nom: 'S3', desc: 'Sciences et techniques industrielles', groupe: 'Scientifiques', matieres: ['maths', 'pc', 'techno', 'philo', 'francais', 'anglais'] },
  { id: 'G', nom: 'G', desc: 'Techniques économiques et de gestion', groupe: 'Techniques', matieres: ['eco', 'compta', 'maths', 'francais', 'philo', 'anglais'] },
  { id: 'T1', nom: 'T1', desc: 'Fabrication mécanique', groupe: 'Techniques', matieres: ['techno', 'maths', 'pc', 'francais', 'anglais'] },
  { id: 'T2', nom: 'T2', desc: 'Électrotechnique', groupe: 'Techniques', matieres: ['techno', 'maths', 'pc', 'francais', 'anglais'] },
]

export const sources = [
  {
    nom: 'Office du Baccalauréat (officiel)',
    url: 'https://officedubac.sn',
    statut: 'Officiel',
    droits: "Source de référence. Aucune licence de réutilisation publiée : on lie, on ne republie pas les PDF.",
  },
  {
    nom: 'Kamerpower — épreuves 2010–2024, toutes séries',
    url: 'https://kamerpower.com/fr/epreuves-du-bac-senegal-et-corrections-de-2010-a-2020-pdf-toutes-series/',
    statut: 'Non officiel',
    droits: 'Agrégateur privé. Contenu non libre : lien uniquement. Vérifier année et groupe.',
  },
  {
    nom: 'Kamerpower — 1er groupe, session normale (dernière session)',
    url: 'https://kamerpower.com/fr/epreuves-corriges-pdf-1er-groupe-bac-senegal-session-normal-2020',
    statut: 'Non officiel',
    droits: 'Agrégateur privé. Lien uniquement.',
  },
  {
    nom: 'Samabac — corrigés par matière et série',
    url: 'https://samabac.sn',
    statut: 'Non officiel',
    droits: 'Corrigés rédigés par le site : protégés, lien uniquement.',
  },
  {
    nom: 'Sencampus — archives S et L (jusqu’à 2012)',
    url: 'https://www.sencampus.com/bac-s-epreuves-et-corriges/',
    statut: 'Non officiel',
    droits: 'Archives anciennes. Lien uniquement.',
  },
]

// Années proposées dans l'onglet Épreuves. Chaque année renvoie vers les sources ci-dessus.
export const annees = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016]
