import type { IAppConfig } from './config.types'
import loadingImage from '~/assets/animations/loading-animation-rick.gif'

const confRickMortyApp: IAppConfig = {
  subNavigationProps: {
    pageTitle: 'Rick & Morty',
    pageTitleIcon: 'i-heroicons-film',
    bgColor: 'green',
  },
  contentContainerConfig: {
    showWallPaper: true,
    bgColor: '', // bg-gray-900
  },
  mainLoadAnimationImage: loadingImage,
}

export default confRickMortyApp
