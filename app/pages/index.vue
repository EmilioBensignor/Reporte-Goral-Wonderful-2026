<template>
  <div>
    <header class="border-b border-gris-claro/40 bg-crema/80 backdrop-blur sticky top-0 z-10">
      <div class="max-content mx-auto flex justify-center items-center px-5 py-4 md:px-8">
        <img src="/logo-goral.svg" alt="Goral" class="h-7 lg:h-9" />
      </div>
    </header>

    <main class="max-content mx-auto flex flex-col gap-16 md:gap-20 lg:gap-24 px-5 py-10 md:px-8 md:py-14">
      <div class="flex flex-col gap-6">
        <h1 class="text-2xl lg:text-4xl">Reporte de cosecha {{
          data.meta.temporada }}</h1>
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
