<script setup lang="ts">
import { usePokemonApi } from '~/api'
import { useClientSideHandlers } from '~/composables/clientSide/useClientSideHandler'
import useAppStore from '~/composables/useAppStore'
import GridLayout from '~/layouts/ContentContainer.vue'
import { useViewStore } from '~/store/view'
import { ERoutePaths } from '~/types/common'

const { getPokemons, refMappedPokemons, totalPage, loading } = usePokemonApi()
const viewStore = useViewStore()
const appConfig = useAppStore()

if (!viewStore) {
  throw new Error('Pinia store is not initialized.')
}

const paginationValue = ref(1)

useClientSideHandlers(paginationValue, loading, async () => {
  viewStore.setPage(ERoutePaths.POKEMON)
  await getPokemons(20, (paginationValue.value - 1) * 20)
})

// Computed view getter/setter for toggling
const toggleView = computed({
  get: () => viewStore.pokemonView,
  set: () => viewStore.toggleView(),
})
</script>

<template>
  <div>
    <!-- Background -->
    <BackgroundsPokemonWallpaperBackground v-if="appConfig.configuration.contentContainerConfig?.showWallPaper" />
    <!-- Content -->
    <client-only>
      <!-- Loading -->
      <UiLoadingOverlay v-show="loading" />
      <Transition appear mode="out-in" name="page">
        <div :key="`page-${paginationValue}`" class="page-content">
          <template v-if="toggleView === 'grid'">
            <GridLayout>
              <div class="grid-container">
                <CardsGridCard
                  v-for="pokemon in refMappedPokemons" :key="pokemon.id" :image="pokemon.image"
                  :title="pokemon.name" :badges="pokemon.badges" :type="pokemon.type"
                  :details-link="`/pokemon/${pokemon.id}`"
                />
              </div>
            </GridLayout>
          </template>

          <template v-else>
            <div class="list-container">
              <CardsListView
                v-for="pokemon in refMappedPokemons" :key="pokemon.id" :image="pokemon.image"
                :title="pokemon.name" :badges="pokemon.badges" :type="pokemon.type"
                :details-link="`/pokemon/${pokemon.id}`"
              />
            </div>
          </template>
        </div>
      </Transition>
    </client-only>

    <!-- Pagination -->
    <UiFixedPagination v-model="paginationValue" :total="totalPage" />
    <UiScrollToTop />
  </div>
</template>

<style>
@import '~/assets/css/views/grid.css';
@import '~/assets/css/views/list.css';
</style>
