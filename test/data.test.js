import { describe, it, expect } from 'vitest'
import data from '../app/data/granadas2026.json'

describe('granadas2026.json invariantes', () => {
  it('histograma suma 19804 cajas', () => {
    const total = data.histograma_calibre.reduce((s, r) => s + r.cajas, 0)
    expect(total).toBe(19804)
  })

  it('por_fecha suma 19804 cajas', () => {
    const total = data.por_fecha.reduce((s, r) => s + r.cajas, 0)
    expect(total).toBe(19804)
  })

  it('cada fila de calibre_por_cuadro suma el cajas de por_cuadro (tolerancia 1 por redondeo)', () => {
    for (const c of data.por_cuadro) {
      const fila = data.calibre_por_cuadro[String(c.cuadro)]
      const suma = Object.values(fila).reduce((s, n) => s + n, 0)
      expect(Math.abs(suma - c.cajas)).toBeLessThanOrEqual(1)
    }
  })

  it('suma por_cuadro coincide con totales.cajas (tolerancia 1 por redondeo del reparto multi-cuadro)', () => {
    const total = data.por_cuadro.reduce((s, c) => s + c.cajas, 0)
    expect(Math.abs(total - data.meta.totales.cajas)).toBeLessThanOrEqual(1)
  })
})
