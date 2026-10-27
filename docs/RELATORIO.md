# Relatório de auditoria (27/10/2026)

Medido localmente sobre `dist/` servido por `scripts/serve.mjs` (cabeçalhos do `vercel.json`, Brotli), Chromium headless, Lighthouse com throttling simulado padrão.

| | Mobile | Desktop |
|---|---|---|
| Performance | **98** | 94–100 |
| Acessibilidade | **100** | 100 |
| Boas práticas | **100** | 100 |
| SEO | **100** | 100 |
| LCP | 2,1 s (meta < 2,0; limite 2,5) | 1,3 s |
| CLS | **0** (meta < 0,05) | 0 |
| TBT | 10 ms | 0 ms |

- **JS inicial:** 88,8 KB gzip (limite 100). Home sem imagens: ~137 KB (limite 800). `npm run check:bundle`.
- **axe (WCAG 2.2 AA):** 0 violações em `/`, `/portfolio/cozinha`, `/sobre`, `/privacidade` a 360 e 1440 px.
- **e2e (23 testes):** sem erros de console/CSP em 6 rotas (incluindo 404), WhatsApp com mensagem correta (geral e por ambiente), Ligar/Como chegar, filtro, menu por teclado (Esc), barra fixa mobile, sem overflow em 360/390/768/1440, JSON-LD/NAP, HTML pré-renderizado com JS desligado.
- **Unitários (27):** mensagens de WhatsApp, horário aberto/fechado no fuso de SP, contraste AA.
- **Lint/typecheck:** limpos. Nenhum `dangerouslySetInnerHTML`/`eval`.
- **`npm audit`:** 0 altas/críticas; 3 moderadas em `react-router` 6.x (sem correção publicada; afetam recursos de servidor/framework que o site estático não usa).
- **Cabeçalhos:** CSP estrita, HSTS, nosniff, Referrer-Policy, Permissions-Policy, COOP, frame-ancestors none — verificados na resposta do servidor local. **Não medido:** securityheaders.com e Rich Results Test (exigem o site publicado), Lighthouse em Slow 4G + CPU 4x reais, INP (precisa de campo).

## Não cumprido / dependente do cliente
- LCP 2,1 s ficou acima da meta de 2,0 s (dentro do limite de 2,5 s); o gargalo é o CSS bloqueante, mantido externo por causa da CSP estrita.
- Fotos reais, logo vetorial e dados pendentes: `content/PENDENCIAS.md`. Sem elas, `npm run build:prod` falha de propósito.
- Deploy de preview não foi feito nesta sessão (sem projeto Vercel vinculado).
