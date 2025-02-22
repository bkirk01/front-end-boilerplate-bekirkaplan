import type { TGenColorKeyTypes } from "~/types/common"

export interface ICBaseCardItem {
  id: string | number
  name: string
  image: string
}

export interface ICBaseCardDetailItem extends ICBaseCardItem {
  badges?: {
    text: string
    color: string
  }[]
  info?: {
    label: string
    value: string | number
  }[]
  stats?: {
    name: string
    value: number
    max: number
    color: TGenColorKeyTypes
  }[]
  list?: {
    title: string
    items: string[]
  }
  type: string
}
