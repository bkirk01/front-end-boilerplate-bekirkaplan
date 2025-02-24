import type { TGenColorKeyTypes } from '~/types/common'

export const ConstAppName = 'Rick & Morty and Pokémon'
export const ConstAppDescription
  = 'Explore characters from Rick & Morty and discover Pokémon species, their types, abilities, and stats.'

export const IGEN_CHARACTER_COLOR_TYPE_SCHEME: Record<string, string> = {
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
  bug: 'stone',
  rock: 'zinc',
  ghost: 'violet',
  dragon: 'rose',
  dark: 'slate',
  steel: 'zinc',
  fairy: 'fuchsia',
  alive: 'green',
  dead: 'red',
  unknown: 'default',
}

export const IGEN_COLOR_SCHEME: Record<string | TGenColorKeyTypes, string> = {
  gray: 'text-gray-600 bg-gray-200 border-gray-300', // normal
  red: 'text-red-600 bg-red-400 border-red-500', // fire, dead
  blue: 'text-blue-600 bg-blue-400 border-blue-500', // water
  yellow: 'text-yellow-600 bg-yellow-300 border-yellow-400', // electric
  green: 'text-green-600 bg-green-400 border-green-500', // grass, alive
  sky: 'text-sky-600 bg-sky-300 border-sky-400', // ice
  orange: 'text-orange-600 bg-orange-400 border-orange-500', // fighting
  purple: 'text-purple-600 bg-purple-400 border-purple-500', // poison
  amber: 'text-amber-600 bg-amber-400 border-amber-500', // ground
  indigo: 'text-indigo-600 bg-indigo-400 border-indigo-500', // flying
  pink: 'text-pink-600 bg-pink-400 border-pink-500', // psychic
  stone: 'text-neutral-600 bg-neutral-400 border-neutral-500', // bug (brown hue)
  zinc: 'text-zinc-600 bg-zinc-400 border-zinc-500', // rock, steel
  violet: 'text-violet-600 bg-violet-400 border-violet-500', // ghost
  rose: 'text-rose-600 bg-rose-400 border-rose-500', // dragon
  slate: 'text-slate-600 bg-slate-400 border-slate-500', // dark
  fuchsia: 'text-fuchsia-600 bg-fuchsia-400 border-fuchsia-500', // fairy
  default: 'text-gray-500 bg-gray-100 border-gray-300', // unknown
}
