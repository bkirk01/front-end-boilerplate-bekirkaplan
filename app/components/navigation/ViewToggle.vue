<script setup lang="ts">
const props = defineProps<{
  view: 'grid' | 'list'
}>()

const emit = defineEmits<{
  (e: 'update:view', value: 'grid' | 'list'): void
}>()

function toggleView() {
  emit('update:view', props.view === 'grid' ? 'list' : 'grid')
}
</script>

<template>
  <div class="view-toggle">
    <UButton color="gray" variant="ghost" class="toggle-button" @click="toggleView">
      <UIcon
        :name="view === 'grid' ? 'i-heroicons-bars-3' : 'i-heroicons-squares-2x2'"
        class="toggle-icon"
      />
      <span class="toggle-text">{{ view === 'grid' ? 'List View' : 'Grid View' }}</span>
    </UButton>
  </div>
</template>

<style scoped>
.view-toggle {
  @apply flex items-center;
}

.toggle-button {
  @apply p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.toggle-icon {
  @apply w-5 h-5;
}

.toggle-text {
  @apply hidden md:inline-block ml-2;
}
</style>
