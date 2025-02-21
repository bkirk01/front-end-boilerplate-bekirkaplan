<script setup lang="ts">
import { BackgroundsPokemonWallpaperBackground } from "#components";
import { usePokemonApi } from "~/api";
import { ESelectedView, useViewStore } from "~/stores/view";

const { getPokemons, refMappedPokemons, totalPage, loading } = usePokemonApi();
const viewStore = useViewStore();
const view = computed({
  get: () => viewStore.pokemonView,
  set: () => viewStore.toggleView(ESelectedView.POKEMON),
});
viewStore.setPage(ESelectedView.POKEMON);

const paginationProps = {
  totalPages: totalPage,
  limit: 20,
};
const page = ref(1);
const isAnimating = ref(false);

const { data, refresh } = await useAsyncData(
  'pokemons', // Unique key for caching
  () =>
    getPokemons(
      paginationProps.limit,
      (page.value - 1) * paginationProps.limit
    ),
  {
    watch: [page], // Re-fetch when page changes
  }
);

// Animation control functions
function beforeLeave() {
  isAnimating.value = true;
}

function afterLeave() {
  isAnimating.value = false;
}

// Scroll to top when page changes
watch(page, () => {
  if (!isAnimating.value) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});
</script>

<template>
  <div>
    <!-- Wallpaper Background -->
    <BackgroundsPokemonWallpaperBackground />

    <!-- Loading Overlay -->
    <UiLoadingOverlay v-show="loading" />

    <!-- Content -->
    <Transition
      mode="out-in"
      name="page"
      @before-leave="beforeLeave"
      @after-leave="afterLeave"
    >
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

    <UiFixedPagination
      v-model="page"
      :total="Math.ceil(totalPage / paginationProps.limit)"
    />
    <UiScrollToTop />
  </div>
</template>

<style>
@import "~/assets/css/views/grid.css";
@import "~/assets/css/views/list.css";
</style>
