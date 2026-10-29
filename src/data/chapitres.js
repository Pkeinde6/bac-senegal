// Chapitres de Terminale, d'après les programmes officiels publiés par l'Office du Bac
// (officedubac.sn/wp-content/uploads/2026/01/Programme_*.pdf). Le programme dépend parfois de la série.

const mathsS1S3 = ['Nombres complexes', 'Arithmétique', 'Suites numériques', 'Limites et continuité', 'Dérivation et étude de fonctions', 'Calcul intégral', 'Équations différentielles', 'Barycentres et géométrie plane', 'Produit vectoriel et géométrie dans l’espace', 'Transformations du plan', 'Coniques', 'Probabilités et dénombrement']
const mathsS2 = ['Limites et continuité', 'Dérivation et étude de fonctions', 'Fonctions usuelles (ln, exp, puissances)', 'Suites numériques', 'Calcul intégral', 'Équations différentielles', 'Nombres complexes', 'Statistiques', 'Probabilités et dénombrement']
const mathsL = ['Polynômes et factorisation', 'Probabilités et dénombrement', 'Statistiques', 'Limites et continuité', 'Dérivation et étude de fonctions', 'Fonctions usuelles (ln, exp, puissances)']
const pcS = ['Cinématique du point', 'Bases de la dynamique', 'Applications de la dynamique', 'Gravitation universelle', 'Champs magnétiques', 'Particule chargée dans un champ magnétique', 'Loi de Laplace', 'Induction – dipôle RL', 'Dipôle RC', 'Oscillations électriques', 'Oscillations mécaniques libres', 'Interférences lumineuses', 'Effet photoélectrique', 'Niveaux d’énergie de l’atome', 'Réactions nucléaires', 'Alcools', 'Amines', 'Acides carboxyliques et dérivés', 'Cinétique chimique', 'Autoprotolyse de l’eau – pH', 'Acide fort – base forte', 'Acides et bases faibles', 'Acide faible / base forte – dosage', 'Acides α-aminés']
const pcL2 = ['Énergie électrique', 'Énergie nucléaire', 'Ondes mécaniques', 'Aspect ondulatoire de la lumière', 'Aspect corpusculaire de la lumière', 'Matières plastiques', 'Textiles', 'Savons']
const svtS = ['Système nerveux', 'Tissu nerveux', 'Muscle strié squelettique', 'Activité cardiaque et pression artérielle', 'Régulation de la glycémie', 'Immunologie', 'Reproduction chez les mammifères', 'Reproduction chez les spermaphytes', 'Génétique', 'Hérédité humaine', 'Biotechnologies']

const autres = {
  philo: ['La conscience', 'Le travail', 'La liberté et la société', 'L’État', 'La science', 'Méthode de la dissertation'],
  francais: ['Figures de style', 'Résumé et discussion', 'Commentaire de texte', 'Dissertation littéraire'],
  hg: ['Histoire du Sénégal et de l’Afrique', 'Relations internationales depuis 1945', 'Géographie du Sénégal', 'Croquis et méthode'],
  anglais: ['Grammar', 'Reading comprehension', 'Essay writing'],
  eco: ['Agrégats et croissance', 'Monnaie, prix et inflation', 'Commerce international'],
  compta: ['Bilan et comptes', 'Amortissements', 'Analyse des coûts'],
  techno: ['Électricité', 'Mécanique et transmissions'],
  langues: ['Compréhension', 'Expression écrite'],
}

export function chapitresDe(matiere, serie) {
  if (matiere === 'maths') return ['S1', 'S3'].includes(serie) ? mathsS1S3 : serie.startsWith('L') ? mathsL : mathsS2
  if (matiere === 'pc') return serie === 'L2' ? pcL2 : pcS
  if (matiere === 'svt') return svtS
  return autres[matiere] ?? []
}

// Chapitre de chaque exercice (rédigé ou à variantes), par titre.
export const chapitreDe = {
  'Dérivée d’un polynôme': 'Dérivation et étude de fonctions', 'Dérivée d’un trinôme': 'Dérivation et étude de fonctions',
  'Limite en l’infini': 'Limites et continuité', 'Limite d’une fonction rationnelle': 'Limites et continuité',
  'Étude de variations': 'Dérivation et étude de fonctions', 'Équation du second degré': 'Dérivation et étude de fonctions',
  'Suite géométrique': 'Suites numériques', 'Suite géométrique : épargne': 'Suites numériques', 'Suite arithmétique': 'Suites numériques',
  'Nombres complexes': 'Nombres complexes', 'Nombres complexes : module et argument': 'Nombres complexes',
  'Intégrale par parties': 'Calcul intégral', 'Probabilités : loi binomiale': 'Probabilités et dénombrement', 'Loi binomiale': 'Probabilités et dénombrement',
  'Mouvement uniforme': 'Cinématique du point', 'Chute libre': 'Applications de la dynamique', 'Circuit RC': 'Dipôle RC',
  'Oscillateur mécanique': 'Oscillations mécaniques libres', 'Oscillateur élastique': 'Oscillations mécaniques libres',
  'pH d’un acide fort': 'Autoprotolyse de l’eau – pH', 'pH d’un acide ou d’une base forte': 'Acide fort – base forte',
  'Dosage acide-base': 'Acide faible / base forte – dosage', 'Dosage acide faible / base forte': 'Acide faible / base forte – dosage',
  'Le neurone': 'Tissu nerveux', 'Croisement monohybride': 'Génétique', 'Monohybridisme': 'Génétique',
  'Régulation de la glycémie': 'Régulation de la glycémie', 'Dihybridisme et linkage': 'Génétique', 'Gènes liés : distance': 'Génétique',
  'Définir une notion': 'La conscience', 'Problématiser un sujet': 'Le travail', 'Plan dialectique': 'La liberté et la société',
  'Figures de style': 'Figures de style', 'Résumé': 'Résumé et discussion', 'Dissertation : la Négritude': 'Dissertation littéraire',
  'Dates clés': 'Histoire du Sénégal et de l’Afrique', 'La guerre froide': 'Relations internationales depuis 1945', 'Croquis : espace sénégalais': 'Croquis et méthode',
  'Present perfect': 'Grammar', 'Reported speech': 'Grammar', 'Essay': 'Essay writing',
  'PIB': 'Agrégats et croissance', 'Taux de croissance': 'Agrégats et croissance', 'Inflation et pouvoir d’achat': 'Monnaie, prix et inflation', 'Pouvoir d’achat': 'Monnaie, prix et inflation',
  'Bilan': 'Bilan et comptes', 'Amortissement linéaire': 'Amortissements', 'Seuil de rentabilité': 'Analyse des coûts',
  'Loi d’Ohm': 'Électricité', 'Loi d’Ohm et puissance': 'Électricité', 'Puissance en alternatif': 'Électricité', 'Puissance en monophasé': 'Électricité',
  'Transmission par engrenages': 'Mécanique et transmissions', 'Engrenages': 'Mécanique et transmissions',
}

// Fiches de profs : chapitre deviné à partir du titre.
const motsPc = [[/cinemat/i, 'Cinématique du point'], [/base.*dynamique/i, 'Bases de la dynamique'], [/gravitation/i, 'Gravitation universelle'], [/particule/i, 'Particule chargée dans un champ magnétique'], [/champ magn/i, 'Champs magnétiques'], [/laplace/i, 'Loi de Laplace'], [/induction/i, 'Induction – dipôle RL'], [/condensateur/i, 'Dipôle RC'], [/oscillations elec/i, 'Oscillations électriques'], [/oscillations meca/i, 'Oscillations mécaniques libres'], [/interferen/i, 'Interférences lumineuses'], [/niveaux d/i, 'Niveaux d’énergie de l’atome'], [/alcool/i, 'Alcools'], [/amines?$|les amines/i, 'Amines'], [/carboxyl/i, 'Acides carboxyliques et dérivés'], [/cinetique/i, 'Cinétique chimique'], [/autoprotolyse de l/i, 'Autoprotolyse de l’eau – pH'], [/dosages/i, 'Acide faible / base forte – dosage'], [/alpha/i, 'Acides α-aminés']]
export const chapitreFiche = (f) => (f.matiere === 'pc' && motsPc.find(([rx]) => rx.test(f.titre))?.[1]) || null
