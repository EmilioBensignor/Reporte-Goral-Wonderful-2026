<template>
  <section class="flex flex-col gap-6">
    <EncabezadoSeccion kicker="Descarte" titulo="Fruta descartada por calidad"
      conclusion="Se anota a mano en cada planilla y casi nunca se completó, así que este número es un piso, no el total real." />

    <div class="grid gap-5 md:grid-cols-[1.1fr_1fr]">
      <div class="flex flex-col justify-between gap-6 rounded-3xl bg-vino p-7 text-crema md:p-9">
        <div class="flex flex-col gap-1">
          <span class="font-display text-5xl lg:text-6xl">{{ nf(descarte.registrado_kg) }}<span
              class="ml-2 text-2xl">kg</span></span>
          <span class="lg:text-2xl">Descarte registrado en toda la temporada</span>
        </div>
        <div class="flex items-start gap-3 rounded-2xl bg-crema/10 p-4">
          <span class="text-lg">⚠</span>
          <p class="lg:text-lg">Falta el dato en <strong class="text-crema">{{ descarte.palets_sin_dato }} de {{
            descarte.palets_con_dato + descarte.palets_sin_dato }}</strong> palets. El descarte real es <strong
              class="text-crema">≥ {{ nf(descarte.registrado_kg) }} kg</strong>.</p>
        </div>
      </div>

      <div class="flex flex-col gap-3 rounded-3xl bg-white p-7 ring-1 ring-gris-claro/40 md:p-9">
        <span class="text-sm lg:text-lg text-gris uppercase tracking-wider">Dónde sí se registró</span>
        <ul class="flex flex-col divide-y divide-gris-claro/30">
          <li v-for="c in conDescarte" :key="c.cuadro" class="flex items-center justify-between py-3">
            <span class="font-display text-lg lg:text-xl text-vino">Cuadro {{ c.cuadro }}</span>
            <span class="lg:text-2xl font-semibold text-secundario">{{ nf(c.descarte_kg) }} kg</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useFormato } from '~/composables/useFormato'

const props = defineProps({
  descarte: { type: Object, required: true },
  porCuadro: { type: Array, required: true },
})

const { nf } = useFormato()
const conDescarte = computed(() => props.porCuadro.filter((c) => c.descarte_kg > 0))
</script>
