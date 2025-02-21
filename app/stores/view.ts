
import { defineStore, createPinia, setActivePinia } from "pinia"
import { computed, ref } from "vue";
import PokemonWallpaperBackground from "~/components/backgrounds/PokemonWallpaperBackground.vue";
import RickAndMortyWallpaperBackground from "~/components/backgrounds/RickAndMortyWallpaperBackground.vue";

const pinia = createPinia()

export default { store: setActivePinia(pinia) }

// Enum for strict type control over view modes
export enum ViewMode {
  GRID = "grid",
  LIST = "list",
}

export enum ESelectedView {
  RICKMORTY = "rickAndMorty",
  POKEMON = "pokemon",
}

// Generic Section Type
export type TSectionType = "rickAndMorty" | "pokemon";

export const useViewStore = defineStore(
  "view",
  () => {
    const selectedView = ref<TSectionType>();
    const background = ref();

    // Computed getters for each section view
    const rickAndMortyView = computed(() => views.value.rickAndMorty);
    const pokemonView = computed(() => views.value.pokemon);

    const views = ref<Record<TSectionType, ViewMode>>({
      rickAndMorty: ViewMode.GRID,
      pokemon: ViewMode.GRID,
    });

    const currentPage = ref<Record<TSectionType, number>>({
      rickAndMorty: 0,
      pokemon: 0,
    });

    // Generic toggle action (scales easily for more sections)
    function toggleView(section: TSectionType) {
      views.value[section] =
        views.value[section] === ViewMode.GRID ? ViewMode.LIST : ViewMode.GRID;
    }

    function setCurrentPage(section: TSectionType, pageNumber: number) {
      if (selectedView.value) {
        currentPage.value[selectedView.value] = pageNumber;
      }
    }

    // Generic toggle action (scales easily for more sections)
    function setPage(section: TSectionType) {
      selectedView.value = section;
      background.value = selectedView.value
        ? PokemonWallpaperBackground
        : RickAndMortyWallpaperBackground;
    }

    return {
      views,
      rickAndMortyView,
      pokemonView,
      selectedView,
      background,
      setCurrentPage,
      toggleView,
      setPage,
    };
  },
  { persist: true }
);
