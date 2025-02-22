<script setup lang="ts">
import DetailView from '~/components/DetailView.vue';
import { useDetailFetcher } from '~/composables/useDetailFetcher';
import { useRoute } from '#app';
import { ERoutePaths } from '~/store/view';

// Get route params
const route = useRoute();
const id = route.params.id as string;
const section = route.path.includes('pokemon') ? ERoutePaths.POKEMON : ERoutePaths.RICKMORTY;

// Fetch data using the new composable
const itemData = await useDetailFetcher(section, id);
</script>

<template>
  <DetailView :itemDetailSpecifications="itemData" />
</template>