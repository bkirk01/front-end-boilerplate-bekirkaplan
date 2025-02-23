import type { IAppConfig } from '../types/config.types'
import loadingImage from '~/assets/animations/loading-animation-pikacu.gif'

const confPokemonApp: IAppConfig = {
  wallpapers: [
    { src: '/wallpapers/pokemon/1351146.png', alt: 'Pokemon Legendary Wallpaper' },
    { src: '/wallpapers/pokemon/592678.jpg', alt: 'Pokemon Battle Wallpaper' },
    { src: '/wallpapers/pokemon/481909.png', alt: 'Pokemon Adventure Wallpaper' },
    { src: '/wallpapers/pokemon/1351278.png', alt: 'Pokemon Group Wallpaper' },
  ],
  subNavigationProps: {
    pageTitle: 'Pokémon',
    pageTitleIcon: 'i-heroicons-sparkles',
    bgColor: 'white',
  },
  contentContainerConfig: {
    showWallPaper: true,
    bgColor: '', // bg-yellow-500
  },
  mainLoadAnimationImage: loadingImage,
}

export default confPokemonApp
