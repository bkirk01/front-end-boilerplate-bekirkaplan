<template>
  <div :class="gradientClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  from: string;
  to: string;
  opacity?: string;
}>();

const gradientClass = computed(() => {
  const fromOpacity = props.opacity ? `/${props.opacity}` : '';
  const toOpacity = props.opacity ? `/${props.opacity}` : '';
  return `bg-gradient-to-br from-${props.from}${fromOpacity} to-${props.to}${toOpacity}`;
});
</script>
