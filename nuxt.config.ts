import { pwa } from './app/config/pwa'
import { ConstAppDescription } from './app/constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-api-party',
    '@nuxt/content',
    '@nuxt/image',
  ],
  imports: {
    dirs: ['composables'],
    global: true,
  },
  ssr: true,
  css: ['~/assets/css/main.css'],
  ui: {
    global: true,
  },
  pinia: {
    storesDirs: ['~/stores/**'],
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
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/', '/pokemon', '/rick-and-morty'],
    },
  },
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: ConstAppDescription },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: light)',
          content: 'white',
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: dark)',
          content: '#222222',
        },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: true,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-08-14',

  apiParty: {
    endpoints: {
      pokemon: {
        url: 'https://pokeapi.co/api/v2',
      },
      rickAndMorty: {
        url: 'https://rickandmortyapi.com/api',
      },
    },
  },
})
