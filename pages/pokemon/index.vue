<script setup lang="ts">
import { usePokemonApi } from "@/api/composables/usePokemonApi";

const { getPokemons, refMappedPokemons, totalPage, loading } = usePokemonApi();
const viewStore = useViewStore();
const view = computed({
  get: () => viewStore.pokemonView,
  set: () => viewStore.toggleView("pokemon"),
});

const paginationProps = {
  totalPages: totalPage,
  limit: 20,
};
const page = ref(1);
const isAnimating = ref(false);

await useAsyncData(
  () =>
    getPokemons(
      paginationProps.limit,
      (page.value - 1) * paginationProps.limit
    ),
  {
    watch: [page],
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
    <UiLoadingOverlay v-if="loading" />

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
              :details-link="`/pokemon/${pokemon.id}`"
              :type="pokemon.type"
              :badges="pokemon.badges"
            />
          </template>
          <template v-else>
            <CardsListView
              v-for="pokemon in refMappedPokemons"
              :key="pokemon.id"
              :image="pokemon.image"
              :title="pokemon.name"
              :details-link="`/pokemon/${pokemon.id}`"
              :badges="pokemon.badges"
              :height="pokemon.height"
              :weight="pokemon.weight"
              :type="pokemon.type"
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
