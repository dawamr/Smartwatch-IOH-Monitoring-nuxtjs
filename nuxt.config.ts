import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  ssr: false,

  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://n8n.solarion.id',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/webhook/91d6a720-4d49-4ebe-bf19-e19e5aa9f748'),
          headers: {
            solarion: 'Renewable22',
          },
        },
      },
    },
  },

  devServer: {
    host: '127.0.0.1',
  },

  compatibilityDate: '2025-02-13',

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001/api',
    },
  },
});
