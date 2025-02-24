import { describe, expect, it } from 'vitest'
import { mapCharacterToBaseItem, mapCharacterToDetailItem } from '~/api/mappers/rickAndMorty.mapper'
import { IGEN_CHARACTER_COLOR_TYPE_SCHEME } from '~/constants'

describe('character Mapper Functions', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Citadel of Ricks' },
    image: 'https://example.com/rick.png',
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
    ],
  }

  describe('mapCharacterToBaseItem', () => {
    it('should map character to base card specifications correctly', () => {
      const result = mapCharacterToBaseItem(mockCharacter)

      expect(result).toEqual({
        id: 1,
        name: 'Rick Sanchez',
        image: 'https://example.com/rick.png',
        type: 'Human',
        badges: [
          {
            text: 'Alive',
            color: IGEN_CHARACTER_COLOR_TYPE_SCHEME.alive || 'default',
          },
          {
            text: 'Human',
            color: IGEN_CHARACTER_COLOR_TYPE_SCHEME.human || 'default',
          },
        ],
      })
    })

    it('should handle unknown status and species gracefully', () => {
      const unknownCharacter = { ...mockCharacter, status: 'Unknown', species: 'Alien' }
      const result = mapCharacterToBaseItem(unknownCharacter)

      expect(result.badges).toEqual([
        {
          text: 'Unknown',
          color: IGEN_CHARACTER_COLOR_TYPE_SCHEME.unknown || 'default',
        },
        {
          text: 'Alien',
          color: IGEN_CHARACTER_COLOR_TYPE_SCHEME.alien || 'default',
        },
      ])
    })
  })

  describe('mapCharacterToDetailItem', () => {
    it('should map character to detailed card specifications correctly', () => {
      const result = mapCharacterToDetailItem(mockCharacter)

      expect(result).toEqual({
        id: 1,
        name: 'Rick Sanchez',
        image: 'https://example.com/rick.png',
        type: 'Human',
        info: [
          { label: 'Status', value: 'Alive' },
          { label: 'Species', value: 'Human' },
          { label: 'Type', value: 'Unknown' }, // Fallback for empty type
          { label: 'Gender', value: 'Male' },
          { label: 'Origin', value: 'Earth (C-137)' },
          { label: 'Location', value: 'Citadel of Ricks' },
        ],
        list: {
          title: 'Episodes',
          items: ['Episode 1', 'Episode 2'],
        },
      })
    })

    it('should handle empty episode list gracefully', () => {
      const characterWithoutEpisodes = { ...mockCharacter, episode: [] }
      const result = mapCharacterToDetailItem(characterWithoutEpisodes)

      expect(result.list.items).toEqual([])
    })

    it('should handle malformed episode URLs', () => {
      const characterWithInvalidEpisodes = {
        ...mockCharacter,
        episode: ['invalid-url', 'https://rickandmortyapi.com/api/episode/10'],
      }
      const result = mapCharacterToDetailItem(characterWithInvalidEpisodes)

      expect(result.list.items).toEqual(['invalid-url', 'Episode 10'])
    })

    it('should handle missing origin and location gracefully', () => {
      const characterMissingOriginLocation = { ...mockCharacter, origin: null, location: null }
      const result = mapCharacterToDetailItem(characterMissingOriginLocation)

      expect(result.info).toContainEqual({ label: 'Origin', value: undefined })
      expect(result.info).toContainEqual({ label: 'Location', value: undefined })
    })
  })
})
