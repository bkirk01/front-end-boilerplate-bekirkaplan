import type { ICBaseCardDetailItem } from './common.types'
import type { TGenColorKeyTypes } from '~/types/common'

export interface ICharacterBaseCardSpecifications extends ICBaseCardDetailItem {
  type: string
  badges?: { text: string, color: TGenColorKeyTypes }[]
  height?: number
  weight?: number
}

export interface ICharacterApiResponse {
  info: {
    count: number
    pages: number
  }
  results: any[] // Replace `any` with a more specific type if available
}
