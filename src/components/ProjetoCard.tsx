import { Link } from 'react-router-dom'
import clsx from 'clsx'
import type { Ambiente } from '@/data/ambientes'
import type { Projeto } from '@/data/projetos'
import { waAmbiente, waProjeto } from '@/lib/whatsapp'
import { Picture } from './Picture'
import { WhatsappButton } from './CtaLink'
import { Losango } from './Icons'

interface Props {
  projeto: Projeto
  grande?: boolean
  onAbrir: (id: string) => void
}

export function ProjetoCard({ projeto, grande, onAbrir }: Props) {
  return (
    <article
      data-reveal=""
      className={clsx(
        'card flex flex-col overflow-hidden rounded-card bg-cream-50 shadow-card',
        grande && 'md:col-span-2 md:row-span-2',
      )}
    >
      <button
        type="button"
        onClick={() => onAbrir(projeto.id)}
        className="card-img block overflow-hidden"
        aria-label={`Ampliar foto: ${projeto.titulo}`}
      >
        <Picture
          arquivo={projeto.arquivo}
          alt={projeto.alt}
          sizes={grande ? '(min-width:768px) 66vw, 100vw' : '(min-width:768px) 33vw, 100vw'}
          className="aspect-4/3 w-full object-cover"
        />
      </button>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3>{projeto.titulo}</h3>
        <p className="text-sm text-ink-700">{projeto.legenda}</p>
        <WhatsappButton
          href={waProjeto(projeto.titulo)}
          origem="card"
          evento={{ projeto: projeto.id }}
          variante="outline"
          className="mt-auto min-h-12 text-sm text-copper-700"
        >
          Quero algo assim
        </WhatsappButton>
      </div>
    </article>
  )
}

/** Cartão-esqueleto: enquanto não há foto real do ambiente. Bloqueia build de produção (check:placeholders). */
export function CardAmbiente({ ambiente, grande }: { ambiente: Ambiente; grande?: boolean }) {
  return (
    <article
      data-reveal=""
      data-placeholder="foto-ambiente"
      className={clsx(
        'card flex flex-col overflow-hidden rounded-card bg-cream-50 shadow-card',
        grande && 'md:col-span-2 md:row-span-2',
      )}
    >
      <div className="ripado colmeia relative flex aspect-4/3 w-full items-center justify-center bg-cream-200 md:aspect-auto md:min-h-48 md:flex-1">
        <span className="losango-clip flex size-24 items-center justify-center bg-copper-500 text-center text-[0.7rem] font-semibold uppercase leading-tight tracking-wider text-white">
          Foto
          <br />
          em breve
        </span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="flex items-center gap-2">
          <Losango className="size-2.5 text-copper-500" />
          {ambiente.nome}
        </h3>
        <p className="text-sm text-ink-700">{ambiente.descricao}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          <Link
            to={`/portfolio/${ambiente.slug}`}
            className="btn btn-outline min-h-12 flex-1 text-sm text-ink-900"
          >
            Ver {ambiente.nome.toLowerCase()}
          </Link>
          <WhatsappButton
            href={waAmbiente(ambiente.paraMensagem)}
            origem="card"
            evento={{ ambiente: ambiente.slug }}
            className="min-h-12 flex-1 text-sm"
          >
            Orçamento
          </WhatsappButton>
        </div>
      </div>
    </article>
  )
}
