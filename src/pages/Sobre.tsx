import { Seo } from '@/components/Seo'
import { SITE } from '@/data/site'
import { WhatsappButton } from '@/components/CtaLink'
import { jsonLdBreadcrumb } from '@/lib/seo'

export function Component() {
  return (
    <>
      <Seo
        titulo="Sobre | Marcenaria Damadi Junior – Tremembé, São Paulo"
        descricao="Conheça a Marcenaria Damadi Junior: mais de 20 anos de experiência em móveis planejados sob medida, na zona norte de São Paulo."
        path="/sobre"
        jsonLd={[
          jsonLdBreadcrumb([
            { nome: 'Início', path: '/' },
            { nome: 'Sobre', path: '/sobre' },
          ]),
        ]}
      />
      <section className="section">
        <div className="container-x max-w-3xl">
          <h1>Sobre a Damadi</h1>
          <div className="mt-6 space-y-4 text-ink-800">
            <p>
              A Marcenaria Damadi Junior tem mais de {SITE.anosExperiencia} anos de experiência em
              marcenaria. Fazemos móveis planejados sob medida, com projeto cuidadoso, prazo
              combinado e condições especiais de pagamento.
            </p>
            <p>
              Ficamos em Tremembé, na zona norte de São Paulo, e atendemos cozinhas, guarda-roupas,
              closets, home offices e painéis ripados, inclusive em espaços pequenos.
            </p>
            <p>
              Cada projeto começa com uma conversa e a medição do seu ambiente. Mande uma foto e as
              medidas pelo WhatsApp.
            </p>
          </div>
          <div className="mt-8">
            <WhatsappButton origem="contato">Pedir orçamento</WhatsappButton>
          </div>
        </div>
      </section>
    </>
  )
}
