import type { ReactNode } from 'react'
import clsx from 'clsx'
import { SITE } from '@/data/site'
import { FAQ } from '@/data/faq'
import { waGeral } from '@/lib/whatsapp'
import { WhatsappButton, LigarButton, MapsButton, InstagramButton } from './CtaLink'
import { Galeria } from './Galeria'
import { IconStar, Losango } from './Icons'
import { StatusAberto } from './StatusAberto'
import { MapaClique } from './MapaClique'

function Titulo({
  id,
  children,
  apoio,
  escuro,
}: {
  id: string
  children: ReactNode
  apoio?: string
  escuro?: boolean
}) {
  return (
    <header className="mb-8 max-w-2xl" data-reveal="">
      <p
        className={clsx(
          'mb-3 flex items-center gap-2',
          escuro ? 'text-khaki-300' : 'text-copper-600',
        )}
        aria-hidden="true"
      >
        <span className="h-px w-8 bg-current" />
        <Losango className="size-2" />
      </p>
      <h2 id={id}>{children}</h2>
      {apoio && <p className={clsx('mt-3', escuro ? 'text-cream-200' : 'text-ink-700')}>{apoio}</p>}
    </header>
  )
}

export function SecaoProjetos() {
  return (
    <section id="projetos" aria-labelledby="t-projetos" className="section scroll-mt-16">
      <div className="container-x">
        <Titulo id="t-projetos" apoio="Escolha um ambiente e veja como a gente resolve.">
          Nossos projetos
        </Titulo>
        <Galeria />
      </div>
    </section>
  )
}

const PASSOS = [
  ['Conversa e medição', 'Você conta o que precisa e a gente mede o espaço.'],
  ['Projeto', 'Desenhamos o móvel e você aprova antes de produzir.'],
  ['Produção', 'Fabricamos na oficina, com acompanhamento.'],
  ['Instalação', 'Levamos, montamos e deixamos tudo no lugar.'],
] as const

export function SecaoProcesso() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="t-processo"
      className="on-dark ripado section scroll-mt-16 bg-olive-700 text-cream-100"
    >
      <div className="container-x">
        <Titulo
          id="t-processo"
          escuro
          apoio={
            SITE.prazoSemanas
              ? `Prazo médio: ${SITE.prazoSemanas}.`
              : 'Prazo combinado em contrato, sem surpresa.'
          }
        >
          Como funciona
        </Titulo>
        <ol className="grid gap-6 md:grid-cols-4">
          {PASSOS.map(([t, d], i) => (
            <li key={t} data-reveal="" className="relative flex gap-4 md:flex-col">
              <span
                className="losango-clip flex size-12 shrink-0 items-center justify-center bg-khaki-300 font-display font-bold text-ink-900"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-cream-50">{t}</h3>
                <p className="mt-1 text-sm text-cream-200">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <WhatsappButton
            origem="processo"
            href={waGeral()}
            className="bg-cream-100 !text-ink-900 hover:bg-cream-200"
          >
            Começar pela medição
          </WhatsappButton>
        </div>
      </div>
    </section>
  )
}

const DIFERENCIAIS = [
  [
    `+${SITE.anosExperiencia} anos de marcenaria`,
    'Experiência de oficina em cada detalhe do móvel.',
  ],
  ['Excelente custo-benefício', 'Qualidade de projeto sob medida com preço justo.'],
  ['Entrega no prazo', 'O prazo combinado é o prazo cumprido.'],
  ['Condições especiais', 'Formas de pagamento que cabem no seu bolso.'],
] as const

export function SecaoDiferenciais() {
  return (
    <section aria-labelledby="t-dif" className="section">
      <div className="container-x">
        <Titulo id="t-dif">Por que a Damadi</Titulo>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DIFERENCIAIS.map(([t, d]) => (
            <li
              key={t}
              data-reveal=""
              className="rounded-card border border-khaki-400/60 bg-cream-50 p-5"
            >
              <Losango className="mb-3 size-3 text-copper-500" />
              <h3>{t}</h3>
              <p className="mt-1 text-sm text-ink-700">{d}</p>
            </li>
          ))}
        </ul>
        <div
          data-reveal=""
          className="corte-angular mt-6 bg-ink-900 px-6 pb-12 pt-8 text-cream-100"
        >
          <p className="font-display text-xl font-semibold sm:text-2xl">
            Pouco espaço? A gente aproveita cada centímetro.
          </p>
          <p className="mt-2 max-w-xl text-cream-300">
            Móveis planejados aproveitam até mesmo espaços mínimos.
          </p>
        </div>
      </div>
    </section>
  )
}

export function SecaoAvaliacoes() {
  const conteudo = (
    <>
      <span className="flex items-center gap-0.5 text-copper-600" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <IconStar key={i} className="size-5" />
        ))}
      </span>
      <span>
        <strong className="font-display text-xl">{SITE.avaliacao.nota}</strong> ·{' '}
        {SITE.avaliacao.quantidade} avaliações no Google
      </span>
    </>
  )
  return (
    <section aria-label="Avaliações" className="pb-4">
      <div className="container-x">
        <div
          data-reveal=""
          className="flex flex-col items-center justify-center gap-2 rounded-card border border-khaki-400/60 bg-cream-50 p-5 sm:flex-row sm:gap-4"
        >
          {SITE.googlePerfilUrl ? (
            <a
              href={SITE.googlePerfilUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 no-underline sm:flex-row sm:gap-4"
            >
              {conteudo}
            </a>
          ) : (
            conteudo
          )}
        </div>
      </div>
    </section>
  )
}

export function SecaoFaq() {
  return (
    <section id="duvidas" aria-labelledby="t-faq" className="section scroll-mt-16">
      <div className="container-x max-w-3xl">
        <Titulo id="t-faq">Dúvidas frequentes</Titulo>
        <div className="divide-y divide-khaki-400/60 rounded-card border border-khaki-400/60 bg-cream-50">
          {FAQ.map((f) => (
            <details
              key={f.p}
              className="group px-5"
              {...(f.pendente ? { 'data-pendente': 'true' } : {})}
            >
              <summary className="flex min-h-14 list-none items-center justify-between gap-4 py-3 font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                {f.p}
                <span
                  className="text-xl text-copper-600 transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-4 text-ink-700">{f.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SecaoContato() {
  const e = SITE.endereco
  return (
    <section
      id="contato"
      aria-labelledby="t-contato"
      className="on-ink bg-ink-900 py-16 text-cream-100 sm:py-20 scroll-mt-16"
    >
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <div>
          <Titulo
            id="t-contato"
            escuro
            apoio="Mande uma foto e as medidas do espaço. Respondemos em horário comercial (seg–sex, 8h30–18h)."
          >
            Vamos conversar sobre o seu móvel
          </Titulo>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsappButton origem="contato" href={waGeral()}>
              Pedir orçamento
            </WhatsappButton>
            <LigarButton origem="contato" className="text-cream-50" />
            <MapsButton origem="contato" className="text-cream-50" />
            <InstagramButton origem="contato" className="text-cream-50" />
          </div>
          <address className="mt-8 not-italic text-cream-200">
            <p className="font-semibold text-cream-50">{SITE.nome}</p>
            <p>
              {e.rua} – {e.bairro}
            </p>
            <p>
              {e.cidade} – {e.uf}, CEP {e.cep}
            </p>
            <p className="mt-2">
              <a href={`tel:${SITE.telefoneE164}`} className="text-cream-50 underline">
                {SITE.telefoneExibicao}
              </a>{' '}
              · {SITE.instagramUser}
            </p>
            <p className="mt-2 text-sm text-cream-300">
              {SITE.horario.texto} · sáb. e dom. fechado
            </p>
            <StatusAberto className="mt-1 text-cream-100" />
          </address>
        </div>
        <MapaClique />
      </div>
    </section>
  )
}
