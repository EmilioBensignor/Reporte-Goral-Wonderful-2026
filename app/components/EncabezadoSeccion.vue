<template>
  <div class="flex flex-col gap-2">
    <span class="text-sm font-semibold text-rojo tracking-[0.2em] uppercase">{{ kicker }}</span>
    <h2 class="font-display text-2xl text-vino lg:text-3xl">{{ titulo }}</h2>
    <p v-if="conclusion" class="text-sm text-gris lg:text-base">{{ conclusion }}</p>
  </div>
</template>

<script setup>
defineProps({
  kicker: { type: String, required: true },
  titulo: { type: String, required: true },
  conclusion: { type: String, default: '' },
})
</script>
