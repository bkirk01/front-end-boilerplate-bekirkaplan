import type { IAppConfig } from './config.types'
import loadingPokemonImage from '~/assets/animations/loading-animation-pikacu.gif'

export const IDefaultAppConfig: IAppConfig = {
  subNavigationProps: {
    pageTitle: 'Default',
    pageTitleIcon: 'i-heroicons-document',
    bgColor: 'black',
  },
  contentContainerConfig: {
    showWallPaper: true,
    bgColor: 'bg-gray-900',
  },
  mainLoadAnimationImage: loadingPokemonImage,
}
