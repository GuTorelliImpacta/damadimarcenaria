# Design — "Oficina Contemporânea"

Calor de madeira + precisão geométrica da marca (losango, ripado, filetes). Tokens em `src/styles/index.css` (`@theme`).

## Paleta (escalas 50–900)
`cream` (fundo), `olive` (seções de destaque; **olive-700** como fundo com texto creme), `copper` (acentos; **copper-600** como fundo de botão), `khaki` (filetes), `ink` (texto), `wa` (botão WhatsApp, **wa-600**).

Os tons de referência das artes (#B8651B cobre, #128C4A verde) **não passam AA com texto branco** (4,3:1); por isso:
- botão primário = `copper-600` #9A5214 (5,9:1 com branco);
- botão WhatsApp = `wa-600` #0F7A40 (5,4:1);
- seção olive = `olive-700` #5F5F3C (6:1 com creme).

Contraste verificado automaticamente em `tests/contraste.test.ts` (≥ 4,5:1 nos pares usados) e por axe (WCAG 2.2 AA) no e2e.

## Tipografia
Sora (títulos, 700/600) + Inter (corpo). Escala fluida com `clamp()`: H1 32→56 px, corpo 16–18 px, entrelinha 1,55.

## Elementos de marca (CSS/SVG, zero imagem)
- **Losango**: `clip-path`, marcador de lista e numeração dos passos.
- **Ripado**: classe `.ripado` (`repeating-linear-gradient`, baixa opacidade).
- **Colmeia**: `.colmeia`, SVG inline em data-URI, 6% de opacidade.
- **Filetes** `khaki` e corte angular (`.corte-angular`).
- Raio 8–12 px.

## Componentes
Header (menu acessível), Hero (foto real se houver; senão bloco tipográfico), TrustBar, Galeria (filtro com `aria-pressed`, grade bento, "ver mais"), Lightbox (`<dialog>` nativo, carregado sob demanda), Processo, Diferenciais, Avaliações, FAQ (`<details>`), Contato (+ mapa sob clique), StickyCTA (mobile, safe-area), Footer.

## Movimento
150–300 ms; reveal por `IntersectionObserver` só abaixo da dobra; zoom de card com `transform`; `prefers-reduced-motion` respeitado; sem libs.

## CTA
Um primário por tela ("Pedir orçamento" → WhatsApp), secundário "Ver projetos", terciários Ligar / Como chegar. Alvos ≥ 48 px (barra fixa 56 px).
