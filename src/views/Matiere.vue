<script setup>
import { computed, reactive, ref } from 'vue'
import { series, matieres } from '../data/catalogue.js'
import { exercicesDe, epreuvesDe, seriesExosDe } from '../data/index.js'
import { chapitresDe, chapitreDe, chapitreFiche } from '../data/chapitres.js'
import { ArrowLeft, ChevronRight, FileText, FileCheck, Dumbbell, Eye, CircleCheck, Shuffle, FolderOpen, BookOpenText } from 'lucide-vue-next'
import { basculer, estReussi, nbReussis } from '../progression.js'

const props = defineProps(['serie', 'matiere'])
const s = computed(() => series.find((x) => x.id === props.serie))
const m = computed(() => matieres[props.matiere])
const onglet = ref('exercices')
const onglets = [
  { id: 'exercices', nom: 'Exercices', icone: Dumbbell },
  { id: 'epreuves', nom: 'Épreuves', icone: FileText },
]
const niveaux = [
  { id: 'facile', nom: 'Facile', couleur: 'bg-vert text-white' },
  { id: 'moyen', nom: 'Moyen', couleur: 'bg-jaune text-encre' },
  { id: 'difficile', nom: 'Difficile', couleur: 'bg-nuit text-white' },
]
const couleur = (n) => niveaux.find((x) => x.id === n)?.couleur
const ordre = { facile: 0, moyen: 1, difficile: 2 }
const filtre = ref('tous')

// Exercices et fiches de profs rangés par chapitre du programme.
const chapitres = computed(() => {
  const noms = chapitresDe(props.matiere, props.serie)
  const ex = exercicesDe(props.matiere).filter((e) => filtre.value === 'tous' || e.niveau === filtre.value)
  const fiches = seriesExosDe(props.matiere, props.serie)
  const groupes = noms.map((nom) => ({
    nom,
    exercices: ex.filter((e) => chapitreDe[e.titre] === nom).sort((a, b) => ordre[a.niveau] - ordre[b.niveau]),
    fiches: fiches.filter((f) => chapitreFiche(f) === nom),
  }))
  const rangés = new Set(noms)
  const autresEx = ex.filter((e) => !rangés.has(chapitreDe[e.titre]))
  const autresFiches = fiches.filter((f) => !rangés.has(chapitreFiche(f)))
  if (autresEx.length || autresFiches.length) groupes.push({ nom: 'Révisions générales et recueils', exercices: autresEx, fiches: autresFiches })
  return groupes
})

// Variante courante de chaque exercice à variantes (tirée au premier affichage).
const tirages = reactive({})
const contenu = (e) => {
  if (!e.generer) return e
  if (!tirages[e.titre]) tirages[e.titre] = e.generer()
  return tirages[e.titre]
}
const nouvelle = (e) => { tirages[e.titre] = e.generer() }

const annees = computed(() => epreuvesDe(props.matiere, props.serie))
const nbEpreuves = computed(() => annees.value.reduce((a, [, l]) => a + l.length, 0))
const lire = (doc) => ({ path: '/lire', query: { u: doc.url, t: doc.titre } })
</script>

<template>
  <div v-if="s && m">
    <RouterLink :to="`/serie/${s.id}`" class="inline-flex items-center gap-1 text-sm text-vert mb-3"><ArrowLeft class="size-4" /> Série {{ s.nom }}</RouterLink>
    <h1 class="text-2xl font-extrabold mb-4">{{ m.nom }} <span class="font-mono text-base text-encre/50">{{ s.nom }}</span></h1>

    <div class="grid grid-cols-2 gap-1 rounded-xl bg-white p-1 mb-4 shadow-sm">
      <button v-for="o in onglets" :key="o.id" @click="onglet = o.id"
        :class="['flex items-center justify-center gap-2 rounded-lg py-2 font-semibold', onglet === o.id ? 'bg-nuit text-white' : 'text-encre/70']">
        <component :is="o.icone" class="size-4" /> {{ o.nom }}
        <span v-if="o.id === 'epreuves'" class="font-mono text-xs opacity-70">{{ nbEpreuves }}</span>
      </button>
    </div>

    <template v-if="onglet === 'exercices'">
      <div class="mb-4 flex gap-2 overflow-x-auto pb-1">
        <button v-for="n in [{ id: 'tous', nom: 'Tous', couleur: 'bg-encre text-white' }, ...niveaux]" :key="n.id" @click="filtre = n.id"
          :class="['shrink-0 rounded-full px-3 py-1 text-sm font-semibold', filtre === n.id ? n.couleur : 'bg-white text-encre/60']">{{ n.nom }}</button>
      </div>

      <details v-for="(c, i) in chapitres" :key="c.nom" class="mb-2 rounded-xl bg-white shadow-sm" :open="i === 0 && c.exercices.length > 0">
        <summary class="flex items-center gap-3 px-4 py-3">
          <span class="flex-1 font-semibold leading-tight">{{ c.nom }}</span>
          <span class="shrink-0 font-mono text-xs text-encre/50">
            <template v-if="c.exercices.length">{{ nbReussis(props.matiere, c.exercices) }}/{{ c.exercices.length }}</template>
            <template v-if="c.fiches.length"> · {{ c.fiches.length }} PDF</template>
          </span>
          <ChevronRight class="chev size-5 shrink-0 transition-transform" />
        </summary>
        <div class="px-4 pb-4 space-y-3">
          <article v-for="e in c.exercices" :key="e.titre" class="rounded-lg border border-papier p-3">
            <div class="flex flex-wrap items-center gap-2">
              <span :class="['rounded-full px-2 py-0.5 text-[11px] font-semibold', couleur(e.niveau)]">{{ e.niveau }}</span>
              <h3 class="font-semibold">{{ e.titre }}</h3>
              <span v-if="e.generer" class="text-[10px] font-mono uppercase rounded bg-jaune/60 px-1.5 py-0.5">variantes</span>
            </div>
            <p class="mt-1 whitespace-pre-line">{{ contenu(e).enonce }}</p>
            <div class="mt-2 flex flex-wrap items-center gap-2">
              <button @click="basculer(props.matiere, e.titre)"
                :class="['inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold', estReussi(props.matiere, e.titre) ? 'bg-vert text-white' : 'bg-papier text-encre/70']">
                <CircleCheck class="size-4" /> {{ estReussi(props.matiere, e.titre) ? 'Réussi' : 'Marquer réussi' }}
              </button>
              <button v-if="e.generer" @click="nouvelle(e)" class="inline-flex items-center gap-1 rounded-full bg-nuit px-3 py-1 text-sm font-semibold text-white">
                <Shuffle class="size-4" /> Nouvelle variante
              </button>
            </div>
            <details class="mt-2">
              <summary class="inline-flex items-center gap-1 text-sm font-semibold text-vert"><Eye class="size-4" /> Voir la correction</summary>
              <p class="mt-2 whitespace-pre-line rounded-lg bg-papier p-3 text-sm">{{ contenu(e).solution }}</p>
            </details>
          </article>

          <div v-if="c.fiches.length" class="rounded-lg bg-papier p-3">
            <p class="mb-1 flex items-center gap-1 text-sm font-semibold"><FolderOpen class="size-4 text-vert" /> Séries d’exercices de profs</p>
            <RouterLink v-for="f in c.fiches" :key="f.url" :to="lire(f)" class="flex items-center gap-2 py-1.5 text-sm hover:text-vert">
              <BookOpenText class="size-4 shrink-0 text-vert" /> <span class="flex-1">{{ f.titre }}</span>
              <span class="text-[11px] text-encre/50">{{ f.source.split(' (')[0] }}</span>
            </RouterLink>
          </div>

          <p v-if="!c.exercices.length && !c.fiches.length" class="text-sm text-encre/60">
            Pas encore d’exercice {{ filtre !== 'tous' ? filtre + ' ' : '' }}ici. Entraîne-toi avec l’onglet Épreuves.
          </p>
        </div>
      </details>
    </template>

    <template v-else>
      <p v-if="!annees.length" class="text-sm text-encre/70">Aucune épreuve trouvée pour cette matière et cette série.</p>
      <details v-for="([an, liste], i) in annees" :key="an" class="mb-2 rounded-xl bg-white shadow-sm" :open="i === 0">
        <summary class="flex items-center justify-between px-4 py-3">
          <span class="font-mono font-medium">Bac {{ an }}</span>
          <span class="flex items-center gap-2 text-xs text-encre/50">{{ liste.length }} PDF <ChevronRight class="chev size-5 transition-transform text-encre" /></span>
        </summary>
        <ul class="px-4 pb-3 divide-y divide-papier">
          <li v-for="e in liste" :key="e.url">
            <RouterLink :to="lire(e)" class="flex items-center gap-2 py-2 text-sm hover:text-vert">
              <component :is="e.type === 'corrige' ? FileCheck : FileText" :class="['size-4 shrink-0', e.type === 'corrige' ? 'text-vert' : 'text-nuit']" />
              <span class="flex-1">{{ e.titre }}</span>
              <span class="shrink-0 rounded bg-papier px-1.5 py-0.5 font-mono text-[10px]">{{ e.groupe === 1 ? '1er gr' : '2e gr' }}</span>
            </RouterLink>
          </li>
        </ul>
        <p class="px-4 pb-3 text-xs text-encre/50">Documents hébergés par : {{ [...new Set(liste.map((e) => e.source))].join(', ') }}.</p>
      </details>
    </template>
  </div>
  <p v-else>Page introuvable.</p>
</template>
