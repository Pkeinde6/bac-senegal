// Petits outils pour fabriquer les exercices à variantes.

export const ent = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
export const choix = (t) => t[ent(0, t.length - 1)]
export const nz = (a, b) => { let x; do x = ent(a, b); while (x === 0); return x }
// Nombre écrit à la française, arrondi à d décimales.
export const f = (x, d = 2) => Number(x.toFixed(d)).toLocaleString('fr-FR')
// Écriture scientifique : 1,23 × 10⁻⁵
const exposants = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
export const sci = (x, d = 2) => {
  if (x === 0) return '0'
  const e = Math.floor(Math.log10(Math.abs(x)))
  const m = x / 10 ** e
  return e === 0 ? f(m, d) : `${f(m, d)} × 10${String(e).replace(/./g, (c) => exposants[c])}`
}
// Terme signé pour écrire « ax + b » ; un terme nul disparaît.
export const sg = (x) => (x === 0 ? '' : x < 0 ? `− ${-x}` : `+ ${x}`)
export const comb = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - i + 1)) / i; return Math.round(r) }
export const pgcd = (a, b) => (b === 0 ? Math.abs(a) : pgcd(b, a % b))

const nb = (x) => String(Math.round(x * 1e6) / 1e6).replace('.', ',').replace('-', '−')

// Polynôme à partir de ses coefficients, du plus haut degré au plus bas : poly([3, -1, 2]) → « 3x² − x + 2 ».
export const poly = (coefs, v = 'x') => {
  const n = coefs.length - 1
  const puiss = (k) => (k === 0 ? '' : k === 1 ? v : k === 2 ? `${v}²` : k === 3 ? `${v}³` : `${v}^${k}`)
  let s = ''
  coefs.forEach((c, i) => {
    const k = n - i
    if (c === 0) return
    const corps = (Math.abs(c) === 1 && k > 0 ? '' : nb(Math.abs(c))) + puiss(k)
    s += s === '' ? (c < 0 ? '−' : '') + corps : (c < 0 ? ' − ' : ' + ') + corps
  })
  return s || '0'
}

// Nombre complexe sous forme algébrique : cplx(3, -2) → « 3 − 2i ».
export const cplx = (re, im) => {
  const ip = Math.abs(im) === 1 ? 'i' : `${nb(Math.abs(im))}i`
  if (im === 0) return nb(re)
  if (re === 0) return (im < 0 ? '−' : '') + ip
  return `${nb(re)} ${im < 0 ? '−' : '+'} ${ip}`
}

// Fraction simplifiée : fr(6, -4) → « −3/2 », fr(8, 4) → « 2 ».
export const fr = (n, d) => {
  if (d < 0) { n = -n; d = -d }
  const g = pgcd(Math.abs(n), d) || 1
  n /= g; d /= g
  return (n < 0 ? '−' : '') + (d === 1 ? String(Math.abs(n)) : `${Math.abs(n)}/${d}`)
}
