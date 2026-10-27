// Gera favicons PNG e a imagem Open Graph 1200×630 com a marca (sem foto de banco). Usa o Chromium do Playwright.
import { chromium } from 'playwright'
import { readFile } from 'node:fs/promises'

const sora = (await readFile('public/fonts/sora.woff2')).toString('base64')
const mark = (size, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="${size}" height="${size}">${bg ? `<rect width="40" height="40" fill="${bg}"/>` : ''}<path d="M20 1.5 38.5 20 20 38.5 1.5 20Z" fill="#b8651b"/><path d="M13.5 12.5h6.6c4.4 0 7.4 3 7.4 7.5s-3 7.5-7.4 7.5h-6.6Zm4 3.6v7.8h2.3c2.4 0 3.9-1.5 3.9-3.9s-1.5-3.9-3.9-3.9Z" fill="#f4f4ec" fill-rule="evenodd"/></svg>`

const og = `<html><head><style>
@font-face{font-family:Sora;src:url(data:font/woff2;base64,${sora}) format('woff2');font-weight:100 800}
body{margin:0;width:1200px;height:630px;background:#241a14;color:#f4f4ec;font-family:Sora;position:relative;overflow:hidden}
.r{position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(244,244,236,.06) 0 2px,transparent 2px 22px)}
.d{position:absolute;right:-120px;top:70px;width:560px;height:560px;background:#b8651b;clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)}
.c{position:absolute;left:80px;top:90px;width:700px}
.k{font-size:22px;letter-spacing:.3em;color:#d2c58f;text-transform:uppercase;display:flex;align-items:center;gap:16px}
.k i{display:block;width:48px;height:2px;background:#c2b280}
h1{font-size:66px;line-height:1.08;margin:28px 0 0;font-weight:700;letter-spacing:-.02em}
.n{position:absolute;left:80px;bottom:70px;font-size:40px;font-weight:700;letter-spacing:.16em;display:flex;align-items:center;gap:20px}
.n small{font-size:20px;font-weight:500;letter-spacing:.3em;color:#d2c58f;text-transform:uppercase}
</style></head><body><div class="r"></div><div class="d"></div>
<div class="c"><div class="k"><i></i>Tremembé · São Paulo</div><h1>Móveis planejados sob medida</h1></div>
<div class="n">${mark(64)}<span>DAMADI<br><small>marcenaria</small></span></div></body></html>`

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(og)
await page.evaluate('document.fonts.ready')
await page.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 86 })

for (const [file, size, bg] of [
  ['favicon-32.png', 32, null],
  ['apple-touch-icon.png', 180, '#f4f4ec'],
  ['icon-192.png', 192, '#f4f4ec'],
  ['icon-512.png', 512, '#f4f4ec'],
]) {
  const p = await browser.newPage({ viewport: { width: size, height: size } })
  await p.setContent(
    `<body style="margin:0;background:${bg ?? 'transparent'}">${mark(size, bg)}</body>`,
  )
  await p.screenshot({ path: `public/${file}`, omitBackground: !bg })
  await p.close()
}
await browser.close()
console.log('brand: ok')
