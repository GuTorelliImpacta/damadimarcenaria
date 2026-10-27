/**
 * Marca aproximada em SVG/texto a partir da descrição das artes (losango + DAMADI + junior + MARCENARIA).
 * ⚠️ Não é a vetorização do arquivo original. Pendência: pedir o logo em vetor ao cliente (PENDENCIAS.md).
 */
export function LogoMark({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path d="M20 1.5 38.5 20 20 38.5 1.5 20Z" fill="currentColor" />
      <path
        d="M13.5 12.5h6.6c4.4 0 7.4 3 7.4 7.5s-3 7.5-7.4 7.5h-6.6Zm4 3.6v7.8h2.3c2.4 0 3.9-1.5 3.9-3.9s-1.5-3.9-3.9-3.9Z"
        fill="#f4f4ec"
        fillRule="evenodd"
      />
    </svg>
  )
}

export function Logo({ tom = 'claro' }: { tom?: 'claro' | 'escuro' }) {
  const cor = tom === 'claro' ? 'text-ink-900' : 'text-cream-100'
  return (
    <span className={`inline-flex items-center gap-2 ${cor}`}>
      <LogoMark className="size-8 shrink-0 text-copper-500 sm:size-9" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-bold tracking-[0.14em] sm:text-[1.15rem]">
          DAMADI
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-[0.55rem] font-medium uppercase tracking-[0.3em]">
          <span className="h-px w-3 bg-khaki-500" />
          marcenaria
          <span className="h-px w-3 bg-khaki-500" />
        </span>
      </span>
    </span>
  )
}
