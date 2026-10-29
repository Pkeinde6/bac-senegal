<script setup>
import { computed } from 'vue'
import { matieres } from '../data/catalogue.js'
import { etat } from '../progression.js'
import { Bookmark, ChevronRight, X } from 'lucide-vue-next'

const liste = computed(() => Object.entries(etat.aRevoir).map(([k, v]) => ({ k, ...v })).sort((a, b) => b.date - a.date))
</script>

<template>
  <h1 class="text-2xl font-extrabold mb-2 flex items-center gap-2"><Bookmark class="size-6 text-vert" /> À revoir</h1>
  <p class="text-encre/70 mb-4">Les exercices que tu as mis de côté. Refais-les quelques jours plus tard : c’est la meilleure façon de retenir.</p>
  <p v-if="!liste.length" class="rounded-xl bg-carte p-4 text-sm text-encre/70 shadow-sm">Rien pour l’instant. Touche « Revoir plus tard » sous un exercice pour l’ajouter ici.</p>
  <ul v-else class="rounded-xl bg-carte shadow-sm divide-y divide-papier">
    <li v-for="x in liste" :key="x.k" class="flex items-center">
      <RouterLink :to="{ path: `/serie/${x.serie}/${x.matiere}`, query: { chap: x.chapitre } }" class="flex flex-1 items-center gap-3 px-4 py-3 hover:bg-papier">
        <span class="flex-1">
          <span class="block font-semibold">{{ x.titre }}</span>
          <span class="block text-xs text-encre/60">{{ matieres[x.matiere]?.nom }} {{ x.serie }} · {{ x.chapitre }}</span>
        </span>
        <ChevronRight class="size-4 text-encre/40" />
      </RouterLink>
      <button @click="delete etat.aRevoir[x.k]" class="px-3 py-3 text-encre/40 hover:text-encre" aria-label="Retirer de la liste"><X class="size-4" /></button>
    </li>
  </ul>
</template>
