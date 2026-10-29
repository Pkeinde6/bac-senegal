// Exercices originaux, écrits pour ce site, dans l'esprit du programme de Terminale au Sénégal.
// niveau : 'facile' | 'moyen' | 'difficile'

export const exercices = {
  maths: [
    { niveau: 'facile', titre: 'Dérivée d’un polynôme', enonce: 'Soit f(x) = 3x² − 5x + 2. Calcule f′(x) puis f′(1).', solution: 'On dérive terme à terme : (3x²)′ = 6x, (−5x)′ = −5, (2)′ = 0.\nDonc f′(x) = 6x − 5 et f′(1) = 6 − 5 = 1.' },
    { niveau: 'facile', titre: 'Limite en l’infini', enonce: 'Calcule la limite de g(x) = (2x + 1)/(x − 3) quand x tend vers +∞.', solution: 'On garde les termes de plus haut degré : 2x/x = 2.\nLa limite vaut 2 : la courbe a une asymptote horizontale y = 2.' },
    { niveau: 'moyen', titre: 'Étude de variations', enonce: 'Étudie les variations de h(x) = x³ − 3x sur ℝ.', solution: 'h′(x) = 3x² − 3 = 3(x − 1)(x + 1).\nh′ > 0 si x < −1 ou x > 1 ; h′ < 0 entre −1 et 1.\nh croît jusqu’à h(−1) = 2 (maximum local), décroît jusqu’à h(1) = −2 (minimum local), puis croît.' },
    { niveau: 'moyen', titre: 'Suite géométrique', enonce: 'Un élève épargne 5 000 F en janvier, puis 10 % de plus chaque mois. Combien épargne-t-il en décembre ? Quel total sur l’année ?', solution: 'u₁ = 5 000, raison q = 1,1. En décembre : u₁₂ = 5 000 × 1,1¹¹ ≈ 14 266 F.\nTotal : S = 5 000 × (1,1¹² − 1)/(1,1 − 1) ≈ 106 921 F.' },
    { niveau: 'moyen', titre: 'Nombres complexes', enonce: 'Écris z = 1 + i sous forme trigonométrique, puis calcule z⁸.', solution: '|z| = √2, arg z = π/4. Donc z = √2 (cos π/4 + i sin π/4).\nz⁸ = (√2)⁸ (cos 2π + i sin 2π) = 16.' },
    { niveau: 'difficile', titre: 'Intégrale par parties', enonce: 'Calcule I = ∫₀¹ x eˣ dx.', solution: 'On pose u = x, v′ = eˣ, donc u′ = 1, v = eˣ.\nI = [x eˣ]₀¹ − ∫₀¹ eˣ dx = e − (e − 1) = 1.' },
    { niveau: 'difficile', titre: 'Probabilités : loi binomiale', enonce: 'À Dakar, 30 % des taxis acceptent le paiement mobile. Tu arrêtes 5 taxis au hasard. Probabilité qu’exactement 2 l’acceptent ? Qu’au moins un l’accepte ?', solution: 'X suit B(5 ; 0,3).\nP(X = 2) = C(5,2) × 0,3² × 0,7³ = 10 × 0,09 × 0,343 ≈ 0,309.\nP(X ≥ 1) = 1 − 0,7⁵ ≈ 1 − 0,168 = 0,832.' },
  ],
  pc: [
    { niveau: 'facile', titre: 'Mouvement uniforme', enonce: 'Un car Dakar–Thiès roule à 72 km/h constants. Quelle distance parcourt-il en 25 min ?', solution: '72 km/h = 20 m/s. 25 min = 1 500 s.\nd = v × t = 20 × 1 500 = 30 000 m = 30 km.' },
    { niveau: 'facile', titre: 'pH d’un acide fort', enonce: 'Quel est le pH d’une solution d’acide chlorhydrique à 10⁻³ mol/L ?', solution: 'Acide fort : [H₃O⁺] = c = 10⁻³ mol/L.\npH = −log(10⁻³) = 3.' },
    { niveau: 'moyen', titre: 'Chute libre', enonce: 'Une mangue tombe d’une branche à 5 m. Avec g = 10 m/s², combien de temps met-elle et à quelle vitesse touche-t-elle le sol ?', solution: 'h = ½ g t² → t = √(2h/g) = √1 = 1 s.\nv = g t = 10 m/s (36 km/h).' },
    { niveau: 'moyen', titre: 'Circuit RC', enonce: 'Un condensateur C = 100 µF se charge à travers R = 10 kΩ. Calcule la constante de temps τ et la tension après τ si E = 12 V.', solution: 'τ = RC = 10⁴ × 10⁻⁴ = 1 s.\nu(τ) = E(1 − e⁻¹) ≈ 12 × 0,63 ≈ 7,6 V.' },
    { niveau: 'difficile', titre: 'Dosage acide-base', enonce: '20 mL d’acide éthanoïque sont dosés par NaOH à 0,1 mol/L. L’équivalence est obtenue pour 16 mL. Concentration de l’acide ? pH à la demi-équivalence si pKa = 4,8 ?', solution: 'À l’équivalence : cₐVₐ = c_bV_b → cₐ = 0,1 × 16 / 20 = 0,08 mol/L.\nÀ la demi-équivalence, [acide] = [base] donc pH = pKa = 4,8.' },
    { niveau: 'difficile', titre: 'Oscillateur mécanique', enonce: 'Un ressort de raideur k = 40 N/m porte une masse m = 100 g. Période propre ? Énergie si l’amplitude est 5 cm ?', solution: 'T₀ = 2π√(m/k) = 2π√(0,1/40) ≈ 0,314 s.\nE = ½ k Xm² = ½ × 40 × 0,05² = 0,05 J.' },
  ],
  svt: [
    { niveau: 'facile', titre: 'Le neurone', enonce: 'Cite les trois parties d’un neurone et le sens du message nerveux.', solution: 'Dendrites → corps cellulaire → axone.\nLe message va des dendrites vers l’extrémité de l’axone (terminaisons synaptiques).' },
    { niveau: 'moyen', titre: 'Croisement monohybride', enonce: 'On croise deux plants de mil hétérozygotes Aa (A : grain jaune dominant, a : blanc). Proportions attendues en F2 ?', solution: 'Échiquier : AA, Aa, Aa, aa.\nGénotypes : ¼ AA, ½ Aa, ¼ aa. Phénotypes : ¾ jaunes, ¼ blancs.' },
    { niveau: 'moyen', titre: 'Régulation de la glycémie', enonce: 'Après un repas riche en riz, que se passe-t-il pour la glycémie et quelle hormone intervient ?', solution: 'La glycémie monte. Le pancréas (cellules β) libère l’insuline.\nL’insuline fait entrer le glucose dans les cellules et le stocke en glycogène (foie, muscles) : la glycémie redescend vers 1 g/L.' },
    { niveau: 'difficile', titre: 'Dihybridisme et linkage', enonce: 'Un test-cross donne 42 % AB, 42 % ab, 8 % Ab, 8 % aB. Les gènes sont-ils indépendants ? Calcule la distance entre eux.', solution: 'Indépendants → 25 % de chaque. Ici les parentaux dominent : gènes liés.\nRecombinés = 8 + 8 = 16 % → distance = 16 cM.' },
  ],
  philo: [
    { niveau: 'facile', titre: 'Définir une notion', enonce: 'Donne une définition simple de la conscience et un exemple tiré de la vie quotidienne.', solution: 'La conscience est la connaissance que l’on a de soi et du monde.\nExemple : savoir que l’on est en retard au lycée et s’en sentir responsable.' },
    { niveau: 'moyen', titre: 'Problématiser un sujet', enonce: 'Sujet : « Le travail est-il une contrainte ? » Rédige une problématique.', solution: 'Le travail semble imposé par le besoin (gagner sa vie), donc contraignant. Mais il permet aussi de se réaliser et de transformer la nature.\nProblématique : le travail n’est-il qu’une nécessité subie, ou peut-il être le lieu de la liberté humaine ?' },
    { niveau: 'difficile', titre: 'Plan dialectique', enonce: 'Propose un plan en trois parties pour : « Peut-on être libre en société ? »', solution: 'I. La société limite la liberté : lois, coutumes, regard des autres.\nII. Mais sans société, la liberté n’est que la loi du plus fort (Rousseau, contrat social).\nIII. La vraie liberté est l’obéissance à la loi qu’on s’est donnée : la société la rend possible.' },
  ],
  francais: [
    { niveau: 'facile', titre: 'Figures de style', enonce: 'Identifie la figure : « Ce soleil, lion rugissant de midi. »', solution: 'Métaphore : le soleil est assimilé à un lion sans outil de comparaison (pas de « comme »).' },
    { niveau: 'moyen', titre: 'Résumé', enonce: 'Méthode : comment réduire un texte de 600 mots au quart ?', solution: 'Lire deux fois, repérer la thèse et les connecteurs.\nGarder l’ordre des idées, reformuler avec ses mots, supprimer exemples et répétitions.\nViser 150 mots (±10 %) et indiquer le nombre de mots.' },
    { niveau: 'difficile', titre: 'Dissertation : la Négritude', enonce: 'Sujet : « La poésie de la Négritude est-elle seulement un cri de révolte ? » Propose un plan.', solution: 'I. Oui, un cri de révolte contre la colonisation (Damas, Césaire).\nII. Mais aussi un chant de célébration des valeurs africaines (Senghor, « Femme noire »).\nIII. Enfin un appel à l’universel : le « rendez-vous du donner et du recevoir ».' },
  ],
  hg: [
    { niveau: 'facile', titre: 'Dates clés', enonce: 'Donne la date de l’indépendance du Sénégal et le nom de son premier président.', solution: '20 août 1960 (après l’éclatement de la Fédération du Mali). Premier président : Léopold Sédar Senghor.' },
    { niveau: 'moyen', titre: 'La guerre froide', enonce: 'Explique en quatre lignes ce qu’est la guerre froide.', solution: 'Affrontement indirect (1947–1991) entre les États-Unis (capitalisme) et l’URSS (communisme).\nPas de guerre directe à cause de l’arme nucléaire, mais crises (Berlin, Cuba) et guerres locales (Corée, Vietnam).' },
    { niveau: 'difficile', titre: 'Croquis : espace sénégalais', enonce: 'Quels éléments mettre dans la légende d’un croquis sur les inégalités de développement au Sénégal ?', solution: '1. Pôle dominant : Dakar–Thiès–Mbour (industrie, port, services).\n2. Régions agricoles : bassin arachidier, vallée du fleuve (riz).\n3. Périphéries en retard : est et sud-est.\n4. Flux : exode rural vers Dakar, axes routiers.' },
  ],
  anglais: [
    { niveau: 'facile', titre: 'Present perfect', enonce: 'Complete: “I ___ (live) in Saint-Louis since 2020.”', solution: 'I have lived in Saint-Louis since 2020. (since + point de départ → present perfect)' },
    { niveau: 'moyen', titre: 'Reported speech', enonce: 'Put into reported speech: She said, “I will pass my exam.”', solution: 'She said (that) she would pass her exam. (will → would, I → she, my → her)' },
    { niveau: 'difficile', titre: 'Essay', enonce: 'Write the outline of an essay: “Should young Africans emigrate to find work?”', solution: 'Intro: context (youth unemployment, migration).\nBody 1: advantages (jobs, remittances, skills).\nBody 2: drawbacks (brain drain, dangers of irregular migration).\nConclusion: invest in local opportunities; legal mobility.' },
  ],
  eco: [
    { niveau: 'facile', titre: 'PIB', enonce: 'Qu’est-ce que le PIB et que mesure-t-il ?', solution: 'Produit intérieur brut : somme des valeurs ajoutées produites sur le territoire en un an. Il mesure la richesse créée, pas son partage.' },
    { niveau: 'moyen', titre: 'Taux de croissance', enonce: 'Le PIB passe de 16 000 à 17 120 milliards F CFA. Calcule le taux de croissance.', solution: '(17 120 − 16 000) / 16 000 × 100 = 7 %.' },
    { niveau: 'difficile', titre: 'Inflation et pouvoir d’achat', enonce: 'Un salaire passe de 150 000 à 159 000 F, les prix montent de 4 %. Le pouvoir d’achat a-t-il augmenté ?', solution: 'Hausse nominale : 6 %. Hausse réelle ≈ (1,06 / 1,04 − 1) × 100 ≈ 1,9 %.\nOui, le pouvoir d’achat augmente d’environ 1,9 %.' },
  ],
  compta: [
    { niveau: 'facile', titre: 'Bilan', enonce: 'Classe à l’actif ou au passif : capital, matériel, banque, emprunt, stock.', solution: 'Actif : matériel, stock, banque.\nPassif : capital, emprunt.' },
    { niveau: 'moyen', titre: 'Amortissement linéaire', enonce: 'Une machine achetée 2 400 000 F est amortie sur 5 ans. Annuité et valeur nette après 2 ans ?', solution: 'Annuité = 2 400 000 / 5 = 480 000 F.\nVNC après 2 ans = 2 400 000 − 960 000 = 1 440 000 F.' },
    { niveau: 'difficile', titre: 'Seuil de rentabilité', enonce: 'Charges fixes : 3 000 000 F. Taux de marge sur coût variable : 25 %. Calcule le seuil de rentabilité.', solution: 'SR = charges fixes / taux de MCV = 3 000 000 / 0,25 = 12 000 000 F de chiffre d’affaires.' },
  ],
  techno: [
    { niveau: 'facile', titre: 'Loi d’Ohm', enonce: 'Une résistance de 220 Ω est traversée par 50 mA. Tension à ses bornes ?', solution: 'U = R × I = 220 × 0,05 = 11 V.' },
    { niveau: 'moyen', titre: 'Puissance en alternatif', enonce: 'Un moteur sous 230 V absorbe 5 A avec cos φ = 0,8. Puissance active ?', solution: 'P = U I cos φ = 230 × 5 × 0,8 = 920 W.' },
    { niveau: 'difficile', titre: 'Transmission par engrenages', enonce: 'Pignon moteur Z₁ = 20 dents à 1 500 tr/min, roue Z₂ = 60 dents. Vitesse de sortie et rapport de réduction ?', solution: 'r = Z₁/Z₂ = 1/3. N₂ = 1 500 × 1/3 = 500 tr/min.' },
  ],
}
