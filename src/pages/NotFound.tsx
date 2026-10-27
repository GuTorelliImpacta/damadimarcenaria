import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { WhatsappButton } from '@/components/CtaLink'

export default function NotFound() {
  return (
    <section className="ripado section">
      <Seo
        titulo="Página não encontrada | Marcenaria Damadi"
        descricao="Esta página não existe."
        path="/404"
        noindex
      />
      <div className="container-x max-w-xl text-center">
        <p className="font-display text-6xl font-bold text-copper-600">404</p>
        <h1 className="mt-2 text-3xl">Não achamos essa página</h1>
        <p className="mt-3 text-ink-700">
          Mas o seu móvel a gente encontra. Volte ao início ou fale com a gente.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn btn-outline text-ink-900">
            Voltar ao início
          </Link>
          <WhatsappButton origem="erro404">Pedir orçamento</WhatsappButton>
        </div>
      </div>
    </section>
  )
}
export { NotFound as Component }
