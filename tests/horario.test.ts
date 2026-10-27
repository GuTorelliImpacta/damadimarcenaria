import { describe, expect, it } from 'vitest'
import { statusLoja } from '@/lib/horario'

// São Paulo = UTC-3 (sem horário de verão desde 2019)
const sp = (iso: string) => statusLoja(new Date(iso))

describe('statusLoja (fuso America/Sao_Paulo)', () => {
  it('aberto numa terça às 10h', () => {
    const s = sp('2026-10-27T13:00:00Z')
    expect(s.aberto).toBe(true)
    expect(s.texto).toContain('18h00')
  })
  it('abre às 8h30 em ponto; fecha às 18h', () => {
    expect(sp('2026-10-27T11:30:00Z').aberto).toBe(true)
    expect(sp('2026-10-27T11:29:00Z').aberto).toBe(false)
    expect(sp('2026-10-27T20:59:00Z').aberto).toBe(true)
    expect(sp('2026-10-27T21:00:00Z').aberto).toBe(false)
  })
  it('antes de abrir: abre hoje', () => {
    expect(sp('2026-10-27T10:00:00Z').texto).toBe('Fechado · abre hoje às 08h30')
  })
  it('sexta à noite: abre segunda', () => {
    expect(sp('2026-10-31T01:00:00Z').texto).toBe('Fechado · abre segunda às 08h30')
  })
  it('sábado e domingo fechado', () => {
    expect(sp('2026-10-31T15:00:00Z').aberto).toBe(false)
    expect(sp('2026-11-01T15:00:00Z').aberto).toBe(false)
  })
  it('independe do fuso do visitante: terça 00:30 UTC ainda é segunda à noite em SP', () => {
    expect(sp('2026-10-27T00:30:00Z').texto).toBe('Fechado · abre amanhã às 08h30')
  })
})
