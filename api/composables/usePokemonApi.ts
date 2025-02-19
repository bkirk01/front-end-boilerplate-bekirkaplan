import { ref } from 'vue';
import type { Pokemon } from 'pokenode-ts';
import { apiPokemonClient} from '@/api/config/axiosPokemon';
import { mapPokemonToBaseItem } from '@/api/mappers/pokemon.mapper';
import type { IPBaseCardSpecifications } from '@/api/types/pokemon.types';

/**
 * Composable for interacting with the Pokémon API using Pokenode-ts.
 */
export const usePokemonApi = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const refMappedPokemons = ref<IPBaseCardSpecifications[]>([]);
  const totalPage = ref<number>(0);

  /**
   * Fetches a list of Pokémon with pagination support.
   * @param limit Number of Pokémon to fetch.
   * @param offset Pagination offset.
   * @returns List of Pokémon resources or null on error.
   */
  const getPokemons = async (limit = 20, offset = 0): Promise<void> => {
    if (loading.value) refMappedPokemons.value = [];
    loading.value = true;
    error.value = null;

    try {
      const pokemons = await apiPokemonClient.listPokemons(offset, limit);
      totalPage.value = pokemons.count;
      const mappedPokemons: IPBaseCardSpecifications[] = await Promise.all(
        pokemons.results.map(pokemon => mapPokemonToBaseItem(pokemon))
      );
      refMappedPokemons.value = mappedPokemons;
    } catch (err) {
      error.value = `Failed to fetch Pokémon list: ${String(err)}`;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetches details of a Pokémon by its ID.
   * @param id Pokémon identifier.
   * @returns Pokémon details or null on error.
   */
  const getPokemonById = async (id: number): Promise<Pokemon | null> => {
    if (loading.value) return null;
    loading.value = true;
    error.value = null;

    try {
      return await apiPokemonClient.getPokemonById(id);
    } catch (err) {
      error.value = `Failed to fetch Pokémon details: ${String(err)}`;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    refMappedPokemons,
    totalPage,
    getPokemons,
    getPokemonById,
  };
};
