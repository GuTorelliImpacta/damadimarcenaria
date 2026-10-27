import { infoImagem } from '@/lib/imagens'

interface Props {
  arquivo: string
  alt: string
  sizes: string
  prioridade?: boolean
  className?: string
}

/** AVIF + WebP + JPEG com srcset. Dimensões sempre declaradas (zero CLS). */
export function Picture({ arquivo, alt, sizes, prioridade = false, className }: Props) {
  const info = infoImagem(arquivo)
  if (!info) return null
  const set = (ext: string) =>
    info.larguras.map((w) => `/img/${info.base}-${w}.${ext} ${w}w`).join(', ')
  const maior = info.larguras[info.larguras.length - 1]
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/img/${info.base}-${maior}.jpg`}
        srcSet={set('jpg')}
        sizes={sizes}
        width={info.w}
        height={info.h}
        alt={alt}
        className={className}
        loading={prioridade ? 'eager' : 'lazy'}
        decoding={prioridade ? 'sync' : 'async'}
        {...(prioridade ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  )
}
