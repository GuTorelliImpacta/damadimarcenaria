import { Link } from 'react-router-dom'
import { PROJETOS } from '@/data/projetos'
import { infoImagem } from '@/lib/imagens'
import { Picture } from './Picture'
import { WhatsappButton } from './CtaLink'
import { StatusAberto } from './StatusAberto'

const SUB =
  'Mais de 20 anos de marcenaria: projeto cuidadoso, prazo combinado e condições especiais de pagamento.'

export function Hero() {
  const foto = PROJETOS.find((p) => p.destaque && infoImagem(p.arquivo))

  return (
    <section
      aria-labelledby="h1"
      className="on-ink relative overflow-hidden bg-ink-900 text-cream-100"
    >
      {foto ? (
        <div className="absolute inset-0">
          <Picture
            arquivo={foto.arquivo}
            alt={foto.alt}
            sizes="100vw"
            prioridade
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink-900 via-ink-900/70 to-ink-900/20 md:bg-linear-to-r md:from-ink-900 md:via-ink-900/80 md:to-transparent" />
        </div>
      ) : (
        <>
          {/* Sem foto real ainda: bloco tipográfico + ripado + losango (slot de foto: ver PENDENCIAS.md) */}
          <div className="ripado on-dark colmeia absolute inset-0" aria-hidden="true" />
          <div
            className="losango-clip absolute -right-24 top-1/2 size-[22rem] -translate-y-1/2 bg-copper-500/90 sm:size-[30rem] md:right-[-4rem] lg:right-8 lg:size-[34rem]"
            aria-hidden="true"
            data-placeholder="hero-foto"
          />
        </>
      )}

      <div className="container-x relative flex min-h-[78svh] flex-col justify-end pb-10 pt-20 md:min-h-[34rem] md:justify-center md:py-24">
        <p className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-khaki-300">
          <span className="h-px w-8 bg-khaki-400" aria-hidden="true" />
          Marcenaria em Tremembé · São Paulo
        </p>
        <h1 id="h1" className="max-w-[16ch] text-cream-50 md:max-w-[18ch]">
          Móveis planejados sob medida para o seu espaço
        </h1>
        <p className="mt-5 max-w-xl text-lg text-cream-200">{SUB}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WhatsappButton origem="hero" className="sm:min-w-52">
            Pedir orçamento
          </WhatsappButton>
          <Link to="/#projetos" className="btn btn-outline text-cream-50">
            Ver projetos
          </Link>
        </div>
        <p className="mt-4 text-sm text-cream-300">Mande uma foto e as medidas do espaço.</p>
        <StatusAberto className="mt-1 text-cream-300" />
      </div>
      <div id="hero-fim" aria-hidden="true" />
    </section>
  )
}
