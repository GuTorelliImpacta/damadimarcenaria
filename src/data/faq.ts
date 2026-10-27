export interface Pergunta {
  p: string
  r: string
  /** true => resposta ainda não confirmada pelo cliente; o check:placeholders bloqueia produção. */
  pendente?: boolean
}

export const FAQ: Pergunta[] = [
  {
    p: 'Como peço um orçamento?',
    r: 'Chame no WhatsApp. É só contar o que você precisa. Respondemos em horário comercial, de segunda a sexta, das 8h30 às 18h.',
  },
  {
    p: 'O que preciso enviar?',
    r: 'Fotos do ambiente, as medidas aproximadas e, se tiver, referências de móveis que você gostou. Com isso já dá para começar a conversa.',
  },
  {
    p: 'Qual é o prazo de entrega?',
    r: 'O prazo é combinado em contrato, sem surpresa. A gente trabalha para entregar dentro do que foi combinado.',
  },
  {
    p: 'Como funciona o pagamento?',
    r: 'Trabalhamos com condições especiais de pagamento. As formas disponíveis são combinadas na proposta.',
  },
  {
    p: 'Quais regiões vocês atendem?',
    r: 'Ficamos em Tremembé, na zona norte de São Paulo. Mande seu bairro no WhatsApp para confirmarmos o atendimento.',
  },
  {
    p: 'Trabalham com projeto de arquiteto?',
    r: 'Se você já tem projeto ou planta, envie pelo WhatsApp para a gente avaliar. Sem projeto, conversamos e medimos o espaço.',
    pendente: true,
  },
  {
    p: 'Os móveis têm garantia?',
    r: 'As condições de garantia são informadas na proposta, antes de fechar.',
    pendente: true,
  },
]
