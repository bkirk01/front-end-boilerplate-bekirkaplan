<script setup lang="ts">
import { useRoute } from '#app'
import { useRickAndMortyApi } from '~/api/composables/useRickAndMortyApi'
import DetailView from '~/components/DetailView.vue'

// Get route params
const route = useRoute()
const id = computed(() => {
  return (route.params as { id?: string }).id !== undefined
})
const { loading, error, refMappedCharacter, getCharacterById } = useRickAndMortyApi()

await getCharacterById(Number(id))
</script>

<template>
  <div>
    <BackgroundsRickAndMortyWallpaperBackground />
    <DetailView :loading-ref="loading" :on-error="error" :item-detail-specifications="refMappedCharacter" error-message="Rick & Morty" />
  </div>
</template>
