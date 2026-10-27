import manifest from '@/generated/images.json'

export interface ImagemInfo {
  w: number
  h: number
  larguras: number[]
  base: string
}
const M = manifest as Record<string, ImagemInfo>

/** Retorna a info da imagem gerada por `npm run images`, ou undefined se ainda não existe. */
export const infoImagem = (arquivo: string) => M[arquivo]
