// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    ['@nuxtjs/tailwindcss', {
      cssPath: ['~/assets/css/main.css', { injectPosition: 'first' }],
      configPath: 'tailwind.config.js',
    }],
    '@vite-pwa/nuxt'
  ],
  pwa: {
    registerType: 'autoUpdate', // Update otomatis jika ada versi baru
    manifest: {
      name: 'FinTrack App',
      short_name: 'FinTrack',
      description: 'Manage your finances with ease',
      theme_color: '#ffffff', // Sesuaikan dengan warna background aplikasi
      background_color: '#ffffff',
      display: 'standalone', // Ini yang bikin tampilan full-screen (tanpa address bar)
      icons: [
        {
          src: '/pwa-icons/icon-192x192.png', // Pastikan path ini benar sesuai Langkah 2
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      // Pola file yang akan dicache (CSS, JS, HTML, Gambar)
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      // Jangan cache route API backend agar data selalu fresh
      navigateFallback: null
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true, // Aktifkan PWA di mode dev (localhost) untuk testing
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },

  tailwindcss: {
    cssPath: ['~/assets/css/home.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config.js',
  },
  nitro: {},
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
