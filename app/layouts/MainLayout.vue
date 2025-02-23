<script setup lang="ts">
import { useRouteManager } from '#imports'

const { isRouteChanging } = useRouteManager()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <main class="relative z-10">
      <NavigationMainNavigation />
      <slot />
      <ClientOnly>
        <UiLoadingOverlay v-show="isRouteChanging" />
      </ClientOnly>
    </main>
  </div>
</template>

<style>
main {
  transition: padding-top 0.3s ease;
}
</style>
