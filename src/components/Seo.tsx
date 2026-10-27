import { Head } from 'vite-react-ssg'
import { SITE } from '@/data/site'
import { urlAbs } from '@/lib/seo'

interface Props {
  titulo: string
  descricao: string
  path: string
  jsonLd?: object[]
  noindex?: boolean
}

export function Seo({ titulo, descricao, path, jsonLd = [], noindex }: Props) {
  const url = urlAbs(path)
  const img = urlAbs('/og-image.jpg')
  return (
    <Head>
      <title>{titulo}</title>
      <meta name="description" content={descricao} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={SITE.nome} />
      <meta property="og:title" content={titulo} />
      <meta property="og:description" content={descricao} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titulo} />
      <meta name="twitter:description" content={descricao} />
      <meta name="twitter:image" content={img} />
      {jsonLd.map((o, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(o)}
        </script>
      ))}
    </Head>
  )
}
