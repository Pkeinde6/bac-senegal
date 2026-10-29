// Point d'entrée des contenus : exercices rédigés + à variantes, épreuves, séries de profs.
import { exercices } from './exercices.js'
import { variantes } from './variantes.js'
import epreuves from './epreuves.json'
import seriesExos from './series-exercices.json'

// Quand un exercice existe aussi en version à variantes, on garde la version à variantes.
export function exercicesDe(m) {
  const v = variantes[m] ?? []
  const titres = new Set(v.map((e) => e.titre))
  return [...(exercices[m] ?? []).filter((e) => !titres.has(e.titre)), ...v]
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

// Les fiches sans série indiquée sont des fiches de Terminale S.
export const seriesExosDe = (m, serie) =>
  seriesExos.filter((x) => x.matiere === m && (x.series.length ? x.series.includes(serie) : serie.startsWith('S')))
