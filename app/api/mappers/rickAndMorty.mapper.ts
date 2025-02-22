import type { ICharacterBaseCardSpecifications } from '../types/character.types'
import { CRICK_MORTY_COLOR_TYPES } from '~/constants/ConstRickMortyColor'

export function mapCharacterToBaseItem(
  character: any,
): ICharacterBaseCardSpecifications {
  const badgesObject = [
    { label: 'Status', value: character.status, color: character.status.toLowerCase() },
    { label: 'Species', value: character.species, color: character.species.toLowerCase() },
  ]

  const badges = badgesObject?.map((type: any) => ({
    text: type.value,
    color: CRICK_MORTY_COLOR_TYPES[type.color] || 'default',
  }))

  return {
    id: character.id,
    name: character.name,
    image: character.image,
    type: character.species,
    badges,
  }
}

export function mapCharacterToDetailItem(
  character: any,
): ICharacterBaseCardSpecifications {
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    type: character.species,
    info: [
      { label: 'Status', value: character.status },
      { label: 'Species', value: character.species },
      { label: 'Type', value: character.type || 'Unknown' },
      { label: 'Gender', value: character.gender },
      { label: 'Origin', value: character.origin?.name },
      { label: 'Location', value: character.location?.name },
    ],
    list: {
      title: 'Episodes',
      items: character.episode.map((episode: string) => {
        const matches = episode.match(/\/episode\/(\d+)$/)
        return matches ? `Episode ${matches[1]}` : episode
      }),
    },
  }
}
