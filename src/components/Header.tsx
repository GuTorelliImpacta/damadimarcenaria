import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Logo } from './Logo'
import { WhatsappButton } from './CtaLink'
import { IconClose, IconMenu } from './Icons'

const LINKS = [
  { to: '/#projetos', label: 'Projetos' },
  { to: '/#como-funciona', label: 'Como funciona' },
  { to: '/#duvidas', label: 'Dúvidas' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/#contato', label: 'Contato' },
]

export function Header() {
  const [aberto, setAberto] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!aberto) return
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAberto(false)
        btn.current?.focus()
      }
    }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [aberto])

  return (
    <header className="sticky top-0 z-40 border-b border-khaki-400/40 bg-cream-100/95 backdrop-blur supports-[backdrop-filter]:bg-cream-100/85">
      <div className="container-x flex h-16 items-center justify-between gap-2">
        <Link to="/" className="rounded">
          <Logo />
          <span className="sr-only"> – página inicial</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-ink-700 no-underline hover:text-copper-600"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <WhatsappButton origem="header" className="min-h-11 gap-1.5 px-2.5 py-2 text-sm">
            Orçamento
          </WhatsappButton>
          <button
            ref={btn}
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-lg text-ink-900 hover:bg-ink-900/5 md:hidden"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setAberto((v) => !v)}
          >
            {aberto ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Menu"
        hidden={!aberto}
        className="border-t border-khaki-400/40 bg-cream-50 md:hidden"
      >
        <ul className="container-x flex flex-col py-2">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setAberto(false)}
                className="flex min-h-12 items-center text-base font-medium text-ink-800 no-underline"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
