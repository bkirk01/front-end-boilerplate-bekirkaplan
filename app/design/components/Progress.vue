<script setup lang="ts">
import type { TGenColorKeyTypes } from '~/types/common'
import { IGenBedgeColorsScheme } from '~/constants'

withDefaults(
  defineProps<{
    value: number
    max: number
    color: TGenColorKeyTypes
  }>(),
  {
    value: 0, // Default value
    max: 100, // Default max value
    color: 'gray', // Default color (change as per your colors object)
  },
)
</script>

<template>
  <div class="w-full">
    <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        class="h-2 rounded-full transition-all" :class="[IGenBedgeColorsScheme[color]]"
        :style="{ width: `${(value / max) * 100}%` }"
      />
    </div>
  </div>
</template>
