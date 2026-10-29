<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ExternalLink, LoaderCircle, RefreshCw, Timer, X } from 'lucide-vue-next'

// Liseuse : affiche le PDF dans la page (via la visionneuse Google), sans téléchargement.
const route = useRoute()
const router = useRouter()
const url = computed(() => route.query.u)
// La visionneuse Google renvoie parfois une page vide : on recharge automatiquement (3 essais).
const essai = ref(0)
const vue = computed(() => `https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(url.value)}&essai=${essai.value}`)
const charge = ref(false)
let minuteur = setTimeout(function relance() {
  if (charge.value || essai.value >= 3) return
  essai.value++
  minuteur = setTimeout(relance, 7000)
}, 7000)
const recharger = () => { charge.value = false; essai.value++ }
const retour = () => (history.state?.back ? router.back() : router.push('/'))

// Mode examen : un chrono qui survit au rechargement de la page.
const cleChrono = computed(() => `chrono:${url.value}`)
const lireFin = () => { try { return Number(sessionStorage.getItem(cleChrono.value)) || null } catch { return null } }
const fin = ref(lireFin())
const maintenant = ref(Date.now())
const tic = setInterval(() => { maintenant.value = Date.now() }, 1000)
const choixDuree = ref(false)
function lancer(heures) {
  fin.value = Date.now() + heures * 3600000
  try { sessionStorage.setItem(cleChrono.value, String(fin.value)) } catch { /* ignore */ }
  choixDuree.value = false
}
function arreter() {
  fin.value = null
  try { sessionStorage.removeItem(cleChrono.value) } catch { /* ignore */ }
}
const reste = computed(() => {
  if (!fin.value) return null
  const s = Math.max(0, Math.round((fin.value - maintenant.value) / 1000))
  return `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
})
const termine = computed(() => fin.value && fin.value <= maintenant.value)
onBeforeUnmount(() => { clearTimeout(minuteur); clearInterval(tic) })
</script>

<template>
  <div class="-mx-4 -mt-5">
    <div class="flex items-center gap-2 bg-carte px-4 py-2 shadow-sm">
      <button @click="retour" class="inline-flex items-center gap-1 text-sm text-vert"><ArrowLeft class="size-4" /> Retour</button>
      <h1 class="flex-1 truncate text-sm font-semibold">{{ route.query.t }}</h1>
      <button v-if="!fin" @click="choixDuree = !choixDuree" class="inline-flex items-center gap-1 text-xs font-semibold text-vert"><Timer class="size-4" /> Chrono</button>
      <button @click="recharger" class="inline-flex items-center gap-1 text-xs text-encre/60" aria-label="Recharger le document"><RefreshCw class="size-4" /></button>
      <a :href="url" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-xs text-encre/60"><ExternalLink class="size-4" /> PDF</a>
    </div>

    <div v-if="choixDuree" class="flex items-center gap-2 bg-carte px-4 pb-2 text-sm">
      <span class="text-encre/70">Durée de l’épreuve :</span>
      <button v-for="hh in [1, 2, 3, 4]" :key="hh" @click="lancer(hh)" class="rounded-full bg-nuit px-3 py-1 font-semibold text-white">{{ hh }} h</button>
    </div>
    <div v-if="fin" :class="['flex items-center gap-2 px-4 py-1.5 text-sm font-semibold', termine ? 'bg-jaune text-noir' : 'bg-nuit text-white']">
      <Timer class="size-4" />
      <span class="flex-1 font-mono">{{ termine ? 'Temps écoulé : pose ton stylo !' : `Mode examen · ${reste}` }}</span>
      <button @click="arreter" class="inline-flex items-center gap-1 text-xs opacity-80"><X class="size-4" /> Arrêter</button>
    </div>

    <div class="relative h-[calc(100dvh-8rem)] bg-papier">
      <div v-if="!charge" class="absolute inset-0 flex items-center justify-center gap-2 text-sm text-encre/60">
        <LoaderCircle class="size-5 animate-spin" /> Chargement du document…
      </div>
      <iframe :key="essai" :src="vue" class="relative h-full w-full border-0" :title="route.query.t" @load="charge = true" />
    </div>
    <p class="px-4 py-2 text-xs text-encre/50">Page blanche ? Touche <RefreshCw class="inline size-3" /> pour recharger. Le bouton PDF ouvre le fichier d’origine.</p>
  </div>
</template>
