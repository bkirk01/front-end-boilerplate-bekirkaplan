<script setup lang="ts">
const appStore = useAppStore()
</script>

<template>
  <Transition name="loading" appear mode="out-in">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-xl">
        <div class="flex flex-col items-center">
          <!-- Loading Animation -->
          <img :src="appStore.configuration.mainLoadAnimationImage" alt="Loading..." class="w-24 h-24 object-contain">

          <!-- Loading Text -->
          <span class="mt-4 text-sm font-medium text-gray-600">
            {{ `Loading ${appStore.configuration.subNavigationProps?.pageTitle}` }}
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.5s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>
