<script setup>
import { ref } from 'vue'
import { etat, exporter, importer, toutEffacer } from '../progression.js'
import { Settings, Sun, Moon, SunMoon, CalendarClock, Copy, Download, RotateCcw, Smartphone } from 'lucide-vue-next'

const themes = [
  { id: 'auto', nom: 'Auto', icone: SunMoon },
  { id: 'light', nom: 'Clair', icone: Sun },
  { id: 'dark', nom: 'Sombre', icone: Moon },
]
const code = ref('')
const message = ref('')
async function copier() {
  code.value = exporter()
  try { await navigator.clipboard.writeText(code.value); message.value = 'Code copié. Colle-le sur ton nouveau téléphone.' }
  catch { message.value = 'Copie le code ci-dessous à la main.' }
}
function charger() {
  try { importer(code.value); message.value = 'Progression récupérée.' }
  catch { message.value = 'Ce code ne marche pas. Vérifie qu’il est complet.' }
}
function effacer() { if (confirm('Effacer toute ta progression ?')) { toutEffacer(); message.value = 'Progression remise à zéro.' } }
</script>

<template>
  <h1 class="text-2xl font-extrabold mb-4 flex items-center gap-2"><Settings class="size-6 text-vert" /> Outils</h1>

  <section class="mb-3 rounded-xl bg-carte p-4 shadow-sm">
    <h2 class="font-semibold mb-2">Affichage</h2>
    <div class="grid grid-cols-3 gap-2">
      <button v-for="t in themes" :key="t.id" @click="etat.theme = t.id"
        :class="['flex items-center justify-center gap-1 rounded-lg py-2 text-sm font-semibold', etat.theme === t.id ? 'bg-nuit text-white' : 'bg-papier text-encre/70']">
        <component :is="t.icone" class="size-4" /> {{ t.nom }}
      </button>
    </div>
    <p class="mt-2 text-xs text-encre/60">Le mode sombre fatigue moins les yeux le soir et économise la batterie.</p>
  </section>

  <section class="mb-3 rounded-xl bg-carte p-4 shadow-sm">
    <h2 class="font-semibold mb-2 flex items-center gap-2"><CalendarClock class="size-5 text-vert" /> Date de ton Bac</h2>
    <input v-model="etat.dateBac" type="date" class="w-full rounded-lg bg-papier px-3 py-2" />
    <p class="mt-2 text-xs text-encre/60">Mets la date officielle annoncée par l’Office du Bac : l’accueil affichera le compte à rebours.</p>
  </section>

  <section class="mb-3 rounded-xl bg-carte p-4 shadow-sm">
    <h2 class="font-semibold mb-1 flex items-center gap-2"><Smartphone class="size-5 text-vert" /> Changer de téléphone</h2>
    <p class="mb-2 text-sm text-encre/70">Ta progression reste dans ce téléphone. Pour la garder, copie ton code ici, puis colle-le sur l’autre appareil.</p>
    <div class="flex gap-2">
      <button @click="copier" class="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-vert py-2 text-sm font-semibold text-white"><Copy class="size-4" /> Copier mon code</button>
      <button @click="charger" class="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-papier py-2 text-sm font-semibold"><Download class="size-4" /> Utiliser ce code</button>
    </div>
    <textarea v-model="code" rows="3" placeholder="Colle ici le code de ton ancien téléphone" class="mt-2 w-full rounded-lg bg-papier p-2 font-mono text-xs" />
    <p v-if="message" class="mt-1 text-sm text-vert">{{ message }}</p>
  </section>

  <section class="mb-3 rounded-xl bg-carte p-4 shadow-sm">
    <h2 class="font-semibold mb-1">Installer l’application</h2>
    <p class="text-sm text-encre/70">Dans Chrome, menu ⋮ puis « Ajouter à l’écran d’accueil ». Le site s’ouvre alors comme une application, et les exercices marchent même sans connexion (les PDF demandent internet).</p>
  </section>

  <button @click="effacer" class="mt-2 inline-flex items-center gap-1 text-sm text-encre/60 hover:text-encre"><RotateCcw class="size-4" /> Remettre la progression à zéro</button>
</template>
