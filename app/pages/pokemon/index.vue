<script setup lang="ts">
import { usePokemonApi } from '~/api'
import { useClientSideHandlers } from '~/composables/clientSide/useClientSideHandler'
import ContentContainer from '~/layouts/ContentContainer.vue'
import PagesLayout from '~/layouts/PagesLayout.vue'
import { useViewStore } from '~/store/view'

const { getPokemons, refMappedPokemons, totalPage, loading } = usePokemonApi()
const viewStore = useViewStore()

if (!viewStore) {
  throw new Error('Pinia store is not initialized.')
}

const paginationValue = ref(1)

useClientSideHandlers(paginationValue, loading, async () => {
  await getPokemons(20, (paginationValue.value - 1) * 20)
})

// Computed view getter/setter for toggling
const toggleView = computed({
  get: () => viewStore.pokemonView,
  set: () => viewStore.toggleView(),
})
</script>

<template>
  <ContentContainer>
    <PagesLayout>
      <!-- Content -->
      <ClientOnly>
        <!-- Loading -->
        <UiLoadingOverlay v-show="loading" />
        <Transition appear mode="out-in" name="page">
          <div :key="`page-${paginationValue}`" class="page-content">
            <template v-if="toggleView === 'grid'">
              <div class="grid-container">
                <CardsGridCard
                  v-for="pokemon in refMappedPokemons"
                  :key="pokemon.id"
                  :image="pokemon.image"
                  :badges="pokemon.badges"
                  :type="pokemon.type"
                  :details-link="{ to: `/pokemon/${pokemon.id}`, text: 'Detail' }"
                  :title="pokemon.name"
                >
                  <template #avatar>
                    <img class="bg-white opacity-85 p-2 rounded-md transition hover:animate-pulse duration-100" :src="pokemon.image" :alt="pokemon.name" loading="lazy" decoding="async">
                  </template>
                  <!-- Example usage of templates for CardsGridCard conponent -->
                  <!--
                  <template #title>
                    {{ pokemon.name }}
                  </template>
                  <template #avatar>
                    <img :src="pokemon.image" :alt="pokemon.name" loading="lazy" decoding="async">
                  </template>
                  <template #content>
                    Content
                  </template>
                  <template #footer>
                    Footer
                  </template>
                  -->
                </CardsGridCard>
              </div>
            </template>

            <template v-else>
              <div class="list-container">
                <CardsListView
                  v-for="pokemon in refMappedPokemons"
                  :key="pokemon.id"
                  :image="pokemon.image"
                  :badges="pokemon.badges"
                  :type="pokemon.type"
                  :details-link="`/pokemon/${pokemon.id}`"
                >
                  <template #title>
                    <h3 class="font-bold py-2 px-4 mb-2 rounded-lg text-black bg-white">
                      {{ pokemon.name }}
                    </h3>
                  </template>
                  <!-- Example slot usages for CardListView component -->
                  <!--
                  <template #contentBody>
                    Body
                  </template>
                  -->
                </CardsListView>
              </div>
            </template>
          </div>
        </Transition>
      </ClientOnly>

      <!-- Pagination -->
      <UiFixedPagination v-model="paginationValue" :total="totalPage" />
      <UiScrollToTop />
    </PagesLayout>
  </ContentContainer>
</template>

<style>
@import '~/assets/css/views/grid.css';
@import '~/assets/css/views/list.css';
</style>
