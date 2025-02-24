import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiPokemonClient } from '~/api/config/pokemonApi'
import { mapPokemonToBaseItem, mapPokemonToDetailItem } from '~/api/mappers/pokemon.mapper'
import { IGEN_CHARACTER_COLOR_TYPE_SCHEME } from '~/constants'

// Mock the API client
vi.mock('~/api/config/pokemonApi', () => ({
  apiPokemonClient: {
    getPokemonByName: vi.fn(),
  },
}))

describe('pokemon Mapper Functions', () => {
  const mockPokemonResponse = {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    types: [
      { type: { name: 'electric' } },
    ],
  }

  const mockDetailedPokemonResponse = {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    sprites: {
      front_default: 'https://example.com/pikachu_front.png',
      other: {
        'official-artwork': {
          front_default: 'https://example.com/pikachu_artwork.png',
        },
      },
    },
    types: [
      { type: { name: 'electric' } },
    ],
    stats: [
      { stat: { name: 'speed' }, base_stat: 90 },
      { stat: { name: 'attack' }, base_stat: 55 },
    ],
    abilities: [
      { ability: { name: 'static' }, is_hidden: false },
      { ability: { name: 'lightning-rod' }, is_hidden: true },
    ],
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('mapPokemonToBaseItem', () => {
    it('should map a NamedAPIResource to IPokemonBaseCardSpecifications correctly', async () => {
      vi.mocked(apiPokemonClient.getPokemonByName).mockResolvedValue(mockPokemonResponse)

      const result = await mapPokemonToBaseItem({ name: 'pikachu', url: '' })

      expect(apiPokemonClient.getPokemonByName).toHaveBeenCalledWith('pikachu')
      expect(result).toEqual({
        id: 25,
        name: 'pikachu',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        type: 'electric',
        badges: [
          {
            text: 'electric',
            color: IGEN_CHARACTER_COLOR_TYPE_SCHEME.electric || 'default',
          },
        ],
        height: 4,
        weight: 60,
      })
    })
  })

  describe('mapPokemonToDetailItem', () => {
    it('should map detailed Pokemon data to ICBaseCardDetailItem correctly', () => {
      const result = mapPokemonToDetailItem(mockDetailedPokemonResponse)

      expect(result).toEqual({
        id: 25,
        name: 'pikachu',
        image: 'https://example.com/pikachu_artwork.png',
        badges: [
          {
            text: 'electric',
            color: IGEN_CHARACTER_COLOR_TYPE_SCHEME.electric || 'gray',
          },
        ],
        info: [
          { label: 'Height', value: '0.4 m' },
          { label: 'Weight', value: '6 kg' },
        ],
        stats: [
          {
            name: 'speed',
            value: 90,
            max: 255,
            color: IGEN_CHARACTER_COLOR_TYPE_SCHEME.electric || 'gray',
          },
          {
            name: 'attack',
            value: 55,
            max: 255,
            color: IGEN_CHARACTER_COLOR_TYPE_SCHEME.electric || 'gray',
          },
        ],
        list: {
          title: 'Abilities',
          items: ['static', 'lightning rod (Hidden)'],
        },
        type: 'electric',
      })
    })

    it('should handle missing official artwork by falling back to front_default', () => {
      const fallbackResponse = { ...mockDetailedPokemonResponse }
      delete fallbackResponse.sprites.other

      const result = mapPokemonToDetailItem(fallbackResponse)

      expect(result.image).toBe('https://example.com/pikachu_front.png')
    })

    it('should handle missing stats and abilities gracefully', () => {
      const incompleteResponse = { ...mockDetailedPokemonResponse, stats: [], abilities: [] }

      const result = mapPokemonToDetailItem(incompleteResponse)

      expect(result.stats).toEqual([])
      expect(result.list?.items).toEqual([])
    })
  })
})
