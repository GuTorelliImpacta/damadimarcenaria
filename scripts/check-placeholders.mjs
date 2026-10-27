// Falha o build de PRODUÇÃO se restar placeholder visível, imagem de flyer/banco ou "TODO".
// Uso: npm run check:placeholders  (roda após o build; `npm run build:prod` já encadeia).
import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const erros = []
async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else yield p
  }
}

// 1) HTML pré-renderizado: marcadores de placeholder e "TODO" visível
if (!existsSync('dist')) {
  console.error('dist/ não existe. Rode `npm run build` antes.')
  process.exit(2)
}
for await (const f of walk('dist')) {
  if (!f.endsWith('.html')) continue
  const html = await readFile(f, 'utf8')
  const visivel = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
  if (/data-placeholder=/.test(visivel))
    erros.push(`${f}: contém placeholder visível (data-placeholder)`)
  if (/data-pendente=/.test(visivel))
    erros.push(`${f}: contém resposta/conteúdo pendente de confirmação (data-pendente)`)
  if (/\bTODO\b/.test(visivel)) erros.push(`${f}: contém "TODO"`)
}

// 2) Fonte: "TODO" em dados de conteúdo
for await (const f of walk('src/data')) {
  const t = await readFile(f, 'utf8')
  if (/\bTODO\b/.test(t.replace(/^\s*\/\/.*$/gm, ''))) erros.push(`${f}: contém "TODO"`)
}

// 3) Imagens de flyer/banco jamais vão para o build
if (existsSync('public/img')) {
  for await (const f of walk('public/img')) {
    if (/flyer|banco|stock|shutterstock|unsplash/i.test(f))
      erros.push(`${f}: nome sugere flyer/banco de imagens`)
  }
}
if (existsSync('assets-cliente/projetos')) {
  for await (const f of walk('assets-cliente/projetos')) {
    if (/flyer|logo/i.test(path.basename(f)))
      erros.push(`${f}: flyer/logo não pode estar em projetos/`)
  }
}

if (erros.length) {
  console.error('\ncheck:placeholders FALHOU:\n - ' + erros.join('\n - '))
  console.error(
    '\nResolva as pendências em content/PENDENCIAS.md (fotos reais, respostas do FAQ) antes de publicar em produção.',
  )
  process.exit(1)
}
console.log('check:placeholders: ok')
