import { ref } from 'vue';
import { apiPokemonClient} from '~/api/config/axiosPokemon';
import { mapPokemonToBaseItem, mapPokemonToDetailItem } from '~/api/mappers/pokemon.mapper';
import type { IPokemonBaseCardSpecifications } from '~/api/types/pokemon.types';

/**
 * Composable for interacting with the Pokémon API using Pokenode-ts.
 */
export const usePokemonApi = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const refMappedPokemons = ref<IPokemonBaseCardSpecifications[]>([]);
  const refMappedPokemon = ref<IPokemonBaseCardSpecifications>();
  const totalPage = ref<number>(0);

  /**
   * Fetches a list of Pokémon with pagination support.
   * @param limit Number of Pokémon to fetch.
   * @param offset Pagination offset.
   * @returns List of Pokémon resources or null on error.
   */
  const getPokemons = async (limit = 20, offset = 0): Promise<boolean> => {
    if (loading.value) refMappedPokemons.value = [];
    loading.value = true;
    error.value = null;

    try {
      const pokemons = await apiPokemonClient.listPokemons(offset, limit);
      totalPage.value = pokemons.count;
      const mappedPokemons: IPokemonBaseCardSpecifications[] = await Promise.all(
        pokemons.results.map(pokemon => mapPokemonToBaseItem(pokemon))
      );
      refMappedPokemons.value = mappedPokemons;
      return true;
    } catch (err) {
      error.value = `Failed to fetch Pokémon list: ${String(err)}`;
      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetches details of a Pokémon by its ID.
   * @param id Pokémon identifier.
   * @returns Pokémon details or null on error.
   */
  const getPokemonById = async (id: number): Promise<boolean> => {
    if (loading.value) refMappedPokemon.value = {} as IPokemonBaseCardSpecifications;
    loading.value = true;
    error.value = null;

    try {
      const pokemon = await apiPokemonClient.getPokemonById(id);
      refMappedPokemon.value = mapPokemonToDetailItem(pokemon);
      return true;
    } catch (err) {
      error.value = `Failed to fetch Pokémon details: ${String(err)}`;
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    refMappedPokemons,
    refMappedPokemon,
    totalPage,
    getPokemons,
    getPokemonById,
  };
};
