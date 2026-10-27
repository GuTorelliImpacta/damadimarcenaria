# Decisões

| Decisão | Por quê |
|---|---|
| **Vite + React 18 + `vite-react-ssg`** (não Next export) | Pré-renderiza cada rota em HTML estático (checado: HTML válido com JS desligado, em e2e). Mantém o JS inicial em 88 KB gz (limite 100). Next export traria runtime maior. |
| **Vite 7** (não 8) | `vite-react-ssg@0.9` declara peer `^6.4 \|\| ^7.3 \|\| ^8`, mas `@vitejs/plugin-react@6` exige Vite 8; fixamos plugin-react 5 + Vite 7 (combinação estável sem `--force`). |
| **Tailwind v4** via `@tailwindcss/vite` | Tokens em `@theme`, sem config JS. |
| **CSP estrita** (`script-src 'self'`, `style-src 'self'`) | O SSG emite 2 scripts inline de hidratação por página; `scripts/postbuild.mjs` os move para `/assets/inline-<hash>.js` (com `defer`, antes do módulo). Critical CSS inline (beasties) foi **desligado** pelo mesmo motivo; o CSS tem 7 KB gz. Sem atributos `style=` (usar classes). |
| **Sem `style=`/cor dominante nas imagens** | Consequência da CSP; placeholder é cor sólida do tema. |
| **Posicionamento**: "marcenaria experiente, projeto sob medida, prazo cumprido, preço justo" | Segue as artes do cliente; sem "luxo/alto padrão". |
| **Sem `geo` nem `aggregateRating` no JSON-LD** | Coordenadas não foram obtidas (não inventar). Avaliação do próprio negócio não gera rich result e exige espelhar o Google; a nota aparece só como texto na página. |
| **Cartões "Foto em breve"** com `data-placeholder` | Mostra os ambientes e leva ao WhatsApp mesmo sem fotos; `check:placeholders` impede publicar assim. |
| **`build` vs `build:prod`** | `build` gera preview; `build:prod` encadeia placeholders + orçamento de bundle. |
| **Fontes**: Sora (títulos) + Inter (corpo), variáveis, subset latin, self-host | 2 famílias; fallbacks com `size-adjust` (CLS 0 medido). Só a Sora tem preload. |
| **Mapa**: cartão estático + iframe sob clique | Sem iframe pesado no carregamento; `frame-src` só para google.com. |
| **Analytics opcional** (Plausible, sem cookie) | Desligado por padrão (`VITE_ANALYTICS_DOMAIN` vazio); respeita Do Not Track. |
| **Logo** | Sem os arquivos originais no repositório, a marca é aproximada em SVG/texto. Pedir vetor. |
| **Mensagens de WhatsApp** centralizadas em `src/lib/whatsapp.ts` | Com `encodeURIComponent` e sanitização; testadas. |
| **Horário aberto/fechado** | Calculado no fuso `America/Sao_Paulo` com `Intl`; fallback estático "Seg–sex, 8h30–18h" no HTML. |
