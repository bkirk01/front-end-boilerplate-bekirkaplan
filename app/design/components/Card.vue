<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    :class="[
      'overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300',
      to ? 'hover:scale-[1.02]' : '',
      className,
    ]"
  >
    <slot name="header" />
    <div class="p-6">
      <slot />
    </div>
    <div v-if="$slots.footer" class="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
      <slot name="footer" />
    </div>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  className?: string;
  to?: string;
}>();
</script>
