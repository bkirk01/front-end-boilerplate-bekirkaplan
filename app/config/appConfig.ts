import type { IAppConfig, IAppConfigs } from './config.types'
// ~/config/appConfig.ts
import loadingPokemonImage from '~/assets/animations/loading-animation-pikacu.gif'
import { ERoutePaths } from '~/types/common'
import confPokemonApp from './pokemonConfig'
import confRickMortyApp from './rickMortyConfig'

export const IDefaultAppConfig: IAppConfig = {
  subNavigationProps: {
    pageTitle: 'Default',
    bgColor: 'black',
  },
  contentContainerConfig: {
    showWallPaper: true,
    bgColor: 'bg-gray-900',
  },
  mainLoadAnimationImage: loadingPokemonImage,
}

const appConfigs: IAppConfigs = {
  default: IDefaultAppConfig,
  [ERoutePaths.POKEMON]: confPokemonApp,
  [ERoutePaths.RICKMORTY]: confRickMortyApp,
}

export default appConfigs
