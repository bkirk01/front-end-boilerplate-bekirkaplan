<template>
  <div :class="['avatar', isPokemon ? 'pokemon-avatar' : '', sizeClasses, className]">
    <div v-show="loading" class="loading-container">
      <img :src="loadingImage" alt="Loading..." class="loading-animation" />
    </div>
    <img
      :src="image"
      :alt="alt"
      loading="lazy"
      decoding="async"
      :class="[
        'avatar-image',
        isPokemon ? 'pokemon-image' : '',
        { 'opacity-0': loading },
        imageClass,
      ]"
      @load="handleImageLoad"
      @error="handleImageError"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const props = defineProps<{
  image: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  imageClass?: string;
}>();

const loading = ref(true);
const isPokemon = computed(() => route.path.includes('/pokemon'));

// Import loading animations
import pikachuLoading from '~/assets/animations/loading-animation-pikacu.gif';
import rickLoading from '~/assets/animations/loading-animation-rick.gif';

const loadingImage = computed(() => (isPokemon.value ? pikachuLoading : rickLoading));

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'avatar-sm';
    case 'md':
      return 'avatar-md';
    case 'lg':
      return 'avatar-lg';
    default:
      return 'avatar-md';
  }
});

function handleImageLoad() {
  loading.value = false;
}

function handleImageError() {
  loading.value = false;
}
</script>

<style scoped>
.avatar {
  @apply relative rounded-full overflow-hidden transition-transform duration-300;
}

.pokemon-avatar {
  @apply bg-white p-1 shadow-lg;
}

.avatar-image {
  @apply w-full h-full transition-all duration-500 hover:scale-110 rounded-full;
}

.pokemon-image {
  @apply p-2;
}

.loading-container {
  @apply absolute inset-0 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm rounded-full;
}

.loading-animation {
  @apply w-3/4 h-3/4 object-contain;
}

/* Mobile sizes */
.avatar-sm {
  @apply w-16 h-16;
}

.avatar-md {
  @apply w-20 h-20;
}

.avatar-lg {
  @apply w-24 h-24;
}

/* Desktop sizes */
@screen md {
  .avatar-sm {
    @apply w-24 h-24;
  }

  .avatar-md {
    @apply w-32 h-32;
  }

  .avatar-lg {
    @apply w-48 h-48;
  }
}
</style>
