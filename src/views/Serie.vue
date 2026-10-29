<script setup>
import { computed, ref, watchEffect } from 'vue'
import { series, matieres } from '../data/catalogue.js'
import { exercicesPour, chercher } from '../data/index.js'
import { icone } from '../icons.js'
import { etat, nbReussis } from '../progression.js'
import { ArrowLeft, Search } from 'lucide-vue-next'
const props = defineProps(['serie'])
const s = computed(() => series.find((x) => x.id === props.serie))
watchEffect(() => { if (s.value) etat.derniereSerie = s.value.id })

const total = (m) => exercicesPour(m, props.serie).length
const faits = (m) => nbReussis(m, exercicesPour(m, props.serie))
const pctSerie = computed(() => {
  const t = s.value.matieres.reduce((a, m) => a + total(m), 0)
  return t ? Math.round((100 * s.value.matieres.reduce((a, m) => a + faits(m), 0)) / t) : 0
})

const recherche = ref('')
const resultats = computed(() => (s.value ? chercher(recherche.value, s.value.id, s.value.matieres) : []))
</script>

<template>
  <div v-if="s">
    <RouterLink to="/" class="inline-flex items-center gap-1 text-sm text-vert mb-3"><ArrowLeft class="size-4" /> Séries</RouterLink>
    <h1 class="text-2xl font-extrabold">Série {{ s.nom }}</h1>
    <p class="text-encre/70 mb-3">{{ s.desc }}</p>
    <div class="mb-4">
      <div class="flex justify-between text-sm mb-1"><span>Progression</span><span class="font-mono">{{ pctSerie }} %</span></div>
      <div class="h-2 rounded-full bg-carte"><div class="h-2 rounded-full bg-vert" :style="{ width: pctSerie + '%' }" /></div>
    </div>

    <label class="mb-4 flex items-center gap-2 rounded-xl bg-carte px-3 py-2 shadow-sm">
      <Search class="size-4 text-encre/50" />
      <input v-model="recherche" type="search" placeholder="Chercher un exercice (ex. : suite, pH, glycémie)" class="w-full bg-transparent text-sm outline-none placeholder:text-encre/40" />
    </label>
    <ul v-if="recherche.trim().length >= 3" class="mb-5 rounded-xl bg-carte shadow-sm divide-y divide-papier">
      <li v-for="r in resultats" :key="r.matiere + r.exercice.titre">
        <RouterLink :to="{ path: `/serie/${s.id}/${r.matiere}`, query: { chap: r.chapitre } }" class="block px-4 py-2 text-sm hover:bg-papier">
          <span class="font-semibold">{{ r.exercice.titre }}</span>
          <span class="block text-xs text-encre/60">{{ matieres[r.matiere].nom }} · {{ r.chapitre ?? 'Révisions' }} · {{ r.exercice.niveau }}</span>
        </RouterLink>
      </li>
      <li v-if="!resultats.length" class="px-4 py-3 text-sm text-encre/60">Aucun exercice trouvé.</li>
    </ul>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <RouterLink v-for="m in s.matieres" :key="m" :to="`/serie/${s.id}/${m}`"
        class="rounded-xl bg-carte p-4 shadow-sm hover:ring-2 hover:ring-vert flex flex-col gap-2">
        <component :is="icone(matieres[m].icone)" class="size-7 text-vert" />
        <span class="font-semibold leading-tight">{{ matieres[m].nom }}</span>
        <span class="text-xs text-encre/60">{{ faits(m) }} / {{ total(m) }} réussis</span>
      </RouterLink>
    </div>
  </div>
  <p v-else>Série introuvable.</p>
</template>
