import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Reveal sutil: depois da hidratação, esconde apenas o que está abaixo da dobra e revela ao entrar na tela.
 * Sem JS ou com prefers-reduced-motion, tudo permanece visível. Sem CLS (só opacity/transform).
 */
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-reveal', 'show')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.setAttribute('data-reveal', 'hide')
        io.observe(el)
      }
    })
    return () => io.disconnect()
  }, [pathname])
}
