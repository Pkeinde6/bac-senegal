<script setup>
import { computed } from 'vue'
import { series } from '../data/catalogue.js'
import { ChevronRight, History, Flame, CalendarClock, Bookmark } from 'lucide-vue-next'
import { etat, serieDeJours } from '../progression.js'

const groupes = [...new Set(series.map((s) => s.groupe))]
const nbRevoir = computed(() => Object.keys(etat.aRevoir).length)
const jours = computed(() => serieDeJours())
const resteAvantBac = computed(() => {
  if (!etat.dateBac) return null
  const d = Math.ceil((new Date(etat.dateBac + 'T08:00:00') - new Date()) / 86400000)
  return d >= 0 ? d : null
})
</script>

<template>
  <section class="rounded-2xl bg-vert text-white p-5 mb-4">
    <h1 class="text-2xl font-extrabold">Révise ton Bac, série par série</h1>
    <p class="mt-1 text-white/90">Les vraies épreuves de 2006 à 2026, des exercices corrigés par chapitre, du plus facile au plus difficile.</p>
  </section>

  <div class="mb-4 grid grid-cols-3 gap-2 text-center">
    <RouterLink to="/outils" class="rounded-xl bg-carte p-3 shadow-sm">
      <CalendarClock class="mx-auto size-5 text-vert" />
      <span class="mt-1 block font-mono text-lg font-medium">{{ resteAvantBac ?? '—' }}</span>
      <span class="block text-[11px] text-encre/60">{{ resteAvantBac === null ? 'date du Bac ?' : 'jours avant le Bac' }}</span>
    </RouterLink>
    <div class="rounded-xl bg-carte p-3 shadow-sm">
      <Flame :class="['mx-auto size-5', jours ? 'text-orange-500' : 'text-encre/30']" />
      <span class="mt-1 block font-mono text-lg font-medium">{{ jours }}</span>
      <span class="block text-[11px] text-encre/60">jour(s) d’affilée</span>
    </div>
    <RouterLink to="/revoir" class="rounded-xl bg-carte p-3 shadow-sm">
      <Bookmark class="mx-auto size-5 text-vert" />
      <span class="mt-1 block font-mono text-lg font-medium">{{ nbRevoir }}</span>
      <span class="block text-[11px] text-encre/60">à revoir</span>
    </RouterLink>
  </div>

  <RouterLink v-if="etat.derniereSerie" :to="`/serie/${etat.derniereSerie}`"
    class="mb-4 flex items-center gap-3 rounded-xl bg-jaune px-4 py-3 font-semibold text-noir">
    <History class="size-5" /> Reprendre la série {{ etat.derniereSerie }}
    <span class="ml-auto font-mono text-sm">{{ Object.keys(etat.reussis).length }} réussis</span>
  </RouterLink>

  <details v-for="g in groupes" :key="g" open class="mb-3 rounded-xl bg-carte shadow-sm">
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
</template>
