<script setup lang="ts">
import { useAsyncData } from '#app'

interface WallpaperImage {
  src: string
  alt: string
}

const props = defineProps<{
  images: WallpaperImage[]
  overlayClass?: string
}>()

const currentIndex = ref(0)

// SSR-friendly state management for currentIndex
const { data: asyncIndex } = await useAsyncData('currentIndex', async () => 0)

if (import.meta.client) {
  currentIndex.value = asyncIndex.value ?? 0

  onMounted(() => {
    const interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % props.images.length
    }, 8000)

    onUnmounted(() => {
      clearInterval(interval)
    })
  })
}
</script>

<template>
  <client-only>
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <TransitionGroup name="fade" appear>
        <div
          v-for="(image, index) in images"
          v-show="currentIndex === index"
          :key="image.src"
          class="absolute inset-0"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          >
          <div class="absolute inset-0" :class="[overlayClass]" />
        </div>
      </TransitionGroup>
    </div>
  </client-only>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
