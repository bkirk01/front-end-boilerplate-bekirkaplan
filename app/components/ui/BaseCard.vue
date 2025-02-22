<script setup lang="ts">
defineProps<{
  to?: string
  className?: string
}>()
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="card-link">
    <div class="base-card" :class="[className]">
      <slot />
    </div>
  </NuxtLink>
</template>

<style scoped>
.base-card {
  @apply rounded-xl overflow-hidden shadow-sm
  hover:shadow-lg transform hover:scale-[1.02]
  transition-all duration-300 backdrop-blur-md;
}

.card-link {
  @apply block h-full;
}
</style>
