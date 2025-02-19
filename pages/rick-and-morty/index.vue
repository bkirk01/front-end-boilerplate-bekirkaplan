<template>
  <div>
    <!-- Wallpaper Background -->
    <backgrounds-rick-and-morty-wallpaper-background />

    <!-- Loading Overlay -->
    <ui-loading-overlay v-if="loading" />

    <!-- Content -->
    <Transition mode="out-in" name="page" @before-leave="beforeLeave" @after-leave="afterLeave">
      <div :key="`page-${page}`" class="page-content">
        <div :class="[view === 'grid' ? 'grid-container' : 'list-container']">
          <template v-if="view === 'grid'">
            <cards-grid-card
              v-for="character in characters"
              :key="character.id"
              :image="character.image"
              :title="character.name"
              :details="character.details"
              :details-link="`/rick-and-morty/${character.id}`"
            />
          </template>
          <template v-else>
            <cards-list-view
              v-for="character in characters"
              :key="character.id"
              :image="character.image"
              :title="character.name"
              :details="character.details"
              :details-link="`/rick-and-morty/${character.id}`"
            />
          </template>
        </div>
      </div>
    </Transition>

    <ui-fixed-pagination v-model="page" :total="info?.pages || 1" />
    <ui-scroll-to-top />
  </div>
</template>

<script setup lang="ts">
import { mapCharacterToBaseItem } from '~/mappers/rickAndMorty';
import type { BaseItem } from '~/types/common';

const { getCharacters, loading } = useRickAndMortyApi();
const viewStore = useViewStore();
const view = computed({
  get: () => viewStore.rickAndMortyView,
  set: () => viewStore.toggleView('rickAndMorty'),
});

const page = ref(1);
const isAnimating = ref(false);

const { data: response } = await useAsyncData(() => getCharacters(page.value), {
  watch: [page],
});

const characters = computed<BaseItem[]>(() => {
  return (response.value?.data?.results || []).map(mapCharacterToBaseItem);
});

const info = computed(() => response.value?.data?.info || {});

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
      behavior: 'smooth',
    });
  }
});
</script>

<style>
@import '~/assets/css/views/grid.css';
@import '~/assets/css/views/list.css';
</style>
