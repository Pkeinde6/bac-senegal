// Dessine l'icône de l'application (livre ouvert jaune sur fond vert) en PNG, sans dépendance.
// Usage : node scripts/icones.mjs
import fs from 'node:fs'
import zlib from 'node:zlib'

const VERT = [0x00, 0x85, 0x3f], JAUNE = [0xfd, 0xef, 0x42], NUIT = [0x00, 0x3d, 0x24]
// Formes dessinées sur une grille de 512 × 512, dans la zone sûre des icônes « maskable ».
const pages = [
  [[112, 176], [248, 206], [248, 362], [112, 332]],
  [[264, 206], [400, 176], [400, 332], [264, 362]],
]
const lignes = [0.32, 0.5, 0.68] // lignes d'écriture sur chaque page

const dans = (x, y, poly) => {
  let ok = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) ok = !ok
  }
  return ok
}
function couleur(x, y) {
  for (const p of pages) {
    if (!dans(x, y, p)) continue
    // Position relative sur la page, pour tracer les lignes.
    const t = (x - p[0][0]) / (p[1][0] - p[0][0])
    const haut = p[0][1] + t * (p[1][1] - p[0][1]), bas = p[3][1] + t * (p[2][1] - p[3][1])
    const v = (y - haut) / (bas - haut), u = Math.abs(t - 0.5)
    if (u < 0.36 && lignes.some((l) => Math.abs(v - l) < 0.022)) return NUIT
    return JAUNE
  }
  return VERT
}

const table = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0 })
const crc = (buf) => { let c = 0xffffffff; for (const b of buf) c = table[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0 }
const bloc = (type, data) => {
  const t = Buffer.from(type), len = Buffer.alloc(4), sum = Buffer.alloc(4)
  len.writeUInt32BE(data.length); sum.writeUInt32BE(crc(Buffer.concat([t, data])))
  return Buffer.concat([len, t, data, sum])
}

function png(taille) {
  const k = 512 / taille, ss = 4 // 4 × 4 échantillons par pixel pour lisser les bords
  const brut = Buffer.alloc(taille * (taille * 3 + 1))
  for (let y = 0; y < taille; y++) {
    brut[y * (taille * 3 + 1)] = 0
    for (let x = 0; x < taille; x++) {
      const s = [0, 0, 0]
      for (let i = 0; i < ss; i++) for (let j = 0; j < ss; j++) {
        const c = couleur((x + (i + 0.5) / ss) * k, (y + (j + 0.5) / ss) * k)
        s[0] += c[0]; s[1] += c[1]; s[2] += c[2]
      }
      const o = y * (taille * 3 + 1) + 1 + x * 3
      for (let n = 0; n < 3; n++) brut[o + n] = Math.round(s[n] / (ss * ss))
    }
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(taille, 0); ihdr.writeUInt32BE(taille, 4); ihdr[8] = 8; ihdr[9] = 2
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), bloc('IHDR', ihdr), bloc('IDAT', zlib.deflateSync(brut)), bloc('IEND', Buffer.alloc(0))])
}

fs.mkdirSync('public', { recursive: true })
for (const t of [192, 512]) fs.writeFileSync(`public/icon-${t}.png`, png(t))
console.log('icônes écrites dans public/')
