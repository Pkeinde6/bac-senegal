<script setup>
import { computed, ref } from 'vue'
import { series, matieres, annees, sources } from '../data/catalogue.js'
import { exercices } from '../data/exercices.js'
import { ArrowLeft, ChevronRight, ExternalLink, FileText, Dumbbell, Eye, CircleCheck } from 'lucide-vue-next'
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
const parNiveau = (n) => (exercices[props.matiere] ?? []).filter((e) => e.niveau === n)
const liens = sources.filter((x) => x.url.includes('kamerpower') || x.url.includes('officedubac'))
</script>

<template>
  <div v-if="s && m">
    <RouterLink :to="`/serie/${s.id}`" class="inline-flex items-center gap-1 text-sm text-vert mb-3"><ArrowLeft class="size-4" /> Série {{ s.nom }}</RouterLink>
    <h1 class="text-2xl font-extrabold mb-4">{{ m.nom }} <span class="font-mono text-base text-encre/50">{{ s.nom }}</span></h1>

    <div class="grid grid-cols-2 gap-1 rounded-xl bg-white p-1 mb-5 shadow-sm">
      <button v-for="o in onglets" :key="o.id" @click="onglet = o.id"
        :class="['flex items-center justify-center gap-2 rounded-lg py-2 font-semibold', onglet === o.id ? 'bg-nuit text-white' : 'text-encre/70']">
        <component :is="o.icone" class="size-4" /> {{ o.nom }}
      </button>
    </div>

    <template v-if="onglet === 'exercices'">
      <details v-for="n in niveaux" :key="n.id" class="mb-3 rounded-xl bg-white shadow-sm" :open="n.id === 'facile'">
        <summary class="flex items-center gap-3 px-4 py-3">
          <span :class="['text-xs font-semibold rounded-full px-3 py-1', n.couleur]">{{ n.nom }}</span>
          <span class="flex-1 text-sm text-encre/60">{{ nbReussis(props.matiere, parNiveau(n.id)) }} / {{ parNiveau(n.id).length }} réussi(s)</span>
          <ChevronRight class="chev size-5 transition-transform" />
        </summary>
        <div class="px-4 pb-4 space-y-3">
          <article v-for="(e, i) in parNiveau(n.id)" :key="i" class="rounded-lg border border-papier p-3">
            <h3 class="font-semibold">{{ e.titre }}</h3>
            <p class="mt-1 whitespace-pre-line">{{ e.enonce }}</p>
            <button @click="basculer(props.matiere, e.titre)"
              :class="['mt-2 mr-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold', estReussi(props.matiere, e.titre) ? 'bg-vert text-white' : 'bg-papier text-encre/70']">
              <CircleCheck class="size-4" /> {{ estReussi(props.matiere, e.titre) ? 'Réussi' : 'Marquer réussi' }}
            </button>
            <details class="mt-2 inline-block">
              <summary class="inline-flex items-center gap-1 text-sm font-semibold text-vert"><Eye class="size-4" /> Voir la correction</summary>
              <p class="mt-2 whitespace-pre-line rounded-lg bg-papier p-3 text-sm">{{ e.solution }}</p>
            </details>
          </article>
          <p v-if="!parNiveau(n.id).length" class="text-sm text-encre/60">Bientôt disponible.</p>
        </div>
      </details>
    </template>

    <template v-else>
      <p class="text-sm text-encre/70 mb-3">Les sujets officiels ne sont pas recopiés ici. Ouvre l’année puis la source, et cherche « {{ m.nom }} {{ s.nom }} ».</p>
      <details v-for="a in annees" :key="a" class="mb-2 rounded-xl bg-white shadow-sm">
        <summary class="flex items-center justify-between px-4 py-3 font-mono font-medium">
          Bac {{ a }} <ChevronRight class="chev size-5 transition-transform" />
        </summary>
        <ul class="px-4 pb-3 space-y-2">
          <li v-for="l in liens" :key="l.url">
            <a :href="l.url" target="_blank" rel="noopener" class="flex items-center gap-2 text-sm text-vert hover:underline">
              <ExternalLink class="size-4 shrink-0" /> {{ l.nom }}
              <span class="ml-auto text-xs text-encre/50">{{ l.statut }}</span>
            </a>
          </li>
        </ul>
      </details>
    </template>
  </div>
  <p v-else>Page introuvable.</p>
</template>
