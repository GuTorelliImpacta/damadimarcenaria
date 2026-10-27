// Gera sitemap.xml e robots.txt a partir das rotas pré-renderizadas em dist/.
import { readdir, readFile, writeFile, rename, rm } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import path from 'node:path'

const SITE = (process.env.VITE_SITE_URL || 'https://marcenariadamadi.com.br').replace(/\/$/, '')
const DIST = 'dist'

async function* paginas(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* paginas(p)
    else if (e.name === 'index.html') yield p
  }
}

// 404: hospedagem estática serve /404.html para rotas inexistentes
if (existsSync(`${DIST}/404/index.html`)) {
  await rename(`${DIST}/404/index.html`, `${DIST}/404.html`)
  await rm(`${DIST}/404`, { recursive: true, force: true })
}

// CSP estrita (script-src 'self'): move scripts inline de hidratação para arquivos com hash
// e os coloca ANTES do módulo principal (a ordem de execução dos scripts defer segue o documento).
let externalizados = 0
async function externalizar(f) {
  const html = await readFile(f, 'utf8')
  const tags = []
  const jobs = []
  const semInline = html.replace(/<script>([^<]+)<\/script>/g, (_, codigo) => {
    const h = createHash('sha256').update(codigo).digest('hex').slice(0, 10)
    jobs.push(writeFile(path.join(DIST, 'assets', `inline-${h}.js`), codigo))
    tags.push(`<script defer src="/assets/inline-${h}.js"></script>`)
    return ''
  })
  if (!tags.length) return
  await Promise.all(jobs)
  externalizados += tags.length
  const idx = semInline.search(/<script type="module"/)
  await writeFile(f, semInline.slice(0, idx) + tags.join('') + semInline.slice(idx))
}
for await (const f of paginas(DIST)) await externalizar(f)
if (existsSync(`${DIST}/404.html`)) await externalizar(`${DIST}/404.html`)
console.log(`postbuild: ${externalizados} script(s) inline externalizado(s)`)

const urls = []
for await (const f of paginas(DIST)) {
  const rota = '/' + path.relative(DIST, path.dirname(f)).split(path.sep).join('/')
  urls.push(rota === '/.' || rota === '/' ? '/' : rota)
}
urls.sort()
const hoje = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((u) => `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc><lastmod>${hoje}</lastmod></url>`)
  .join('\n')}\n</urlset>\n`
await writeFile(path.join(DIST, 'sitemap.xml'), xml)
await writeFile(
  path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
)
console.log(`postbuild: sitemap com ${urls.length} URL(s)`)
