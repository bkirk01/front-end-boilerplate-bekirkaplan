<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { useRickAndMortyApi } from "~/api/composables/useRickAndMortyApi";
import { ESelectedView, useViewStore } from "~/stores/view";

const {
  getCharacters,
  refMappedCharacters,
  totalPage,
  loading,
  characterCache,
} = useRickAndMortyApi();

const viewStore = useViewStore();

const view = computed({
  get: () => viewStore.rickAndMortyView,
  set: () => viewStore.toggleView("rickAndMorty"),
});
viewStore.setPage(ESelectedView.RICKMORTY);

const paginationProps = {
  totalPages: totalPage,
  limit: 25,
};
const page = ref(1);
const isAnimating = ref(false);

const { data, refresh } = await useAsyncData(
  "characters",
  () =>
    getCharacters(
      paginationProps.limit,
      (page.value - 1) * paginationProps.limit,
      characterCache.value
    ),
  {
    watch: [page],
  }
);

// Debounce the refresh instead of the fetch
const debouncedFetch = useDebounceFn(() => refresh(), 300);

watch(page, () => {
  debouncedFetch();
});

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
    <BackgroundsRickAndMortyWallpaperBackground />

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
              v-for="character in refMappedCharacters"
              :key="character.id"
              :image="character.image"
              :title="character.name"
              :badges="character.badges"
              :type="character.type"
              :details-link="`/rick-and-morty/${character.id}`"
            />
          </template>
          <template v-else>
            <CardsListView
              v-for="character in refMappedCharacters"
              :key="character.id"
              :image="character.image"
              :title="character.name"
              :badges="character.badges"
              :type="character.type"
              :details-link="`/rick-and-morty/${character.id}`"
            />
          </template>
        </div>
      </div>
    </Transition>

    <UiFixedPagination
      v-model="page"
      :total="paginationProps.totalPages.value || paginationProps.limit"
    />
    <UiScrollToTop />
  </div>
</template>

<style>
@import "~/assets/css/views/grid.css";
@import "~/assets/css/views/list.css";
</style>
