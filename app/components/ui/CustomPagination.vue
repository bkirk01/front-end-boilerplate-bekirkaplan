<template>
  <nav class="flex items-center justify-center gap-1" aria-label="Pagination">
    <!-- Pagination with model binding and updatePage handling -->
    <UPagination
      v-model="modelRef"
      size="xl"
      :page-count="pageCount"
      :total="total"
    />
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: number;
  total: number;
}>();

const modelRef = ref(props.modelValue);
const pageCount = ref(Math.ceil(props.modelValue / 5));

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

/** Handles the pagination update event */
const updatePage = (page: number) => {
  emit("update:modelValue", page);
};

// 🔄 Watch for changes in modelRef and call updatePage
watch(modelRef, (newPage) => {
  updatePage(newPage);
});

// 🔄 Sync modelRef with prop if parent updates it
watch(
  () => props.modelValue,
  (newVal) => {
    modelRef.value = newVal;
  }
);
</script>
