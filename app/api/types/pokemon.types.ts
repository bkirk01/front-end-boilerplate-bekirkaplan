import type { ICBaseCardDetailItem } from './common.types'
import type { TGenColorKeyTypes } from '~/types/common'

export interface IPokemonBaseCardSpecifications extends ICBaseCardDetailItem {
  type: string
  badges?: { text: string, color: TGenColorKeyTypes }[]
  height?: number
  weight?: number
}
