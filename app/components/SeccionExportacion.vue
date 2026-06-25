<template>
  <section class="flex flex-col gap-6">
    <EncabezadoSeccion kicker="Exportación" titulo="Qué calibres tiene cada cuadro"
      :conclusion="`Los ${exportacion.meta.palets} palets de exportación salieron de ${cuadros.length} cuadros`" />

    <div class="overflow-x-auto rounded-3xl bg-white px-5 py-7 ring-1 ring-gris-claro/40 md:px-9 md:py-9">
      <div class="grid items-center gap-x-3 gap-y-2"
        :style="{ gridTemplateColumns: `auto repeat(${cuadros.length}, minmax(64px, 1fr))` }">

        <div class="text-sm text-gris uppercase tracking-[0.15em]">Calibre</div>
        <div v-for="cn in cuadros" :key="`h-${cn}`"
          class="pb-2 text-center font-display text-xl lg:text-2xl text-vino whitespace-nowrap">
          CN {{ cn }}
        </div>

        <template v-for="cal in calibresVisibles" :key="`row-${cal}`">
          <div class="flex items-center gap-2 font-display text-2xl lg:text-3xl text-vino">
            <span class="size-3 rounded-full" :style="{ background: colorCalibre(cal) }" />
            {{ cal }}
          </div>
          <div v-for="cn in cuadros" :key="`${cal}-${cn}`"
            class="flex h-16 items-center justify-center rounded-xl"
            :style="{ background: celda(cn, cal).css }">
            <span class="font-semibold tabular-nums"
              :style="{ color: celda(cn, cal).oscura ? 'var(--color-crema)' : 'var(--color-vino)' }">
              {{ pctCelda(cn, cal) ? `${pctCelda(cn, cal)}%` : '' }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ exportacion: { type: Object, required: true } })

const cuadros = computed(() => [...props.exportacion.meta.cuadros].sort((a, b) => Number(a) - Number(b)))
const matriz = computed(() => props.exportacion.calibre_por_cuadro)

const calibresVisibles = computed(() =>
  [5, 6, 7, 8, 9, 10, 11, 12, 13, 14].filter((cal) => {
    const total = cuadros.value.reduce((s, cn) => s + matriz.value[cn][String(cal)], 0)
    const granTotal = cuadros.value.reduce((s, cn) => s + Object.values(matriz.value[cn]).reduce((a, b) => a + b, 0), 0)
    return total / granTotal >= 0.01
  }),
)

const totalCn = (cn) => calibresVisibles.value.reduce((s, cal) => s + matriz.value[cn][String(cal)], 0)
const pctCelda = (cn, cal) => Math.round((matriz.value[cn][String(cal)] / totalCn(cn)) * 100)

const colorCalibre = (cal) => {
  const t = (cal - 5) / 9
  const r = Math.round(47 + t * (226 - 47))
  const g = Math.round(143 - t * (143 - 8))
  const b = Math.round(91 - t * (91 - 58))
  return `rgb(${r}, ${g}, ${b})`
}

const celda = (cn, cal) => {
  const [r, g, b] = colorCalibre(cal).match(/\d+/g).map(Number)
  const pct = matriz.value[cn][String(cal)] / totalCn(cn)
  const t = Math.min(pct / 0.34, 1)
  const lerp = (from, to) => Math.round(from + (to - from) * t)
  const [cr, cg, cb] = [lerp(253, r), lerp(249, g), lerp(249, b)]
  const luminancia = (cr * 299 + cg * 587 + cb * 114) / 1000
  return { css: `rgb(${cr}, ${cg}, ${cb})`, oscura: luminancia < 140 }
}
</script>
