<template>
  <div>
    <header class="border-b border-gris-claro/40 bg-crema/80 backdrop-blur sticky top-0 z-10">
      <div class="max-content mx-auto flex flex-wrap justify-between items-center gap-4 px-5 py-4 md:px-8">
        <span class="font-display text-lg lg:text-3xl text-vino">Goral</span>
        <span class="text-xs lg:text-lg text-gris uppercase">Reporte de cosecha {{
          data.meta.temporada }}</span>
      </div>
    </header>

    <main class="max-content mx-auto flex flex-col gap-16 md:gap-20 lg:gap-24 px-5 py-10 md:px-8 md:py-14">
      <KpiHero :meta="data.meta" />
      <SeccionCalibre :histograma="data.histograma_calibre" />
      <SeccionCuadros :por-cuadro="data.por_cuadro" :total="data.meta.totales.cajas" />
      <SeccionCalibrePorCuadro :matriz="data.calibre_por_cuadro" />
      <SeccionFecha :por-fecha="data.por_fecha" />
      <SeccionDescarte :descarte="data.meta.descarte" :por-cuadro="data.por_cuadro" />
      <NotaMetodologica />
    </main>

    <footer class="border-t border-gris-claro/40">
      <div class="max-content mx-auto flex flex-col gap-2 px-5 py-8 text-sm lg:text-base text-gris md:px-8">
        <span class="font-display text-vino">Goral · Granadas {{ data.meta.variedad }}</span>
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
