import { Seo } from '@/components/Seo'
import { Hero } from '@/components/Hero'
import { TrustBar } from '@/components/TrustBar'
import {
  SecaoProjetos,
  SecaoProcesso,
  SecaoDiferenciais,
  SecaoAvaliacoes,
  SecaoFaq,
  SecaoContato,
} from '@/components/Secoes'
import { jsonLdFaq, jsonLdNegocio } from '@/lib/seo'

export function Component() {
  return (
    <>
      <Seo
        titulo="Marcenaria Damadi | Móveis planejados sob medida na Zona Norte de SP – Tremembé"
        descricao="Móveis planejados sob medida em Tremembé, zona norte de São Paulo. Mais de 20 anos de marcenaria, prazo combinado e condições especiais de pagamento."
        path="/"
        jsonLd={[jsonLdNegocio(), jsonLdFaq()]}
      />
      <Hero />
      <TrustBar />
      <SecaoProjetos />
      <SecaoProcesso />
      <SecaoDiferenciais />
      <SecaoAvaliacoes />
      <SecaoFaq />
      <SecaoContato />
    </>
  )
}
