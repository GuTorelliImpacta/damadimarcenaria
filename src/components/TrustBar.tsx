import { SITE } from '@/data/site'
import { IconStar, Losango } from './Icons'

export function TrustBar() {
  const nota = (
    <>
      <IconStar className="size-4 text-copper-600" />
      <span>
        <strong>{SITE.avaliacao.nota}</strong> no Google
      </span>
    </>
  )
  const itens = [
    `+${SITE.anosExperiencia} anos de experiência`,
    'Entrega no prazo',
    'Condições especiais',
  ]
  return (
    <section aria-label="Por que confiar" className="border-b border-khaki-400/40 bg-cream-50">
      <ul className="container-x grid grid-cols-2 gap-x-4 gap-y-3 py-5 text-sm font-medium text-ink-800 md:flex md:flex-wrap md:items-center md:justify-between">
        <li className="flex items-center gap-2">
          {SITE.googlePerfilUrl ? (
            <a
              href={SITE.googlePerfilUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 no-underline"
            >
              {nota}
            </a>
          ) : (
            nota
          )}
        </li>
        {itens.map((t) => (
          <li key={t} className="flex items-center gap-2">
            <Losango className="size-2 text-copper-500" />
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}
