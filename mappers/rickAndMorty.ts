import type { BaseItem, DetailItem } from '~/types/common';

export function mapCharacterToBaseItem(character: any): BaseItem {
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    details: [
      `Status: ${character.status}`,
      `Species: ${character.species}`,
      `Location: ${character.location.name}`,
    ],
  };
}

export function mapCharacterToDetailItem(character: any): DetailItem {
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    details: [
      `Status: ${character.status}`,
      `Species: ${character.species}`,
      `Location: ${character.location.name}`,
    ],
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
        const matches = episode.match(/\/episode\/(\d+)$/);
        return matches ? `Episode ${matches[1]}` : episode;
      }),
    },
  };
}
