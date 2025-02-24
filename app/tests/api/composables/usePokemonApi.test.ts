import { beforeEach, describe, expect, it, vi } from 'vitest'
import { usePokemonApi } from '~/api/composables/usePokemonApi'
import { apiPokemonClient } from '~/api/config/pokemonApi'
import { mapPokemonToBaseItem, mapPokemonToDetailItem } from '~/api/mappers/pokemon.mapper'

vi.mock('~/api/config/pokemonApi', () => ({
  apiPokemonClient: {
    listPokemons: vi.fn(),
    getPokemonById: vi.fn(),
  },
}))

vi.mock('~/api/mappers/pokemon.mapper', () => ({
  mapPokemonToBaseItem: vi.fn(),
  mapPokemonToDetailItem: vi.fn(),
}))

describe('usePokemonApi', () => {
  const mockPokemonList = {
    count: 40,
    results: [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ],
  }

  const mockMappedBaseItem = {
    id: 25,
    name: 'pikachu',
    image: 'https://example.com/pikachu.png',
    type: 'electric',
    badges: [],
    height: 4,
    weight: 60,
  }

  const mockPokemonDetail = {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    sprites: {
      front_default: 'https://example.com/pikachu_front.png',
    },
    types: [{ type: { name: 'electric' } }],
    stats: [],
    abilities: [],
  }

  const mockMappedDetailItem = {
    id: 25,
    name: 'pikachu',
    image: 'https://example.com/pikachu_front.png',
    type: 'electric',
    badges: [],
    info: [],
    stats: [],
    list: { title: 'Abilities', items: [] },
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('getPokemons', () => {
    it('fetches and maps Pokémon list successfully', async () => {
      vi.mocked(apiPokemonClient.listPokemons).mockResolvedValue(mockPokemonList)
      vi.mocked(mapPokemonToBaseItem).mockResolvedValue(mockMappedBaseItem)

      const { getPokemons, refMappedPokemons, totalPage, error, loading } = usePokemonApi()
      const success = await getPokemons(20, 0)

      expect(success).toBe(true)
      expect(apiPokemonClient.listPokemons).toHaveBeenCalledWith(0, 20)
      expect(mapPokemonToBaseItem).toHaveBeenCalledTimes(mockPokemonList.results.length)
      expect(refMappedPokemons.value).toEqual([mockMappedBaseItem, mockMappedBaseItem])
      expect(totalPage.value).toBe(2) // 40 / 20 = 2
      expect(error.value).toBeNull()
      expect(loading.value).toBe(false)
    })

    it('handles errors when fetching Pokémon list', async () => {
      vi.mocked(apiPokemonClient.listPokemons).mockRejectedValue(new Error('API failed'))

      const { getPokemons, error, refMappedPokemons } = usePokemonApi()
      const success = await getPokemons()

      expect(success).toBe(false)
      expect(error.value).toContain('Failed to fetch Pokémon list')
      expect(refMappedPokemons.value).toEqual([])
    })
  })

  describe('getPokemonById', () => {
    it('fetches and maps Pokémon details by ID successfully', async () => {
      vi.mocked(apiPokemonClient.getPokemonById).mockResolvedValue(mockPokemonDetail)
      vi.mocked(mapPokemonToDetailItem).mockReturnValue(mockMappedDetailItem)

      const { getPokemonById, refMappedPokemon, error, loading } = usePokemonApi()
      const success = await getPokemonById(25)

      expect(success).toBe(true)
      expect(apiPokemonClient.getPokemonById).toHaveBeenCalledWith(25)
      expect(mapPokemonToDetailItem).toHaveBeenCalledWith(mockPokemonDetail)
      expect(refMappedPokemon.value).toEqual(mockMappedDetailItem)
      expect(error.value).toBeNull()
      expect(loading.value).toBe(false)
    })

    it('handles errors when fetching Pokémon details', async () => {
      vi.mocked(apiPokemonClient.getPokemonById).mockRejectedValue(new Error('Fetch failed'))

      const { getPokemonById, error, refMappedPokemon } = usePokemonApi()
      const success = await getPokemonById(25)

      expect(success).toBe(false)
      expect(error.value).toContain('Failed to fetch Pokémon details')
      expect(refMappedPokemon.value).toBeUndefined()
    })
  })
})
