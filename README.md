# Marcenaria Damadi Junior — site

Site institucional + portfólio. Objetivo único: **gerar conversa de orçamento no WhatsApp**.
Stack: Vite + React 18 + TypeScript (strict) + Tailwind 4, pré-renderizado (SSG) por rota. Sem backend, banco ou formulário.

## Rodar
```bash
npm ci
npm run dev          # desenvolvimento
npm run build        # gera dist/ pré-renderizado (preview)
npm run build:prod   # build + check:placeholders + check:bundle (falha se faltar foto real/resposta confirmada)
npm run lint && npm run typecheck && npm test
npx playwright install chromium && npm run test:e2e   # smoke de CTAs, CSP, axe
node scripts/serve.mjs                                # serve dist/ com os cabeçalhos do vercel.json (porta 4173)
```
Variáveis (`.env`, ver `.env.example`; **são públicas**): `VITE_SITE_URL`, `VITE_ANALYTICS_DOMAIN`, `VITE_ANALYTICS_SRC`.

## Publicar
Vercel (preferida): importe o repositório, framework "Vite", build `npm run build`, saída `dist`.
`vercel.json` já define `cleanUrls`, cache e cabeçalhos de segurança/CSP. Para Netlify, `public/_headers` faz o mesmo.
Para produção real use `npm run build:prod` como comando de build (só publica com fotos reais).
Domínio: adicione em Settings → Domains e aponte o DNS; depois defina `VITE_SITE_URL`.

## Como adicionar um projeto (sem programar)
1. Coloque a foto (JPEG/PNG, a maior disponível) em `assets-cliente/projetos/<ambiente>/`, ex. `cozinha/apto-55m2.jpg`.
   Ambientes: `cozinha`, `guarda-roupa`, `closet`, `home-office`, `paineis-ripados`, `espacos-pequenos`.
2. Em `src/data/projetos.ts`, copie o exemplo comentado e preencha `titulo`, `legenda` (até 12 palavras, só fatos reais), `arquivo` e `alt`. Use `destaque: true` em **uma** foto para virar a imagem do topo da home.
3. `npm run build`. O script gera AVIF/WebP/JPEG em 480/768/1200/1600 px; os originais não vão para o site.

Só publique fotos reais e autorizadas. Nunca fotos de flyer ou de banco.

## Onde editar textos
| O quê | Arquivo |
|---|---|
| Telefone, endereço, horário, Instagram, nota Google, prazo | `src/data/site.ts` |
| Ambientes e texto SEO de cada um | `src/data/ambientes.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Mensagens do WhatsApp | `src/lib/whatsapp.ts` |
| Passos, diferenciais, contato | `src/components/Secoes.tsx` |

## Estrutura
`src/` (components, data, lib, pages, styles) · `scripts/` (images, brand, postbuild, check-*, serve) · `e2e/` · `tests/` · `docs/` · `content/PENDENCIAS.md` · `DESIGN.md` · `DECISIONS.md` · `assets-cliente/` (originais, **não versionado**).

## Segurança
Sem `dangerouslySetInnerHTML`/`eval` (regra de ESLint), CSP estrita, HSTS e demais cabeçalhos em `vercel.json`, links externos com `noopener noreferrer`, Dependabot e `npm audit` no CI. Ative *secret scanning* e *push protection* no GitHub e proteja a branch `main` exigindo o workflow **CI**.
