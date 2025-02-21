import {
  mapCharacterToBaseItem,
  mapCharacterToDetailItem,
} from "../mappers/rickAndMorty.mapper";
import type {
  ICharacterApiResponse,
  ICharacterBaseCardSpecifications,
} from "../types/character.types";

export const useRickAndMortyApi = () => {
  const baseUrl = "https://rickandmortyapi.com/api";
  const error = ref<string | null>(null);
  const loading = ref(false);
  const refMappedCharacters = ref<ICharacterBaseCardSpecifications[]>([]);
  const refMappedCharacter = ref<ICharacterBaseCardSpecifications>();
  const totalPage = ref<number>(0);
  const characterCache = ref<
    Map<string, { totalPages: number; characters: any[] }>
  >(new Map());

  const getCharacters = async (
    limit = 20,
    offset = 0,
    cache = new Map()
  ): Promise<boolean> => {
    if (loading.value) refMappedCharacters.value = [];
    loading.value = true;
    error.value = null;

    if (!Number.isInteger(limit) || limit <= 0) {
      throw new Error(
        "Invalid itemsPerPage value. It must be a positive integer."
      );
    }
    if (!Number.isInteger(offset) || offset < 0) {
      throw new Error(
        "Invalid offset value. It must be a non-negative integer."
      );
    }

    const cacheKey = `${limit}-${offset}`;

    if (cache.has(cacheKey)) {
      loading.value = false;
      refMappedCharacters.value = cache.get(cacheKey).characters;
      return true;
    }

    const defaultApiPageSize = 20; // The API returns 20 items per page by default
    const startPage = Math.floor(offset / defaultApiPageSize) + 1;
    const endPage = Math.ceil((offset + limit) / defaultApiPageSize);

    try {
      // Fetch required pages in parallel
      const fetchPromises = [];
      for (let page = startPage; page <= endPage; page++) {
        fetchPromises.push(
          fetch(`${baseUrl}/character?page=${page}`).then((res) => res.json())
        );
      }

      const resultsSettled = await Promise.allSettled(fetchPromises);
      const fulfilledResults = resultsSettled
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      if (fulfilledResults.length === 0) {
        throw new Error("Failed to fetch any character data.");
      }

      const data = fulfilledResults.flatMap(
        (res: { results: any }) => res.results
      ) as ICharacterBaseCardSpecifications[];

      if (fulfilledResults && fulfilledResults.length) {
        totalPage.value =
          Math.floor(fulfilledResults[0].info?.count / limit) ?? 1; // Total number of pages
        const mappedCharacters: ICharacterBaseCardSpecifications[] =
          await Promise.all(
            data.map((character) => mapCharacterToBaseItem(character))
          );

        const combinedResults = fulfilledResults.flatMap(
          (res) => res.results || []
        );
        const totalCount = fulfilledResults[0]?.info?.count ?? 0;
        const totalPages = Math.ceil(totalCount / limit);

        const startSlice = offset % defaultApiPageSize;
        const endSlice = startSlice + limit;

        const result = {
          totalPages,
          characters: combinedResults.slice(startSlice, endSlice),
        };
        cache.set(cacheKey, result);

        characterCache.value.set(cacheKey, result);
        refMappedCharacters.value = result.characters;
        return true;
      } else {
        totalPage.value = 0;
        refMappedCharacters.value = [];
      }

      return true;
    } catch (err) {
      error.value = `Failed to fetch Character list: ${String(err)}`;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const getCharacterById = async (id: number): Promise<boolean> => {
    if (loading.value) return true;
    loading.value = true;

    try {
      const { data } = await useFetch<ICharacterApiResponse>(
        `${baseUrl}/character/${id}`
      );
      refMappedCharacter.value = mapCharacterToDetailItem(data.value);
      return false;
    } catch (err) {
      error.value = `Failed to fetch Character detail: ${String(err)}`;
      return true;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    refMappedCharacters,
    refMappedCharacter,
    characterCache,
    totalPage,
    getCharacters,
    getCharacterById,
  };
};
