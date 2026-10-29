// Exercices à variantes : chaque clic sur « Nouvelle variante » tire de nouveaux nombres
// et recalcule la correction. Écrits pour ce site.

import { ent, choix, nz, f, sg } from './outils.js'

export const variantes = {
  maths: [
    { niveau: 'facile', titre: 'Dérivée d’un trinôme', generer() {
      const a = nz(-6, 6), b = nz(-9, 9), c = ent(-9, 9), x0 = ent(-3, 3)
      return { enonce: `Soit f(x) = ${a}x² ${sg(b)}x ${sg(c)}. Calcule f′(x) puis f′(${x0}).`,
        solution: `f′(x) = ${2 * a}x ${sg(b)}.\nf′(${x0}) = ${2 * a} × ${x0} ${sg(b)} = ${2 * a * x0 + b}.` } } },
    { niveau: 'facile', titre: 'Équation du second degré', generer() {
      const r1 = ent(-6, 6), r2 = ent(-6, 6), b = -(r1 + r2), c = r1 * r2
      return { enonce: `Résous dans ℝ : x² ${sg(b)}x ${sg(c)} = 0.`,
        solution: `Δ = ${b}² − 4 × ${c} = ${b * b - 4 * c}.\n` + (r1 === r2 ? `Δ = 0 : une solution double x = ${r1}.` : `Δ > 0 : x₁ = ${Math.min(r1, r2)} et x₂ = ${Math.max(r1, r2)}.`) } } },
    { niveau: 'facile', titre: 'Limite d’une fonction rationnelle', generer() {
      const a = nz(-5, 5), b = ent(-9, 9), c = nz(1, 5), d = ent(-9, 9)
      return { enonce: `Calcule la limite de g(x) = (${a}x ${sg(b)})/(${c}x ${sg(d)}) quand x → +∞.`,
        solution: `On garde les termes de plus haut degré : ${a}x / ${c}x = ${f(a / c)}.\nLa limite vaut ${f(a / c)} : asymptote horizontale y = ${f(a / c)}.` } } },
    { niveau: 'moyen', titre: 'Suite arithmétique', generer() {
      const u0 = ent(-10, 20), r = nz(-5, 7), n = ent(8, 30)
      const un = u0 + n * r, S = ((n + 1) * (u0 + un)) / 2
      return { enonce: `(uₙ) est arithmétique, u₀ = ${u0}, raison r = ${r}. Calcule u${n} et S = u₀ + … + u${n}.`,
        solution: `uₙ = u₀ + n r → u${n} = ${u0} ${sg(n * r)} = ${un}.\nS = (nombre de termes) × (premier + dernier)/2 = ${n + 1} × (${u0} + ${un})/2 = ${S}.` } } },
    { niveau: 'moyen', titre: 'Suite géométrique : épargne', generer() {
      const u1 = choix([2000, 5000, 10000]), p = choix([2, 5, 8, 10]), n = choix([6, 10, 12])
      const q = 1 + p / 100, un = u1 * q ** (n - 1), S = (u1 * (q ** n - 1)) / (q - 1)
      return { enonce: `Awa épargne ${u1.toLocaleString('fr-FR')} F le 1er mois, puis ${p} % de plus chaque mois. Combien le mois ${n} ? Total sur ${n} mois ?`,
        solution: `Suite géométrique, u₁ = ${u1}, q = ${q}.\nu${n} = ${u1} × ${q}^${n - 1} ≈ ${f(un, 0)} F.\nS = u₁ (qⁿ − 1)/(q − 1) ≈ ${f(S, 0)} F.` } } },
    { niveau: 'moyen', titre: 'Nombres complexes : module et argument', generer() {
      const [a, b, m, arg] = choix([[1, 1, '√2', 'π/4'], [1, -1, '√2', '−π/4'], [-1, 1, '√2', '3π/4'], [1, 1.732, '2', 'π/3'], [1.732, 1, '2', 'π/6'], [0, 2, '2', 'π/2'], [-2, 0, '2', 'π']])
      const z = `${a === 1.732 ? '√3' : a}${b < 0 ? ' − ' : ' + '}${Math.abs(b) === 1.732 ? '√3' : Math.abs(b)}i`
      return { enonce: `Donne le module et un argument de z = ${z}.`, solution: `|z| = √(a² + b²) = ${m}.\ncos θ = a/|z|, sin θ = b/|z| → θ = ${arg}.\nz = ${m}(cos ${arg} + i sin ${arg}).` } } },
    { niveau: 'difficile', titre: 'Intégrale par parties', generer() {
      const k = nz(1, 4), b = ent(1, 3)
      const I = ((b * Math.exp(k * b)) / k) - (Math.exp(k * b) - 1) / (k * k)
      return { enonce: `Calcule I = ∫₀^${b} x e^(${k}x) dx.`,
        solution: `u = x, v′ = e^(${k}x) → u′ = 1, v = e^(${k}x)/${k}.\nI = [x e^(${k}x)/${k}]₀^${b} − (1/${k})∫₀^${b} e^(${k}x) dx = ${b}e^${k * b}/${k} − (e^${k * b} − 1)/${k * k} ≈ ${f(I)}.` } } },
    { niveau: 'difficile', titre: 'Loi binomiale', generer() {
      const p = choix([0.1, 0.2, 0.25, 0.3, 0.4, 0.6]), n = ent(4, 8), k = ent(1, n - 1)
      const C = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - i + 1)) / i; return r }
      const pk = C(n, k) * p ** k * (1 - p) ** (n - k)
      const ctx = choix(['taxis acceptent Wave', 'graines de mil germent', 'élèves ont la moyenne', 'mangues sont mûres'])
      return { enonce: `${p * 100} % des ${ctx}. On en prend ${n} au hasard (indépendance). P(exactement ${k}) ? P(au moins 1) ?`,
        solution: `X ~ B(${n} ; ${p}).\nP(X = ${k}) = C(${n},${k}) × ${p}^${k} × ${f(1 - p)}^${n - k} = ${C(n, k)} × … ≈ ${f(pk, 3)}.\nP(X ≥ 1) = 1 − ${f(1 - p)}^${n} ≈ ${f(1 - (1 - p) ** n, 3)}.` } } },
  ],
  pc: [
    { niveau: 'facile', titre: 'Mouvement uniforme', generer() {
      const v = choix([54, 60, 72, 90, 108]), t = choix([10, 15, 20, 25, 40]), trajet = choix(['Dakar–Thiès', 'Kaolack–Fatick', 'Saint-Louis–Louga', 'Mbour–Joal'])
      return { enonce: `Un car ${trajet} roule à ${v} km/h constants. Distance parcourue en ${t} min ?`,
        solution: `${v} km/h = ${f(v / 3.6)} m/s ; ${t} min = ${t * 60} s.\nd = v t = ${f(v / 3.6)} × ${t * 60} = ${f((v / 3.6) * t * 60, 0)} m ≈ ${f((v * t) / 60, 1)} km.` } } },
    { niveau: 'facile', titre: 'pH d’un acide ou d’une base forte', generer() {
      const n = ent(1, 4), acide = Math.random() < 0.5
      return { enonce: `Quel est le pH d’une solution ${acide ? 'd’acide chlorhydrique' : 'de soude'} à 10⁻${n} mol/L (25 °C) ?`,
        solution: acide ? `Acide fort : [H₃O⁺] = 10⁻${n} → pH = ${n}.` : `Base forte : [OH⁻] = 10⁻${n} → pOH = ${n}, pH = 14 − ${n} = ${14 - n}.` } } },
    { niveau: 'moyen', titre: 'Chute libre', generer() {
      const h = choix([1.8, 3.2, 5, 7.2, 11.25, 20]), obj = choix(['mangue', 'noix de coco', 'balle', 'pierre'])
      const t = Math.sqrt((2 * h) / 10)
      return { enonce: `Une ${obj} tombe sans vitesse initiale d’une hauteur de ${f(h)} m (g = 10 m/s²). Durée de chute et vitesse à l’arrivée ?`,
        solution: `h = ½ g t² → t = √(2h/g) = ${f(t)} s.\nv = g t = ${f(10 * t)} m/s.` } } },
    { niveau: 'moyen', titre: 'Circuit RC', generer() {
      const R = choix([1, 2, 4.7, 10, 22]), C = choix([10, 47, 100, 220]), E = choix([5, 6, 9, 12])
      const tau = R * 1e3 * C * 1e-6
      return { enonce: `C = ${C} µF se charge à travers R = ${R} kΩ sous E = ${E} V. Calcule τ, puis u_C à t = τ et t = 5τ.`,
        solution: `τ = RC = ${f(tau, 3)} s.\nu(τ) = E(1 − e⁻¹) ≈ ${f(E * 0.632)} V.\nu(5τ) ≈ 0,99 E ≈ ${f(E * 0.993)} V : le condensateur est chargé.` } } },
    { niveau: 'difficile', titre: 'Dosage acide faible / base forte', generer() {
      const Va = choix([10, 20, 25]), cb = choix([0.05, 0.1, 0.2]), Vb = ent(8, 24), pKa = choix([3.8, 4.2, 4.8, 9.2])
      return { enonce: `On dose Va = ${Va} mL d’un acide faible (pKa = ${pKa}) par NaOH à ${f(cb)} mol/L. Équivalence pour ${Vb} mL. Concentration de l’acide ? pH à ${f(Vb / 2, 1)} mL versés ?`,
        solution: `À l’équivalence : ca Va = cb Vb → ca = ${f(cb)} × ${Vb}/${Va} = ${f((cb * Vb) / Va, 3)} mol/L.\nÀ ${f(Vb / 2, 1)} mL (demi-équivalence) : pH = pKa = ${pKa}.` } } },
    { niveau: 'difficile', titre: 'Oscillateur élastique', generer() {
      const k = choix([10, 20, 40, 50, 80]), m = choix([50, 100, 200, 250]), X = choix([2, 3, 4, 5])
      const T = 2 * Math.PI * Math.sqrt(m / 1000 / k)
      return { enonce: `Ressort k = ${k} N/m, masse m = ${m} g, amplitude ${X} cm. Période propre, énergie mécanique, vitesse maximale ?`,
        solution: `T₀ = 2π√(m/k) ≈ ${f(T, 3)} s.\nE = ½ k Xm² = ${f(0.5 * k * (X / 100) ** 2, 4)} J.\nVmax = Xm × 2π/T₀ ≈ ${f((X / 100) * (2 * Math.PI / T), 3)} m/s.` } } },
  ],
  svt: [
    { niveau: 'moyen', titre: 'Monohybridisme', generer() {
      const [esp, dom, rec] = choix([['mil', 'grain jaune', 'grain blanc'], ['niébé', 'graine noire', 'graine blanche'], ['souris', 'pelage gris', 'pelage blanc'], ['drosophile', 'ailes longues', 'ailes vestigiales']])
      const N = choix([400, 800, 1200])
      return { enonce: `Chez le ${esp}, « ${dom} » (A) domine « ${rec} » (a). On croise deux hétérozygotes Aa et on obtient ${N} descendants. Effectifs attendus ?`,
        solution: `Échiquier : ¼ AA, ½ Aa, ¼ aa.\nPhénotypes : ¾ « ${dom} » = ${(3 * N) / 4}, ¼ « ${rec} » = ${N / 4}.` } } },
    { niveau: 'difficile', titre: 'Gènes liés : distance', generer() {
      const r = choix([6, 10, 14, 18, 24, 30]), N = 1000
      return { enonce: `Test-cross de 1000 individus : ${(N * (100 - r)) / 200} [AB], ${(N * (100 - r)) / 200} [ab], ${(N * r) / 200} [Ab], ${(N * r) / 200} [aB]. Gènes indépendants ? Distance ?`,
        solution: `Indépendants → 4 × 25 %. Ici les parentaux dominent : gènes liés.\nRecombinés = ${r} % → distance ${r} cM.` } } },
  ],
  eco: [
    { niveau: 'moyen', titre: 'Taux de croissance', generer() {
      const a = ent(12, 20) * 1000, t = ent(2, 9)
      return { enonce: `Le PIB passe de ${a.toLocaleString('fr-FR')} à ${(a * (1 + t / 100)).toLocaleString('fr-FR')} milliards F CFA. Taux de croissance ?`, solution: `(V₁ − V₀)/V₀ × 100 = ${t} %.` } } },
    { niveau: 'difficile', titre: 'Pouvoir d’achat', generer() {
      const s0 = choix([100000, 150000, 200000]), hs = ent(2, 10), hp = ent(1, 9)
      const r = ((1 + hs / 100) / (1 + hp / 100) - 1) * 100
      return { enonce: `Un salaire passe de ${s0.toLocaleString('fr-FR')} F à ${(s0 * (1 + hs / 100)).toLocaleString('fr-FR')} F ; les prix montent de ${hp} %. Le pouvoir d’achat augmente-t-il ?`,
        solution: `Hausse réelle = (1,${String(hs).padStart(2, '0')} / 1,${String(hp).padStart(2, '0')} − 1) × 100 ≈ ${f(r)} %.\n${r > 0 ? 'Oui, il augmente.' : r < 0 ? 'Non, il baisse.' : 'Il reste stable.'}` } } },
  ],
  compta: [
    { niveau: 'moyen', titre: 'Amortissement linéaire', generer() {
      const v = choix([1200000, 2400000, 3600000, 5000000]), n = choix([4, 5, 8, 10]), k = ent(1, n - 1)
      return { enonce: `Une machine de ${v.toLocaleString('fr-FR')} F est amortie sur ${n} ans. Annuité et VNC après ${k} an(s) ?`,
        solution: `Annuité = ${v.toLocaleString('fr-FR')} / ${n} = ${(v / n).toLocaleString('fr-FR')} F.\nVNC = ${v.toLocaleString('fr-FR')} − ${k} × ${(v / n).toLocaleString('fr-FR')} = ${(v - (k * v) / n).toLocaleString('fr-FR')} F.` } } },
    { niveau: 'difficile', titre: 'Seuil de rentabilité', generer() {
      const cf = choix([1.5, 2, 3, 4.5]) * 1e6, t = choix([20, 25, 30, 40])
      return { enonce: `Charges fixes : ${cf.toLocaleString('fr-FR')} F. Taux de marge sur coût variable : ${t} %. Seuil de rentabilité ? Point mort si le CA (360 jours) vaut le double du seuil ?`,
        solution: `SR = CF / taux MCV = ${(cf / (t / 100)).toLocaleString('fr-FR')} F.\nPoint mort = SR/CA × 360 = 180 jours (fin juin).` } } },
  ],
  techno: [
    { niveau: 'facile', titre: 'Loi d’Ohm et puissance', generer() {
      const R = choix([47, 100, 220, 470, 1000]), I = choix([10, 20, 50, 100])
      return { enonce: `Une résistance R = ${R} Ω est traversée par ${I} mA. Tension et puissance dissipée ?`, solution: `U = R I = ${f(R * I / 1000)} V.\nP = R I² = ${f(R * (I / 1000) ** 2, 3)} W.` } } },
    { niveau: 'moyen', titre: 'Puissance en monophasé', generer() {
      const I = ent(2, 15), c = choix([0.7, 0.8, 0.85, 0.9])
      return { enonce: `Un moteur sous 230 V absorbe ${I} A avec cos φ = ${c}. Puissances active, apparente, réactive ?`,
        solution: `S = U I = ${230 * I} VA.\nP = S cos φ = ${f(230 * I * c, 0)} W.\nQ = S sin φ = ${f(230 * I * Math.sqrt(1 - c * c), 0)} var.` } } },
    { niveau: 'difficile', titre: 'Engrenages', generer() {
      const z1 = choix([12, 15, 18, 20, 24]), z2 = z1 * choix([2, 3, 4]), N1 = choix([1000, 1440, 1500, 2900])
      return { enonce: `Pignon Z₁ = ${z1} dents à ${N1} tr/min, roue Z₂ = ${z2} dents. Rapport et vitesse de sortie ? Couple de sortie si C₁ = 10 N·m (rendement 1) ?`,
        solution: `r = Z₁/Z₂ = ${f(z1 / z2, 3)}.\nN₂ = N₁ × r = ${f(N1 * z1 / z2, 0)} tr/min.\nC₂ = C₁ / r = ${f(10 * z2 / z1)} N·m.` } } },
  ],
}
