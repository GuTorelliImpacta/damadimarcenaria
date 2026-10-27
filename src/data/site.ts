/**
 * Dados do negócio. Fonte: perfil público no Google Maps (27/10/2026) e artes do cliente.
 * Tudo que não foi confirmado fica em `pendente` e em content/PENDENCIAS.md.
 */
export const SITE = {
  nome: 'Marcenaria Damadi Junior',
  nomeCurto: 'Damadi',
  // Domínio NÃO confirmado (ver PENDENCIAS.md). Troque em .env: VITE_SITE_URL
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://marcenariadamadi.com.br',
  telefoneExibicao: '(11) 94622-1978',
  telefoneE164: '+5511946221978',
  whatsappNumero: '5511946221978',
  instagram: 'https://www.instagram.com/marcenariadamadi',
  instagramUser: '@marcenariadamadi',
  endereco: {
    rua: 'Rua Carmésia, 42',
    bairro: 'Tremembé',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '02350-060',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(
      'Marcenaria Damadi Junior, Rua Carmésia, 42, Tremembé, São Paulo - SP, 02350-060',
    ),
  // Link do perfil no Google ainda não confirmado: a faixa de nota só linka quando existir.
  googlePerfilUrl: null as string | null,
  avaliacao: { nota: '5,0', quantidade: 6 },
  anosExperiencia: '20',
  horario: {
    fuso: 'America/Sao_Paulo',
    // 0=domingo … 6=sábado
    diasUteis: [1, 2, 3, 4, 5],
    abre: '08:30',
    fecha: '18:00',
    texto: 'Seg–sex, 8h30–18h',
  },
  // Prazo em semanas ainda não confirmado: vazio => copy "combinado em contrato".
  prazoSemanas: null as string | null,
} as const

export type Origem =
  | 'header'
  | 'hero'
  | 'galeria'
  | 'card'
  | 'sticky'
  | 'rodape'
  | 'processo'
  | 'contato'
  | 'ambiente'
  | 'erro404'
