import { lazy, Suspense, useMemo, useState } from 'react'
import clsx from 'clsx'
import { AMBIENTES, type Ambiente } from '@/data/ambientes'
import { PROJETOS, type Projeto } from '@/data/projetos'
import { infoImagem } from '@/lib/imagens'
import { waGeral } from '@/lib/whatsapp'
import { CardAmbiente, ProjetoCard } from './ProjetoCard'
import { WhatsappButton } from './CtaLink'

const Lightbox = lazy(() => import('./Lightbox'))
const POR_PAGINA = 6

export function Galeria({ ambienteFixo }: { ambienteFixo?: string }) {
  const [filtro, setFiltro] = useState<string>(ambienteFixo ?? 'todos')
  const [aberto, setAberto] = useState<string | null>(null)
  const [limite, setLimite] = useState(POR_PAGINA)

  type Item = { tipo: 'projeto'; p: Projeto } | { tipo: 'ambiente'; a: Ambiente }
  const itens = useMemo<Item[]>(() => {
    const ambientes = filtro === 'todos' ? AMBIENTES : AMBIENTES.filter((a) => a.slug === filtro)
    return ambientes.flatMap((a): Item[] => {
      const projetos = PROJETOS.filter((p) => p.ambiente === a.slug && infoImagem(p.arquivo))
      return projetos.length
        ? projetos.map((p) => ({ tipo: 'projeto' as const, p }))
        : [{ tipo: 'ambiente' as const, a }]
    })
  }, [filtro])

  const visiveis = itens.slice(0, limite)
  const projetoAberto = PROJETOS.find((p) => p.id === aberto)

  return (
    <div>
      {!ambienteFixo && (
        <div
          role="group"
          aria-label="Filtrar por ambiente"
          className="-mx-4 mb-6 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {[{ slug: 'todos', nome: 'Todos' }, ...AMBIENTES].map((a) => (
            <button
              key={a.slug}
              type="button"
              aria-pressed={filtro === a.slug}
              onClick={() => {
                setFiltro(a.slug)
                setLimite(POR_PAGINA)
              }}
              className={clsx(
                'min-h-12 shrink-0 snap-start rounded-full border-2 px-4 text-sm font-semibold transition-colors',
                filtro === a.slug
                  ? 'border-ink-900 bg-ink-900 text-cream-100'
                  : 'border-khaki-400 bg-transparent text-ink-800 hover:border-copper-600',
              )}
            >
              {a.nome}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {visiveis.map((it, i) =>
          it.tipo === 'projeto' ? (
            <ProjetoCard
              key={it.p.id}
              projeto={it.p}
              grande={i === 0 && visiveis.length > 3}
              onAbrir={setAberto}
            />
          ) : (
            <CardAmbiente key={it.a.slug} ambiente={it.a} grande={i === 0 && visiveis.length > 3} />
          ),
        )}
      </div>

      {itens.length > limite && (
        <div className="mt-6 text-center">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setLimite((l) => l + POR_PAGINA)}
          >
            Ver mais projetos
          </button>
        </div>
      )}

      <div className="mt-10 rounded-card border border-khaki-400/60 bg-cream-50 p-5 text-center">
        <p className="font-display text-lg font-semibold">Gostou? Fale sobre o seu ambiente.</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-ink-700">
          Mande uma foto e as medidas do espaço.
        </p>
        <WhatsappButton origem="galeria" href={waGeral()} className="mt-4">
          Pedir orçamento
        </WhatsappButton>
      </div>

      {projetoAberto && (
        <Suspense fallback={null}>
          <Lightbox projeto={projetoAberto} onFechar={() => setAberto(null)} />
        </Suspense>
      )}
    </div>
  )
}
