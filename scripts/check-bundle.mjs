// Orçamento de bundle: JS inicial da home ≤ 100 KB gzip; home < 800 KB transferidos.
import { readFile, stat } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import path from 'node:path'

const html = await readFile('dist/index.html', 'utf8')
const refs = [...html.matchAll(/(?:src|href)="(\/[^"]+\.(?:js|css|woff2))"/g)].map((m) => m[1])
const preloads = [...html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="([^"]+)"/g)].map(
  (m) => m[1],
)
const unicos = [...new Set([...refs, ...preloads])]
let js = 0
let total = gzipSync(html).length
for (const r of unicos) {
  const buf = await readFile(path.join('dist', r))
  const gz = gzipSync(buf).length
  if (r.endsWith('.js')) js += gz
  total += r.endsWith('.woff2') ? buf.length : gz
  console.log(`${(gz / 1024).toFixed(1).padStart(7)} KB gz  ${r}`)
}
console.log(
  `JS inicial: ${(js / 1024).toFixed(1)} KB gzip (limite 100) | home (sem imagens lazy): ${(total / 1024).toFixed(1)} KB (limite 800)`,
)
if (js > 100 * 1024 || total > 800 * 1024) {
  console.error('check:bundle FALHOU')
  process.exit(1)
}
void stat
