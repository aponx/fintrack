// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    ['@nuxtjs/tailwindcss', {
      cssPath: ['~/assets/css/main.css', { injectPosition: 'first' }],
      configPath: 'tailwind.config.js',
    }]
  ],
  nitro: {},
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
