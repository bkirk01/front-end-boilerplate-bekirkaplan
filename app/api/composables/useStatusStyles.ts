import { IPOKEMON_COLORS, IPOKEMON_GRADIENTS } from '~/types/pokemonColor.types'

export function useStatusStyles(status: string, type?: string) {
  const isPokemon = computed(() => !!type)

  const background = computed(() => {
    if (isPokemon.value) {
      const color = IPOKEMON_COLORS[type || 'normal'] || 'gray'
      return `bg-gradient-to-br from-white/30 to-${color}-50/30`
    }

    switch (status) {
      case 'Alive':
        return 'bg-gradient-to-br from-white/30 to-green-50/30'
      case 'Dead':
        return 'bg-gradient-to-br from-white/30 to-red-50/30'
      default:
        return 'bg-gradient-to-br from-white/30 to-gray-50/30'
    }
  })

  const gradient = computed(() => {
    if (isPokemon.value) {
      const color = IPOKEMON_GRADIENTS[type || 'normal'] || 'gray'
      return `bg-gradient-to-br from-${color}-500/80 to-${color}-600/80`
    }

    switch (status) {
      case 'Alive':
        return 'bg-gradient-to-br from-green-500/80 to-green-600/80'
      case 'Dead':
        return 'bg-gradient-to-br from-red-500/80 to-red-600/80'
      default:
        return 'bg-gradient-to-br from-gray-500/80 to-gray-600/80'
    }
  })

  return {
    background,
    gradient,
  }
}
