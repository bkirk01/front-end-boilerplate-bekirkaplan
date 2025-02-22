<script setup lang="ts">
import { useRickAndMortyApi } from "~/api/composables/useRickAndMortyApi";
import { useClientSideHandlers } from "~/composables/clientSide/useClientSideHandler";
import { useViewStore } from "~/store/view";
import { ERoutePaths } from "~/types/common";

const { getCharacters, refMappedCharacters, totalPage, loading } =
  useRickAndMortyApi();
const viewStore = useViewStore();

if (!viewStore) {
  throw new Error("Pinia store is not initialized.");
}

const page = ref(1);
useClientSideHandlers(page, loading, getCharacters);

watch(page, (newValue) => {
  page.value = newValue;
  viewStore.setPage(ERoutePaths.RICKMORTY);
  getCharacters(20, page.value - 1);
});

// Computed view getter/setter
const view = computed({
  get: () => viewStore.rickAndMortyView,
  set: () => viewStore.toggleView(),
});
</script>

<template>
  <div>
    <!-- Background -->
    <BackgroundsRickAndMortyWallpaperBackground />
    <!-- Content -->
    <client-only>
      <!-- Loading -->
      <UiLoadingOverlay v-show="loading" />
      <Transition mode="out-in" name="page">
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
    </client-only>

    <!-- Conditionally render pagination after data load -->
    <client-only>
      <UiFixedPagination v-model="page" :total="totalPage" />
      <UiScrollToTop />
    </client-only>
  </div>
</template>

<style>
@import "~/assets/css/views/grid.css";
@import "~/assets/css/views/list.css";
</style>
