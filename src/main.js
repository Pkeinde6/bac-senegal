import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Accueil from './views/Accueil.vue'
import Serie from './views/Serie.vue'
import Matiere from './views/Matiere.vue'
import Sources from './views/Sources.vue'
import Lire from './views/Lire.vue'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Accueil },
    { path: '/serie/:serie', component: Serie, props: true },
    { path: '/serie/:serie/:matiere', component: Matiere, props: true },
    { path: '/sources', component: Sources },
    { path: '/lire', component: Lire },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

createApp(App).use(router).mount('#app')
