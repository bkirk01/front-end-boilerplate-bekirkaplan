<template>
  <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <TransitionGroup name="fade">
      <div
        v-for="(image, index) in images"
        :key="image.src"
        v-show="currentIndex === index"
        class="absolute inset-0"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div :class="['absolute inset-0', overlayClass]" />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
interface WallpaperImage {
  src: string;
  alt: string;
}

const props = defineProps<{
  images: WallpaperImage[];
  overlayClass?: string;
}>();

const currentIndex = ref(0);

// Change wallpaper every 8 seconds with a smoother transition
onMounted(() => {
  const interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
  }, 8000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

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
