import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { StickyCTA } from './StickyCTA'
import { useReveal } from './Reveal'
import { iniciarAnalytics } from '@/lib/analytics'

function useScrollHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}

export function Layout() {
  useScrollHash()
  useReveal()
  useEffect(iniciarAnalytics, [])
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded bg-ink-900 px-4 py-3 text-cream-50 focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
