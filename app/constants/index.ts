import type { TGenColorKeyTypes } from '~/types/common'

export const ConstAppName = 'Rick & Morty and Pokémon'
export const ConstAppDescription
  = 'Explore characters from Rick & Morty and discover Pokémon species, their types, abilities, and stats.'

export const ICAHARACTER_COLORS: Record<string, string> = {
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
}

export const ICHARACTER_GRADIENTS: Record<string, { from: string, to: string }>
    = {
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
      bug: { from: 'stone-500', to: 'stone-600' },
      rock: { from: 'zinc-500', to: 'zinc-600' },
      ghost: { from: 'violet-500', to: 'violet-600' },
      dragon: { from: 'rose-500', to: 'rose-600' },
      dark: { from: 'slate-500', to: 'slate-600' },
      steel: { from: 'zinc-500', to: 'zinc-600' },
      fairy: { from: 'fuchsia-500', to: 'fuchsia-600' },
    }

export const IGEN_BADGE_COLOR_SCHEME: Record<TGenColorKeyTypes, string> = {
  gray: 'bg-gray-50/80 text-gray-800 ring-gray-500/20',
  red: 'bg-red-50/80 text-red-800 ring-red-500/20',
  yellow: 'bg-yellow-50/80 text-yellow-800 ring-yellow-500/20',
  green: 'bg-green-50/80 text-green-800 ring-green-500/20',
  blue: 'bg-blue-50/80 text-blue-800 ring-blue-500/20',
  indigo: 'bg-indigo-50/80 text-indigo-800 ring-indigo-500/20',
  purple: 'bg-purple-50/80 text-purple-800 ring-purple-500/20',
  pink: 'bg-pink-50/80 text-pink-800 ring-pink-500/20',
  orange: 'bg-orange-50/80 text-orange-800 ring-orange-500/20',
  amber: 'bg-amber-50/80 text-amber-800 ring-amber-500/20',
  lime: 'bg-lime-50/80 text-lime-800 ring-lime-500/20',
  sky: 'bg-sky-50/80 text-sky-800 ring-sky-500/20',
  violet: 'bg-violet-50/80 text-violet-800 ring-violet-500/20',
  rose: 'bg-rose-50/80 text-rose-800 ring-rose-500/20',
  slate: 'bg-slate-50/80 text-slate-800 ring-slate-500/20',
  zinc: 'bg-zinc-50/80 text-zinc-800 ring-zinc-500/20',
  stone: 'bg-stone-50/80 text-stone-800 ring-stone-500/20',
  fuchsia: 'bg-fuchsia-50/80 text-fuchsia-800 ring-fuchsia-500/20',
  default: 'bg-gray-200/80 text-gray-800 ring-gray-300/40',
}
