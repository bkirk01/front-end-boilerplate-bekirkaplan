import type {
  ICharacterApiResponse,
  ICharacterBaseCardSpecifications,
} from '../types/character.types'
import {
  mapCharacterToBaseItem,
  mapCharacterToDetailItem,
} from '../mappers/rickAndMorty.mapper'

export function useRickAndMortyApi() {
  const baseUrl = 'https://rickandmortyapi.com/api'
  const error = ref<string | null>(null)
  const loading = ref(false)
  const refMappedCharacters = ref<ICharacterBaseCardSpecifications[]>([])
  const refMappedCharacter = ref<ICharacterBaseCardSpecifications>()
  const totalPage = ref<number>(0)
  const characterCache = ref<
    Map<string, { totalPages: number, characters: any[] }>
  >(new Map())

  const getCharacters = async (
    limit = 20,
    pageNumber = 0,
    cache = new Map(),
  ): Promise<boolean> => {
    if (loading.value)
      refMappedCharacters.value = []
    loading.value = true
    error.value = null

    if (!Number.isInteger(limit) || limit <= 0) {
      throw new Error('Invalid itemsPerPage value. It must be a positive integer.')
    }
    if (!Number.isInteger(pageNumber) || pageNumber < 0) {
      throw new Error('Invalid pageNumber value. It must be a non-negative integer.')
    }

    const cacheKey = `${limit}-${pageNumber}`
    if (cache.has(cacheKey)) {
      loading.value = false
      refMappedCharacters.value = cache.get(cacheKey).characters
      return true
    }

    const defaultApiPageSize = 20
    const startPage = Math.floor((pageNumber * limit) / defaultApiPageSize) + 1
    const endPage = Math.floor(((pageNumber + 1) * limit - 1) / defaultApiPageSize) + 1

    try {
      const fetchPromises = []
      for (let page = startPage; page <= endPage; page++) {
        if (Number.isNaN(page) || page <= 0) {
          throw new Error(`Invalid page number calculated: ${page}`)
        }
        fetchPromises.push(
          fetch(`${baseUrl}/character?page=${page}`).then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch page ${page}: ${res.statusText}`)
            }
            return res.json()
          }),
        )
      }

      const resultsSettled = await Promise.allSettled(fetchPromises)
      const fulfilledResults = resultsSettled
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<any>).value)

      if (fulfilledResults.length === 0) {
        throw new Error('Failed to fetch any character data.')
      }

      const combinedResults = fulfilledResults.flatMap(res => res.results || [])
      const totalCount = fulfilledResults[0]?.info?.count ?? 0
      const totalPages = Math.ceil(totalCount / limit)
      totalPage.value = totalPages

      // Correct slicing: based on pageNumber and limit, need to consider to move util classes.???
      const startSlice = (pageNumber * limit) % defaultApiPageSize
      const mappedCharacters = await Promise.all(
        combinedResults.slice(startSlice, startSlice + limit).map(mapCharacterToBaseItem),
      )

      const result = { totalPages, characters: mappedCharacters }
      cache.set(cacheKey, result)
      characterCache.value.set(cacheKey, result)
      refMappedCharacters.value = mappedCharacters

      return true
    }
    catch (err) {
      error.value = `Failed to fetch Character list: ${String(err)}`
      return false
    }
    finally {
      loading.value = false
    }
  }

  const getCharacterById = async (id: number): Promise<boolean> => {
    if (loading.value)
      return true
    loading.value = true

    try {
      if (!id || Number.isNaN(id))
        throw new Error(`Invalid character ID: ${id}`)

      const { data, error: fetchError } = await useFetch<ICharacterApiResponse>(
        `${baseUrl}/character/${id}`,
      )

      if (fetchError.value)
        throw fetchError.value

      refMappedCharacter.value = mapCharacterToDetailItem(data.value)
      return true
    }
    catch (err) {
      error.value = `Failed to fetch Character detail: ${String(err)}`
      console.error(error.value)
      return false
    }
    finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    refMappedCharacters,
    refMappedCharacter,
    characterCache,
    totalPage,
    getCharacters,
    getCharacterById,
  }
}
