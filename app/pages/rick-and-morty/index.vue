<script setup lang="ts">
import { useRickAndMortyApi } from '~/api/composables/useRickAndMortyApi'
import { useClientSideHandlers } from '~/composables/clientSide/useClientSideHandler'
import useAppStore from '~/composables/useAppStore'
import GridLayout from '~/layouts/ContentContainer.vue'
import { useViewStore } from '~/store/view'
import { ERoutePaths } from '~/types/common'

const { getCharacters, refMappedCharacters, totalPage, loading } = useRickAndMortyApi()
const viewStore = useViewStore()
const appConfig = useAppStore()

if (!viewStore) {
  throw new Error('Pinia store is not initialized.')
}

const paginationValue = ref(1)

// Simplified handler: Auto-fetches & scrolls on page change
useClientSideHandlers(paginationValue, loading, async () => {
  viewStore.setPage(ERoutePaths.RICKMORTY)
  await getCharacters(20, paginationValue.value - 1)
})

// Computed view getter/setter
const toggleView = computed({
  get: () => viewStore.rickAndMortyView,
  set: () => viewStore.toggleView(),
})
</script>

<template>
  <div>
    <!-- Background -->
    <BackgroundsRickAndMortyWallpaperBackground v-if="appConfig?.configuration?.contentContainerConfig?.showWallPaper" />
    <!-- Content -->
    <client-only>
      <!-- Loading -->
      <UiLoadingOverlay v-show="loading" />
      <Transition mode="out-in" name="page">
        <div :key="`page-${paginationValue}`" class="page-content">
          <template v-if="toggleView === 'grid'">
            <GridLayout>
              <div class="grid-container">
                <CardsGridCard
                  v-for="character in refMappedCharacters" :key="character.id" :image="character.image"
                  :title="character.name" :badges="character.badges" :type="character.type"
                  :details-link="`/rick-and-morty/${character.id}`"
                />
              </div>
            </GridLayout>
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
    </client-only>

    <!-- Conditionally render pagination after data load -->
    <client-only>
      <UiFixedPagination v-model="paginationValue" :total="totalPage" />
      <UiScrollToTop />
    </client-only>
  </div>
</template>

<style>
@import '~/assets/css/views/grid.css';
@import '~/assets/css/views/list.css';
</style>
