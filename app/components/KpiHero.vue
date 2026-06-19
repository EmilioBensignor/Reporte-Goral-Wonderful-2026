<template>
  <section class="overflow-hidden rounded-3xl bg-vino text-crema">
    <div class="flex flex-col gap-10 p-7 md:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-14">
      <div class="flex flex-col gap-3">
        <span class="text-sm font-semibold text-rosa tracking-[0.25em] uppercase">Temporada {{ meta.temporada }} · {{ meta.variedad }}</span>
        <h1 class="font-display text-5xl leading-[0.95] md:text-6xl lg:text-7xl">{{ nf(meta.totales.cajas) }}</h1>
        <p class="text-base text-crema/85">cajas cosechadas · {{ kg(meta.totales.cajas) }} de granada</p>
      </div>

      <dl class="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:flex lg:flex-col lg:items-end lg:gap-5 lg:text-right">
        <div class="flex flex-col gap-0.5">
          <dt class="text-xs text-crema/70 uppercase tracking-wider">Cuadros</dt>
          <dd class="font-display text-2xl">{{ meta.totales.cuadros }}</dd>
        </div>
        <div class="flex flex-col gap-0.5">
          <dt class="text-xs text-crema/70 uppercase tracking-wider">Calibre típico</dt>
          <dd class="font-display text-2xl">9</dd>
        </div>
        <div class="flex flex-col gap-0.5">
          <dt class="text-xs text-crema/70 uppercase tracking-wider">Cosecha</dt>
          <dd class="font-display text-2xl">18/02 – 28/04</dd>
        </div>
        <div class="flex flex-col gap-0.5">
          <dt class="text-xs text-crema/70 uppercase tracking-wider">Palets</dt>
          <dd class="font-display text-2xl">{{ meta.totales.palets }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup>
import { useFormato } from '~/composables/useFormato'

defineProps({ meta: { type: Object, required: true } })

const { nf, kg } = useFormato()
</script>
