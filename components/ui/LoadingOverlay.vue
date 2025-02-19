<template>
  <Transition name="loading" appear>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-xl">
        <div class="flex flex-col items-center">
          <!-- Loading Animation -->
          <img :src="loadingImage" alt="Loading..." class="w-24 h-24 object-contain" />

          <!-- Loading Text -->
          <span class="mt-4 text-sm font-medium text-gray-600">
            {{ isPokemon ? 'Loading Pokémon...' : 'Loading Characters...' }}
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const route = useRoute();
const isPokemon = computed(() => route.path.includes('/pokemon'));

// Import loading animations
import pikachuLoading from '~/assets/animations/loading-animation-pikacu.gif';
import rickLoading from '~/assets/animations/loading-animation-rick.gif';

const loadingImage = computed(() => (isPokemon.value ? pikachuLoading : rickLoading));
</script>

<style scoped>
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.5s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>
