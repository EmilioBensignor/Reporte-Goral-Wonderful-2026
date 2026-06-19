<template>
  <div class="flex flex-col gap-2">
    <span class="text-sm lg:text-xl font-semibold text-rojo uppercase">{{ kicker }}</span>
    <h2 class="font-display text-2xl text-vino lg:text-4xl">{{ titulo }}</h2>
    <p v-if="conclusion" class="lg:text-2xl">{{ conclusion }}</p>
  </div>
</template>

<script setup>
defineProps({
  kicker: { type: String, required: true },
  titulo: { type: String, required: true },
  conclusion: { type: String, default: '' },
})
</script>
