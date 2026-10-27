import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const ROTAS = [
  '/',
  '/portfolio/cozinha',
  '/portfolio/guarda-roupa',
  '/sobre',
  '/privacidade',
  '/rota-inexistente',
]

test.describe('CSP, hidratação e CTAs', () => {
  for (const rota of ROTAS) {
    test(`sem erros de console/CSP em ${rota}`, async ({ page }) => {
      const erros: string[] = []
      page.on('console', (m) => m.type() === 'error' && erros.push(m.text()))
      page.on('pageerror', (e) => erros.push(String(e)))
      await page.goto(rota)
      await page.waitForLoadState('networkidle')
      await expect(page.locator('h1')).toHaveCount(1)
      // 404 devolve status 404 (esperado) e o navegador loga "Failed to load resource" só no recurso, não na página
      expect(erros.filter((e) => !/status of 404/.test(e))).toEqual([])
    })
  }

  test('WhatsApp abre com a mensagem correta', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section a', { hasText: 'Pedir orçamento' }).first()
    expect(await hero.getAttribute('href')).toBe(
      'https://wa.me/5511946221978?text=' +
        encodeURIComponent('Olá! Vim pelo site da Damadi e gostaria de um orçamento.'),
    )
    await expect(hero).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('mensagem por ambiente', async ({ page }) => {
    await page.goto('/portfolio/cozinha')
    const href = await page
      .getByRole('link', { name: /Pedir orçamento de cozinha/i })
      .getAttribute('href')
    expect(decodeURIComponent(href!.split('text=')[1]!)).toBe(
      'Olá! Vim pelo site da Damadi e quero um orçamento de cozinha planejada.',
    )
  })

  test('ligar e como chegar', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Ligar' }).first()).toHaveAttribute(
      'href',
      'tel:+5511946221978',
    )
    await expect(page.getByRole('link', { name: 'Como chegar' })).toHaveAttribute(
      'href',
      /google\.com\/maps/,
    )
  })

  test('filtro por ambiente (aria-pressed)', async ({ page }) => {
    await page.goto('/')
    const chip = page.getByRole('button', { name: 'Closet', exact: true })
    await chip.click()
    await expect(chip).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('#projetos article')).toHaveCount(1)
  })

  test('menu mobile abre e fecha com Esc', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 })
    await page.goto('/')
    await page.getByRole('button', { name: 'Abrir menu' }).click()
    await expect(page.locator('#menu-mobile')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('#menu-mobile')).toBeHidden()
  })

  test('barra fixa aparece após o hero (mobile) e some no contato', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 })
    await page.goto('/')
    const barra = page.locator('div.fixed.bottom-0')
    await expect(barra).toHaveAttribute('aria-hidden', 'true')
    await page.evaluate(() => window.scrollTo({ top: 1100, behavior: 'instant' }))
    await expect(barra).toHaveAttribute('aria-hidden', 'false')
    await page.evaluate(() => document.getElementById('contato')!.scrollIntoView({ behavior: 'instant' }))
    await expect(barra).toHaveAttribute('aria-hidden', 'true')
  })

  test('sem overflow horizontal em 360, 390, 768 e 1440', async ({ page }) => {
    for (const [w, h] of [
      [360, 640],
      [390, 844],
      [768, 1024],
      [1440, 900],
    ] as const) {
      await page.setViewportSize({ width: w, height: h })
      await page.goto('/')
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `largura ${w}`,
      ).toBeLessThanOrEqual(w)
    }
  })

  test('JSON-LD válido e NAP', async ({ page }) => {
    await page.goto('/')
    const objs = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(
      (b) => JSON.parse(b),
    )
    const neg = objs.find((o) => o['@type'] === 'HomeAndConstructionBusiness')
    expect(neg.telephone).toBe('+55 11 94622-1978')
    expect(neg.address.postalCode).toBe('02350-060')
    expect(objs.some((o) => o['@type'] === 'FAQPage')).toBe(true)
  })

  test('HTML pré-renderizado (sem JS)', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false })
    const page = await ctx.newPage()
    await page.goto('/portfolio/cozinha')
    await expect(page.locator('h1')).toContainText('Cozinha planejada')
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', /portfolio\/cozinha$/)
    await ctx.close()
  })
})

test.describe('Acessibilidade (axe)', () => {
  for (const rota of ['/', '/portfolio/cozinha', '/sobre', '/privacidade']) {
    for (const [w, h] of [
      [360, 740],
      [1440, 900],
    ] as const) {
      test(`${rota} @${w}`, async ({ page }) => {
        await page.setViewportSize({ width: w, height: h })
        await page.goto(rota)
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(400)
        const r = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
        expect(
          r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`),
        ).toEqual([])
      })
    }
  }
})
