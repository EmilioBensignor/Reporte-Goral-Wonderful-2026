export function useFormato() {
  const fmt = new Intl.NumberFormat('es-AR')
  const nf = (n) => fmt.format(Math.round(n))
  const kg = (cajas) => `${fmt.format(Math.round(cajas * 3.8))} kg`
  const pct = (n) => `${n.toFixed(1)}%`
  return { nf, kg, pct }
}
