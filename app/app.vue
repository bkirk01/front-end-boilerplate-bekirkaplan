<script setup lang="ts">
import { ConstAppName } from './constants'

const route = useRoute()
const router = useRouter()
const showSubNav = computed(() => route.path !== '/')
const isRouteChanging = ref(false)

// Handle route changes
router.beforeEach(() => {
  isRouteChanging.value = true
})

router.afterEach(() => {
  isRouteChanging.value = false
})

useHead({
  title: ConstAppName,
  bodyAttrs: {
    class: 'bg-stone-50 text-stone-800 dark:bg-stone-900 dark:text-stone-50',
  },
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <div class="min-h-screen bg-gray-50">
      <navigation-main-navigation />
      <navigation-sub-navigation v-if="showSubNav" />
      <main class="relative z-10 pt-6 pb-24 lg:pt-8 sm:pt-6">
        <UContainer class="px-6">
          <NuxtPage />
        </UContainer>
      </main>
      <ui-loading-overlay v-if="isRouteChanging" />
    </div>
  </NuxtLayout>
</template>

<style>
main {
  transition: padding-top 0.3s ease;
}
</style>
