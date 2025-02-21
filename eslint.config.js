import { nuxt } from '@nuxt/eslint/config'
import { defineFlatConfig } from 'eslint-define-config'

export default defineFlatConfig([
  ...nuxt(),
  // Add or override rules here
])
