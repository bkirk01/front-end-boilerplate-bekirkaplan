<script setup lang="ts">
defineProps<{
  variant?: keyof typeof variants
  icon?: string
  trailing?: boolean
  block?: boolean
  to?: string
  className?: string
}>()

const variants = {
  solid: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-200',
  outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-700 hover:bg-gray-100',
  link: 'text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline',
}
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" :class="[
      variants[variant],
      block ? 'w-full' : '',
      className,
    ]"
  >
    <UIcon v-if="icon && !trailing" :name="icon" class="mr-2 h-4 w-4" />
    <slot />
    <UIcon v-if="icon && trailing" :name="icon" class="ml-2 h-4 w-4" />
  </component>
</template>
