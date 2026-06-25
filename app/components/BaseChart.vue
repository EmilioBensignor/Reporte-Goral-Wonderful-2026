<template>
  <ClientOnly>
    <div class="h-full w-full">
      <Bar v-if="type === 'bar'" :data="data" :options="mergedOptions" :plugins="plugins" />
      <Line v-else :data="data" :options="mergedOptions" :plugins="plugins" />
    </div>
    <template #fallback>
      <div class="h-full w-full animate-pulse rounded-xl bg-neutral-200" />
    </template>
  </ClientOnly>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  BarElement, LineElement, PointElement,
  CategoryScale, LinearScale,
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale)

const props = defineProps({
  type: { type: String, default: 'bar' },
  data: { type: Object, required: true },
  options: { type: Object, default: () => ({}) },
  plugins: { type: Array, default: () => [] },
})

const mergedOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  ...props.options,
}))
</script>
