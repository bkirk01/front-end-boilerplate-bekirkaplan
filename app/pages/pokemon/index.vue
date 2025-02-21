<script setup lang="ts">
import { usePokemonApi } from "~/api";
import { useClientSideHandlers } from "~/composables/clientSide/rick-and-morty/useClientSideHandler";
import { ESelectedView, useViewStore } from "~/stores/view";

const { getPokemons, refMappedPokemons, totalPage, loading } = usePokemonApi();
const viewStore = useViewStore();

if (!viewStore) {
  throw new Error("Pinia store is not initialized.");
}

const page = ref(1);
watch(page, () => {
  viewStore.setPage(ESelectedView.POKEMON);
});

// Computed view getter/setter for toggling
const view = computed({
  get: () => viewStore.pokemonView,
  set: () => viewStore.toggleView(ESelectedView.POKEMON),
});

watchEffect(() => {
  useClientSideHandlers(page, loading, getPokemons);
});
</script>

<template>
  <div>
    <!-- Background -->
    <BackgroundsPokemonWallpaperBackground />
    <!-- Content -->
    <client-only>
      <!-- Loading -->
      <UiLoadingOverlay v-show="loading" />
      <Transition appear mode="out-in" name="page">
        <div :key="`page-${page}`" class="page-content">
          <div :class="[view === 'grid' ? 'grid-container' : 'list-container']">
            <template v-if="view === 'grid'">
              <CardsGridCard
                v-for="pokemon in refMappedPokemons"
                :key="pokemon.id"
                :image="pokemon.image"
                :title="pokemon.name"
                :badges="pokemon.badges"
                :type="pokemon.type"
                :details-link="`/pokemon/${pokemon.id}`"
              />
            </template>
            <template v-else>
              <CardsListView
                v-for="pokemon in refMappedPokemons"
                :key="pokemon.id"
                :image="pokemon.image"
                :title="pokemon.name"
                :badges="pokemon.badges"
                :type="pokemon.type"
                :details-link="`/pokemon/${pokemon.id}`"
              />
            </template>
          </div>
        </div>
      </Transition>
    </client-only>

    <!-- Pagination -->
    <UiFixedPagination v-model="page" :total="totalPage" />
    <UiScrollToTop />
  </div>
</template>

<style>
@import "~/assets/css/views/grid.css";
@import "~/assets/css/views/list.css";
</style>
