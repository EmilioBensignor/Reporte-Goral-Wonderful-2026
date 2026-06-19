<template>
  <section class="overflow-hidden rounded-3xl bg-vino text-crema p-7 md:p-10 lg:p-14">
    <div class="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
      <div class="flex flex-col gap-4">
        <h1 class="font-display text-5xl md:text-6xl lg:text-7xl">{{ nf(meta.totales.cajas) }}</h1>
        <p class="text-base lg:text-3xl">Cajas cosechadas · {{ kg(meta.totales.cajas) }} de granada</p>
      </div>

      <div class="flex flex-col gap-2 text-crema lg:text-2xl font-medium">
        <p>Cuadros <span class="font-bold">{{ meta.totales.cuadros }}</span></p>
        <p>Calibre típico <span class="font-bold">9</span></p>
        <p>Cosecha <span class="font-bold">18/02 - 28/04</span></p>
        <p>Palets <span class="font-bold">{{ meta.totales.palets }}</span></p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useFormato } from '~/composables/useFormato'

defineProps({ meta: { type: Object, required: true } })

const { nf, kg } = useFormato()
</script>
