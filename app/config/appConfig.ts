import type { IAppConfigs } from '~/types/config.types'
import { ERoutePaths } from '~/types/common'
import { IDefaultAppConfig } from './defaultConfig'
import confPokemonApp from './pokemonConfig'
import confRickMortyApp from './rickMortyConfig'

const appConfigs: IAppConfigs = {
  default: IDefaultAppConfig,
  [ERoutePaths.POKEMON]: confPokemonApp,
  [ERoutePaths.RICKMORTY]: confRickMortyApp,
}

export default appConfigs
