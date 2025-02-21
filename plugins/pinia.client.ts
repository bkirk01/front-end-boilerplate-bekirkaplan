import { defineNuxtPlugin } from '#app';
import { createPinia } from 'pinia';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  console.log("✅ Pinia is now active!");
});