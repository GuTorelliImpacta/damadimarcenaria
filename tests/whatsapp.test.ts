import { describe, expect, it } from 'vitest'
import { limpar, msgAmbiente, msgGeral, msgProjeto, waGeral } from '@/lib/whatsapp'

describe('whatsapp', () => {
  it('mensagem geral e link', () => {
    expect(msgGeral()).toBe('Olá! Vim pelo site da Damadi e gostaria de um orçamento.')
    expect(waGeral()).toBe(`https://wa.me/5511946221978?text=${encodeURIComponent(msgGeral())}`)
  })
  it('ambiente com e sem bairro', () => {
    expect(msgAmbiente('cozinha')).toBe(
      'Olá! Vim pelo site da Damadi e quero um orçamento de cozinha.',
    )
    expect(msgAmbiente('cozinha', 'Jaçanã')).toContain('Moro em Jaçanã.')
  })
  it('projeto', () => {
    expect(msgProjeto('Cozinha em L')).toBe(
      'Olá! Vi o projeto "Cozinha em L" no site e quero algo parecido.',
    )
  })
  it('sanitiza entrada', () => {
    expect(limpar('a\n\tb\u0000c')).toBe('a b c')
    expect(limpar('x'.repeat(500)).length).toBe(80)
    expect(waGeral()).not.toMatch(/[ <>"]/)
  })
})
