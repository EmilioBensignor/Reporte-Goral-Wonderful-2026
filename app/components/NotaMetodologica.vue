<template>
  <section class="rounded-3xl bg-white ring-1 ring-gris-claro/40">
    <button
      class="flex w-full items-center justify-between gap-4 p-6 text-left md:p-7"
      :aria-expanded="abierto"
      @click="abierto = !abierto"
    >
      <span class="flex flex-col gap-0.5">
        <span class="text-xs text-rojo uppercase tracking-[0.2em]">Cómo se armó este reporte</span>
        <span class="font-display text-lg text-vino">Nota metodológica</span>
      </span>
      <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-crema text-rojo transition-transform duration-300" :class="abierto ? 'rotate-45' : ''">+</span>
    </button>
    <div class="grid transition-[grid-template-rows] duration-300 ease-out" :class="abierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
      <div class="overflow-hidden">
        <p class="px-6 pb-6 text-sm text-gris md:px-7 md:pb-7">
          Los datos se extrajeron de 97 planillas manuscritas con visión por inteligencia artificial,
          con doble lectura y verificación independiente de cada calibre. Las planillas que tenían
          varios cuadros anotados se repartieron en partes iguales entre esos cuadros, confirmado por
          Goral, por eso algunos cuadros tienen una cantidad de palets fraccionaria. El descarte se
          anota a mano en el encabezado de cada planilla y casi nunca fue completado.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const abierto = ref(false)
</script>
