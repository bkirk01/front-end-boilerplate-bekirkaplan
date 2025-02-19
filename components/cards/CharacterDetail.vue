<template>
  <div class="character-detail">
    <div v-if="loading" class="loading-container">
      <USpinner size="lg" class="spinner" />
    </div>
    <div v-else-if="error" class="error-container">
      <DAlert :title="error.title" :description="error.message" color="red" />
    </div>
    <div v-else-if="data" class="detail-container">
      <div :class="['detail-card', isPokemon ? pokemonBackground : characterBackground]">
        <!-- Card Header -->
        <div class="header-container">
          <div :class="['header-content', isPokemon ? pokemonGradient : characterGradient]">
            <div class="header-info">
              <h1 class="title">{{ data.name }}</h1>
              <div v-if="data.badges" class="badges">
                <DBadge
                  v-for="badge in data.badges"
                  :key="badge.text"
                  :color="badge.color"
                  class="badge"
                >
                  {{ badge.text }}
                </DBadge>
              </div>
            </div>
          </div>
          <!-- Character/Pokemon Image -->
          <div class="avatar-container">
            <ui-avatar :image="data.image" :alt="data.name" size="lg" />
          </div>
        </div>

        <!-- Card Content -->
        <div class="content">
          <!-- Info Grid -->
          <div class="info-grid">
            <div v-for="(info, index) in data.info" :key="index" class="info-item">
              <h2 class="info-label">{{ info.label }}</h2>
              <p class="info-value">{{ info.value }}</p>
            </div>
          </div>

          <!-- Stats -->
          <div v-if="data.stats" class="stats-container">
            <h2 class="section-title">Stats</h2>
            <div class="stats-list">
              <div v-for="stat in data.stats" :key="stat.name" class="stat-item">
                <span class="stat-name">{{ stat.name }}</span>
                <DProgress
                  :value="stat.value"
                  :max="stat.max"
                  :color="stat.color"
                  class="stat-progress"
                />
                <span class="stat-value">{{ stat.value }}</span>
              </div>
            </div>
          </div>

          <!-- List Section -->
          <div v-if="data.list" class="list-container">
            <h2 class="section-title">{{ data.list.title }}</h2>
            <div class="list-items">
              <div v-for="item in data.list.items" :key="item" class="list-item">
                <UIcon
                  :name="isPokemon ? 'i-heroicons-sparkles' : 'i-heroicons-film'"
                  class="list-icon"
                />
                <span class="list-text">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DetailItem } from '~/types/common';
import { TYPE_COLORS } from '~/mappers/pokemon';

const route = useRoute();

const props = defineProps<{
  data?: DetailItem;
  loading: boolean;
  error?: {
    title: string;
    message: string;
  };
}>();

const isPokemon = computed(() => route.path.includes('/pokemon/'));

// Character-specific styling based on status
const characterBackground = computed(() => {
  if (!props.data) return 'bg-white';

  const status = props.data.info.find(i => i.label === 'Status')?.value;
  switch (status) {
    case 'Alive':
      return 'bg-gradient-to-br from-white to-green-50';
    case 'Dead':
      return 'bg-gradient-to-br from-white to-red-50';
    default:
      return 'bg-gradient-to-br from-white to-gray-100';
  }
});

const pokemonBackground = computed(() => {
  if (!props.data?.badges?.[0]) return 'bg-gradient-to-br from-white to-gray-50';
  const type = props.data.badges[0].text;
  const color = TYPE_COLORS[type] || 'gray';
  return `bg-gradient-to-br from-white to-${color}-50`;
});

const characterGradient = computed(() => {
  if (!props.data) return 'bg-gradient-to-br from-gray-500 to-gray-600';

  const status = props.data.info.find(i => i.label === 'Status')?.value;
  switch (status) {
    case 'Alive':
      return 'bg-gradient-to-br from-green-500 to-green-600';
    case 'Dead':
      return 'bg-gradient-to-br from-red-500 to-red-600';
    default:
      return 'bg-gradient-to-br from-gray-500 to-gray-600';
  }
});

const pokemonGradient = computed(() => {
  if (!props.data?.badges?.[0]) return 'bg-gradient-to-br from-gray-500 to-gray-600';
  const type = props.data.badges[0].text;
  const color = TYPE_COLORS[type] || 'gray';
  return `bg-gradient-to-br from-${color}-500 to-${color}-600`;
});
</script>

<style scoped>
.character-detail {
  @apply space-y-6;
}

.loading-container {
  @apply flex justify-center;
}

.spinner {
  @apply text-blue-600;
}

.error-container {
  @apply max-w-2xl mx-auto;
}

.detail-container {
  @apply max-w-2xl mx-auto;
}

.detail-card {
  @apply rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-300 backdrop-blur-md border border-white/30;
}

.header-container {
  @apply relative;
}

.header-content {
  @apply relative z-10 px-6 pt-6 pb-32;
}

.header-info {
  @apply flex justify-between items-start;
}

.title {
  @apply text-3xl font-bold text-white capitalize;
}

.badges {
  @apply flex gap-2;
}

.badge {
  @apply shadow-md;
}

.avatar-container {
  @apply absolute left-1/2 -translate-x-1/2 -bottom-24 z-20;
}

.content {
  @apply px-6 pt-28 pb-6 space-y-6;
}

.info-grid {
  @apply grid grid-cols-2 gap-4;
}

.info-item {
  @apply bg-white/50 rounded-lg p-4 shadow-sm;
}

.info-label {
  @apply text-sm font-semibold text-gray-600;
}

.info-value {
  @apply text-lg text-gray-600;
}

.stats-container {
  @apply bg-white/50 rounded-lg p-4 shadow-sm;
}

.section-title {
  @apply font-semibold text-gray-600 mb-4;
}

.stats-list {
  @apply space-y-3;
}

.stat-item {
  @apply flex items-center gap-4;
}

.stat-name {
  @apply w-24 text-sm capitalize text-gray-600;
}

.stat-progress {
  @apply flex-1;
}

.stat-value {
  @apply w-12 text-sm text-right font-medium text-gray-600;
}

.list-container {
  @apply bg-white/50 rounded-lg p-4 shadow-sm;
}

.list-items {
  @apply space-y-2;
}

.list-item {
  @apply flex items-center gap-2 text-gray-600;
}

.list-icon {
  @apply w-5 h-5 text-gray-400;
}

.list-text {
  @apply capitalize;
}
</style>
