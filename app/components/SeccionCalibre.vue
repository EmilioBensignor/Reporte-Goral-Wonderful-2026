<template>
  <section class="flex flex-col gap-6">
    <EncabezadoSeccion
      kicker="Calidad de la fruta"
      titulo="La temporada se concentró en fruta de buen tamaño"
      :conclusion="`Los calibres 8, 9 y 10 reúnen el ${pctGrueso}% de la producción`"
    />

    <div class="flex flex-col gap-5 rounded-3xl bg-white p-5 ring-1 ring-gris-claro/40 md:p-7">
      <div class="flex items-center justify-between text-sm lg:text-xl text-gris">
        <span class="flex items-center gap-2"><span class="size-3 lg:size-4 rounded-full" :style="{ background: colorPorCalibre(5) }" />Fruta grande (calibre 5)</span>
        <span class="flex items-center gap-2">Fruta chica (calibre 14)<span class="size-3 rounded-full" :style="{ background: colorPorCalibre(14) }" /></span>
      </div>
      <div class="h-72 md:h-80">
        <BaseChart type="bar" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ histograma: { type: Array, required: true } })

const colorPorCalibre = (calibre) => {
  const t = (calibre - 5) / 9
  const r = Math.round(47 + t * (226 - 47))
  const g = Math.round(143 - t * (143 - 8))
  const b = Math.round(91 - t * (91 - 58))
  return `rgb(${r}, ${g}, ${b})`
}

const pctGrueso = computed(() =>
  Math.round(props.histograma.filter((h) => h.calibre >= 8 && h.calibre <= 10).reduce((s, h) => s + h.pct, 0)),
)

const chartData = computed(() => ({
  labels: props.histograma.map((h) => String(h.calibre)),
  datasets: [{
    label: 'Cajas',
    data: props.histograma.map((h) => h.cajas),
    backgroundColor: props.histograma.map((h) => colorPorCalibre(h.calibre)),
    borderRadius: 8,
    maxBarThickness: 54,
  }],
}))

const chartOptions = {
  scales: {
    x: { title: { display: true, text: 'Calibre (frutas por caja)', color: '#615b5c' }, grid: { display: false }, ticks: { color: '#480311', font: { size: 13 } } },
    y: { beginAtZero: true, grid: { color: '#ede6e6' }, ticks: { color: '#615b5c' } },
  },
}
</script>
