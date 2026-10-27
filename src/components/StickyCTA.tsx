import { useEffect, useState } from 'react'
import { WhatsappButton, LigarButton } from './CtaLink'

/** Barra fixa (só mobile): aparece depois do hero; respeita safe-area; o footer tem padding para não ficar coberto. */
export function StickyCTA() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const alvo = document.getElementById('hero-fim')
    if (!alvo) {
      const onScroll = () => setVisivel(window.scrollY > 240)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }
    let passouHero = false
    let noContato = false
    const atualizar = () => setVisivel(passouHero && !noContato)
    const io = new IntersectionObserver(([e]) => {
      if (e) passouHero = !e.isIntersecting && e.boundingClientRect.top < 0
      atualizar()
    })
    io.observe(alvo)
    // Já no bloco de contato os botões estão na tela: a barra some para não duplicar.
    const contato = document.getElementById('contato')
    const io2 = new IntersectionObserver(([e]) => {
      noContato = !!e?.isIntersecting
      atualizar()
    })
    if (contato) io2.observe(contato)
    return () => {
      io.disconnect()
      io2.disconnect()
    }
  }, [])

  return (
    <div
      aria-hidden={!visivel}
      // @ts-expect-error `inert` ainda não está nos tipos do React 18
      inert={visivel ? undefined : ''}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-khaki-400/60 bg-cream-50/95 px-3 pt-2 backdrop-blur transition-transform duration-300 md:hidden ${visivel ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="mx-auto flex max-w-xl gap-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <WhatsappButton origem="sticky" className="min-h-14 flex-1" variante="wa">
          Pedir orçamento
        </WhatsappButton>
        <LigarButton origem="sticky" className="min-h-14 text-ink-900" />
      </div>
    </div>
  )
}
