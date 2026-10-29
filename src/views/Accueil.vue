<script setup>
import { series } from '../data/catalogue.js'
import { ChevronRight, History, RotateCcw } from 'lucide-vue-next'
import { etat, toutEffacer } from '../progression.js'
const effacer = () => { if (confirm('Effacer toute ta progression ?')) toutEffacer() }
const groupes = [...new Set(series.map((s) => s.groupe))]
</script>

<template>
  <section class="rounded-2xl bg-vert text-white p-5 mb-6">
    <h1 class="text-2xl font-extrabold">Révise ton Bac, série par série</h1>
    <p class="mt-1 text-white/90">Choisis ta série, puis ta matière : anciennes épreuves (liens vers les sources) et exercices corrigés du plus facile au plus difficile.</p>
  </section>
  <RouterLink v-if="etat.derniereSerie" :to="`/serie/${etat.derniereSerie}`"
    class="mb-4 flex items-center gap-3 rounded-xl bg-jaune px-4 py-3 font-semibold">
    <History class="size-5" /> Reprendre la série {{ etat.derniereSerie }}
    <span class="ml-auto font-mono text-sm">{{ Object.keys(etat.reussis).length }} réussis</span>
  </RouterLink>
  <details v-for="g in groupes" :key="g" open class="mb-3 rounded-xl bg-white shadow-sm">
    <summary class="flex items-center justify-between px-4 py-3 font-semibold">
      {{ g }} <ChevronRight class="chev size-5 transition-transform" />
    </summary>
    <ul class="divide-y divide-papier">
      <li v-for="s in series.filter((x) => x.groupe === g)" :key="s.id">
        <RouterLink :to="`/serie/${s.id}`" class="flex items-center gap-3 px-4 py-3 hover:bg-papier">
          <span class="font-mono font-medium bg-nuit text-jaune rounded-lg w-12 text-center py-1">{{ s.nom }}</span>
          <span class="flex-1 text-sm">{{ s.desc }}</span>
          <ChevronRight class="size-4 text-encre/40" />
        </RouterLink>
      </li>
    </ul>
  </details>
  <button v-if="Object.keys(etat.reussis).length" @click="effacer"
    class="mt-4 inline-flex items-center gap-1 text-sm text-encre/60 hover:text-encre">
    <RotateCcw class="size-4" /> Remettre la progression à zéro
  </button>
</template>
