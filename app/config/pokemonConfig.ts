import type { IAppConfig } from './config.types'
import loadingImage from '~/assets/animations/loading-animation-pikacu.gif'

const confPokemonApp: IAppConfig = {
  subNavigationProps: {
    pageTitle: 'Pokémon',
    bgColor: 'white',
  },
  contentContainerConfig: {
    showWallPaper: true,
    bgColor: '', // bg-yellow-500
  },
  mainLoadAnimationImage: loadingImage,
}

export default confPokemonApp
