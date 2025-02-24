<script setup lang="ts">
import confPokemonApp from '~/config/pokemonConfig'
import confRickMortyApp from '~/config/rickMortyConfig'
import { useViewStore } from '~/store/view'
import { ERoutePaths } from '~/types/common'

const props = defineProps<{
  image: string | undefined
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

// Handle image load error by switching to fallback image
function handleImageError() {
  if (currentImage.value !== confRickMortyApp.mainLoadAnimationImage && currentImage.value !== confPokemonApp.mainLoadAnimationImage) {
    currentImage.value
      = viewStore.selectedView === ERoutePaths.RICKMORTY
        ? confRickMortyApp.mainLoadAnimationImage
        : confPokemonApp.mainLoadAnimationImage
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
@import '~/assets/css/components/ui/avatar.css';
</style>
