<script setup>
import { computed } from 'vue'
import { series, matieres } from '../data/catalogue.js'
import { exercices } from '../data/exercices.js'
import { icone } from '../icons.js'
import { ArrowLeft } from 'lucide-vue-next'
const props = defineProps(['serie'])
const s = computed(() => series.find((x) => x.id === props.serie))
</script>

<template>
  <div v-if="s">
    <RouterLink to="/" class="inline-flex items-center gap-1 text-sm text-vert mb-3"><ArrowLeft class="size-4" /> Séries</RouterLink>
    <h1 class="text-2xl font-extrabold">Série {{ s.nom }}</h1>
    <p class="text-encre/70 mb-5">{{ s.desc }}</p>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <RouterLink v-for="m in s.matieres" :key="m" :to="`/serie/${s.id}/${m}`"
        class="rounded-xl bg-white p-4 shadow-sm hover:ring-2 hover:ring-vert flex flex-col gap-2">
        <component :is="icone(matieres[m].icone)" class="size-7 text-vert" />
        <span class="font-semibold leading-tight">{{ matieres[m].nom }}</span>
        <span class="text-xs text-encre/60">{{ exercices[m]?.length ?? 0 }} exercices</span>
      </RouterLink>
    </div>
  </div>
  <p v-else>Série introuvable.</p>
</template>
