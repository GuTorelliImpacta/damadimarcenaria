import { SITE } from '@/data/site'
import { FAQ } from '@/data/faq'

export const urlAbs = (path = '/') => new URL(path, SITE.url).toString()

const E = SITE.endereco

export function jsonLdNegocio() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': urlAbs('/#negocio'),
    name: SITE.nome,
    alternateName: 'Marcenaria Damadi',
    url: urlAbs('/'),
    image: urlAbs('/og-image.jpg'),
    logo: urlAbs('/icon-512.png'),
    telephone: '+55 11 94622-1978',
    description:
      'Marcenaria em Tremembé, zona norte de São Paulo: móveis planejados sob medida, com prazo combinado e condições especiais de pagamento.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: E.rua,
      addressLocality: E.cidade,
      addressRegion: E.uf,
      postalCode: E.cep,
      addressCountry: 'BR',
    },
    // `geo` e `aggregateRating` ficam de fora de propósito: ver DECISIONS.md (não inventar; avaliação própria não gera rich result).
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: SITE.horario.abre,
        closes: SITE.horario.fecha,
      },
    ],
    areaServed: { '@type': 'City', name: 'São Paulo' },
    sameAs: [SITE.instagram, ...(SITE.googlePerfilUrl ? [SITE.googlePerfilUrl] : [])],
  }
}

export function jsonLdFaq() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.p,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  }
}

export function jsonLdBreadcrumb(itens: { nome: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nome,
      item: urlAbs(it.path),
    })),
  }
}
