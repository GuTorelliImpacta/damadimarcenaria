/**
 * Analytics sem cookie (Plausible por padrão). Desligado se VITE_ANALYTICS_DOMAIN estiver vazio.
 * Eventos: click_whatsapp, click_ligar, click_maps, click_instagram, view_ambiente.
 */
type Props = Record<string, string>
declare global {
  interface Window {
    plausible?: (evento: string, opts?: { props?: Props }) => void
  }
}

export function track(evento: string, props?: Props) {
  try {
    window.plausible?.(evento, props ? { props } : undefined)
  } catch {
    /* analytics nunca pode quebrar a página */
  }
}

export function iniciarAnalytics() {
  const dominio = import.meta.env.VITE_ANALYTICS_DOMAIN as string | undefined
  const src = import.meta.env.VITE_ANALYTICS_SRC as string | undefined
  if (!dominio || !src || document.querySelector('script[data-analytics]')) return
  if (navigator.doNotTrack === '1') return
  const s = document.createElement('script')
  s.defer = true
  s.src = src
  s.dataset.domain = dominio
  s.dataset.analytics = '1'
  document.head.appendChild(s)
}
