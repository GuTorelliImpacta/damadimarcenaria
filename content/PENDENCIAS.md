# Pendências com o cliente

Tudo aqui está no site como conteúdo **substituível**, nunca como fato. `npm run build:prod` falha enquanto houver
placeholder visível (fotos) ou resposta não confirmada (FAQ).

## Bloqueiam a publicação em produção
| # | Pendência | Onde entra |
|---|---|---|
| 1 | **12–24 fotos reais** (3–6 por ambiente), horizontais e verticais, luz natural; antes/depois se houver | `assets-cliente/projetos/<ambiente>/` + `src/data/projetos.ts` |
| 2 | Confirmar que as 3 fotos do perfil do Google são projetos dele e enviar os **originais** | idem |
| 3 | Resposta confirmada: **trabalha com projeto de arquiteto?** e **garantia** (prazo/condições) | `src/data/faq.ts` (remover `pendente: true`) |
| 4 | **Logo em vetor** (SVG/AI/PDF). Hoje é uma aproximação em SVG/texto, não a vetorização do original | `src/components/Logo.tsx`, `public/favicon.svg`, `scripts/brand.mjs` |

## Dados a confirmar
- **CNPJ e razão social** (é "Damadi Móveis e Decorações"?) para rodapé e privacidade. Hoje o rodapé não exibe CNPJ.
- **Domínio** `marcenariadamadi.com.br`: existe? quem registrou? há site antigo (preservar URLs com redirect 301)? acesso ao registro.br/DNS. Trocar em `.env` (`VITE_SITE_URL`).
- **Link do perfil no Google** (para a nota 5,0 virar link e entrar em `sameAs`): `SITE.googlePerfilUrl` em `src/data/site.ts`.
- **Prazos reais** em semanas (`SITE.prazoSemanas`) — vazio = "prazo combinado em contrato".
- **Formas de pagamento reais** (o site só diz "condições especiais", como no flyer).
- Atende **sábado por agendamento**? **Região atendida**?
- Significado do campo **"Entrega 09:00–17:00"** do Google.
- **Avaliações reais autorizadas** (hoje só a nota 5,0 / 6 avaliações do Google, sem depoimentos).
- Autorização para usar o nome **"Junior"** na copy ("Falar com o Junior").
- Confirmar **posicionamento**: custo-benefício/prazo (adotado) vs. alto padrão. A mudança cabe nos textos de `src/components/Secoes.tsx`, `Hero.tsx` e `src/data/*`.
- Confirmar os "**+20 anos**" (vêm do flyer).
- **Coordenadas (geo)** do Maps: não incluídas no JSON-LD para não inventar.
- Se for usar analytics: escolher a ferramenta (Plausible/Umami) e preencher `.env`.

## Fora do escopo deste repositório (a fazer no Google)
Ver `docs/GOOGLE-BUSINESS-PROFILE.md`.
