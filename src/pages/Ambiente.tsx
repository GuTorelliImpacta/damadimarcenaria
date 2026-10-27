import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AMBIENTES, ambientePorSlug } from '@/data/ambientes'
import { Seo } from '@/components/Seo'
import { Galeria } from '@/components/Galeria'
import { WhatsappButton, LigarButton } from '@/components/CtaLink'
import { waAmbiente } from '@/lib/whatsapp'
import { jsonLdBreadcrumb, jsonLdNegocio } from '@/lib/seo'
import { track } from '@/lib/analytics'
import NotFound from './NotFound'

export const getStaticPaths = () => AMBIENTES.map((a) => `portfolio/${a.slug}`)

export function Component() {
  const { ambiente: slug } = useParams()
  const a = ambientePorSlug(slug)
  useEffect(() => {
    if (a) track('view_ambiente', { ambiente: a.slug })
  }, [a])
  if (!a) return <NotFound />

  return (
    <>
      <Seo
        titulo={`${a.titulo} | Marcenaria Damadi – Tremembé, SP`}
        descricao={a.metaDescription}
        path={`/portfolio/${a.slug}`}
        jsonLd={[
          jsonLdNegocio(),
          jsonLdBreadcrumb([
            { nome: 'Início', path: '/' },
            { nome: a.nome, path: `/portfolio/${a.slug}` },
          ]),
        ]}
      />
      <section className="ripado bg-cream-200 py-12 sm:py-16">
        <div className="container-x">
          <nav aria-label="Você está em" className="mb-4 text-sm text-ink-700">
            <Link to="/">Início</Link> / <span aria-current="page">{a.nome}</span>
          </nav>
          <h1 className="max-w-[20ch]">{a.titulo}</h1>
          <div className="mt-5 max-w-2xl space-y-3 text-ink-800">
            {a.texto.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WhatsappButton
              origem="ambiente"
              href={waAmbiente(a.paraMensagem)}
              evento={{ ambiente: a.slug }}
            >
              Pedir orçamento de {a.nome.toLowerCase()}
            </WhatsappButton>
            <LigarButton origem="ambiente" className="text-ink-900" />
          </div>
          <p className="mt-3 text-sm text-ink-700">Mande uma foto e as medidas do espaço.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <h2 className="mb-6">Projetos de {a.nome.toLowerCase()}</h2>
          <Galeria ambienteFixo={a.slug} />
          <div className="mt-10">
            <h3 className="mb-3">Outros ambientes</h3>
            <ul className="flex flex-wrap gap-2">
              {AMBIENTES.filter((x) => x.slug !== a.slug).map((x) => (
                <li key={x.slug}>
                  <Link
                    to={`/portfolio/${x.slug}`}
                    className="btn btn-outline min-h-12 text-sm text-ink-900"
                  >
                    {x.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
