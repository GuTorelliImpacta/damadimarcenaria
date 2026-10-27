import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

const css = readFileSync('src/styles/index.css', 'utf8')
const hex = (n: string) => css.match(new RegExp(`--color-${n}:\\s*(#[0-9a-f]{6})`, 'i'))![1]!
const lum = (h: string) => {
  const c = [1, 3, 5]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0]! + 0.7152 * c[1]! + 0.0722 * c[2]!
}
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x! + 0.05) / (y! + 0.05)
}

describe('contraste WCAG AA (documentado em DESIGN.md)', () => {
  it.each([
    ['ink-900', 'cream-100'],
    ['ink-700', 'cream-100'],
    ['ink-700', 'cream-50'],
    ['copper-600', 'cream-100'],
    ['copper-700', 'cream-200'],
    ['cream-100', 'olive-700'],
    ['cream-200', 'olive-700'],
    ['cream-100', 'ink-900'],
    ['cream-200', 'ink-900'],
    ['cream-300', 'ink-900'],
    ['khaki-300', 'ink-900'],
    ['cream-200', 'olive-900'],
    ['cream-300', 'olive-900'],
    ['ink-900', 'cream-100'],
  ] as const)('%s sobre %s ≥ 4.5', (fg, bg) => {
    expect(ratio(hex(fg), hex(bg))).toBeGreaterThanOrEqual(4.5)
  })
  it.each(['copper-600', 'wa-600', 'copper-700'])('texto branco sobre %s ≥ 4.5', (n) => {
    expect(ratio('#ffffff', hex(n))).toBeGreaterThanOrEqual(4.5)
  })
})
