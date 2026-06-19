<template>
  <div>
    <header class="border-b border-gris-claro/40 bg-crema/80 backdrop-blur sticky top-0 z-10">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-5 py-4 md:px-8">
        <div class="flex items-center gap-3">
          <span class="flex size-9 items-center justify-center rounded-full bg-rojo font-display text-crema">G</span>
          <span class="font-display text-lg text-vino">Goral</span>
        </div>
        <span class="text-xs text-gris uppercase tracking-[0.2em]">Reporte de cosecha {{ data.meta.temporada }}</span>
      </div>
    </header>

    <main class="max-w-7xl mx-auto flex flex-col gap-16 px-5 py-10 md:gap-20 md:px-8 md:py-14 lg:gap-24">
      <div class="flex flex-col gap-3">
        <p class="text-sm text-gris md:text-base">
          La temporada {{ data.meta.temporada }} de granadas {{ data.meta.variedad }}, contada en cajas, calibres y cuadros.
          {{ data.meta.totales.palets }} palets relevados sobre {{ data.meta.totales.cuadros }} cuadros de la finca.
        </p>
        <KpiHero :meta="data.meta" />
      </div>

      <SeccionCalibre :histograma="data.histograma_calibre" />
      <SeccionCuadros :por-cuadro="data.por_cuadro" :total="data.meta.totales.cajas" />
      <SeccionCalibrePorCuadro :matriz="data.calibre_por_cuadro" />
      <SeccionFecha :por-fecha="data.por_fecha" />
      <SeccionDescarte :descarte="data.meta.descarte" :por-cuadro="data.por_cuadro" />
      <NotaMetodologica />
    </main>

    <footer class="border-t border-gris-claro/40">
      <div class="max-w-7xl mx-auto flex flex-col gap-1 px-5 py-8 text-xs text-gris md:px-8">
        <span class="font-display text-sm text-vino">Goral · Granadas {{ data.meta.variedad }}</span>
        <span>San Juan, Argentina · Temporada {{ data.meta.temporada }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import data from '~/data/granadas2026.json'

useHead({
  title: 'Goral · Reporte de cosecha 2026',
  htmlAttrs: { lang: 'es' },
})
</script>
