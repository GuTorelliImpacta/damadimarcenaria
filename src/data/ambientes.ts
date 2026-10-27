export interface Ambiente {
  slug: string
  nome: string
  /** Texto para a mensagem do WhatsApp: "orçamento de ___". */
  paraMensagem: string
  titulo: string
  descricao: string
  /** 80–120 palavras úteis para SEO, sem inventar dados. */
  texto: string[]
  metaDescription: string
}

export const AMBIENTES: Ambiente[] = [
  {
    slug: 'cozinha',
    nome: 'Cozinha',
    paraMensagem: 'cozinha planejada',
    titulo: 'Cozinha planejada sob medida',
    descricao: 'Armários, bancadas e nichos feitos para a sua rotina.',
    texto: [
      'A cozinha é onde o aproveitamento de espaço mais faz diferença. Cada armário é desenhado a partir da medição do seu ambiente, com lugar para cooktop, forno, geladeira e tudo o que você usa no dia a dia.',
      'Você escolhe acabamentos e ferragens com a gente, e o projeto só vai para a produção depois da sua aprovação. Para começar, mande uma foto e as medidas da cozinha pelo WhatsApp.',
    ],
    metaDescription:
      'Cozinha planejada sob medida em Tremembé, zona norte de São Paulo. Projeto cuidadoso, prazo combinado e condições especiais de pagamento. Peça orçamento.',
  },
  {
    slug: 'guarda-roupa',
    nome: 'Guarda-roupa',
    paraMensagem: 'guarda-roupa / dormitório',
    titulo: 'Guarda-roupa e dormitório sob medida',
    descricao: 'Portas de correr ou de abrir, do chão ao teto.',
    texto: [
      'Um guarda-roupa sob medida ocupa a parede inteira sem sobrar vão e sem perder espaço. Portas de correr ou de abrir, gavetas, cabideiros e prateleiras são distribuídos conforme o que você guarda.',
      'Vale para quarto de casal, de solteiro ou infantil. Envie as medidas da parede e uma referência de que você gostou, e a gente monta uma proposta.',
    ],
    metaDescription:
      'Guarda-roupa com porta de correr e dormitório planejado sob medida em Tremembé, zona norte de São Paulo. Peça orçamento pelo WhatsApp.',
  },
  {
    slug: 'closet',
    nome: 'Closet',
    paraMensagem: 'closet',
    titulo: 'Closet planejado',
    descricao: 'Organização de verdade para roupas, sapatos e acessórios.',
    texto: [
      'No closet, o segredo é organizar por uso: cabideiros na altura certa, gavetas rasas para o que é pequeno, prateleiras para sapatos e bolsas.',
      'Funciona em um cômodo inteiro ou em um canto aproveitado do quarto. Conte como você usa o espaço e a gente desenha a solução.',
    ],
    metaDescription:
      'Closet planejado sob medida em Tremembé, zona norte de São Paulo. Projeto cuidadoso e prazo combinado. Peça seu orçamento.',
  },
  {
    slug: 'home-office',
    nome: 'Home office',
    paraMensagem: 'home office',
    titulo: 'Home office sob medida',
    descricao: 'Mesa, estantes e passagem de fios no tamanho do seu canto.',
    texto: [
      'Um home office sob medida cabe em qualquer canto: bancada na largura exata, estantes até o teto e espaço para fios e equipamentos.',
      'Dá para integrar a sala ou ao quarto sem atrapalhar a circulação. Mande as medidas e o que você precisa deixar à mão.',
    ],
    metaDescription:
      'Home office planejado sob medida em Tremembé, zona norte de São Paulo. Móveis feitos para o seu espaço. Peça orçamento.',
  },
  {
    slug: 'paineis-ripados',
    nome: 'Painéis e sala',
    paraMensagem: 'painel ripado / móveis para sala',
    titulo: 'Painéis ripados e móveis de sala',
    descricao: 'Painel de TV, rack, estantes e ripado em madeira.',
    texto: [
      'Painéis ripados e móveis planejados dão acabamento à sala: painel de TV com passagem de fios, rack, nichos e estantes combinando com o resto da casa.',
      'A madeira dá calor ao ambiente, e o projeto sob medida evita sobras e vãos. Envie uma foto da parede e as medidas para receber a proposta.',
    ],
    metaDescription:
      'Painel ripado, painel de TV e móveis planejados para sala em Tremembé, zona norte de São Paulo. Peça orçamento pelo WhatsApp.',
  },
  {
    slug: 'espacos-pequenos',
    nome: 'Espaços pequenos',
    paraMensagem: 'móveis para espaço pequeno',
    titulo: 'Móveis planejados para espaços pequenos',
    descricao: 'Pouco espaço? A gente aproveita cada centímetro.',
    texto: [
      'Móveis planejados aproveitam até mesmo espaços mínimos: vãos, cantos e alturas que móvel de loja não alcança.',
      'Em apartamento compacto, cada centímetro conta. Conte o tamanho do ambiente e o que você precisa guardar, e a gente encontra a solução.',
    ],
    metaDescription:
      'Móveis planejados para apartamentos e espaços pequenos em Tremembé, zona norte de São Paulo. Aproveite cada centímetro. Peça orçamento.',
  },
]

export const ambientePorSlug = (slug: string | undefined) => AMBIENTES.find((a) => a.slug === slug)
