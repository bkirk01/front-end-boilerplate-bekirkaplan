import { createPinia, defineStore, setActivePinia } from "pinia";
import { computed, ref } from "vue";
import PokemonWallpaperBackground from "~/components/backgrounds/PokemonWallpaperBackground.vue";
import RickAndMortyWallpaperBackground from "~/components/backgrounds/RickAndMortyWallpaperBackground.vue";
import { useRoute } from "#app";
const pinia = createPinia();

export default { store: setActivePinia(pinia) };

// Enum for strict type control over view modes
export enum ViewMode {
  GRID = "grid",
  LIST = "list",
}

export enum ERoutePaths {
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
    const route = useRoute();
    
    const listViewMode = ref<Record<TSectionType, ViewMode>>({
      rickAndMorty: ViewMode.GRID,
      pokemon: ViewMode.GRID,
    });
    // Computed getters for each section view
    const rickAndMortyView = computed(() => listViewMode.value.rickAndMorty);
    const pokemonView = computed(() => listViewMode.value.pokemon);

    // Generic toggle action (scales easily for more sections)
    function toggleView() {
      const routeName = route.name;

      // Found if params is in our ERoutePaths enum list
      const foundedRoute: ERoutePaths | undefined = Object.values(
        ERoutePaths
      ).find((path) => path === routeName);

      if (foundedRoute) {
        listViewMode.value[foundedRoute] =
          listViewMode.value[foundedRoute] === ViewMode.GRID
            ? ViewMode.LIST
            : ViewMode.GRID;
        selectedView.value = foundedRoute;
      }
    }

    const currentPage = ref<Record<TSectionType, number>>({
      rickAndMorty: 0,
      pokemon: 0,
    });

    function setCurrentPage(section: TSectionType, pageNumber: number) {
      debugger;
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
      listViewMode,
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
