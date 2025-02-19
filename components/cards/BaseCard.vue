<template>
  <NuxtLink v-if="to" :to="to" class="card-link">
    <div :class="['base-card', className]">
      <slot />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to?: string;
  className?: string;
}>();
</script>

<style scoped>
.base-card {
  @apply rounded-xl overflow-hidden shadow-sm hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 backdrop-blur-md border border-white/30;
}

.card-link {
  @apply block h-full;
}
</style>
