import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://n8n.solarion.id',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/webhook/91d6a720-4d49-4ebe-bf19-e19e5aa9f748'),
          headers: {
            'solarion': 'Renewable22'
          }
        }
      }
    }
  }
})
