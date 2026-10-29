// Point d'entrée des contenus : exercices (rédigés, à variantes, par chapitre), épreuves, fiches de profs, fascicules.
import { exercices } from './exercices.js'
import { variantes } from './variantes.js'
import { programme } from './programme.js'
import { fascicules } from './fascicules.js'
import { chapitresDe, chapitreDe, chapitreFiche } from './chapitres.js'
import epreuves from './epreuves.json'
import seriesExos from './series-exercices.json'

export const chapitreEx = (e) => e.chapitre ?? chapitreDe[e.titre] ?? null

// Tous les exercices d'une matière. Quand un exercice existe aussi à variantes, on garde la version à variantes.
export function exercicesDe(m) {
  const v = [...(variantes[m] ?? []), ...(programme[m] ?? [])]
  const titres = new Set(v.map((e) => e.titre))
  return [...(exercices[m] ?? []).filter((e) => !titres.has(e.titre)), ...v]
}

// Les exercices au programme de la série (on cache, par exemple, l'arithmétique en S2).
export function exercicesPour(m, serie) {
  const chap = new Set(chapitresDe(m, serie))
  return exercicesDe(m).filter((e) => !chapitreEx(e) || chap.has(chapitreEx(e)))
}

const pourSerie = (liste, serie) => liste.filter((x) => x.series.includes(serie) || x.series.includes('*'))

export function epreuvesDe(m, serie) {
  const parAn = new Map()
  for (const e of pourSerie(epreuves.filter((x) => x.matiere === m), serie)) {
    if (!parAn.has(e.annee)) parAn.set(e.annee, [])
    parAn.get(e.annee).push(e)
  }
  for (const l of parAn.values()) l.sort((a, b) => a.groupe - b.groupe || a.type.localeCompare(b.type) || a.titre.localeCompare(b.titre))
  return [...parAn.entries()].sort((a, b) => b[0] - a[0])
}

// Fiches de profs (sans série indiquée = Terminale S) et fascicules, avec leur chapitre quand on le connaît.
export const seriesExosDe = (m, serie) => [
  ...seriesExos.filter((x) => x.matiere === m && (x.series.length ? x.series.includes(serie) : serie.startsWith('S'))).map((x) => ({ ...x, pdf: true, chapitre: chapitreFiche(x) })),
  ...fascicules.filter((x) => x.matiere === m && x.series.includes(serie)).map((x) => ({ ...x, type: 'fascicule', chapitre: null })),
]

// Recherche simple dans les titres et énoncés des exercices, pour une série.
export function chercher(texte, serie, matieresSerie) {
  const q = texte.trim().toLowerCase()
  if (q.length < 3) return []
  const res = []
  for (const m of matieresSerie)
    for (const e of exercicesPour(m, serie)) {
      const t = `${e.titre} ${chapitreEx(e) ?? ''} ${e.enonce ?? ''}`.toLowerCase()
      if (t.includes(q)) res.push({ matiere: m, exercice: e, chapitre: chapitreEx(e) })
    }
  return res.slice(0, 30)
}
