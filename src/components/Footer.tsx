import { Link } from 'react-router-dom'
import { SITE } from '@/data/site'
import { AMBIENTES } from '@/data/ambientes'
import { Logo } from './Logo'

export function Footer() {
  const ano = new Date().getFullYear()
  return (
    <footer className="on-dark bg-olive-900 pb-28 pt-12 text-cream-200 md:pb-12">
      <div className="container-x grid gap-8 md:grid-cols-3">
        <div>
          <Logo tom="escuro" />
          <p className="mt-4 text-sm">
            {SITE.endereco.rua}, {SITE.endereco.bairro}
            <br />
            {SITE.endereco.cidade} – {SITE.endereco.uf}
          </p>
        </div>
        <nav aria-label="Ambientes">
          <h2 className="text-base text-cream-50">Ambientes</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {AMBIENTES.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/portfolio/${a.slug}`}
                  className="inline-flex min-h-8 items-center text-cream-200"
                >
                  {a.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Institucional">
          <h2 className="text-base text-cream-50">Institucional</h2>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <Link to="/sobre" className="inline-flex min-h-8 items-center text-cream-200">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/privacidade" className="inline-flex min-h-8 items-center text-cream-200">
                Privacidade
              </Link>
            </li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-8 items-center text-cream-200"
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-x mt-10 border-t border-cream-100/15 pt-6 text-xs text-cream-300">
        © {ano} {SITE.nome}. Todos os direitos reservados.
      </div>
    </footer>
  )
}
