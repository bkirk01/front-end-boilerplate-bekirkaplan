import type { NamedAPIResource, Pokemon } from 'pokenode-ts'
import type { ICBaseCardDetailItem } from '~/api/types/common.types'
import type { IPokemonBaseCardSpecifications } from '~/api/types/pokemon.types'
import { apiPokemonClient } from '~/api/config/pokemonApi'
import { IGEN_CHARACTER_COLOR_TYPE_SCHEME } from '~/constants'

export async function mapPokemonToBaseItem(
  pokemon: NamedAPIResource,
): Promise<IPokemonBaseCardSpecifications> {
  // Fetch additional details for the Pokemon
  const details: Pokemon = await apiPokemonClient.getPokemonByName(pokemon.name)

  const badges = details?.types?.map((type: any) => ({
    text: type.type.name,
    color: IGEN_CHARACTER_COLOR_TYPE_SCHEME[type.type.name] || 'default',
  }))

  return {
    id: details.id,
    name: details.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`,
    type: details?.types?.[0]?.type?.name || 'normal',
    badges,
    height: details.height ?? details.height / 10,
    weight: details.weight ?? details.weight / 10,
  }
}

export function mapPokemonToDetailItem(pokemon: any): ICBaseCardDetailItem {
  const primaryType = pokemon.types[0]?.type?.name || 'normal'

  return {
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.sprites?.other?.['official-artwork']?.front_default
      || pokemon.sprites?.front_default,
    badges: pokemon.types.map((type: any) => ({
      text: type.type.name,
      color: IGEN_CHARACTER_COLOR_TYPE_SCHEME[type.type.name] || 'gray',
    })),
    info: [
      { label: 'Height', value: `${(pokemon.height || 0) / 10} m` },
      { label: 'Weight', value: `${(pokemon.weight || 0) / 10} kg` },
    ],
    stats: pokemon.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat,
      max: 255,
      color: IGEN_CHARACTER_COLOR_TYPE_SCHEME[primaryType] || 'gray',
    })),
    list: {
      title: 'Abilities',
      items: pokemon.abilities.map(
        (ability: any) =>
          `${ability.ability.name.replace('-', ' ')}${ability.is_hidden ? ' (Hidden)' : ''}`,
      ),
    },
    type: primaryType,
  }
}
