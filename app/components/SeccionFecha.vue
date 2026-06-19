<template>
  <section class="flex flex-col gap-6">
    <EncabezadoSeccion kicker="Ritmo de cosecha" titulo="Cómo se distribuyó el trabajo en el tiempo"
      :conclusion="`La cosecha corrió del 18 de febrero al 28 de abril. El día más fuerte fue el ${diaPico} con ${nf(pico)} cajas.`" />

    <div class="rounded-3xl bg-white p-5 ring-1 ring-gris-claro/40 md:p-7">
      <div class="h-72 md:h-80">
        <BaseChart type="line" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useFormato } from '~/composables/useFormato'

const props = defineProps({ porFecha: { type: Array, required: true } })

const { nf } = useFormato()

const formatoFecha = (iso) => {
  const [, m, d] = iso.split('-')
  return `${d}/${m}`
}

const picoItem = computed(() => [...props.porFecha].sort((a, b) => b.cajas - a.cajas)[0])
const pico = computed(() => picoItem.value.cajas)
const diaPico = computed(() => formatoFecha(picoItem.value.fecha))

const chartData = computed(() => ({
  labels: props.porFecha.map((f) => formatoFecha(f.fecha)),
  datasets: [{
    label: 'Cajas',
    data: props.porFecha.map((f) => f.cajas),
    borderColor: '#e2083a',
    backgroundColor: 'rgba(226, 8, 58, 0.08)',
    fill: true,
    tension: 0.35,
    pointRadius: 0,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: '#e2083a',
    borderWidth: 2.5,
  }],
}))

const chartOptions = {
  interaction: { intersect: false, mode: 'index' },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#615b5c', maxRotation: 0, autoSkip: true, maxTicksLimit: 8, font: { size: 11 } } },
    y: { beginAtZero: true, grid: { color: '#ede6e6' }, ticks: { color: '#615b5c' } },
  },
}
</script>
