import { SITE } from '@/data/site'

const BASE = `https://wa.me/${SITE.whatsappNumero}`

/** Remove caracteres de controle e limita o tamanho de qualquer texto que entre na mensagem. */
export function limpar(texto: string, max = 80): string {
  const semControle = Array.from(texto, (c) =>
    c.charCodeAt(0) < 32 || c.charCodeAt(0) === 127 ? ' ' : c,
  ).join('')
  return semControle.replace(/\s+/g, ' ').trim().slice(0, max)
}

export function linkWhatsapp(mensagem: string): string {
  return `${BASE}?text=${encodeURIComponent(mensagem)}`
}

export const msgGeral = () => 'Olá! Vim pelo site da Damadi e gostaria de um orçamento.'

export function msgAmbiente(ambiente: string, bairro?: string): string {
  const base = `Olá! Vim pelo site da Damadi e quero um orçamento de ${limpar(ambiente)}.`
  const b = bairro ? limpar(bairro, 40) : ''
  return b ? `${base} Moro em ${b}.` : base
}

export const msgProjeto = (titulo: string) =>
  `Olá! Vi o projeto "${limpar(titulo)}" no site e quero algo parecido.`

export const waGeral = () => linkWhatsapp(msgGeral())
export const waAmbiente = (ambiente: string, bairro?: string) =>
  linkWhatsapp(msgAmbiente(ambiente, bairro))
export const waProjeto = (titulo: string) => linkWhatsapp(msgProjeto(titulo))
