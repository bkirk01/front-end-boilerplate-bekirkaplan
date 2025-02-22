import { useRoute } from '#app'
import { createPinia, defineStore, setActivePinia } from 'pinia'
import { computed, ref } from 'vue'
import PokemonWallpaperBackground from '~/components/backgrounds/PokemonWallpaperBackground.vue'
import RickAndMortyWallpaperBackground from '~/components/backgrounds/RickAndMortyWallpaperBackground.vue'
import { EGenViewMode, ERoutePaths, type TSectionType } from '~/types/common'

const pinia = createPinia()

export default { store: setActivePinia(pinia) }

export const useViewStore = defineStore(
  'view',
  () => {
    const selectedView = ref<TSectionType>()
    const background = ref()
    const route = useRoute()

    const listViewMode = ref<Record<TSectionType, EGenViewMode>>({
      [ERoutePaths.RICKMORTY]: EGenViewMode.GRID,
      [ERoutePaths.POKEMON]: EGenViewMode.GRID,
    })
    // Computed getters for each section view
    const rickAndMortyView = computed(() => listViewMode.value[ERoutePaths.RICKMORTY])
    const pokemonView = computed(() => listViewMode.value[ERoutePaths.POKEMON])

    // Generic toggle action (scales easily for more sections)
    function toggleView() {
      const routeName = route.name

      // Found if params is in our ERoutePaths enum list
      const foundedRoute: ERoutePaths | undefined = Object.values(
        ERoutePaths,
      ).find(path => path === routeName)

      if (foundedRoute) {
        listViewMode.value[foundedRoute]
          = listViewMode.value[foundedRoute] === EGenViewMode.GRID
            ? EGenViewMode.LIST
            : EGenViewMode.GRID
        selectedView.value = foundedRoute
      }
    }

    const currentPage = ref<Record<TSectionType, number>>({
      [ERoutePaths.RICKMORTY]: 0,
      [ERoutePaths.POKEMON]: 0,
    })

    function setCurrentPage(section: TSectionType, pageNumber: number) {
      if (selectedView.value) {
        currentPage.value[selectedView.value] = pageNumber
      }
    }

    // Generic toggle action (scales easily for more sections)
    function setPage(section: TSectionType) {
      selectedView.value = section
      background.value = selectedView.value
        ? PokemonWallpaperBackground
        : RickAndMortyWallpaperBackground
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
    }
  },
  { persist: true },
)
