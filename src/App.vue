<script setup>
import { GraduationCap, BookOpenCheck } from 'lucide-vue-next'
</script>

<template>
  <header class="bg-nuit text-white">
    <div class="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2 font-extrabold text-lg">
        <GraduationCap class="size-6 text-jaune" /> Bac Sénégal
      </RouterLink>
      <RouterLink to="/sources" class="flex items-center gap-1 text-sm text-white/80 hover:text-jaune">
        <BookOpenCheck class="size-4" /> Sources
      </RouterLink>
    </div>
  </header>
  <main class="mx-auto max-w-3xl px-4 py-5 pb-16">
    <RouterView />
  </main>
  <footer class="text-center text-xs text-encre/60 pb-8 px-4">
    Les sujets officiels restent la propriété de l'Office du Bac. Ce site renvoie vers les sources ; les exercices sont originaux.
  </footer>
</template>
