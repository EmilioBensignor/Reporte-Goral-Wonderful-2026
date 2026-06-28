<template>
  <section class="flex flex-col gap-6">
    <EncabezadoSeccion kicker="Exportación" titulo="Cuánto salió por calibre y por cuadro"
      :conclusion="`Los ${exportacion.meta.palets} palets de exportación (${exportacion.meta.cajas.toLocaleString('es-AR')} cajas) salieron de ${exportacion.meta.cuadros.length} cuadros`" />

    <div class="grid gap-5 lg:grid-cols-2 lg:gap-6">
      <div class="flex flex-col gap-6 rounded-3xl bg-white px-5 py-7 ring-1 ring-gris-claro/40 md:px-9 md:py-9">
        <h3 class="font-display text-xl lg:text-2xl text-vino">Cantidad de cajas por cuadro</h3>
        <div class="grid h-72 items-end gap-3 md:gap-5"
          :style="{ gridTemplateColumns: `repeat(${cuadros.length}, minmax(0, 1fr))` }">
          <div v-for="b in cuadros" :key="b.id" class="flex h-full flex-col items-center justify-end gap-2">
            <span class="text-center text-sm text-gris tabular-nums leading-tight">
              {{ b.cajas.toLocaleString('es-AR') }}<br><span class="text-vino font-semibold">{{ b.pct }}%</span>
            </span>
            <div class="w-full rounded-t-lg"
              :style="{ height: `${(b.cajas / maxCuadro) * 100}%`, background: b.color }" />
            <span class="text-center font-display text-base lg:text-lg text-vino whitespace-nowrap">{{ b.label }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6 rounded-3xl bg-white px-5 py-7 ring-1 ring-gris-claro/40 md:px-9 md:py-9">
        <h3 class="font-display text-xl lg:text-2xl text-vino">Cantidad de cajas por calibre</h3>
        <div class="grid h-72 items-end gap-3 md:gap-5"
          :style="{ gridTemplateColumns: `repeat(${calibres.length}, minmax(0, 1fr))` }">
          <div v-for="b in calibres" :key="b.id" class="flex h-full flex-col items-center justify-end gap-2">
            <span class="text-center text-sm text-gris tabular-nums leading-tight">
              {{ b.cajas.toLocaleString('es-AR') }}<br><span class="text-vino font-semibold">{{ b.pct }}%</span>
            </span>
            <div class="w-full rounded-t-lg"
              :style="{ height: `${(b.cajas / maxCalibre) * 100}%`, background: b.color }" />
            <span class="text-center font-display text-base lg:text-lg text-vino">{{ b.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ exportacion: { type: Object, required: true } })

const colorCalibre = (cal) => {
  const t = (cal - 5) / 9
  const r = Math.round(47 + t * (226 - 47))
  const g = Math.round(143 - t * (143 - 8))
  const b = Math.round(91 - t * (91 - 58))
  return `rgb(${r}, ${g}, ${b})`
}

const paletaCuadros = ['#6f1d2e', '#9a2942', '#c0405c', '#d96f54', '#e2a64a', '#b48a3a']

const totalCajas = computed(() => props.exportacion.por_cuadro.reduce((s, f) => s + f.cajas, 0))

const cuadros = computed(() =>
  [...props.exportacion.por_cuadro]
    .sort((a, b) => Number(a.cuadro) - Number(b.cuadro))
    .map((f, i) => ({
      id: f.cuadro,
      label: `CN ${f.cuadro}`,
      cajas: f.cajas,
      pct: Math.round((f.cajas / totalCajas.value) * 1000) / 10,
      color: paletaCuadros[i % paletaCuadros.length],
    })),
)

const calibres = computed(() =>
  [...props.exportacion.histograma_calibre]
    .sort((a, b) => a.calibre - b.calibre)
    .map((f) => ({ id: f.calibre, label: f.calibre, cajas: f.cajas, pct: f.pct, color: colorCalibre(f.calibre) })),
)

const maxCuadro = computed(() => Math.max(...cuadros.value.map((b) => b.cajas)))
const maxCalibre = computed(() => Math.max(...calibres.value.map((b) => b.cajas)))
</script>
