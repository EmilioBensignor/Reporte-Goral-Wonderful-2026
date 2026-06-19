<template>
  <section class="flex flex-col gap-6">
    <EncabezadoSeccion kicker="Calidad por cuadro" titulo="Qué calibres aportó cada cuadro"
      conclusion="Cada barra es un cuadro; los tramos verdes son fruta grande y los rojos fruta chica" />

    <div class="rounded-3xl bg-white p-5 ring-1 ring-gris-claro/40 md:p-7">
      <div class="h-96">
        <BaseChart type="bar" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ matriz: { type: Object, required: true } })

const calibres = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const cuadros = computed(() => Object.keys(props.matriz))

const colorPorCalibre = (calibre) => {
  const t = (calibre - 5) / 9
  const r = Math.round(47 + t * (226 - 47))
  const g = Math.round(143 - t * (143 - 8))
  const b = Math.round(91 - t * (91 - 58))
  return `rgb(${r}, ${g}, ${b})`
}

const chartData = computed(() => ({
  labels: cuadros.value.map((c) => `CN ${c}`),
  datasets: calibres.map((cal) => ({
    label: `Calibre ${cal}`,
    data: cuadros.value.map((c) => props.matriz[c][String(cal)]),
    backgroundColor: colorPorCalibre(cal),
    borderWidth: 0,
  })),
}))

const chartOptions = {
  plugins: { legend: { display: true, position: 'bottom', labels: { color: '#480311', boxWidth: 12, padding: 14, font: { size: 11 } } } },
  scales: {
    x: { stacked: true, grid: { display: false }, ticks: { color: '#480311', font: { size: 12 } } },
    y: { stacked: true, beginAtZero: true, grid: { color: '#ede6e6' }, ticks: { color: '#615b5c' } },
  },
}
</script>
