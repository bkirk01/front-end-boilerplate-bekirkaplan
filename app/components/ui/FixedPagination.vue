<template>
  <client-only>
    <div class="fixed-pagination">
      <UContainer>
        <div class="pagination-wrapper">
          <ui-custom-pagination
            :model-value="modelValue"
            :total="total"
            @update:model-value="$emit('update:modelValue', $event)"
          />
        </div>
      </UContainer>
    </div>
  </client-only>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  total: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

if (import.meta.client) {
  watch(
    () => props.modelValue,
    (newValue) => {
      console.log(`Client-side pagination changed to page ${newValue}`);
    }
  );
}
</script>

<style scoped>
.fixed-pagination {
  @apply fixed bottom-0 left-0 right-0 border-t border-gray-200/50 backdrop-blur-md py-4 z-40;
}

.pagination-wrapper {
  @apply flex justify-center;
}
</style>
