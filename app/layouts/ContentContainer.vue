<script setup lang="ts">
import useAppStore from '~/composables/useAppStore'

const { configuration } = useAppStore()
</script>

<template>
  <div :class="`${configuration?.contentContainerConfig?.bgColor}`">
    <slot />
  </div>
</template>
