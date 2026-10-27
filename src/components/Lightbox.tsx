import { useEffect, useRef } from 'react'
import type { Projeto } from '@/data/projetos'
import { waProjeto } from '@/lib/whatsapp'
import { Picture } from './Picture'
import { WhatsappButton } from './CtaLink'

/** Lightbox com <dialog> nativo: foco preso, Esc e aria-modal vêm do navegador. Carregado sob demanda. */
export default function Lightbox({
  projeto,
  onFechar,
}: {
  projeto: Projeto
  onFechar: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (d && !d.open) d.showModal()
    // Clique no backdrop fecha (listener nativo: o <dialog> segue semântico para leitores de tela)
    const fora = (e: MouseEvent) => e.target === d && d?.close()
    d?.addEventListener('click', fora)
    return () => {
      d?.removeEventListener('click', fora)
      d?.close()
    }
  }, [])

  return (
    <dialog
      ref={ref}
      onClose={onFechar}
      aria-label={projeto.titulo}
      className="m-auto max-h-[92svh] w-[min(96vw,64rem)] overflow-auto rounded-card bg-cream-50 p-0 text-ink-900"
    >
      <Picture
        arquivo={projeto.arquivo}
        alt={projeto.alt}
        sizes="(min-width:1024px) 1024px, 96vw"
        className="max-h-[70svh] w-full object-contain"
      />
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg">{projeto.titulo}</h2>
          <p className="text-sm text-ink-700">{projeto.legenda}</p>
        </div>
        <div className="flex gap-2">
          <WhatsappButton
            href={waProjeto(projeto.titulo)}
            origem="galeria"
            evento={{ projeto: projeto.id }}
          >
            Quero algo assim
          </WhatsappButton>
          <button type="button" className="btn btn-outline" onClick={() => ref.current?.close()}>
            Fechar
          </button>
        </div>
      </div>
    </dialog>
  )
}
