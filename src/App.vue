<script setup>
import { watchEffect } from 'vue'
import { GraduationCap, BookOpenCheck, Bookmark, Settings } from 'lucide-vue-next'
import { etat } from './progression.js'

// Thème : « auto » suit le réglage du téléphone, sinon on force clair ou sombre.
watchEffect(() => {
  if (etat.theme === 'auto') document.documentElement.removeAttribute('data-theme')
  else document.documentElement.dataset.theme = etat.theme
})
</script>

<template>
  <header class="bg-nuit text-white">
    <nav class="mx-auto max-w-3xl px-4 py-3 flex items-center gap-4">
      <RouterLink to="/" class="flex flex-1 items-center gap-2 font-extrabold text-lg">
        <GraduationCap class="size-6 text-jaune" /> Bac Sénégal
      </RouterLink>
      <RouterLink to="/revoir" class="text-white/80 hover:text-jaune" aria-label="À revoir"><Bookmark class="size-5" /></RouterLink>
      <RouterLink to="/sources" class="text-white/80 hover:text-jaune" aria-label="Sources"><BookOpenCheck class="size-5" /></RouterLink>
      <RouterLink to="/outils" class="text-white/80 hover:text-jaune" aria-label="Outils"><Settings class="size-5" /></RouterLink>
    </nav>
  </header>
  <main class="mx-auto max-w-3xl px-4 py-5 pb-16">
    <RouterView />
  </main>
  <footer class="text-center text-xs text-encre/60 pb-8 px-4">
    Les épreuves restent la propriété de l’Office du Bac, les fiches et fascicules celle de leurs auteurs : le site renvoie vers eux sans les copier. Les exercices du site sont originaux.
  </footer>
</template>
