import type { ICharacterBaseCardSpecifications } from '~/api/types/character.types'
import type { IPokemonBaseCardSpecifications } from '~/api/types/pokemon.types'

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

export type TGenColorKeyTypes = 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange' | 'amber' | 'lime' | 'sky' | 'violet' | 'rose' | 'slate' | 'zinc' | 'stone' | 'fuchsia' | 'default'

export type TCItemDetailType = IPokemonBaseCardSpecifications | ICharacterBaseCardSpecifications | undefined

// Enum for strict type control over view modes
export enum EGenViewMode {
  GRID = 'grid',
  LIST = 'list',
}

export enum ERoutePaths {
  RICKMORTY = 'rick-and-morty',
  POKEMON = 'pokemon',
}

// Generic Section Type
export type TSectionType = ERoutePaths.RICKMORTY | ERoutePaths.POKEMON

export type TGenBedgeColorValue = `bg-${TGenColorKeyTypes}${any}`

// Generic type for dynamic data
export type TGenType<T> = Ref<T | undefined>
