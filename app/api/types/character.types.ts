import type { ICBaseCardDetailItem } from './common.types'

export interface ICharacterBaseCardSpecifications extends ICBaseCardDetailItem {
  type: string
  badges?: { text: string, color: string }[]
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
