<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ExternalLink, LoaderCircle, RefreshCw } from 'lucide-vue-next'

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
onBeforeUnmount(() => clearTimeout(minuteur))
const recharger = () => { charge.value = false; essai.value++ }
const retour = () => (history.state?.back ? router.back() : router.push('/'))
</script>

<template>
  <div class="-mx-4 -mt-5">
    <div class="flex items-center gap-2 bg-white px-4 py-2 shadow-sm">
      <button @click="retour" class="inline-flex items-center gap-1 text-sm text-vert"><ArrowLeft class="size-4" /> Retour</button>
      <h1 class="flex-1 truncate text-sm font-semibold">{{ route.query.t }}</h1>
      <button @click="recharger" class="inline-flex items-center gap-1 text-xs text-encre/60"><RefreshCw class="size-4" /> Recharger</button>
      <a :href="url" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-xs text-encre/60"><ExternalLink class="size-4" /> PDF</a>
    </div>
    <div class="relative h-[calc(100dvh-7.5rem)] bg-papier">
      <div v-if="!charge" class="absolute inset-0 flex items-center justify-center gap-2 text-sm text-encre/60">
        <LoaderCircle class="size-5 animate-spin" /> Chargement du document…
      </div>
      <iframe :key="essai" :src="vue" class="relative h-full w-full border-0" :title="route.query.t" @load="charge = true" />
    </div>
    <p class="px-4 py-2 text-xs text-encre/50">Page blanche ? Touche « Recharger ». Le bouton PDF ouvre le fichier d’origine.</p>
  </div>
</template>
