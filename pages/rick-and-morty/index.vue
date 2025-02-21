<script setup lang="ts">
import { CardsGridCard } from "#components";
import { useDebounceFn } from "@vueuse/core";
import { useRickAndMortyApi } from "~/api/composables/useRickAndMortyApi";

const {
  getCharacters,
  loading,
  totalPage,
  refMappedCharacters,
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

const debouncedFetch = useDebounceFn(async () => {
  const offset = (page.value - 1) * paginationProps.limit;
  await getCharacters(paginationProps.limit, offset, characterCache.value);
}, 300);

await useAsyncData(debouncedFetch, {
  watch: [page],
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
    <backgrounds-rick-and-morty-wallpaper-background />

    <!-- Loading Overlay -->
    <ui-loading-overlay v-if="loading" />

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
              :details-link="`/rick-and-morty/${character.id}`"
            />
          </template>
        </div>
      </div>
    </Transition>

    <ui-fixed-pagination
      v-model="page"
      :total="paginationProps.totalPages.value || 1"
    />
    <ui-scroll-to-top />
  </div>
</template>

<style>
@import "~/assets/css/views/grid.css";
@import "~/assets/css/views/list.css";
</style>
