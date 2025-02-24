import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    include: ['**/*.test.{ts,js,vue}'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)), // root directory
      '~': fileURLToPath(new URL('./app', import.meta.url)), // same as '@'
      '~components': fileURLToPath(new URL('./app/components', import.meta.url)),
      '~store': fileURLToPath(new URL('./app/store', import.meta.url)),
      '~config': fileURLToPath(new URL('./app/config', import.meta.url)),
      '~types': fileURLToPath(new URL('./app/types', import.meta.url)),
    },
  },
})
