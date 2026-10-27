/**
 * PORTFÓLIO. Para adicionar um projeto SEM programar:
 *  1. Coloque a foto (JPEG/PNG) em assets-cliente/projetos/<ambiente>/  (ex.: cozinha/apto-55m2.jpg)
 *  2. Acrescente um item na lista abaixo, copiando um dos exemplos comentados.
 *  3. Rode `npm run images` (o build já faz isso) e publique.
 *
 * Só publique fotos reais e autorizadas. Nunca fotos de flyer ou de banco.
 */
import type { Ambiente } from './ambientes'

export interface Projeto {
  id: string
  ambiente: Ambiente['slug']
  titulo: string
  /** ≤ 12 palavras, só fatos reais. */
  legenda: string
  /** Caminho relativo a assets-cliente/projetos/ */
  arquivo: string
  /** Texto alternativo: ambiente, material, cor. */
  alt: string
  destaque?: boolean
}

export const PROJETOS: Projeto[] = [
  // {
  //   id: 'cozinha-01',
  //   ambiente: 'cozinha',
  //   titulo: 'Cozinha com cooktop e forno',
  //   legenda: 'Cozinha planejada com cooktop e forno embutidos.',
  //   arquivo: 'cozinha/cozinha-01.jpg',
  //   alt: 'Cozinha planejada com armários em madeira clara, cooktop e forno embutido',
  //   destaque: true,
  // },
]
