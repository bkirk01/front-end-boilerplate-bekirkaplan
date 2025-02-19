export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@vite-pwa/nuxt'],
  ui: {
    global: true,
  },
  components: {
    dirs: [
      {
        path: '~/components/ui',
        prefix: 'ui',
      },
      {
        path: '~/components/cards',
        prefix: 'cards',
      },
      {
        path: '~/components/navigation',
        prefix: 'navigation',
      },
      {
        path: '~/components/backgrounds',
        prefix: 'backgrounds',
      },
      {
        path: '~/design/components',
        prefix: 'D',
      },
    ],
  },
  app: {
    head: {
      title: 'Rick & Morty and Pokémon Overview',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Explore characters from Rick & Morty and discover Pokémon species, their types, abilities, and stats.',
        },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/pwa-192x192.png' },
      ],
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Rick & Morty and Pokémon',
      short_name: 'R&M + Pokémon',
      description:
        'Explore characters from Rick & Morty and discover Pokémon species, their types, abilities, and stats.',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'maskable-icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,txt,png,ico,svg}'],
      navigateFallbackDenylist: [/^\/api\//],
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts.gstatic.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/rickandmortyapi.com\/api\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'rick-and-morty-api-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24, // 1 day
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/pokeapi.co\/api\/v2\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pokemon-api-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24, // 1 day
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/raw.githubusercontent.com\/PokeAPI\/sprites\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'pokemon-sprites-cache',
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    registerWebManifestInRouteRules: true,
    writePlugin: true,
    devOptions: {
      enabled: true,
      navigateFallback: '/',
    },
  },
});
