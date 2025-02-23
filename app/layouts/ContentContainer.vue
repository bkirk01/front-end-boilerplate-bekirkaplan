<script setup lang="ts">
import WallpaperBackground from '~/components/backgrounds/WallpaperBackground.vue'
import useAppStore from '~/composables/useAppStore'

const { configuration } = useAppStore()
</script>

<template>
  <div :class="`${configuration?.contentContainerConfig?.bgColor}`">
    <WallpaperBackground v-if="configuration.contentContainerConfig?.showWallPaper" />
    <slot />
  </div>
</template>
