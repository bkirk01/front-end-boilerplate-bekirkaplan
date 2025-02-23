<script setup lang="ts">
import { useRickAndMortyApi } from '~/api/composables/useRickAndMortyApi'
import { useClientSideHandlers } from '~/composables/clientSide/useClientSideHandler'
import ContentContainer from '~/layouts/ContentContainer.vue'
import PagesLayout from '~/layouts/PagesLayout.vue'
import { useViewStore } from '~/store/view'

const viewStore = useViewStore()

if (!viewStore) {
  throw new Error('Pinia store is not initialized.')
}

const paginationValue = ref(1)
const { getCharacters, refMappedCharacters, totalPage, loading } = useRickAndMortyApi()
const cache = new Map()

// Simplified handler: Auto-fetches & scrolls on page change
useClientSideHandlers(paginationValue, loading, async () => {
  await getCharacters(20, paginationValue.value - 1, cache)
})

// Computed view getter/setter
const toggleView = computed({
  get: () => viewStore.rickAndMortyView,
  set: () => viewStore.toggleView(),
})
</script>

<template>
  <ContentContainer>
    <PagesLayout>
      <ClientOnly>
        <!-- Loading -->
        <UiLoadingOverlay v-show="loading" />
        <Transition mode="out-in" name="page">
          <div :key="`page-${paginationValue}`" class="page-content">
            <template v-if="toggleView === 'grid'">
              <div class="grid-container">
                <CardsGridCard
                  v-for="character in refMappedCharacters" :key="character.id" :image="character.image"
                  :title="character.name" :badges="character.badges" :type="character.type"
                  :details-link="`/rick-and-morty/${character.id}`"
                />
              </div>
            </template>
            <template v-else>
              <div class="list-container">
                <CardsListView
                  v-for="character in refMappedCharacters" :key="character.id" :image="character.image"
                  :title="character.name" :badges="character.badges" :type="character.type"
                  :details-link="`/rick-and-morty/${character.id}`"
                />
              </div>
            </template>
          </div>
        </Transition>
        <UiFixedPagination v-model="paginationValue" :total="totalPage" />
        <UiScrollToTop />
      </ClientOnly>
    </PagesLayout>
  </ContentContainer>
</template>

<style>
@import '~/assets/css/views/grid.css';
@import '~/assets/css/views/list.css';
</style>
