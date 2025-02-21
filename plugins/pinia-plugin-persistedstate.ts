import { defineNuxtPlugin } from '#app';
import { usePinia } from '#imports';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { Pinia } from 'pinia';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = usePinia() as Pinia;
  pinia.use(piniaPluginPersistedstate);
});
