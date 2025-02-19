<template>
  <nav class="flex items-center justify-center gap-1" aria-label="Pagination">
    <!-- Previous button -->
    <UButton
      color="gray"
      variant="ghost"
      :disabled="modelValue === 1"
      class="hidden sm:flex"
      @click="updatePage(modelValue - 1)"
    >
      <UIcon name="i-heroicons-chevron-left" class="h-4 w-4" />
      <span class="sr-only">Previous</span>
    </UButton>

    <!-- Mobile Previous -->
    <UButton
      v-if="modelValue !== 1"
      color="gray"
      variant="ghost"
      class="sm:hidden"
      @click="updatePage(modelValue - 1)"
    >
      <UIcon name="i-heroicons-chevron-left" class="h-4 w-4" />
      <span class="sr-only">Previous</span>
    </UButton>

    <!-- First page -->
    <UButton
      v-if="showFirstPage"
      color="gray"
      :variant="modelValue === 1 ? 'solid' : 'ghost'"
      class="hidden sm:flex"
      @click="updatePage(1)"
    >
      1
    </UButton>

    <!-- Left ellipsis -->
    <span
      v-if="showLeftEllipsis"
      class="hidden sm:inline-flex items-center px-4 text-sm text-gray-500"
    >
      ...
    </span>

    <!-- Page numbers -->
    <template v-for="page in visiblePages" :key="page">
      <UButton
        color="gray"
        :variant="modelValue === page ? 'solid' : 'ghost'"
        @click="updatePage(page)"
      >
        {{ page }}
      </UButton>
    </template>

    <!-- Right ellipsis -->
    <span
      v-if="showRightEllipsis"
      class="hidden sm:inline-flex items-center px-4 text-sm text-gray-500"
    >
      ...
    </span>

    <!-- Last page -->
    <UButton
      v-if="showLastPage"
      color="gray"
      :variant="modelValue === total ? 'solid' : 'ghost'"
      class="hidden sm:flex"
      @click="updatePage(total)"
    >
      {{ total }}
    </UButton>

    <!-- Mobile Next -->
    <UButton
      v-if="modelValue !== total"
      color="gray"
      variant="ghost"
      class="sm:hidden"
      @click="updatePage(modelValue + 1)"
    >
      <UIcon name="i-heroicons-chevron-right" class="h-4 w-4" />
      <span class="sr-only">Next</span>
    </UButton>

    <!-- Next button -->
    <UButton
      color="gray"
      variant="ghost"
      :disabled="modelValue === total"
      class="hidden sm:flex"
      @click="updatePage(modelValue + 1)"
    >
      <UIcon name="i-heroicons-chevron-right" class="h-4 w-4" />
      <span class="sr-only">Next</span>
    </UButton>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  total: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const updatePage = (page: number) => {
  emit('update:modelValue', page);
};

// Calculate visible pages
const visiblePages = computed(() => {
  const current = props.modelValue;
  const total = props.total;
  const delta = 2; // Number of pages to show on each side of current page

  let start = Math.max(current - delta, 1);
  let end = Math.min(current + delta, total);

  // Adjust start and end to always show 5 pages if possible
  const pagesShown = end - start + 1;
  if (pagesShown < 5) {
    if (start === 1) {
      end = Math.min(5, total);
    } else if (end === total) {
      start = Math.max(total - 4, 1);
    }
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Show first page button if start of visible pages is > 2
const showFirstPage = computed(() => {
  return visiblePages.value[0] > 2;
});

// Show last page button if end of visible pages is < total - 1
const showLastPage = computed(() => {
  return visiblePages.value[visiblePages.value.length - 1] < props.total - 1;
});

// Show left ellipsis if start of visible pages is > 2
const showLeftEllipsis = computed(() => {
  return visiblePages.value[0] > 2;
});

// Show right ellipsis if end of visible pages is < total - 1
const showRightEllipsis = computed(() => {
  return visiblePages.value[visiblePages.value.length - 1] < props.total - 1;
});
</script>
