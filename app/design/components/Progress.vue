<template>
  <div class="w-full">
    <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        :class="['h-2 rounded-full transition-all', colors[color]]"
        :style="{ width: `${(value / max) * 100}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const colors = {
  gray: 'bg-gray-600',
  red: 'bg-red-600',
  yellow: 'bg-yellow-600',
  green: 'bg-green-600',
  blue: 'bg-blue-600',
  indigo: 'bg-indigo-600',
  purple: 'bg-purple-600',
  pink: 'bg-pink-600',
};

defineProps<{
  value: number;
  max: number;
  color?: keyof typeof colors;
}>();
</script>
