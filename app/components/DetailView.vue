<script setup lang="ts">
import { CardsCharacterDetail } from "#components";
import { usePokemonApi } from "~/api/composables/usePokemonApi";
import { useRickAndMortyApi } from "~/api/composables/useRickAndMortyApi";
import { ERoutePaths, useViewStore } from "~/store/view";
import "~/assets/css/views/detail.css";
import type { TCItemDetailType, TGenType } from "~/types/common";

const viewStore = useViewStore();
const isPokemon = viewStore.selectedView === ERoutePaths.POKEMON;

const props = defineProps<{
  itemDetailSpecifications: TCItemDetailType;
}>();

const { loading: pokemonLoading, error: pokemonError } = usePokemonApi();

const { loading: characterLoading, error: characterError } =
  useRickAndMortyApi();
</script>

<template>
  <div>
    <!-- Wallpaper Background -->
    <backgrounds-pokemon-wallpaper-background v-if="isPokemon" />
    <backgrounds-rick-and-morty-wallpaper-background v-else />

    <!-- Loading Overlay -->
    <UiLoadingOverlay v-if="pokemonLoading || characterLoading" />

    <!-- Content -->
    <div class="detail-container">
      <CardsCharacterDetail
        :data="props.itemDetailSpecifications"
        :loading="pokemonLoading || characterLoading"
        :error="
          pokemonError || characterError
            ? {
                title: 'Error',
                message: `${
                  viewStore.selectedView === 'pokemon' ? 'Pokémon' : 'Character'
                } not found`,
              }
            : undefined
        "
        image-class="h-64"
      />
    </div>
  </div>
</template>
