<script setup lang="ts">
import { useRouteManager } from '#imports'
import { useRickAndMortyApi } from '~/api/composables/useRickAndMortyApi'
import DetailView from '~/components/DetailView.vue'
import ContentContainer from '~/layouts/ContentContainer.vue'
import DetailLayout from '~/layouts/DetailLayout.vue'

// Get route params
const { currentParams } = useRouteManager()
const { loading, error, refMappedCharacter, getCharacterById } = useRickAndMortyApi()
await getCharacterById(Number(currentParams.id))
</script>

<template>
  <ContentContainer>
    <DetailLayout>
      <DetailView
        :loading-ref="loading" :on-error="error" :item-detail-specifications="refMappedCharacter"
        error-message="Rick & Morty"
      />
    </DetailLayout>
  </ContentContainer>
</template>
