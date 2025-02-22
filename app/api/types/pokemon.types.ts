import type { ICBaseCardDetailItem } from './common.types'

export interface IPokemonBaseCardSpecifications extends ICBaseCardDetailItem {
  type: string
  badges?: { text: string, color: string }[]
  height?: number
  weight?: number
}
