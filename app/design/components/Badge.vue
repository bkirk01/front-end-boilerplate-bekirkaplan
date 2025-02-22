<script setup lang="ts">
import type { TGenColorKeyTypes } from '~/types/common'
import { IGEN_BADGE_COLOR_SCHEME } from '~/constants'

const props = withDefaults(
  defineProps<{
    color: TGenColorKeyTypes
    className?: string
  }>(),
  {
    color: 'default', // Default color
    className: '', // Default className
  },
)
</script>

<template>
  <span
    class="inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium ring-1 ring-inset" :class="[
      IGEN_BADGE_COLOR_SCHEME[props.color || 'gray'],
      className,
    ]"
  >
    <slot />
  </span>
</template>
