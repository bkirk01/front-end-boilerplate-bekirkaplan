<template>
  <div>
    <!-- Wallpaper Background -->
    <backgrounds-pokemon-wallpaper-background v-if="isPokemon" />
    <backgrounds-rick-and-morty-wallpaper-background v-else />

    <!-- Loading Overlay -->
    <ui-loading-overlay v-if="loading" />

    <!-- Content -->
    <div class="detail-container">
      <CardsCharacterDetail
        :data="itemData"
        :loading="loading"
        :error="
          error
            ? {
                title: 'Error',
                message: `${type === 'pokemon' ? 'Pokémon' : 'Character'} not found`,
              }
            : undefined
        "
        image-class="h-64"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mapPokemonToDetailItem } from '~/mappers/pokemon';
import { mapCharacterToDetailItem } from '~/mappers/rickAndMorty';
import type { DetailItem } from '~/types/common';
import { CardsCharacterDetail } from '#components';
import '~/assets/css/views/detail.css';

const route = useRoute();
const type = route.params.type as string;
const id = route.params.id as string;

const isPokemon = type === 'pokemon';

// Get the appropriate API based on the type
const { getPokemon, loading: pokemonLoading } = usePokemonApi();
const { getCharacter, loading: characterLoading } = useRickAndMortyApi();

// Fetch data based on the type
const { data: response, error } = await (isPokemon ? getPokemon(id) : getCharacter(Number(id)));

const loading = computed(() => (isPokemon ? pokemonLoading.value : characterLoading.value));

// Map the response to the correct format based on the type
const itemData = computed<DetailItem | undefined>(() => {
  if (!response.value) return undefined;
  return isPokemon
    ? mapPokemonToDetailItem(response.value)
    : mapCharacterToDetailItem(response.value);
});
</script>
