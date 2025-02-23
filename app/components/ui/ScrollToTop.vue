<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const showButton = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function checkScroll() {
  showButton.value = window.scrollY > 500
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <UButton
    v-show="showButton" icon="i-heroicons-arrow-up" color="gray" variant="solid" :ui="{
      rounded: 'rounded-full',
      xs: 'xs',
      background: 'bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
      cursor: 'cursor-pointer',
    }" class="fixed bottom-6 right-6 shadow-lg transition-all duration-300 hover:shadow-xl z-50"
    @click="scrollToTop"
  />
</template>
