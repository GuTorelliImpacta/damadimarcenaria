// Servidor estático de teste que replica vercel.json (cleanUrls + cabeçalhos de segurança + 404.html).
import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { brotliCompressSync } from 'node:zlib'

const cfg = JSON.parse(await readFile('vercel.json', 'utf8'))
const globais = Object.fromEntries(cfg.headers[0].headers.map((h) => [h.key, h.value]))
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
}
const port = Number(process.env.PORT || 4173)

async function achar(url) {
  const p = decodeURIComponent(url.split('?')[0])
  for (const c of [p, p + '.html', path.join(p, 'index.html')]) {
    const f = path.join('dist', path.normalize(c))
    if (!f.startsWith('dist')) continue
    try {
      if ((await stat(f)).isFile()) return f
    } catch {
      /* próximo */
    }
  }
  return null
}

http
  .createServer(async (req, res) => {
    let f = await achar(req.url ?? '/')
    let status = 200
    if (!f) {
      f = 'dist/404.html'
      status = 404
    }
    const ext = path.extname(f)
    const headers = { ...globais, 'Content-Type': MIME[ext] ?? 'application/octet-stream' }
    if (/^\/(assets|fonts|img)\//.test(req.url ?? ''))
      headers['Cache-Control'] = 'public, max-age=31536000, immutable'
    let body = await readFile(f)
    // Brotli como na Vercel/Netlify (woff2 e imagens já são comprimidos)
    if (
      /\.(html|js|css|json|svg|xml|txt|webmanifest)$/.test(f) &&
      /br/.test(req.headers['accept-encoding'] ?? '')
    ) {
      body = brotliCompressSync(body)
      headers['Content-Encoding'] = 'br'
    }
    res.writeHead(status, headers)
    res.end(body)
  })
  .listen(port, () => console.log(`serve: http://localhost:${port}`))
