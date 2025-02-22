<script setup lang="ts">
import { useRoute } from '#app'
import { usePokemonApi } from '~/api/composables/usePokemonApi'
import DetailView from '~/components/DetailView.vue'
// Get route params
const route = useRoute()

const id = computed(() => {
  return (route.params as { id?: string }).id !== undefined
})
const { loading, error, refMappedPokemon, getPokemonById } = usePokemonApi()

await getPokemonById(Number(id))
</script>

<template>
  <div>
    <BackgroundsPokemonWallpaperBackground />
    <DetailView :loading-ref="loading" :on-error="error" :item-detail-specifications="refMappedPokemon" error-message="Pokémon" />
  </div>
</template>
