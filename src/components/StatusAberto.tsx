import { useEffect, useState } from 'react'
import { statusLoja, type Status } from '@/lib/horario'
import { SITE } from '@/data/site'
import { IconClock } from './Icons'

/** SSR/sem JS: horário fixo. Depois da hidratação: "Aberto agora / Fechado, abre às…" no fuso de SP. */
export function StatusAberto({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null)
  useEffect(() => {
    const atualizar = () => setStatus(statusLoja())
    atualizar()
    const t = setInterval(atualizar, 60_000)
    return () => clearInterval(t)
  }, [])

  return (
    <p className={`inline-flex items-center gap-2 text-sm font-medium ${className}`}>
      <IconClock className="size-4 shrink-0" />
      {status ? (
        <span aria-live="polite">
          <span
            className={`mr-1.5 inline-block size-2 rounded-full align-middle ${status.aberto ? 'bg-wa-500' : 'bg-copper-500'}`}
            aria-hidden="true"
          />
          {status.texto}
        </span>
      ) : (
        <span>{SITE.horario.texto}</span>
      )}
    </p>
  )
}
