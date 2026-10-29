// Progression et réglages de l'élève, gardés dans le navigateur (localStorage).
import { reactive, watch } from 'vue'

const CLE = 'bac-senegal:v1'
const vide = () => ({ reussis: {}, aRevoir: {}, jours: {}, derniereSerie: null, theme: 'auto', dateBac: null })

function lire() {
  try {
    return { ...vide(), ...JSON.parse(localStorage.getItem(CLE)) }
  } catch {
    return vide()
  }
}

export const etat = reactive(lire())

watch(etat, (v) => {
  try { localStorage.setItem(CLE, JSON.stringify(v)) } catch { /* navigation privée : on ignore */ }
}, { deep: true })

const aujourdhui = () => new Date().toISOString().slice(0, 10)

// Un exercice est identifié par sa matière et son titre.
export const cle = (matiere, titre) => `${matiere}/${titre}`
export const estReussi = (matiere, titre) => !!etat.reussis[cle(matiere, titre)]
export function basculer(matiere, titre) {
  const k = cle(matiere, titre)
  if (etat.reussis[k]) delete etat.reussis[k]
  else {
    etat.reussis[k] = Date.now()
    etat.jours[aujourdhui()] = (etat.jours[aujourdhui()] ?? 0) + 1
  }
}
export const nbReussis = (matiere, liste) => liste.filter((e) => estReussi(matiere, e.titre)).length

// « À revoir » : on garde la série pour pouvoir revenir au bon endroit.
export const estARevoir = (matiere, titre) => !!etat.aRevoir[cle(matiere, titre)]
export function basculerARevoir(serie, matiere, titre, chapitre) {
  const k = cle(matiere, titre)
  if (etat.aRevoir[k]) delete etat.aRevoir[k]
  else etat.aRevoir[k] = { serie, matiere, titre, chapitre, date: Date.now() }
}

// Nombre de jours de révision d'affilée (jusqu'à aujourd'hui ou hier).
export function serieDeJours() {
  let n = 0
  const d = new Date()
  if (!etat.jours[aujourdhui()]) d.setDate(d.getDate() - 1)
  while (etat.jours[d.toISOString().slice(0, 10)]) { n++; d.setDate(d.getDate() - 1) }
  return n
}

// Code de transfert pour changer de téléphone.
export const exporter = () => btoa(unescape(encodeURIComponent(JSON.stringify(etat))))
export function importer(code) {
  const donnees = JSON.parse(decodeURIComponent(escape(atob(code.trim()))))
  if (typeof donnees !== 'object' || !donnees.reussis) throw new Error('code invalide')
  Object.assign(etat, { ...vide(), ...donnees })
}

export function toutEffacer() {
  Object.assign(etat, { ...vide(), theme: etat.theme, dateBac: etat.dateBac })
}
