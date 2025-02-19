import type { BaseItem, DetailItem } from '~/types/common';

const TYPE_COLORS: Record<string, string> = {
  normal: 'gray',
  fire: 'red',
  water: 'blue',
  electric: 'yellow',
  grass: 'green',
  ice: 'sky',
  fighting: 'orange',
  poison: 'purple',
  ground: 'amber',
  flying: 'indigo',
  psychic: 'pink',
  bug: 'stone', // Changed from 'lime' to 'stone' for brown colors
  rock: 'zinc',
  ghost: 'violet',
  dragon: 'rose',
  dark: 'slate',
  steel: 'zinc',
  fairy: 'fuchsia',
};

const TYPE_GRADIENTS: Record<string, { from: string; to: string }> = {
  normal: { from: 'gray-500', to: 'gray-600' },
  fire: { from: 'red-500', to: 'red-600' },
  water: { from: 'blue-500', to: 'blue-600' },
  electric: { from: 'yellow-500', to: 'yellow-600' },
  grass: { from: 'green-500', to: 'green-600' },
  ice: { from: 'sky-500', to: 'sky-600' },
  fighting: { from: 'orange-500', to: 'orange-600' },
  poison: { from: 'purple-500', to: 'purple-600' },
  ground: { from: 'amber-500', to: 'amber-600' },
  flying: { from: 'indigo-500', to: 'indigo-600' },
  psychic: { from: 'pink-500', to: 'pink-600' },
  bug: { from: 'stone-500', to: 'stone-600' }, // Changed from 'lime' to 'stone' for brown colors
  rock: { from: 'zinc-500', to: 'zinc-600' },
  ghost: { from: 'violet-500', to: 'violet-600' },
  dragon: { from: 'rose-500', to: 'rose-600' },
  dark: { from: 'slate-500', to: 'slate-600' },
  steel: { from: 'zinc-500', to: 'zinc-600' },
  fairy: { from: 'fuchsia-500', to: 'fuchsia-600' },
};

async function getPokemonDetails(id: string) {
  const { getPokemon } = usePokemonApi();
  const { data } = await getPokemon(id);
  return data.value;
}

export async function mapPokemonToBaseItem(
  pokemon: any,
  id: string
): Promise<
  BaseItem & {
    type?: string;
    badges?: { text: string; color: string }[];
    height?: string;
    weight?: string;
  }
> {
  // Fetch additional details for the Pokemon
  const details = await getPokemonDetails(id);

  const type = details?.types?.[0]?.type?.name || 'normal';
  const height = details ? `${(details.height || 0) / 10} m` : undefined;
  const weight = details ? `${(details.weight || 0) / 10} kg` : undefined;
  const badges = details?.types?.map((type: any) => ({
    text: type.type.name,
    color: TYPE_COLORS[type.type.name] || 'gray',
  }));

  return {
    id,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    details: [
      height ? `Height: ${height}` : undefined,
      weight ? `Weight: ${weight}` : undefined,
    ].filter(Boolean) as string[],
    type,
    badges,
    height,
    weight,
  };
}

export function mapPokemonToDetailItem(pokemon: any): DetailItem {
  const primaryType = pokemon.types[0]?.type?.name || 'normal';

  return {
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default,
    details: [
      `Height: ${(pokemon.height || 0) / 10} m`,
      `Weight: ${(pokemon.weight || 0) / 10} kg`,
    ],
    badges: pokemon.types.map((type: any) => ({
      text: type.type.name,
      color: TYPE_COLORS[type.type.name] || 'gray',
    })),
    info: [
      { label: 'Height', value: `${(pokemon.height || 0) / 10} m` },
      { label: 'Weight', value: `${(pokemon.weight || 0) / 10} kg` },
    ],
    stats: pokemon.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat,
      max: 255,
      color: TYPE_COLORS[primaryType] || 'gray',
    })),
    list: {
      title: 'Abilities',
      items: pokemon.abilities.map(
        (ability: any) =>
          `${ability.ability.name.replace('-', ' ')}${ability.is_hidden ? ' (Hidden)' : ''}`
      ),
    },
    type: primaryType,
  };
}

export { TYPE_COLORS, TYPE_GRADIENTS };
