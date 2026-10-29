// Exercices originaux couvrant les chapitres des programmes officiels de Terminale (Office du Bac).
// Chaque exercice indique son chapitre ; ceux qui ont generer() changent de nombres à chaque variante.
import { ent, choix, nz, f, sci, sg, comb, pgcd, poly, cplx, fr } from './outils.js'

const h = 6.63e-34, c = 3e8, e = 1.6e-19

export const programme = {
  maths: [
    // Polynômes (série L)
    { niveau: 'moyen', chapitre: 'Polynômes et factorisation', titre: 'Factoriser un polynôme de degré 3', generer() {
      const r1 = nz(-3, 3), r2 = ent(-4, 4), r3 = ent(-4, 4)
      const P = [1, -(r1 + r2 + r3), r1 * r2 + r1 * r3 + r2 * r3, -r1 * r2 * r3]
      return { enonce: `Soit P(x) = ${poly(P)}.\n1) Vérifie que ${r1} est une racine de P.\n2) Factorise P(x).`,
        solution: `1) P(${r1}) = 0 (remplace x par ${r1} et calcule).\n2) P(x) = (x ${sg(-r1)})(${poly([1, -(r2 + r3), r2 * r3])}) par division ou identification.\nLe trinôme a pour racines ${r2} et ${r3}, donc P(x) = (x ${sg(-r1)})(x ${sg(-r2)})(x ${sg(-r3)}).`.replace(/\(x \)/g, 'x') } } },

    // Limites et continuité
    { niveau: 'moyen', chapitre: 'Limites et continuité', titre: 'Forme indéterminée avec une racine', generer() {
      const a = choix([2, 4, 6, 8, 10, -2, -4])
      return { enonce: `Calcule la limite de f(x) = √(x² ${sg(a)}x) − x quand x → +∞.`,
        solution: `C’est une forme « ∞ − ∞ » : on multiplie par la quantité conjuguée.\nf(x) = (x² ${sg(a)}x − x²) / (√(x² ${sg(a)}x) + x) = ${a}x / (x(√(1 ${sg(a)}/x) + 1)).\nQuand x → +∞, √(1 ${sg(a)}/x) → 1, donc f(x) → ${a}/2 = ${f(a / 2)}.` } } },
    { niveau: 'difficile', chapitre: 'Limites et continuité', titre: 'Théorème des valeurs intermédiaires',
      enonce: 'Montre que l’équation x³ + x − 1 = 0 admet une unique solution α dans [0 ; 1], puis donne un encadrement de α d’amplitude 0,1.',
      solution: 'f(x) = x³ + x − 1 est continue et f′(x) = 3x² + 1 > 0 : f est strictement croissante.\nf(0) = −1 < 0 et f(1) = 1 > 0 : d’après le théorème des valeurs intermédiaires (cas strictement monotone), il existe un unique α dans [0 ; 1].\nf(0,6) = −0,184 < 0 et f(0,7) = 0,043 > 0, donc 0,6 < α < 0,7.' },

    // Dérivation et étude de fonctions
    { niveau: 'moyen', chapitre: 'Dérivation et étude de fonctions', titre: 'Tangente en un point', generer() {
      const a = nz(-3, 3), b = ent(-5, 5), cc = ent(-5, 5), x0 = nz(-2, 3)
      const y0 = a * x0 * x0 + b * x0 + cc, m = 2 * a * x0 + b, p = y0 - m * x0
      return { enonce: `Soit f(x) = ${poly([a, b, cc])}. Donne l’équation de la tangente à la courbe de f au point d’abscisse ${x0}.`,
        solution: `f(${x0}) = ${y0} et f′(x) = ${poly([2 * a, b])}, donc f′(${x0}) = ${m}.\nT : y = f′(${x0})(x ${sg(-x0)}) + f(${x0}), soit y = ${poly([m, p])}.` } } },
    { niveau: 'difficile', chapitre: 'Dérivation et étude de fonctions', titre: 'Étude d’une fonction rationnelle',
      enonce: 'Soit f(x) = (x² + 3)/(x − 1) sur ℝ \\ {1}.\n1) Montre que f(x) = x + 1 + 4/(x − 1).\n2) Étudie les variations de f.\n3) Donne les asymptotes de la courbe.',
      solution: '1) (x + 1)(x − 1) + 4 = x² − 1 + 4 = x² + 3, donc f(x) = x + 1 + 4/(x − 1).\n2) f′(x) = 1 − 4/(x − 1)² = (x − 3)(x + 1)/(x − 1)².\nf croît sur ]−∞ ; −1], décroît sur [−1 ; 1[ et sur ]1 ; 3], croît sur [3 ; +∞[.\nMaximum local f(−1) = −2, minimum local f(3) = 6.\n3) Asymptote verticale x = 1 ; asymptote oblique y = x + 1 (car 4/(x − 1) → 0 en ±∞).' },

    // Fonctions usuelles
    { niveau: 'facile', chapitre: 'Fonctions usuelles (ln, exp, puissances)', titre: 'Équations avec ln et exp', generer() {
      const k = choix([1, 2, 3, -1, -2]), a = choix([2, 3, 5, 10]), m = nz(-4, 4)
      return { enonce: `Résous dans ℝ :\n1) ln x = ${k}\n2) eˣ = ${a}\n3) e^(2x) = e^(x ${sg(m)})`,
        solution: `1) x > 0 et x = e^${k} ≈ ${f(Math.exp(k), 3)}.\n2) x = ln ${a} ≈ ${f(Math.log(a), 3)}.\n3) La fonction exp est bijective : 2x = x ${sg(m)}, donc x = ${m}.` } } },
    { niveau: 'moyen', chapitre: 'Fonctions usuelles (ln, exp, puissances)', titre: 'Équation du second degré en eˣ', generer() {
      const a = ent(1, 6); let b; do b = ent(1, 6); while (b === a)
      const ln = (x) => (x === 1 ? '0' : `ln ${x}`)
      return { enonce: `Résous dans ℝ : e^(2x) − ${a + b}eˣ + ${a * b} = 0.`,
        solution: `On pose X = eˣ (X > 0) : X² − ${a + b}X + ${a * b} = 0.\nΔ = ${(a + b) ** 2} − ${4 * a * b} = ${(a - b) ** 2} → X = ${Math.min(a, b)} ou X = ${Math.max(a, b)} (tous deux > 0).\nDonc x = ${ln(Math.min(a, b))} ou x = ${ln(Math.max(a, b))}.` } } },
    { niveau: 'moyen', chapitre: 'Fonctions usuelles (ln, exp, puissances)', titre: 'Dérivées avec ln et exp',
      enonce: 'Calcule la dérivée de :\nf(x) = ln(x² + 1)\ng(x) = e^(3x − 1)\nh(x) = x e^(−x)',
      solution: '(ln u)′ = u′/u : f′(x) = 2x/(x² + 1).\n(eᵘ)′ = u′eᵘ : g′(x) = 3e^(3x − 1).\n(uv)′ = u′v + uv′ : h′(x) = e^(−x) − x e^(−x) = (1 − x)e^(−x).' },
    { niveau: 'difficile', chapitre: 'Fonctions usuelles (ln, exp, puissances)', titre: 'Étude de f(x) = x − ln x',
      enonce: 'Étudie f(x) = x − ln x sur ]0 ; +∞[ (limites, variations) et déduis-en que ln x < x pour tout x > 0.',
      solution: 'En 0⁺ : −ln x → +∞ donc f(x) → +∞. En +∞ : f(x) = x(1 − ln x / x) → +∞.\nf′(x) = 1 − 1/x = (x − 1)/x : f décroît sur ]0 ; 1], croît sur [1 ; +∞[.\nMinimum f(1) = 1 > 0, donc f(x) > 0, c’est-à-dire ln x < x.' },

    // Suites numériques
    { niveau: 'facile', chapitre: 'Suites numériques', titre: 'Sens de variation d’une suite',
      enonce: 'Étudie le sens de variation de uₙ = 3n − 5 et de vₙ = 2/(n + 1), puis donne la limite de (vₙ).',
      solution: 'uₙ₊₁ − uₙ = 3 > 0 : (uₙ) est croissante.\nvₙ₊₁ − vₙ = 2/(n + 2) − 2/(n + 1) = −2/((n + 1)(n + 2)) < 0 : (vₙ) est décroissante.\nQuand n → +∞, n + 1 → +∞ donc vₙ → 0.' },
    { niveau: 'difficile', chapitre: 'Suites numériques', titre: 'Suite récurrente et suite auxiliaire', generer() {
      const [aTxt, a, b, l] = choix([['1/2', 0.5, 1, 2], ['1/2', 0.5, 3, 6], ['1/3', 1 / 3, 2, 3], ['1/3', 1 / 3, 4, 6], ['3/4', 0.75, 1, 4], ['2/3', 2 / 3, 1, 3]])
      let u0; do u0 = ent(-5, 10); while (u0 === l)
      return { enonce: `u₀ = ${u0} et uₙ₊₁ = ${aTxt} uₙ + ${b}. On pose vₙ = uₙ − ${l}.\n1) Montre que (vₙ) est géométrique.\n2) Exprime uₙ en fonction de n et donne sa limite.`,
        solution: `1) vₙ₊₁ = uₙ₊₁ − ${l} = ${aTxt} uₙ + ${b} − ${l} = ${aTxt}(uₙ − ${l}) = ${aTxt} vₙ.\n(vₙ) est géométrique de raison ${aTxt} et de premier terme v₀ = ${u0 - l}.\n2) vₙ = ${u0 - l} × (${aTxt})ⁿ, donc uₙ = ${l} ${sg(u0 - l)} × (${aTxt})ⁿ.\nComme 0 < ${aTxt} < 1, (${aTxt})ⁿ → 0 : lim uₙ = ${l}.` } } },

    // Calcul intégral
    { niveau: 'facile', chapitre: 'Calcul intégral', titre: 'Intégrale d’un polynôme', generer() {
      const p = choix([3, 6, -3]), q = choix([2, 4, -2, -4, 6]), r = ent(-3, 5), B = ent(1, 3)
      const F = [p / 3, q / 2, r, 0], I = (p / 3) * B ** 3 + (q / 2) * B ** 2 + r * B
      return { enonce: `Calcule I = ∫₀^${B} (${poly([p, q, r])}) dx.`,
        solution: `Une primitive est F(x) = ${poly(F)}.\nI = F(${B}) − F(0) = ${I}.` } } },
    { niveau: 'moyen', chapitre: 'Calcul intégral', titre: 'Aire entre deux courbes',
      enonce: 'Calcule l’aire du domaine compris entre les courbes de f(x) = x et g(x) = x², pour x entre 0 et 1. Unité graphique : 2 cm.',
      solution: 'Sur [0 ; 1], x ≥ x². A = ∫₀¹ (x − x²) dx = [x²/2 − x³/3]₀¹ = 1/2 − 1/3 = 1/6 unité d’aire.\n1 u.a. = 2 cm × 2 cm = 4 cm², donc A = 4/6 ≈ 0,67 cm².' },

    // Équations différentielles
    { niveau: 'facile', chapitre: 'Équations différentielles', titre: 'Équation y′ = ay', generer() {
      const a = choix([-3, -2, -1, 1, 2, 3]), y0 = choix([1, 2, 3, 5])
      return { enonce: `Résous y′ = ${poly([a, 0], 'y')}, puis trouve la solution telle que y(0) = ${y0}.`,
        solution: `Les solutions sont y(x) = C e^(${poly([a, 0])}), C réel.\ny(0) = C = ${y0}, donc y(x) = ${y0}e^(${poly([a, 0])}).` } } },
    { niveau: 'moyen', chapitre: 'Équations différentielles', titre: 'Équation y″ + ω²y = 0', generer() {
      const w = ent(1, 5), A = choix([0, 1, 2, -1]); let k; do k = choix([0, 1, 2, -1]); while (A === 0 && k === 0)
      const arg = w === 1 ? 'x' : `${w}x`
      const sol = [A && `${A === 1 ? '' : A === -1 ? '−' : A}cos(${arg})`, k && `${k === 1 ? '' : k === -1 ? '−' : k}sin(${arg})`].filter(Boolean).join(' + ').replace('+ −', '− ')
      return { enonce: `Résous y″ + ${w * w}y = 0 avec y(0) = ${A} et y′(0) = ${k * w}.`,
        solution: `ω² = ${w * w} donc ω = ${w} : y(x) = A cos(${arg}) + B sin(${arg}).\ny(0) = A = ${A} ; y′(x) = −${w}A sin(${arg}) + ${w}B cos(${arg}) donc y′(0) = ${w}B = ${k * w}, B = ${k}.\ny(x) = ${sol}.` } } },
    { niveau: 'difficile', chapitre: 'Équations différentielles', titre: 'Équation y′ = ay + b', generer() {
      const a = choix([-2, -1, 1, 2, 3]), m = nz(-3, 3), b = a * m, y0 = ent(0, 5), C = y0 + m
      return { enonce: `Résous y′ = ${poly([a, b], 'y')}, puis trouve la solution qui vérifie y(0) = ${y0}.`,
        solution: `Solution constante : y = −b/a = ${-m}.\nSolutions générales : y(x) = C e^(${poly([a, 0])}) ${sg(-m)}.\ny(0) = C ${sg(-m)} = ${y0} donc C = ${C}.\n` + (C === 0 ? `y(x) = ${-m}.` : `y(x) = ${C === 1 ? '' : C === -1 ? '−' : C}e^(${poly([a, 0])}) ${sg(-m)}.`) } } },

    // Nombres complexes
    { niveau: 'facile', chapitre: 'Nombres complexes', titre: 'Calculs dans ℂ', generer() {
      const a = ent(-4, 4), b = nz(-4, 4), cc = ent(-3, 3), d = nz(-3, 3)
      const n2 = cc * cc + d * d, re = a * cc + b * d, im = b * cc - a * d
      const quot = im === 0 ? fr(re, n2) : `${re === 0 ? '' : fr(re, n2) + (im < 0 ? ' − ' : ' + ')}${re === 0 && im < 0 ? '−' : ''}${fr(Math.abs(im), n2)} i`
      return { enonce: `z₁ = ${cplx(a, b)} et z₂ = ${cplx(cc, d)}. Calcule z₁ + z₂, z₁ × z₂, le conjugué de z₁ et z₁ / z₂.`,
        solution: `z₁ + z₂ = ${cplx(a + cc, b + d)}\nz₁ × z₂ = ${cplx(a * cc - b * d, a * d + b * cc)} (car i² = −1)\nz̄₁ = ${cplx(a, -b)}\nz₁/z₂ = z₁ × z̄₂ / |z₂|² = (${cplx(re, im)}) / ${n2} = ${quot}` } } },
    { niveau: 'difficile', chapitre: 'Nombres complexes', titre: 'Équation du second degré dans ℂ', generer() {
      const p = ent(-3, 3), q = ent(1, 4)
      return { enonce: `Résous dans ℂ : ${poly([1, -2 * p, p * p + q * q], 'z')} = 0.`,
        solution: `Δ = ${4 * p * p} − ${4 * (p * p + q * q)} = ${-4 * q * q} = (${2 * q}i)² < 0.\nz₁ = ${cplx(p, q)} et z₂ = ${cplx(p, -q)} (solutions conjuguées).` } } },

    // Statistiques
    { niveau: 'facile', chapitre: 'Statistiques', titre: 'Moyenne, variance, écart-type', generer() {
      const x = Array.from({ length: 5 }, () => ent(6, 18)), n = 5
      const m = x.reduce((s, v) => s + v, 0) / n, V = x.reduce((s, v) => s + v * v, 0) / n - m * m
      return { enonce: `Notes de Moussa sur 20 : ${x.join(' ; ')}. Calcule la moyenne, la variance et l’écart-type.`,
        solution: `Moyenne : (${x.join(' + ')}) / 5 = ${f(m)}.\nVariance : V = (somme des carrés)/5 − moyenne² = ${f(x.reduce((s, v) => s + v * v, 0) / n)} − ${f(m * m)} = ${f(V)}.\nÉcart-type : σ = √V ≈ ${f(Math.sqrt(V))}.` } } },
    { niveau: 'moyen', chapitre: 'Statistiques', titre: 'Interpréter un coefficient de corrélation',
      enonce: 'On étudie deux séries statistiques. Interprète : r₁ = 0,96 ; r₂ = −0,92 ; r₃ = 0,25.',
      solution: 'r₁ = 0,96 : forte corrélation linéaire positive (quand x augmente, y augmente) ; un ajustement affine est justifié.\nr₂ = −0,92 : forte corrélation négative (quand x augmente, y diminue).\nr₃ = 0,25 : corrélation faible ; un ajustement affine n’est pas pertinent.\nRègle utile : on ajuste par une droite quand |r| ≥ 0,87 environ.' },
    { niveau: 'difficile', chapitre: 'Statistiques', titre: 'Droite de régression', generer() {
      const a0 = choix([2, 3, 4, 5]), b0 = ent(5, 20)
      const x = [1, 2, 3, 4, 5], y = x.map((v) => a0 * v + b0 + ent(-2, 2))
      const my = y.reduce((s, v) => s + v, 0) / 5, cov = x.reduce((s, v, i) => s + v * y[i], 0) / 5 - 3 * my
      const a = cov / 2, b = my - 3 * a, vy = y.reduce((s, v) => s + v * v, 0) / 5 - my * my
      return { enonce: `Nombre de candidats (en centaines) d’un centre d’examen de Thiès :\nrang xᵢ : 1 ; 2 ; 3 ; 4 ; 5\ncandidats yᵢ : ${y.join(' ; ')}\nDonne la droite de régression de y en x, le coefficient de corrélation et une estimation pour x = 7.`,
        solution: `x̄ = 3 ; ȳ = ${f(my)} ; V(x) = 2.\ncov(x, y) = (Σ xᵢyᵢ)/5 − x̄ȳ = ${f(cov)}.\na = cov/V(x) = ${f(a)} ; b = ȳ − a x̄ = ${f(b)} → y = ${f(a)}x + ${f(b)}.\nr = cov/(σx σy) ≈ ${f(cov / (Math.sqrt(2) * Math.sqrt(vy)), 3)} : ajustement ${Math.abs(cov / (Math.sqrt(2) * Math.sqrt(vy))) >= 0.87 ? 'justifié' : 'peu fiable'}.\nPour x = 7 : y ≈ ${f(7 * a + b)} centaines de candidats.` } } },

    // Probabilités et dénombrement
    { niveau: 'facile', chapitre: 'Probabilités et dénombrement', titre: 'Former un comité', generer() {
      const g = ent(6, 14), b = ent(6, 14), n = g + b
      return { enonce: `Une classe compte ${g} filles et ${b} garçons. On forme un comité de 3 élèves. Combien de comités possibles ? Avec exactement une fille ? Avec au moins une fille ?`,
        solution: `Total : C(${n}, 3) = ${comb(n, 3)}.\nExactement une fille : C(${g}, 1) × C(${b}, 2) = ${g} × ${comb(b, 2)} = ${g * comb(b, 2)}.\nAu moins une fille : total − comités sans fille = ${comb(n, 3)} − C(${b}, 3) = ${comb(n, 3) - comb(b, 3)}.` } } },
    { niveau: 'moyen', chapitre: 'Probabilités et dénombrement', titre: 'Probabilités conditionnelles', generer() {
      const pS = choix([0.3, 0.35, 0.4]), a = choix([0.6, 0.7, 0.8]), b = choix([0.4, 0.5, 0.55])
      const pA = pS * a + (1 - pS) * b
      return { enonce: `Dans un lycée, ${pS * 100} % des candidats sont en série S. ${a * 100} % des candidats de S sont admis, contre ${b * 100} % des autres. On choisit un candidat au hasard.\n1) Probabilité qu’il soit admis ?\n2) Il est admis : probabilité qu’il soit en S ?`,
        solution: `Arbre : S (${f(pS)}) puis A (${f(a)}) ; non S (${f(1 - pS)}) puis A (${f(b)}).\n1) P(A) = ${f(pS)} × ${f(a)} + ${f(1 - pS)} × ${f(b)} = ${f(pA, 3)}.\n2) P(S | A) = P(S ∩ A)/P(A) = ${f(pS * a, 3)} / ${f(pA, 3)} ≈ ${f((pS * a) / pA, 3)}.` } } },

    // Chapitres propres aux séries S1 et S3
    { niveau: 'moyen', chapitre: 'Arithmétique', titre: 'PGCD par l’algorithme d’Euclide', generer() {
      const g = choix([6, 7, 8, 9, 12, 14, 15, 18]); let m, n
      do { m = ent(5, 25); n = ent(3, m - 1) } while (pgcd(m, n) !== 1)
      let A = g * m, B = g * n; const lignes = []
      while (B) { lignes.push(`${A} = ${B} × ${Math.floor(A / B)} + ${A % B}`); [A, B] = [B, A % B] }
      return { enonce: `Calcule PGCD(${g * m} ; ${g * n}) avec l’algorithme d’Euclide.`,
        solution: `${lignes.join('\n')}\nLe dernier reste non nul est ${g} : PGCD = ${g}.` } } },
    { niveau: 'difficile', chapitre: 'Arithmétique', titre: 'Dernier chiffre d’une puissance', generer() {
      const b = choix([2, 3, 7, 8, 9]), N = ent(2000, 2030)
      const cycle = []; let p = b % 10
      while (!cycle.includes(p)) { cycle.push(p); p = (p * b) % 10 }
      const T = cycle.length, r = N % T === 0 ? T : N % T
      return { enonce: `Quel est le dernier chiffre de ${b}^${N} ? (Raisonne avec les congruences modulo 10.)`,
        solution: `Les derniers chiffres de ${b}ᵏ pour k = 1, 2, … sont : ${cycle.join(', ')}, puis ils se répètent (période ${T}).\n${N} = ${T} × ${Math.floor((N - r) / T)} + ${r}, donc ${b}^${N} ≡ ${b}^${r} ≡ ${cycle[r - 1]} (mod 10).\nLe dernier chiffre est ${cycle[r - 1]}.` } } },
    { niveau: 'moyen', chapitre: 'Barycentres et géométrie plane', titre: 'Barycentre de deux points', generer() {
      const xA = ent(-4, 4), yA = ent(-4, 4), xB = ent(-4, 4), yB = ent(-4, 4); let al, be
      do { al = nz(-3, 4); be = nz(-3, 4) } while (al + be === 0)
      const s = al + be
      return { enonce: `A(${xA} ; ${yA}) et B(${xB} ; ${yB}). Calcule les coordonnées de G, barycentre de (A ; ${al}) et (B ; ${be}).`,
        solution: `La somme des coefficients vaut ${s} ≠ 0, donc G existe.\nx_G = (${al} × ${xA} + ${be} × ${xB}) / ${s} = ${fr(al * xA + be * xB, s)}\ny_G = (${al} × ${yA} + ${be} × ${yB}) / ${s} = ${fr(al * yA + be * yB, s)}` } } },
    { niveau: 'moyen', chapitre: 'Produit vectoriel et géométrie dans l’espace', titre: 'Produit vectoriel et aire d’un triangle', generer() {
      let A, B, C, u, v, w
      do {
        A = [ent(0, 2), ent(0, 2), ent(0, 2)]; B = [ent(-2, 3), ent(-2, 3), ent(-2, 3)]; C = [ent(-2, 3), ent(-2, 3), ent(-2, 3)]
        u = B.map((x, i) => x - A[i]); v = C.map((x, i) => x - A[i])
        w = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
      } while (w.every((x) => x === 0))
      const n2 = w.reduce((s, x) => s + x * x, 0)
      return { enonce: `A(${A.join(' ; ')}), B(${B.join(' ; ')}), C(${C.join(' ; ')}). Calcule AB ∧ AC puis l’aire du triangle ABC.`,
        solution: `AB(${u.join(' ; ')}) et AC(${v.join(' ; ')}).\nAB ∧ AC = (${w.join(' ; ')}).\nAire = ½ ‖AB ∧ AC‖ = ½ √${n2} ≈ ${f(Math.sqrt(n2) / 2)} unité d’aire.` } } },
    { niveau: 'difficile', chapitre: 'Transformations du plan', titre: 'Similitude directe',
      enonce: 'Soit s la transformation d’écriture complexe z′ = (1 + i)z + 2. Donne sa nature, son rapport, son angle et son centre.',
      solution: 'C’est une similitude directe car z′ = az + b avec a = 1 + i.\nRapport k = |1 + i| = √2 ; angle θ = arg(1 + i) = π/4.\nCentre ω : ω = (1 + i)ω + 2 ⇔ −iω = 2 ⇔ ω = 2i. Le centre est Ω(0 ; 2).' },
    { niveau: 'moyen', chapitre: 'Coniques', titre: 'Éléments d’une ellipse', generer() {
      const [a, b, cc] = choix([[5, 4, 3], [5, 3, 4], [13, 12, 5], [13, 5, 12], [10, 8, 6], [10, 6, 8]])
      return { enonce: `Donne les sommets, les foyers, l’excentricité et les directrices de l’ellipse x²/${a * a} + y²/${b * b} = 1.`,
        solution: `a = ${a}, b = ${b} (a > b : grand axe sur (Ox)).\nSommets : (±${a} ; 0) et (0 ; ±${b}).\nc = √(a² − b²) = ${cc} : foyers F(${cc} ; 0) et F′(−${cc} ; 0).\nExcentricité e = c/a = ${fr(cc, a)}.\nDirectrices : x = ±a²/c = ±${fr(a * a, cc)}.` } } },
  ],

  pc: [
    { niveau: 'moyen', chapitre: 'Cinématique du point', titre: 'Distance de freinage', generer() {
      const v = choix([36, 54, 72, 90, 108]), a = choix([4, 5, 6, 8]), vm = v / 3.6
      return { enonce: `Une voiture roule à ${v} km/h sur la VDN. Le conducteur freine (décélération ${a} m/s²) après 1 s de temps de réaction. Durée du freinage, distance de freinage, distance d’arrêt totale ?`,
        solution: `v₀ = ${f(vm)} m/s. Mouvement rectiligne uniformément décéléré.\nDurée : t = v₀/a = ${f(vm / a)} s.\nFreinage : d = v₀²/(2a) = ${f((vm * vm) / (2 * a), 1)} m.\nRéaction : ${f(vm, 1)} m. Distance d’arrêt ≈ ${f(vm + (vm * vm) / (2 * a), 1)} m.` } } },
    { niveau: 'facile', chapitre: 'Bases de la dynamique', titre: 'Glissement sur un plan incliné', generer() {
      const al = choix([10, 15, 20, 30]), L = choix([2, 3, 5]), a = 10 * Math.sin((al * Math.PI) / 180)
      return { enonce: `Un colis part du repos et glisse sans frottement sur une rampe inclinée de ${al}° longue de ${L} m (g = 10 m/s²). Accélération, durée et vitesse en bas ?`,
        solution: `Théorème du centre d’inertie : P + R = m a. En projetant sur l’axe de la pente : m g sin α = m a.\na = g sin α = ${f(a)} m/s².\nt = √(2L/a) = ${f(Math.sqrt((2 * L) / a))} s ; v = √(2aL) = ${f(Math.sqrt(2 * a * L))} m/s.` } } },
    { niveau: 'difficile', chapitre: 'Applications de la dynamique', titre: 'Tir horizontal', generer() {
      const v0 = choix([2, 3, 4, 5]), [hh, t] = choix([[1.25, 0.5], [1.8, 0.6], [3.2, 0.8], [5, 1]])
      return { enonce: `Une bille quitte une table à ${f(hh)} m du sol avec une vitesse horizontale v₀ = ${v0} m/s (g = 10 m/s², frottements négligés). Équation de la trajectoire, durée de chute, point d’impact, vitesse au sol ?`,
        solution: `x = v₀t et y = ½gt² (axe Oy vers le bas) → y = (g / 2v₀²) x² = ${f(10 / (2 * v0 * v0), 3)} x².\nDurée : t = √(2h/g) = ${f(t)} s.\nImpact : x = v₀t = ${f(v0 * t)} m du pied de la table.\nVitesse : v = √(v₀² + (gt)²) = ${f(Math.sqrt(v0 * v0 + (10 * t) ** 2))} m/s.` } } },
    { niveau: 'moyen', chapitre: 'Gravitation universelle', titre: 'Satellite en orbite circulaire', generer() {
      const alt = choix([400, 800, 20200, 35800]), r = 6.4e6 + alt * 1e3, GM = 6.67e-11 * 6.0e24
      const v = Math.sqrt(GM / r), T = (2 * Math.PI * r) / v
      return { enonce: `Un satellite tourne autour de la Terre à ${alt} km d’altitude. G = 6,67 × 10⁻¹¹ SI, M_T = 6,0 × 10²⁴ kg, R_T = 6 400 km. Vitesse et période ?`,
        solution: `Le mouvement est circulaire uniforme : G M m / r² = m v² / r → v = √(GM/r).\nr = R + h = ${sci(r)} m → v ≈ ${f(v, 0)} m/s.\nT = 2πr/v ≈ ${f(T, 0)} s ≈ ${Math.floor(T / 3600)} h ${Math.round((T % 3600) / 60)} min.${alt === 35800 ? '\nT ≈ 24 h : c’est l’orbite géostationnaire.' : ''}` } } },
    { niveau: 'facile', chapitre: 'Champs magnétiques', titre: 'Champ d’un solénoïde', generer() {
      const N = choix([200, 400, 500, 1000]), L = choix([20, 25, 40, 50]), I = choix([0.5, 1, 2, 4])
      const B = 4 * Math.PI * 1e-7 * (N / (L / 100)) * I
      return { enonce: `Un solénoïde de ${N} spires et de longueur ${L} cm est parcouru par ${f(I)} A. Valeur du champ au centre (μ₀ = 4π × 10⁻⁷ SI) ?`,
        solution: `B = μ₀ (N/L) I = 4π × 10⁻⁷ × (${N}/${f(L / 100)}) × ${f(I)} ≈ ${sci(B)} T = ${f(B * 1000)} mT.` } } },
    { niveau: 'moyen', chapitre: 'Particule chargée dans un champ magnétique', titre: 'Proton dans un champ magnétique', generer() {
      const v = choix([1e5, 2e5, 5e5]), B = choix([0.1, 0.2, 0.5]), m = 1.67e-27
      const R = (m * v) / (e * B), T = (2 * Math.PI * m) / (e * B)
      return { enonce: `Un proton (m = 1,67 × 10⁻²⁷ kg, q = e = 1,6 × 10⁻¹⁹ C) entre avec v = ${sci(v, 0)} m/s perpendiculairement à un champ B = ${f(B)} T. Nature du mouvement, rayon, période ?`,
        solution: `La force de Lorentz est perpendiculaire à la vitesse : mouvement circulaire uniforme dans le plan ⊥ à B.\nR = m v / (|q| B) ≈ ${sci(R)} m = ${f(R * 100)} cm.\nT = 2πm / (|q| B) ≈ ${sci(T)} s (indépendant de v).` } } },
    { niveau: 'facile', chapitre: 'Loi de Laplace', titre: 'Force de Laplace', generer() {
      const I = choix([2, 4, 5, 10]), l = choix([5, 8, 10, 20]), B = choix([0.05, 0.1, 0.2, 0.5]), al = choix([90, 30, 60])
      const F = I * (l / 100) * B * Math.sin((al * Math.PI) / 180)
      return { enonce: `Une tige de ${l} cm, parcourue par ${I} A, est plongée dans un champ B = ${f(B)} T. L’angle entre la tige et B vaut ${al}°. Intensité de la force de Laplace ?`,
        solution: `F = I ℓ B sin α = ${I} × ${f(l / 100)} × ${f(B)} × sin ${al}° ≈ ${sci(F)} N.\nDirection : perpendiculaire au plan (tige, B) ; sens donné par la règle des trois doigts.` } } },
    { niveau: 'moyen', chapitre: 'Induction – dipôle RL', titre: 'Établissement du courant dans un dipôle RL', generer() {
      const L = choix([0.1, 0.2, 0.5, 1]), R = choix([10, 20, 50, 100]), E = choix([6, 9, 12])
      const I = E / R
      return { enonce: `Une bobine (L = ${f(L)} H) en série avec R = ${R} Ω (résistance totale) est branchée sous E = ${E} V. Constante de temps, intensité en régime permanent, énergie stockée ?`,
        solution: `τ = L/R = ${sci(L / R)} s.\nI = E/R = ${f(I, 3)} A (atteint au bout d’environ 5τ).\nW = ½ L I² = ${sci(0.5 * L * I * I)} J.` } } },
    { niveau: 'moyen', chapitre: 'Oscillations électriques', titre: 'Circuit LC : période propre', generer() {
      const L = choix([10, 50, 100]), C = choix([1, 4.7, 10, 47]), U0 = choix([5, 10])
      const T = 2 * Math.PI * Math.sqrt(L * 1e-3 * C * 1e-6)
      return { enonce: `Un condensateur C = ${f(C)} µF chargé sous U₀ = ${U0} V se décharge dans une bobine L = ${L} mH (résistance négligée). Période propre, fréquence, énergie totale ?`,
        solution: `T₀ = 2π√(LC) ≈ ${sci(T)} s ; f₀ = 1/T₀ ≈ ${f(1 / T, 0)} Hz.\nÉnergie (conservée) : E = ½ C U₀² = ${sci(0.5 * C * 1e-6 * U0 * U0)} J.\nIntensité maximale : Im = U₀ √(C/L) ≈ ${f(U0 * Math.sqrt((C * 1e-6) / (L * 1e-3)), 3)} A.` } } },
    { niveau: 'difficile', chapitre: 'Oscillations électriques', titre: 'Résonance d’un circuit RLC', generer() {
      const L = choix([0.1, 0.2, 0.5]), C = choix([1, 2, 5, 10]), R = choix([10, 20, 50]), U = 10
      const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C * 1e-6)), Q = Math.sqrt(L / (C * 1e-6)) / R
      return { enonce: `Un dipôle RLC série (R = ${R} Ω, L = ${f(L)} H, C = ${C} µF) est alimenté sous U = ${U} V efficace, à fréquence variable. Fréquence de résonance, intensité maximale, facteur de qualité ?`,
        solution: `À la résonance, Lω₀ = 1/(Cω₀) : f₀ = 1/(2π√(LC)) ≈ ${f(f0, 1)} Hz.\nL’impédance vaut alors R : I₀ = U/R = ${f(U / R, 2)} A.\nQ = (1/R)√(L/C) ≈ ${f(Q, 1)} ${Q > 1 ? '(résonance aiguë)' : '(résonance floue)'}.` } } },
    { niveau: 'facile', chapitre: 'Interférences lumineuses', titre: 'Interfrange des fentes de Young', generer() {
      const l = choix([450, 500, 550, 600, 650]), a = choix([0.5, 1, 2]), D = choix([1, 1.5, 2])
      const i = ((l * 1e-9 * D) / (a * 1e-3)) * 1000
      return { enonce: `Fentes de Young : λ = ${l} nm, distance entre les fentes a = ${f(a)} mm, écran à D = ${f(D)} m. Calcule l’interfrange et la position de la 3ᵉ frange brillante.`,
        solution: `i = λD/a = ${l} × 10⁻⁹ × ${f(D)} / (${f(a)} × 10⁻³) = ${f(i, 3)} mm.\n3ᵉ frange brillante : x = 3i = ${f(3 * i, 3)} mm du centre.` } } },
    { niveau: 'moyen', chapitre: 'Effet photoélectrique', titre: 'Effet photoélectrique', generer() {
      const [metal, W0] = choix([['césium', 1.9], ['potassium', 2.25], ['sodium', 2.3], ['zinc', 4.3]]), l = choix([250, 300, 400, 500, 600])
      const E = (h * c) / (l * 1e-9) / e, l0 = (h * c) / (W0 * e) * 1e9
      const Ec = E - W0
      return { enonce: `On éclaire du ${metal} (travail d’extraction W₀ = ${f(W0)} eV) avec une lumière de ${l} nm. Y a-t-il émission d’électrons ? Si oui, énergie cinétique maximale ?\n(h = 6,63 × 10⁻³⁴ J·s, c = 3 × 10⁸ m/s, 1 eV = 1,6 × 10⁻¹⁹ J)`,
        solution: `Énergie d’un photon : E = hc/λ ≈ ${f(E)} eV. Seuil : λ₀ = hc/W₀ ≈ ${f(l0, 0)} nm.\n` + (Ec > 0 ? `E > W₀ : il y a émission. Ec max = E − W₀ ≈ ${f(Ec)} eV ≈ ${sci(Ec * e)} J.` : `E < W₀ (λ > λ₀) : aucune émission, même avec une lumière intense.`) } } },
    { niveau: 'moyen', chapitre: 'Niveaux d’énergie de l’atome', titre: 'Spectre de l’atome d’hydrogène', generer() {
      const [p, n] = choix([[3, 2], [4, 2], [5, 2], [2, 1], [3, 1]])
      const dE = 13.6 * (1 / (n * n) - 1 / (p * p)), l = ((h * c) / (dE * e)) * 1e9
      return { enonce: `Les niveaux de l’hydrogène sont Eₙ = −13,6/n² (eV). L’atome passe du niveau ${p} au niveau ${n}. Énergie et longueur d’onde du photon émis ? Est-il visible ?`,
        solution: `E${p} = ${f(-13.6 / (p * p))} eV et E${n} = ${f(-13.6 / (n * n))} eV.\nΔE = E${p} − E${n} = ${f(dE)} eV.\nλ = hc/ΔE ≈ ${f(l, 0)} nm : ${l >= 400 && l <= 800 ? 'visible (série de Balmer).' : 'ultraviolet, invisible (série de Lyman).'}` } } },
    { niveau: 'moyen', chapitre: 'Réactions nucléaires', titre: 'Décroissance radioactive', generer() {
      const [nom, T, u] = choix([['iode 131', 8, 'jours'], ['phosphore 32', 14.3, 'jours'], ['cobalt 60', 5.27, 'ans'], ['carbone 14', 5730, 'ans']]), k = ent(1, 4)
      return { enonce: `La demi-vie du ${nom} vaut ${f(T)} ${u}. Quelle fraction des noyaux reste après ${f(k * T)} ${u} ? Calcule la constante radioactive λ.`,
        solution: `${f(k * T)} ${u} = ${k} demi-vie(s) : N = N₀ / 2^${k} = N₀/${2 ** k}, soit ${f(100 / 2 ** k, 2)} % des noyaux.\nλ = ln 2 / T ≈ ${sci(Math.log(2) / T, 3)} ${u}⁻¹.` } } },
    { niveau: 'difficile', chapitre: 'Réactions nucléaires', titre: 'Énergie libérée par une fusion',
      enonce: 'Réaction : ²₁H + ³₁H → ⁴₂He + ¹₀n. Masses : ²H = 2,01355 u ; ³H = 3,01550 u ; ⁴He = 4,00151 u ; n = 1,00866 u ; 1 u = 931,5 MeV/c². Calcule l’énergie libérée.',
      solution: 'Défaut de masse : Δm = (2,01355 + 3,01550) − (4,00151 + 1,00866) = 0,01888 u.\nE = Δm c² = 0,01888 × 931,5 ≈ 17,6 MeV par réaction.' },
    { niveau: 'facile', chapitre: 'Alcools', titre: 'Classe d’un alcool et oxydation ménagée',
      enonce: 'Donne la classe de chaque alcool et le produit de son oxydation ménagée : propan-1-ol, propan-2-ol, 2-méthylpropan-2-ol.',
      solution: 'Propan-1-ol : primaire → propanal (aldéhyde), puis acide propanoïque si l’oxydant est en excès.\nPropan-2-ol : secondaire → propanone (cétone).\n2-méthylpropan-2-ol : tertiaire → pas d’oxydation ménagée.' },
    { niveau: 'facile', chapitre: 'Amines', titre: 'Classe et caractère basique des amines',
      enonce: 'Donne la classe de CH₃–NH₂, (CH₃)₂NH et (CH₃)₃N. Pourquoi une amine est-elle une base ?',
      solution: 'Méthylamine : primaire ; diméthylamine : secondaire ; triméthylamine : tertiaire.\nL’azote possède un doublet libre qui capte un proton : R–NH₂ + H₂O ⇌ R–NH₃⁺ + HO⁻.' },
    { niveau: 'moyen', chapitre: 'Acides carboxyliques et dérivés', titre: 'Rendement d’une estérification', generer() {
      const n0 = choix([0.5, 1, 2]), r = choix([0.6, 0.65, 0.67]), ne = Math.round(n0 * r * 100) / 100
      return { enonce: `On mélange ${f(n0)} mol d’acide éthanoïque et ${f(n0)} mol d’éthanol. À l’équilibre, on obtient ${f(ne)} mol d’ester. Équation, nom de l’ester, rendement, composition finale ?`,
        solution: `CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O (éthanoate d’éthyle).\nRendement : ${f(ne)} / ${f(n0)} = ${f((ne / n0) * 100, 0)} % (limite ≈ 67 % pour un alcool primaire en mélange équimolaire).\nÀ l’équilibre : ${f(n0 - ne)} mol d’acide, ${f(n0 - ne)} mol d’alcool, ${f(ne)} mol d’ester, ${f(ne)} mol d’eau.\nPour améliorer : excès d’un réactif, élimination de l’eau, ou anhydride d’acide (réaction totale).` } } },
    { niveau: 'moyen', chapitre: 'Cinétique chimique', titre: 'Vitesse de réaction et temps de demi-réaction',
      enonce: 'On suit la formation du diiode :\nt (min) : 0 ; 5 ; 10 ; 20 ; 30 ; 40\n[I₂] (mmol/L) : 0 ; 4,0 ; 6,5 ; 8,8 ; 9,6 ; 10,0\n1) Vitesse moyenne de formation entre 0 et 10 min, puis entre 20 et 40 min.\n2) Pourquoi diminue-t-elle ?\n3) Estime le temps de demi-réaction.',
      solution: '1) Entre 0 et 10 min : 6,5/10 = 0,65 mmol·L⁻¹·min⁻¹. Entre 20 et 40 min : (10,0 − 8,8)/20 = 0,06 mmol·L⁻¹·min⁻¹.\n2) Les réactifs s’épuisent : leur concentration est un facteur cinétique.\n3) t½ : [I₂] = 10,0/2 = 5,0 mmol/L, atteint vers 7 min (lecture entre 5 et 10 min).' },
    { niveau: 'facile', chapitre: 'Autoprotolyse de l’eau – pH', titre: 'Du pH aux concentrations', generer() {
      const pH = choix([2.5, 3.2, 4, 8.4, 9, 10.6, 11.3])
      return { enonce: `Une solution a un pH de ${f(pH, 1)} à 25 °C. Calcule [H₃O⁺] et [HO⁻]. Est-elle acide ou basique ?`,
        solution: `[H₃O⁺] = 10^(−pH) ≈ ${sci(10 ** -pH)} mol/L.\nProduit ionique : Ke = [H₃O⁺][HO⁻] = 10⁻¹⁴ → [HO⁻] ≈ ${sci(10 ** (pH - 14))} mol/L.\npH ${pH < 7 ? '< 7 : solution acide' : '> 7 : solution basique'}.` } } },
    { niveau: 'moyen', chapitre: 'Acides et bases faibles', titre: 'pH d’une solution d’acide faible', generer() {
      const [nom, pKa] = choix([['acide éthanoïque', 4.8], ['acide méthanoïque', 3.8], ['acide benzoïque', 4.2]]), cc = choix([0.1, 0.05, 0.01])
      const Ka = 10 ** -pKa, x = (-Ka + Math.sqrt(Ka * Ka + 4 * Ka * cc)) / 2
      const approx = 0.5 * (pKa - Math.log10(cc))
      return { enonce: `Calcule le pH d’une solution d’${nom} (pKa = ${f(pKa, 1)}) à ${f(cc)} mol/L, et son coefficient de dissociation.`,
        solution: `Acide faible peu dissocié : pH ≈ ½(pKa − log c) = ½(${f(pKa, 1)} − log ${f(cc)}) ≈ ${f(approx)}.\nCalcul exact (Ka = x²/(c − x)) : [H₃O⁺] ≈ ${sci(x)} mol/L, pH ≈ ${f(-Math.log10(x))}.\nα = [H₃O⁺]/c ≈ ${f((x / cc) * 100, 1)} % ${x / cc < 0.05 ? '(approximation valable).' : '(supérieur à 5 % : l’approximation est moins bonne).'}` } } },
    { niveau: 'moyen', chapitre: 'Acides α-aminés', titre: 'Acides α-aminés et liaison peptidique',
      enonce: 'Glycine : H₂N–CH₂–COOH ; alanine : H₂N–CH(CH₃)–COOH.\n1) Laquelle est chirale ? Pourquoi ?\n2) Écris le dipeptide Gly-Ala et entoure la liaison peptidique.',
      solution: '1) L’alanine : son carbone α porte quatre groupes différents (H, CH₃, NH₂, COOH), c’est un carbone asymétrique. La glycine porte deux H, elle n’est pas chirale.\n2) Gly-Ala : H₂N–CH₂–CO–NH–CH(CH₃)–COOH. La liaison peptidique est –CO–NH–.' },

    // Programme de L2
    { niveau: 'facile', chapitre: 'Énergie électrique', titre: 'Consommation d’un appareil', generer() {
      const [app, P] = choix([['un ventilateur', 60], ['une télévision', 100], ['un réfrigérateur', 150], ['un fer à repasser', 1000], ['un climatiseur', 1500]]), t = choix([1, 2, 4, 6, 8])
      const E = (P * t * 30) / 1000
      return { enonce: `${app[0].toUpperCase() + app.slice(1)} de ${P} W fonctionne ${t} h par jour. Énergie consommée en 30 jours ? Coût si le kWh coûte 100 F CFA ?`,
        solution: `E = P × t = ${P} W × ${t * 30} h = ${f(E)} kWh.\nCoût : ${f(E)} × 100 = ${f(E * 100, 0)} F CFA.` } } },
    { niveau: 'moyen', chapitre: 'Énergie nucléaire', titre: 'Énergie d’un gramme d’uranium',
      enonce: 'La fission d’un noyau d’uranium 235 libère environ 200 MeV. Calcule l’énergie libérée par 1 g d’uranium 235 et compare-la à 1 tonne de pétrole (≈ 4,2 × 10¹⁰ J). N_A = 6,02 × 10²³ mol⁻¹ ; 1 MeV = 1,6 × 10⁻¹³ J.',
      solution: 'Nombre de noyaux : N = (1/235) × 6,02 × 10²³ ≈ 2,56 × 10²¹.\nE = 2,56 × 10²¹ × 200 × 1,6 × 10⁻¹³ ≈ 8,2 × 10¹⁰ J.\n1 g d’uranium libère autant d’énergie qu’environ 2 tonnes de pétrole.' },
    { niveau: 'facile', chapitre: 'Ondes mécaniques', titre: 'Longueur d’onde d’un son', generer() {
      const fq = choix([170, 340, 680, 1000, 2000])
      return { enonce: `Un tam-tam émet un son de ${fq} Hz. Le son se propage dans l’air à 340 m/s. Période et longueur d’onde ?`,
        solution: `T = 1/f = ${sci(1 / fq)} s.\nλ = v/f = 340/${fq} = ${f(340 / fq, 3)} m.` } } },
    { niveau: 'facile', chapitre: 'Aspect ondulatoire de la lumière', titre: 'Fréquence d’une radiation lumineuse', generer() {
      const [l, coul] = choix([[450, 'bleue'], [530, 'verte'], [590, 'jaune'], [650, 'rouge']])
      return { enonce: `Une radiation ${coul} a une longueur d’onde de ${l} nm dans le vide. Calcule sa fréquence (c = 3 × 10⁸ m/s).`,
        solution: `ν = c/λ = 3 × 10⁸ / (${l} × 10⁻⁹) ≈ ${sci(c / (l * 1e-9))} Hz.` } } },
    { niveau: 'moyen', chapitre: 'Aspect corpusculaire de la lumière', titre: 'Énergie d’un photon', generer() {
      const l = choix([400, 500, 600, 700])
      const E = (h * c) / (l * 1e-9)
      return { enonce: `Calcule l’énergie d’un photon de longueur d’onde ${l} nm, en joules puis en électronvolts.`,
        solution: `E = hc/λ = 6,63 × 10⁻³⁴ × 3 × 10⁸ / (${l} × 10⁻⁹) ≈ ${sci(E)} J ≈ ${f(E / e)} eV.` } } },
    { niveau: 'facile', chapitre: 'Matières plastiques', titre: 'Degré de polymérisation',
      enonce: 'Le polyéthylène est obtenu à partir de l’éthylène CH₂=CH₂. Écris l’équation de polymérisation et calcule le degré de polymérisation d’un polyéthylène de masse molaire 56 000 g/mol (C = 12 ; H = 1).',
      solution: 'n CH₂=CH₂ → –(CH₂–CH₂)ₙ–\nMasse molaire du motif : 2 × 12 + 4 × 1 = 28 g/mol.\nn = 56 000 / 28 = 2 000.' },
    { niveau: 'moyen', chapitre: 'Savons', titre: 'La saponification',
      enonce: 'Qu’est-ce que la saponification ? Pourquoi un savon lave-t-il ? Pourquoi mousse-t-il mal en eau dure ?',
      solution: 'Corps gras (triester) + 3 Na⁺ + 3 HO⁻ → glycérol + 3 (R–COO⁻ + Na⁺) : réaction lente et totale.\nL’ion carboxylate a une tête hydrophile (–COO⁻) et une longue queue hydrophobe : il entoure les salissures grasses et les disperse dans l’eau.\nEn eau dure, les ions Ca²⁺ et Mg²⁺ précipitent avec le savon : il mousse moins et lave moins bien.' },
  ],

  svt: [
    { niveau: 'facile', chapitre: 'Système nerveux', titre: 'L’arc réflexe',
      enonce: 'Décris le trajet du message nerveux lors du réflexe rotulien (on frappe le tendon sous le genou).',
      solution: 'Récepteur : les fuseaux neuromusculaires du muscle étiré.\nVoie sensitive : neurone sensitif (corps cellulaire dans le ganglion rachidien).\nCentre : moelle épinière (synapse avec le motoneurone).\nVoie motrice : motoneurone, puis effecteur : le muscle se contracte.\nEn même temps, un interneurone inhibe le muscle antagoniste.' },
    { niveau: 'moyen', chapitre: 'Tissu nerveux', titre: 'Vitesse du message nerveux', generer() {
      const d = choix([2, 3, 4, 5]), dt = choix([0.5, 1, 2])
      const v = d / 100 / (dt / 1000)
      return { enonce: `Deux électrodes réceptrices sont placées sur un nerf à ${d} cm l’une de l’autre. Le potentiel d’action arrive à la seconde ${f(dt)} ms après la première. Vitesse de propagation ?`,
        solution: `v = d/Δt = ${f(d / 100)} m / ${sci(dt / 1000)} s = ${f(v, 0)} m/s.\n${v >= 10 ? 'Vitesse élevée : fibre myélinisée (conduction saltatoire).' : 'Vitesse faible : fibre peu ou pas myélinisée.'}` } } },
    { niveau: 'moyen', chapitre: 'Muscle strié squelettique', titre: 'L’énergie de la contraction',
      enonce: 'Explique d’où vient l’énergie de la contraction musculaire, et quelle voie domine lors d’un 100 m et lors d’un marathon.',
      solution: 'La contraction utilise l’ATP : les têtes de myosine tirent les filaments d’actine, et le sarcomère raccourcit.\nL’ATP est régénéré par : la phosphocréatine (immédiat, quelques secondes), la glycolyse anaérobie (rapide, produit du lactate), la respiration (lente, durable).\n100 m : phosphocréatine et glycolyse anaérobie. Marathon : respiration aérobie.' },
    { niveau: 'facile', chapitre: 'Activité cardiaque et pression artérielle', titre: 'Débit cardiaque', generer() {
      const ves = choix([60, 70, 80]), fc = choix([60, 70, 75]), vesE = choix([100, 120]), fcE = choix([150, 170, 180])
      return { enonce: `Au repos, le volume d’éjection systolique d’Aïda est ${ves} mL et sa fréquence cardiaque ${fc} bat/min. À l’effort : ${vesE} mL et ${fcE} bat/min. Calcule le débit cardiaque dans les deux cas.`,
        solution: `Débit = VES × FC.\nRepos : ${ves} × ${fc} = ${ves * fc} mL/min ≈ ${f((ves * fc) / 1000, 1)} L/min.\nEffort : ${vesE} × ${fcE} = ${vesE * fcE} mL/min ≈ ${f((vesE * fcE) / 1000, 1)} L/min (×${f((vesE * fcE) / (ves * fc), 1)}).` } } },
    { niveau: 'moyen', chapitre: 'Activité cardiaque et pression artérielle', titre: 'Régulation de la pression artérielle',
      enonce: 'Explique comment l’organisme corrige une hausse brutale de la pression artérielle.',
      solution: 'Les barorécepteurs (sinus carotidiens, crosse aortique) sont plus stimulés.\nLes nerfs sensitifs (de Hering, de Cyon) envoient plus de messages au bulbe rachidien.\nLe bulbe active le parasympathique (nerf X) et freine l’orthosympathique : le cœur ralentit et les vaisseaux se dilatent.\nLa pression redescend : c’est une boucle de rétrocontrôle.' },
    { niveau: 'facile', chapitre: 'Régulation de la glycémie', titre: 'Diabète de type 1 et de type 2',
      enonce: 'Compare le diabète de type 1 et celui de type 2 (cause, traitement).',
      solution: 'Type 1 : les cellules β du pancréas sont détruites (maladie auto-immune) ; il n’y a plus d’insuline. Traitement : injections d’insuline.\nType 2 : l’insuline est produite mais les cellules y répondent mal (insulino-résistance), souvent liée au surpoids et à la sédentarité. Traitement : alimentation, activité physique, médicaments.' },
    { niveau: 'moyen', chapitre: 'Immunologie', titre: 'Réponse immunitaire primaire et secondaire',
      enonce: 'Pourquoi la vaccination protège-t-elle ? Compare la réponse primaire et la réponse secondaire.',
      solution: 'Premier contact (réponse primaire) : lente, faible ; des lymphocytes B deviennent plasmocytes (anticorps), et il se forme des cellules mémoire.\nDeuxième contact (réponse secondaire) : grâce aux cellules mémoire, elle est rapide, forte et durable.\nLe vaccin provoque la réponse primaire sans la maladie : au vrai contact, la réponse secondaire protège.' },
    { niveau: 'moyen', chapitre: 'Reproduction chez les mammifères', titre: 'Le cycle ovarien', generer() {
      const L = choix([26, 28, 30, 32, 35])
      return { enonce: `Le cycle de Fatou dure ${L} jours. La phase lutéale dure environ 14 jours. Quel jour a lieu l’ovulation ? Quelles hormones interviennent ?`,
        solution: `Ovulation ≈ jour ${L} − 14 = jour ${L - 14}.\nPhase folliculaire : FSH, puis œstrogènes. Pic de LH : il déclenche l’ovulation.\nPhase lutéale : le corps jaune sécrète la progestérone. Sans fécondation, il régresse : les règles commencent.` } } },
    { niveau: 'facile', chapitre: 'Reproduction chez les spermaphytes', titre: 'La double fécondation',
      enonce: 'Explique la double fécondation chez les plantes à fleurs.',
      solution: 'Le tube pollinique apporte deux gamètes mâles dans le sac embryonnaire.\nLe premier féconde l’oosphère → zygote (2n) → embryon.\nLe second s’unit au noyau secondaire (deux noyaux polaires) → albumen (3n), tissu de réserve de la graine.' },
    { niveau: 'facile', chapitre: 'Génétique', titre: 'Vocabulaire de la génétique',
      enonce: 'Définis avec un exemple : gène, allèle, génotype, phénotype, homozygote, hétérozygote.',
      solution: 'Gène : portion d’ADN qui détermine un caractère (ex. couleur du grain de mil).\nAllèle : version d’un gène (A « jaune », a « blanc »).\nGénotype : les allèles portés (AA, Aa, aa). Phénotype : le caractère visible (grain jaune).\nHomozygote : deux allèles identiques (AA ou aa). Hétérozygote : deux allèles différents (Aa).' },
    { niveau: 'moyen', chapitre: 'Génétique', titre: 'Dihybridisme : gènes indépendants', generer() {
      const N = choix([320, 480, 640, 1600])
      return { enonce: `On croise deux pieds de haricot hétérozygotes pour deux gènes indépendants : graines lisses (L) dominant sur ridées (l), jaunes (J) dominant sur vertes (j). On obtient ${N} graines. Effectifs attendus ?`,
        solution: `Gènes indépendants → proportions 9/16, 3/16, 3/16, 1/16.\n[lisses, jaunes] : ${(N * 9) / 16} ; [lisses, vertes] : ${(N * 3) / 16} ; [ridées, jaunes] : ${(N * 3) / 16} ; [ridées, vertes] : ${N / 16}.` } } },
    { niveau: 'difficile', chapitre: 'Hérédité humaine', titre: 'Arbre généalogique : l’albinisme',
      enonce: 'Deux parents non albinos ont une fille albinos. L’allèle est-il dominant ou récessif ? Est-il porté par un autosome ou par le chromosome X ? Quel est le risque pour l’enfant suivant ?',
      solution: 'Des parents sains ont un enfant atteint : l’allèle est récessif (a) et chaque parent est hétérozygote Aa.\nSi l’allèle était sur X, une fille atteinte (XᵃXᵃ) aurait un père atteint ; or le père est sain : le gène est autosomique.\nAa × Aa : risque 1/4 que l’enfant suivant soit albinos. Un enfant sain a 2 chances sur 3 d’être porteur.' },
    { niveau: 'facile', chapitre: 'Biotechnologies', titre: 'Amplification par PCR', generer() {
      const n = choix([10, 20, 25, 30]), N0 = choix([1, 10, 100]), d = choix([2, 3, 4])
      return { enonce: `Une PCR part de ${N0} molécule(s) d’ADN. Combien de copies après ${n} cycles ? Durée si un cycle dure ${d} min ?`,
        solution: `Chaque cycle double le nombre de molécules : N = N₀ × 2ⁿ = ${N0} × 2^${n} ≈ ${sci(N0 * 2 ** n)}.\nDurée : ${n} × ${d} = ${n * d} min.` } } },
  ],

  philo: [
    { niveau: 'facile', chapitre: 'Méthode de la dissertation', titre: 'Réussir l’introduction',
      enonce: 'Quelles sont les étapes d’une introduction de dissertation ? Applique-les au sujet « Peut-on se connaître soi-même ? ».',
      solution: 'Amorce : partir d’un constat (« Connais-toi toi-même », disait Socrate).\nProblème : on semble se connaître de l’intérieur, mais on se trompe parfois sur ses propres désirs.\nProblématique : la conscience suffit-elle à se connaître, ou une partie de nous lui échappe-t-elle ?\nAnnonce du plan, en trois temps.' },
    { niveau: 'moyen', chapitre: 'L’État', titre: 'L’État et la liberté',
      enonce: 'Sujet : « L’État est-il l’ennemi de la liberté ? » Propose une problématique et un plan.',
      solution: 'Problématique : l’État limite nos actions par ses lois ; est-il pour autant ce qui menace la liberté, ou ce qui la rend possible ?\nI. L’État contraint : lois, impôts, police ; il peut devenir tyrannique.\nII. Sans État, la liberté est celle du plus fort : la loi protège le faible (Hobbes, Rousseau).\nIII. Un État de droit, contrôlé par les citoyens, garantit les libertés.' },
    { niveau: 'moyen', chapitre: 'La science', titre: 'La science peut-elle tout expliquer ?',
      enonce: 'Propose un plan en trois parties pour ce sujet.',
      solution: 'I. La science explique de plus en plus de phénomènes (maladies, climat, univers) par des lois vérifiables.\nII. Mais elle ne répond pas aux questions de sens et de valeur : le bien, le beau, le pourquoi de l’existence.\nIII. La science explique le « comment » ; la philosophie, la morale et la religion interrogent le « pourquoi ».' },
  ],

  francais: [
    { niveau: 'moyen', chapitre: 'Commentaire de texte', titre: 'Construire les axes de lecture',
      enonce: 'Explique comment trouver deux axes de lecture pour commenter un poème.',
      solution: 'Lis le texte plusieurs fois ; repère le thème, le ton (lyrique, satirique…) et les procédés (images, rythme, sonorités).\nRegroupe tes remarques en deux idées générales, par exemple : « Une célébration de l’Afrique » et « Un appel à la fraternité ».\nChaque axe se justifie par des citations analysées : procédé → effet → sens.' },
    { niveau: 'moyen', chapitre: 'Résumé et discussion', titre: 'Réussir la discussion',
      enonce: 'Comment organiser la discussion qui suit le résumé ?',
      solution: 'Reformule la question posée. Donne ton point de vue en deux ou trois parties.\nChaque partie : un argument, une explication, un exemple précis (vie au Sénégal, lectures, actualité).\nUtilise des connecteurs (d’abord, de plus, cependant, en définitive) et termine par une conclusion nuancée.' },
  ],

  hg: [
    { niveau: 'facile', chapitre: 'Géographie du Sénégal', titre: 'Les zones climatiques du Sénégal',
      enonce: 'Cite les grandes zones climatiques du Sénégal, du nord au sud, avec une activité agricole pour chacune.',
      solution: 'Zone sahélienne (nord) : pluies faibles ; élevage, mil, et riz irrigué dans la vallée du fleuve.\nZone soudanienne (centre) : arachide et mil (bassin arachidier).\nZone subguinéenne (sud, Casamance) : pluies abondantes ; riz, fruits (mangues, agrumes).' },
    { niveau: 'difficile', chapitre: 'Histoire du Sénégal et de l’Afrique', titre: 'La décolonisation de l’Afrique',
      enonce: 'Présente les facteurs de la décolonisation de l’Afrique noire.',
      solution: 'Facteurs internes : élites formées, partis politiques et syndicats qui revendiquent l’indépendance.\nFacteurs externes : affaiblissement de la France et du Royaume-Uni après 1945, pression de l’ONU, des États-Unis et de l’URSS, conférence de Bandung (1955).\nExemples : Ghana (1957), Guinée (1958), Sénégal (1960).' },
  ],

  anglais: [
    { niveau: 'moyen', chapitre: 'Reading comprehension', titre: 'Reading: a new train in Dakar',
      enonce: 'Read: “In December 2021, a regional express train started running between Dakar and Diamniadio. Many workers now travel faster, but some traders say tickets are too expensive.”\n1) True or false: the train links Dakar and Thiès.\n2) Find a word meaning “people who buy and sell”.\n3) Give one advantage and one problem.',
      solution: '1) False: it links Dakar and Diamniadio.\n2) “traders”.\n3) Advantage: workers travel faster. Problem: tickets are too expensive for some people.' },
  ],

  eco: [
    { niveau: 'moyen', chapitre: 'Commerce international', titre: 'Taux de couverture des échanges', generer() {
      const X = ent(20, 40) * 100, M = ent(35, 60) * 100
      return { enonce: `Un pays (données fictives) exporte pour ${X.toLocaleString('fr-FR')} milliards F CFA et importe pour ${M.toLocaleString('fr-FR')} milliards. Solde commercial et taux de couverture ?`,
        solution: `Solde = X − M = ${(X - M).toLocaleString('fr-FR')} milliards (${X >= M ? 'excédent' : 'déficit'}).\nTaux de couverture = X/M × 100 = ${f((X / M) * 100, 1)} % : les exportations paient ${f((X / M) * 100, 1)} % des importations.` } } },
  ],

  techno: [
    { niveau: 'moyen', chapitre: 'Électricité', titre: 'Transformateur monophasé', generer() {
      const N1 = choix([500, 1000, 2000]), U2 = choix([11.5, 23, 46, 115]), I2 = choix([1, 2, 5])
      const m = U2 / 230
      return { enonce: `Un transformateur parfait est alimenté sous 230 V. Son primaire a ${N1} spires et il délivre ${f(U2, 1)} V. Rapport de transformation, nombre de spires du secondaire, courant primaire si I₂ = ${I2} A ?`,
        solution: `m = U₂/U₁ = ${f(U2, 1)}/230 = ${f(m, 2)}.\nN₂ = m × N₁ = ${m * N1} spires.\nTransformateur parfait : I₁ = m × I₂ = ${f(m * I2, 2)} A.` } } },
  ],
}
