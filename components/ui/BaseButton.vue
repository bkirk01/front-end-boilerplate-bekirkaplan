<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :class="[
      'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      getVariantClasses,
      block ? 'w-full' : '',
      className,
    ]"
  >
    <UIcon v-if="icon && !trailing" :name="icon" class="mr-2 h-4 w-4" />
    <slot />
    <UIcon v-if="icon && trailing" :name="icon" class="ml-2 h-4 w-4" />
  </component>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  color?: string;
  icon?: string;
  trailing?: boolean;
  block?: boolean;
  to?: string;
  className?: string;
}>();

const getVariantClasses = computed(() => {
  const color = props.color || 'blue';

  switch (props.variant) {
    case 'solid':
      return `bg-${color}-600/80 text-white hover:bg-${color}-700/80 disabled:bg-${color}-200/80`;
    case 'outline':
      return `border border-${color}-300 bg-white text-${color}-700 hover:bg-${color}-50`;
    case 'ghost':
      return `text-${color}-700 hover:bg-${color}-100/50`;
    case 'link':
      return `text-${color}-600 hover:text-${color}-700 underline-offset-4 hover:underline`;
    default:
      return `bg-${color}-600/80 text-white hover:bg-${color}-700/80 disabled:bg-${color}-200/80`;
  }
});
</script>
