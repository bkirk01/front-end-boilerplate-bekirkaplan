import type { IAppConfig } from '../types/config.types'
import loadingImage from '~/assets/animations/loading-animation-rick.gif'

const confRickMortyApp: IAppConfig = {
  wallpapers: [
    { src: '/wallpapers/rick-morty/1285058.jpg', alt: 'Rick and Morty Portal Adventure' },
    { src: '/wallpapers/rick-morty/1335145.jpg', alt: 'Rick and Morty Space Scene' },
    { src: '/wallpapers/rick-morty/1335147.jpg', alt: 'Rick and Morty Universe' },
    { src: '/wallpapers/rick-morty/1335148.jpg', alt: 'Rick and Morty Dimension' },
    { src: '/wallpapers/rick-morty/633294.png', alt: 'Rick and Morty Characters' },
  ],
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
