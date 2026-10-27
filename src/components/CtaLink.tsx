import clsx from 'clsx'
import type { ReactNode } from 'react'
import { SITE, type Origem } from '@/data/site'
import { track } from '@/lib/analytics'
import { waGeral } from '@/lib/whatsapp'
import { IconPhone, IconWhatsapp, IconPin, IconInstagram } from './Icons'

interface BaseProps {
  className?: string
  children?: ReactNode
  origem: Origem
}

const EXT = { target: '_blank', rel: 'noopener noreferrer' } as const

export function WhatsappButton({
  href = waGeral(),
  origem,
  children = 'Pedir orçamento',
  className,
  variante = 'primary',
  evento = {},
}: BaseProps & {
  href?: string
  variante?: 'primary' | 'wa' | 'outline'
  evento?: Record<string, string>
}) {
  return (
    <a
      href={href}
      {...EXT}
      onClick={() => track('click_whatsapp', { origem, ...evento })}
      className={clsx(
        'btn',
        variante === 'primary' && 'btn-primary',
        variante === 'wa' && 'btn-wa',
        variante === 'outline' && 'btn-outline',
        className,
      )}
    >
      <IconWhatsapp />
      {children}
    </a>
  )
}

export function LigarButton({ origem, className, children = 'Ligar' }: BaseProps) {
  return (
    <a
      href={`tel:${SITE.telefoneE164}`}
      onClick={() => track('click_ligar', { origem })}
      className={clsx('btn btn-outline', className)}
    >
      <IconPhone />
      {children}
    </a>
  )
}

export function MapsButton({ origem, className, children = 'Como chegar' }: BaseProps) {
  return (
    <a
      href={SITE.mapsUrl}
      {...EXT}
      onClick={() => track('click_maps', { origem })}
      className={clsx('btn btn-outline', className)}
    >
      <IconPin />
      {children}
    </a>
  )
}

export function InstagramButton({ origem, className, children = 'Instagram' }: BaseProps) {
  return (
    <a
      href={SITE.instagram}
      {...EXT}
      onClick={() => track('click_instagram', { origem })}
      className={clsx('btn btn-outline', className)}
    >
      <IconInstagram />
      {children}
    </a>
  )
}
