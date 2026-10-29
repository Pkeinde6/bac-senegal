// Classe les PDF de officedubac.sn par année, série, matière. Usage: node classer.mjs <dossier_dl> <sortie.json>
import fs from 'node:fs'
import path from 'node:path'
const [dl, sortie] = process.argv.slice(2)
const unesc = (s) => s.replace(/&#8211;/g, '–').replace(/&#8217;/g, '’').replace(/&#038;|&amp;/g, '&').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n)).replace(/<[^>]+>/g, '').trim()
const pages = { '2025_02_27_2020': 2020, '2025_02_27_2021': 2021, '2025_02_27_2022': 2022, '2025_02_27_1251': 2023, '2024_07_01_420': 2024, '2025_06_16_2025': 2025, '2026_06_15_2026': 2026, '2026_06_30_epreuves-bac-gen-2026': 2026, '2026_06_30_corriges-bac-gen-2026': 2026 }
const items = new Map()
for (const [nom, an] of Object.entries(pages)) {
  const txt = fs.readFileSync(path.join(dl, nom + '.html'), 'utf8')
  for (const m of txt.matchAll(/<a [^>]*href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi))
    if (!items.has(m[1])) items.set(m[1], { url: m[1], label: unesc(m[2]), annee: an })
}
for (const f of fs.readdirSync(dl).filter((f) => f.startsWith('media_')).sort())
  for (const m of JSON.parse(fs.readFileSync(path.join(dl, f), 'utf8')))
    if (!items.has(m.source_url)) items.set(m.source_url, { url: m.source_url, label: unesc(m.title.rendered), annee: null, date: m.date })

const annee = (it, f) => {
  if (it.annee) return it.annee
  let a = f.match(/(20(1\d|2[0-6]))/); if (a) return +a[1]
  a = f.match(/[-_ ](1[5-9]|2[0-6])(?=[-_ .]|$)/); if (a) return 2000 + +a[1]
  return +it.date.slice(0, 4)
}
const MATIERES = [['maths', /math/], ['pc', /sc[-_ ]?ph|scph|physique|sc-phy|\bpc\b/], ['svt', /svt/], ['philo', /philo/], ['hg', /hist|geo|\bhg\b/], ['francais', /fran|\bfre?\b/], ['anglais', /angl/], ['eco', /eco/], ['compta', /compt|gestion|manag/], ['techno', /constr|techno|electro|fabric|meca|genie|sti|dessin|auto|metal|schema|informatique|cmc|tp-|labo|lab-|bio-?tech|biochim/], ['langues', /espa|\besp\b|arabe|portug|allem|ital|russe|chinois|lla|\blv[12i]/]]
const series = (t) => {
  const s = new Set()
  if (/s1\W?s3/.test(t)) { s.add('S1'); s.add('S3') }
  for (const x of ['s1', 's2', 's3', 's4', 's5', 'l1', 'l2', 't1', 't2', 'f6']) if (new RegExp(`(?<![a-z0-9])${x}(?![0-9])`).test(t)) s.add(x.toUpperCase())
  if (/(?<![a-z])l(?:[-_ ]?ar|a)?(?![a-z0-9])|l'/.test(t) && !s.has('L1') && !s.has('L2')) { s.add('L1'); s.add('L2') }
  if (/(?<![a-z])s(?:a|[-_ ]ar)?(?![a-z0-9])/.test(t) && ![...s].some((x) => x[0] === 'S')) ['S1', 'S2', 'S3'].forEach((x) => s.add(x))
  if (/steg|(?<![a-z])g(?![a-z0-9])/.test(t)) s.add('G')
  if (t.includes('stid')) { s.add('T1'); s.add('T2') }
  if (!s.size) s.add('*')
  return [...s].sort()
}
// Archives tierces : matière imposée, année lue dans le nom de fichier.
const tiers = [['ex_4.html', 'maths', 'Sigmaths'], ['ex_3.html', 'pc', 'Cissé Doro (prof. de sciences physiques)']]
const exos = []
for (const [fic, mat, source] of tiers) {
  const txt = fs.readFileSync(path.join(dl, fic), 'utf8')
  for (const m of txt.matchAll(/<a [^>]*href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    // Sigmaths passe par une page « Reader.php » ; on vise directement le PDF (lisible par la liseuse).
    const url = m[1].replace(/^http:/, 'https:').replace(/Reader\.php\?var=(.+)$/, (_, v) => v.replace(/ax0by99by/g, '/'))
    const lab = unesc(m[2]).replace(/&nbsp;/g, ' ').trim()
    const fn = decodeURIComponent(url.split(/[\/=]/).pop()).replace(/^bac2ax0by99bySenegalax0by99by/, '')
    if (/programme/i.test(fn) || items.has(url)) continue
    const an = fn.match(/(20[0-2]\d)/) || fn.match(/[-_ ](0\d|1\d)(?=\.pdf)/)
    const recueil = /recueil|concours/i.test(fn)
    if (!an || recueil) { exos.push({ matiere: mat, series: series(fn.toLowerCase()).filter((x) => x !== '*'), titre: lab || fn, url, source, type: /concours/i.test(fn) ? 'concours' : recueil ? 'recueil' : 'chapitre' }); continue }
    items.set(url, { url, label: lab.length > 12 ? lab : fn.replace(/[-_]/g, ' ').replace(/\.pdf$/, ''), annee: +(an[1].length === 2 ? '20' + an[1] : an[1]), force: mat, source })
  }
}
const out = [], rejet = []
for (const it of items.values()) {
  const f = decodeURIComponent(it.url.split('/').pop())
  const t = (it.label + ' ' + f).toLowerCase().replace(/_/g, '-')
  const mat = it.force ?? MATIERES.find(([, rx]) => rx.test(t))?.[0]
  const ser = series(t)
  if (!mat || !ser.length || /stat|resultat|calendrier|inscri|liste|communiqu|programme|bts|cfee|bfem|concours/.test(t)) { rejet.push(f); continue }
  out.push({ annee: annee(it, f), series: ser, matiere: mat, type: /corrig/.test(t) ? 'corrige' : 'epreuve', groupe: /2[eè]?(me)?[-_ ]?gr|2nd|second/.test(t) ? 2 : 1, titre: it.label.length > 3 ? it.label : f, url: it.url, source: it.source ?? 'Office du Bac' })
}
out.sort((a, b) => b.annee - a.annee || a.matiere.localeCompare(b.matiere) || a.type.localeCompare(b.type) || a.titre.localeCompare(b.titre))
fs.writeFileSync(sortie, JSON.stringify(out))
fs.writeFileSync(sortie.replace('epreuves', 'series-exercices'), JSON.stringify(exos))
console.log(exos.length, 'séries d’exercices')
const c = (k) => out.reduce((a, x) => ((a[x[k]] = (a[x[k]] || 0) + 1), a), {})
console.log(out.length, 'classés,', rejet.length, 'écartés'); console.log(c('annee')); console.log(c('matiere')); console.log('écartés:', rejet.slice(0, 40).join(' '))
