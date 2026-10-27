import { SITE } from '@/data/site'

export interface Status {
  aberto: boolean
  texto: string
}

const DIAS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

const toMin = (hhmm: string) => {
  const [h = '0', m = '0'] = hhmm.split(':')
  return Number(h) * 60 + Number(m)
}

/** Dia da semana e minutos do dia no fuso de São Paulo, independentemente do fuso do visitante. */
export function agoraEmSP(date: Date): { dia: number; min: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SITE.horario.fuso,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0'
  return { dia: DIAS[get('weekday')] ?? 0, min: Number(get('hour')) * 60 + Number(get('minute')) }
}

export function statusLoja(date: Date = new Date()): Status {
  const { dia, min } = agoraEmSP(date)
  const abre = toMin(SITE.horario.abre)
  const fecha = toMin(SITE.horario.fecha)
  const util = (SITE.horario.diasUteis as readonly number[]).includes(dia)

  if (util && min >= abre && min < fecha) {
    return {
      aberto: true,
      texto: `Aberto agora · fecha às ${SITE.horario.fecha.replace(':', 'h')}`,
    }
  }
  // Próxima abertura: hoje (antes de abrir) ou próximo dia útil.
  const abreTxt = SITE.horario.abre.replace(':', 'h')
  if (util && min < abre) return { aberto: false, texto: `Fechado · abre hoje às ${abreTxt}` }
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7
    if ((SITE.horario.diasUteis as readonly number[]).includes(d)) {
      const quando =
        i === 1 ? 'amanhã' : ['dom.', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sáb.'][d]
      return { aberto: false, texto: `Fechado · abre ${quando} às ${abreTxt}` }
    }
  }
  return { aberto: false, texto: 'Fechado' }
}
