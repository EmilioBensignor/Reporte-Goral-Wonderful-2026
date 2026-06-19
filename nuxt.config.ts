import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [
      { name: 'Marcellus', provider: 'google', weights: [400] },
      { name: 'Urbanist', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['chart.js', 'vue-chartjs'],
    },
  },
})
