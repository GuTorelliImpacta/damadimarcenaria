// Lê assets-cliente/projetos/**, gera AVIF+WebP+JPEG em 480/768/1200/1600 e o manifesto src/generated/images.json.
// Os originais nunca vão para o build. Sem fotos => manifesto vazio (o site mostra cartões "Foto em breve").
import { readdir, mkdir, writeFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'assets-cliente/projetos'
const OUT = 'public/img'
const MANIFEST = 'src/generated/images.json'
const LARGURAS = [480, 768, 1200, 1600]
const EXT = /\.(jpe?g|png|webp|tiff?)$/i

async function* arquivos(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* arquivos(p)
    else if (EXT.test(e.name)) yield p
  }
}

await rm(OUT, { recursive: true, force: true })
const manifest = {}

if (existsSync(SRC)) {
  await mkdir(OUT, { recursive: true })
  for await (const file of arquivos(SRC)) {
    const rel = path.relative(SRC, file).split(path.sep).join('/')
    const base = rel
      .replace(EXT, '')
      .replace(/[^a-z0-9]+/gi, '-')
      .toLowerCase()
    const img = sharp(file).rotate() // respeita EXIF; metadados (inclui GPS) não são copiados
    const meta = await img.metadata()
    const ow = meta.width ?? 0
    const oh = meta.height ?? 0
    if (!ow || !oh) continue
    const larguras = LARGURAS.filter((w) => w <= ow)
    if (!larguras.length) larguras.push(ow)
    for (const w of larguras) {
      const r = () => sharp(file).rotate().resize({ width: w, withoutEnlargement: true })
      await Promise.all([
        r().avif({ quality: 55, effort: 4 }).toFile(`${OUT}/${base}-${w}.avif`),
        r().webp({ quality: 74 }).toFile(`${OUT}/${base}-${w}.webp`),
        r().jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/${base}-${w}.jpg`),
      ])
    }
    const maior = larguras[larguras.length - 1]
    // width/height declarados = proporção da maior variante (evita CLS)
    manifest[rel] = { w: maior, h: Math.round((oh * maior) / ow), larguras, base }
    console.log('img', rel, larguras.join('/'))
  }
}

await mkdir(path.dirname(MANIFEST), { recursive: true })
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`images: ${Object.keys(manifest).length} imagem(ns)`)
