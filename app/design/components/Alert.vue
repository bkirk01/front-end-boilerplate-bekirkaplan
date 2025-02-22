<script setup lang="ts">
defineProps<{
  title?: string
  description: string
  color?: keyof typeof colors
  className?: string
}>()

const colors = {
  gray: 'bg-gray-50 text-gray-800',
  red: 'bg-red-50 text-red-800',
  yellow: 'bg-yellow-50 text-yellow-800',
  green: 'bg-green-50 text-green-800',
}

const icons = {
  gray: 'i-heroicons-information-circle',
  red: 'i-heroicons-x-circle',
  yellow: 'i-heroicons-exclamation-triangle',
  green: 'i-heroicons-check-circle',
}
</script>

<template>
  <div class="rounded-lg p-4" :class="[colors[color || 'red'], className]">
    <div class="flex">
      <div class="flex-shrink-0">
        <UIcon :name="icons[color || 'red']" class="h-5 w-5" />
      </div>
      <div class="ml-3">
        <h3 v-if="title" class="text-sm font-medium">
          {{ title }}
        </h3>
        <div class="text-sm" :class="[title ? 'mt-2' : '']">
          <p>{{ description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
