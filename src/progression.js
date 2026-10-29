// Progression de l'élève, gardée dans le navigateur (localStorage).
import { reactive, watch } from 'vue'

const CLE = 'bac-senegal:v1'

function lire() {
  try {
    return { reussis: {}, derniereSerie: null, ...JSON.parse(localStorage.getItem(CLE)) }
  } catch {
    return { reussis: {}, derniereSerie: null }
  }
}

export const etat = reactive(lire())

watch(etat, (v) => {
  try { localStorage.setItem(CLE, JSON.stringify(v)) } catch { /* navigation privée : on ignore */ }
}, { deep: true })

// Un exercice est identifié par sa matière et son titre.
export const cle = (matiere, titre) => `${matiere}/${titre}`
export const estReussi = (matiere, titre) => !!etat.reussis[cle(matiere, titre)]
export function basculer(matiere, titre) {
  const k = cle(matiere, titre)
  if (etat.reussis[k]) delete etat.reussis[k]
  else etat.reussis[k] = Date.now()
}
export const nbReussis = (matiere, liste) => liste.filter((e) => estReussi(matiere, e.titre)).length
export function toutEffacer() {
  etat.reussis = {}
  etat.derniereSerie = null
}
