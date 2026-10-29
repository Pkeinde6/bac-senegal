// Service worker : garde l'application en cache pour réviser sans connexion.
// Les PDF (hébergés ailleurs) ne sont pas mis en cache.
const CACHE = 'bac-senegal-v1'
const BASE = new URL('./', self.location).pathname

self.addEventListener('install', (ev) => {
  ev.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    const res = await fetch(BASE, { cache: 'reload' })
    const html = await res.clone().text()
    await cache.put(BASE, res)
    // On met aussi en cache les fichiers JS, CSS et icônes cités par la page.
    // (sans doublon : addAll échoue si la même adresse apparaît deux fois)
    const fichiers = new Set([...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css|webmanifest|png))"/g)].map((m) => new URL(m[1], self.location).href))
    await cache.addAll([...fichiers])
    await self.skipWaiting()
  })())
})

self.addEventListener('activate', (ev) => {
  ev.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k)
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (ev) => {
  const req = ev.request
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return
  if (req.mode === 'navigate') {
    // Réseau d'abord (dernière version du site), cache si hors connexion.
    ev.respondWith(fetch(req)
      .then((r) => { const copie = r.clone(); caches.open(CACHE).then((c) => c.put(BASE, copie)); return r })
      .catch(() => caches.match(BASE)))
    return
  }
  // Fichiers versionnés : cache d'abord.
  ev.respondWith(caches.match(req).then((trouve) => trouve || fetch(req).then((r) => {
    if (r.ok) { const copie = r.clone(); caches.open(CACHE).then((c) => c.put(req, copie)) }
    return r
  })))
})
