import type { ICharacterBaseCardSpecifications } from "../types/character.types";

export function mapCharacterToBaseItem(
  character: any
): ICharacterBaseCardSpecifications {
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    type: character.species,
  };
}

export function mapCharacterToDetailItem(
  character: any
): ICharacterBaseCardSpecifications {
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    type: character.species,
    info: [
      { label: "Status", value: character.status },
      { label: "Species", value: character.species },
      { label: "Type", value: character.type || "Unknown" },
      { label: "Gender", value: character.gender },
      { label: "Origin", value: character.origin?.name },
      { label: "Location", value: character.location?.name },
    ],
    list: {
      title: "Episodes",
      items: character.episode.map((episode: string) => {
        const matches = episode.match(/\/episode\/(\d+)$/);
        return matches ? `Episode ${matches[1]}` : episode;
      }),
    },
  };
}
