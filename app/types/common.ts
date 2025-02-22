import type { ICharacterBaseCardSpecifications } from "~/api/types/character.types"
import type { IPokemonBaseCardSpecifications } from "~/api/types/pokemon.types"

export interface BaseItem {
  id: string | number
  name: string
  image: string
  details: string[]
}

export interface DetailItem extends BaseItem {
  badges?: {
    text: string
    color: string
  }[]
  info: {
    label: string
    value: string | number
  }[]
  stats?: {
    name: string
    value: number
    max: number
    color: string
  }[]
  list?: {
    title: string
    items: string[]
  }
}


export type TGenColorKeyTypes =  'gray' | 'red' | 'yellow' |'green' |'blue' |'indigo' |'purple' |'pink' |'orange' |'amber' |'lime' |'sky' |'violet' |'rose' |'slate' |'zinc' |'stone' |'fuchsia' |'default';

export const IGenBedgeColorsScheme: Record<TGenColorKeyTypes, string> = {
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


export type TCItemDetailType = IPokemonBaseCardSpecifications | ICharacterBaseCardSpecifications | undefined;

// Enum for strict type control over view modes
export enum EGenViewMode {
  GRID = "grid",
  LIST = "list",
}

export enum ERoutePaths {
  RICKMORTY = "rick-and-morty",
  POKEMON = "pokemon",
}

// Generic Section Type
export type TSectionType = ERoutePaths.RICKMORTY | ERoutePaths.POKEMON;

export type TGenBedgeColorValue = `bg-${TGenColorKeyTypes}${any}`;

// Generic type for dynamic data
export type TGenType<T> = Ref<T | undefined>;
