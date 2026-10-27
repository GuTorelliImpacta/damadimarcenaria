import { useState } from 'react'
import { SITE } from '@/data/site'
import { track } from '@/lib/analytics'
import { IconPin } from './Icons'

const EMBED = `https://www.google.com/maps?q=${encodeURIComponent('Rua Carmésia, 42, Tremembé, São Paulo - SP, 02350-060')}&output=embed`

/** Mapa leve: cartão estático que abre o Google Maps; o iframe só carrega sob clique. */
export function MapaClique() {
  const [ativo, setAtivo] = useState(false)
  if (ativo) {
    return (
      <iframe
        title="Mapa: Marcenaria Damadi Junior, Rua Carmésia, 42, Tremembé"
        src={EMBED}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="aspect-4/3 w-full rounded-card border-0 lg:aspect-auto lg:min-h-80"
      />
    )
  }
  return (
    <div className="ripado on-dark relative flex min-h-64 flex-col items-center justify-center gap-4 overflow-hidden rounded-card bg-olive-800 p-6 text-center">
      <span className="losango-clip flex size-20 items-center justify-center bg-copper-500 text-white">
        <IconPin className="size-8" />
      </span>
      <p className="font-display text-lg font-semibold text-cream-50">
        {SITE.endereco.rua} – {SITE.endereco.bairro}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('click_maps', { origem: 'mapa' })}
          className="btn btn-primary"
        >
          Abrir no Google Maps
        </a>
        <button
          type="button"
          className="btn btn-outline text-cream-50"
          onClick={() => setAtivo(true)}
        >
          Ver mapa aqui
        </button>
      </div>
    </div>
  )
}
