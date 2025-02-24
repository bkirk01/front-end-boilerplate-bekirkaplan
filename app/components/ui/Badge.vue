<script setup lang="ts">
import type { TGenColorKeyTypes } from '~/types/common'
import { IGEN_COLOR_SCHEME } from '~/constants'

const props = withDefaults(
  defineProps<{
    bgColor?: string
    color?: TGenColorKeyTypes | string
    className?: string
  }>(),
  {
    color: 'default',
    className: '',
  },
)
</script>

<template>
  <!--
    Badge component structure:
    - Displays a span with dynamic classes for color and background.
    - Uses Tailwind CSS utility classes for padding, font size, border, and layout.
    - Accepts a default slot for custom content inside the badge.
  -->
  <span
    class="inline-flex items-center mr-1 rounded-lg px-3 py-1 text-xs font-medium ring-1 ring-inset"
    :class="[
      className, // Custom className passed from props
      IGEN_COLOR_SCHEME[props.color || 'default' as TGenColorKeyTypes], // Dynamic text color class
    ]"
  >
    <!-- Slot for badge content -->
    <slot />
  </span>
</template>
