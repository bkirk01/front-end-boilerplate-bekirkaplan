<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  from?: string
  to?: string
  opacity?: string
  direction?: 't' | 'b' | 'l' | 'r' | 'tr' | 'tl' | 'br' | 'bl' // Direction validation
  height?: string
  width?: string
}>()

const gradientClass = computed(() => {
  const direction = props.direction ?? 'br' // Default: bottom-right
  const fromColor = props.from ?? 'gray-400'
  const toColor = props.to ?? 'gray-600'
  const opacity = props.opacity && /^\d{1,3}$/.test(props.opacity) ? `/${props.opacity}` : ''
  const height = props.height ?? 'h-40'
  const width = props.width ?? 'w-full'

  return `bg-gradient-to-${direction} from-${fromColor}${opacity} to-${toColor}${opacity} ${height} ${width}`
})
</script>

<template>
  <div :class="gradientClass">
    <slot />
  </div>
</template>
