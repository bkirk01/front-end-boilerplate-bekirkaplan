<script setup lang="ts">
import { computed, ref } from 'vue'
import confPokemonApp from '~/config/pokemonConfig'
import confRickMortyApp from '~/config/rickMortyConfig'
import { ERoutePaths, useViewStore } from '~/store/view'

const props = defineProps<{
  image: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  imageClass?: string
  fallbackImage?: string // New prop for fallback image
}>()
const viewStore = useViewStore()

const currentImage = ref(props.image) // Dynamic image source

if (currentImage.value === null) {
  handleImageError()
}

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'avatar-sm'
    case 'md':
      return 'avatar-md'
    case 'lg':
      return 'avatar-lg'
    default:
      return 'avatar-md'
  }
})

// ✅ Handle image load error by switching to fallback image
function handleImageError() {
  if (currentImage.value !== confRickMortyApp.loadingImage && currentImage.value !== confPokemonApp.loadingImage) {
    currentImage.value
      = viewStore.selectedView === ERoutePaths.RICKMORTY
        ? confRickMortyApp.loadingImage
        : confPokemonApp.loadingImage
  }
  else {
    console.error('Fallback image failed to load.')
  }
}
</script>

<template>
  <div class="avatar" :class="[sizeClasses, className]">
    <img
      :src="currentImage"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="avatar-image" :class="[imageClass]"
      @error="handleImageError"
    >
  </div>
</template>

<style scoped>
.avatar {
  @apply flex items-center rounded-full overflow-hidden transition-transform duration-300 bg-white p-1 shadow-lg;
}

.avatar-image {
  @apply w-full transition-all duration-500 hover:scale-110 rounded-full p-2;
}

/* Mobile sizes */
.avatar-sm {
  @apply w-16 h-16;
}

.avatar-md {
  @apply w-20 h-20;
}

.avatar-lg {
  @apply w-24 h-24;
}

/* Desktop sizes */
@screen md {
  .avatar-sm {
    @apply w-24 h-24;
  }

  .avatar-md {
    @apply w-32 h-32;
  }

  .avatar-lg {
    @apply w-48 h-48;
  }
}
</style>
