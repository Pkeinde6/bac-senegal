<script setup>
import { sources } from '../data/catalogue.js'
import { ExternalLink, ShieldCheck } from 'lucide-vue-next'
</script>

<template>
  <h1 class="text-2xl font-extrabold mb-2">Sources et droits</h1>
  <p class="text-encre/70 mb-4">Aucune source ne publie les sujets sous licence libre. On renvoie donc vers elles sans copier leurs PDF. Les exercices du site sont originaux.</p>
  <article v-for="s in sources" :key="s.url" class="mb-3 rounded-xl bg-carte p-4 shadow-sm">
    <div class="flex items-center gap-2">
      <ShieldCheck :class="['size-5', s.statut === 'Officiel' ? 'text-vert' : 'text-encre/40']" />
      <h2 class="font-semibold flex-1">{{ s.nom }}</h2>
    </div>
    <p class="text-sm mt-1">{{ s.droits }}</p>
    <a :href="s.url" target="_blank" rel="noopener" class="mt-2 inline-flex items-center gap-1 text-sm text-vert"><ExternalLink class="size-4" /> Ouvrir</a>
  </article>
</template>
