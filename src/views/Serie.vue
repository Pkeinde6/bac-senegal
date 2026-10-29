<script setup>
import { computed, watchEffect } from 'vue'
import { series, matieres } from '../data/catalogue.js'
import { exercicesDe } from '../data/index.js'
import { icone } from '../icons.js'
import { etat, nbReussis } from '../progression.js'
import { ArrowLeft } from 'lucide-vue-next'
const props = defineProps(['serie'])
const s = computed(() => series.find((x) => x.id === props.serie))
watchEffect(() => { if (s.value) etat.derniereSerie = s.value.id })

const total = (m) => exercicesDe(m).length
const faits = (m) => nbReussis(m, exercicesDe(m))
const pctSerie = computed(() => {
  const t = s.value.matieres.reduce((a, m) => a + total(m), 0)
  return t ? Math.round((100 * s.value.matieres.reduce((a, m) => a + faits(m), 0)) / t) : 0
})
</script>

<template>
  <div v-if="s">
    <RouterLink to="/" class="inline-flex items-center gap-1 text-sm text-vert mb-3"><ArrowLeft class="size-4" /> Séries</RouterLink>
    <h1 class="text-2xl font-extrabold">Série {{ s.nom }}</h1>
    <p class="text-encre/70 mb-3">{{ s.desc }}</p>
    <div class="mb-5">
      <div class="flex justify-between text-sm mb-1"><span>Progression</span><span class="font-mono">{{ pctSerie }} %</span></div>
      <div class="h-2 rounded-full bg-white"><div class="h-2 rounded-full bg-vert" :style="{ width: pctSerie + '%' }" /></div>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <RouterLink v-for="m in s.matieres" :key="m" :to="`/serie/${s.id}/${m}`"
        class="rounded-xl bg-white p-4 shadow-sm hover:ring-2 hover:ring-vert flex flex-col gap-2">
        <component :is="icone(matieres[m].icone)" class="size-7 text-vert" />
        <span class="font-semibold leading-tight">{{ matieres[m].nom }}</span>
        <span class="text-xs text-encre/60">{{ faits(m) }} / {{ total(m) }} réussis</span>
      </RouterLink>
    </div>
  </div>
  <p v-else>Série introuvable.</p>
</template>
