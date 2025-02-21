<script setup lang="ts">
import { CardsCharacterDetail } from "#components";
import { usePokemonApi } from "~/api/composables/usePokemonApi";
import { useRickAndMortyApi } from "~/api/composables/useRickAndMortyApi";
import { ESelectedView, useViewStore } from "~/stores/view";
import "~/assets/css/views/detail.css";

const route = useRoute();
const id = route.params.id as string;

const viewStore = useViewStore();
const isPokemon = viewStore.selectedView === ESelectedView.POKEMON;

const {
  getPokemonById,
  refMappedPokemon,
  loading: pokemonLoading,
  error: pokemonError,
} = usePokemonApi();

const {
  getCharacterById,
  refMappedCharacter,
  loading: characterLoading,
  error: characterError,
} = useRickAndMortyApi();

// Fetch data based on the type
await (isPokemon ? getPokemonById(Number(id)) : getCharacterById(Number(id)));

// Map the response to the correct format based on the type
const itemData = isPokemon ? refMappedPokemon.value : refMappedCharacter.value;
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
        :data="itemData"
        :loading="pokemonLoading || characterLoading"
        :error="
          pokemonError || characterError
            ? {
                title: 'Error',
                message: `${viewStore.selectedView === 'pokemon' ? 'Pokémon' : 'Character'} not found`,
              }
            : undefined
        "
        image-class="h-64"
      />
    </div>
  </div>
</template>
