<script setup lang="ts">
import { useRouteManager } from '#imports'
import { usePokemonApi } from '~/api/composables/usePokemonApi'
import DetailView from '~/components/DetailView.vue'
import ContentContainer from '~/layouts/ContentContainer.vue'
import DetailLayout from '~/layouts/DetailLayout.vue'

// Get route params
const { currentParams } = useRouteManager()
const { loading, error, refMappedPokemon, getPokemonById } = usePokemonApi()
await getPokemonById(Number(currentParams.id))
</script>

<template>
  <ContentContainer>
    <DetailLayout>
      <DetailView
        :loading-ref="loading" :on-error="error" :item-detail-specifications="refMappedPokemon"
        error-message="Pokémon"
      />
    </DetailLayout>
  </ContentContainer>
</template>
