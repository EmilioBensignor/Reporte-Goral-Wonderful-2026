<template>
  <section class="flex flex-col gap-6">
    <EncabezadoSeccion
      kicker="Producción por cuadro"
      titulo="Qué dio cada cuadro de la finca"
      :conclusion="`El cuadro ${lider.cuadro} fue el más productivo con ${nf(lider.cajas)} cajas (${pct((lider.cajas / total) * 100)} del total). Tocá un encabezado para reordenar.`"
    />

    <div class="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
      <div class="order-2 rounded-3xl bg-white p-5 ring-1 ring-gris-claro/40 md:p-7 lg:order-1">
        <div class="h-72 lg:h-full lg:min-h-80">
          <BaseChart type="bar" :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="order-1 overflow-hidden rounded-3xl bg-white ring-1 ring-gris-claro/40 lg:order-2">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-gris-claro/40 text-[0.8rem] text-gris uppercase tracking-wider">
                <th class="cursor-pointer select-none p-4 hover:text-rojo" @click="ordenarPor('cuadro')">Cuadro</th>
                <th class="cursor-pointer select-none p-4 hover:text-rojo" @click="ordenarPor('cajas')">Cajas</th>
                <th class="p-4">Participación</th>
                <th class="cursor-pointer select-none p-4 hover:text-rojo" @click="ordenarPor('calibre_modal')">Calibre</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="c in ordenadas"
                :key="c.cuadro"
                class="border-b border-gris-claro/20 last:border-0 transition-colors hover:bg-crema"
              >
                <td class="p-4 font-display text-lg text-vino">CN {{ c.cuadro }}</td>
                <td class="p-4 font-semibold">{{ nf(c.cajas) }}</td>
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <div class="h-1.5 w-20 overflow-hidden rounded-full bg-crema">
                      <div class="h-full rounded-full bg-rojo" :style="{ width: `${(c.cajas / total) * 100}%` }" />
                    </div>
                    <span class="text-sm text-gris">{{ pct((c.cajas / total) * 100) }}</span>
                  </div>
                </td>
                <td class="p-4">
                  <span class="inline-flex size-8 items-center justify-center rounded-full text-sm font-semibold text-crema" :style="{ background: colorPorCalibre(c.calibre_modal) }">{{ c.calibre_modal }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFormato } from '~/composables/useFormato'

const props = defineProps({
  porCuadro: { type: Array, required: true },
  total: { type: Number, required: true },
})

const { nf, pct } = useFormato()
const orden = ref({ campo: 'cajas', desc: true })

const ordenarPor = (campo) => {
  if (orden.value.campo === campo) orden.value.desc = !orden.value.desc
  else orden.value = { campo, desc: true }
}

const ordenadas = computed(() => {
  const arr = [...props.porCuadro]
  arr.sort((a, b) => (a[orden.value.campo] - b[orden.value.campo]) * (orden.value.desc ? -1 : 1))
  return arr
})

const lider = computed(() => [...props.porCuadro].sort((a, b) => b.cajas - a.cajas)[0])

const colorPorCalibre = (calibre) => {
  const t = (calibre - 5) / 9
  const r = Math.round(47 + t * (226 - 47))
  const g = Math.round(143 - t * (143 - 8))
  const b = Math.round(91 - t * (91 - 58))
  return `rgb(${r}, ${g}, ${b})`
}

const chartData = computed(() => ({
  labels: props.porCuadro.map((c) => `CN ${c.cuadro}`),
  datasets: [{
    label: 'Cajas',
    data: props.porCuadro.map((c) => c.cajas),
    backgroundColor: '#e2083a',
    borderRadius: 8,
    maxBarThickness: 48,
  }],
}))

const chartOptions = {
  scales: {
    x: { grid: { display: false }, ticks: { color: '#480311', font: { size: 12 } } },
    y: { beginAtZero: true, grid: { color: '#ede6e6' }, ticks: { color: '#615b5c' } },
  },
}
</script>
