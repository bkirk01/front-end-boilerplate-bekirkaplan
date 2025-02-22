<script setup lang="ts">
import { useViewStore } from '~/store/view'
import { ERoutePaths, type TCItemDetailType } from '~/types/common';

defineProps<{
  data?: TCItemDetailType
  error?: { title: string, message: string }
}>()

const viewStore = useViewStore()
const isPokemon = computed(
  () => viewStore.selectedView === ERoutePaths.POKEMON,
)
</script>

<template>
  <div class="character-detail">
    <div v-if="error" class="error-container">
      <DAlert :title="error.title" :description="error.message" color="red" />
    </div>

    <div v-else-if="data" class="detail-container">
      <!-- Card Header -->
      <div
        class="header-container" :class="[
          isPokemon ? 'pokemon-gradient' : 'character-gradient',
        ]"
      >
        <div class="header-info">
          <h1 class="title">
            {{ data.name }}
          </h1>
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
        <UiAvatar :image="data.image" :alt="data.name" size="lg" />
      </div>

      <!-- Card Content -->
      <div class="content">
        <!-- Info Grid -->
        <div class="info-grid">
          <div
            v-for="(info, index) in data.info"
            :key="index"
            class="info-item"
          >
            <h2 class="info-label">
              {{ info.label }}
            </h2>
            <p class="info-value">
              {{ info.value }}
            </p>
          </div>
        </div>

        <!-- Stats Section -->
        <div v-if="data.stats" class="stats-section">
          <h2 class="section-title">
            Stats
          </h2>
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

        <!-- List Section -->
        <div v-if="data.list" class="list-section">
          <h2 class="section-title">
            {{ data.list.title }}
          </h2>
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
</template>

<style scoped>
.character-detail {
  @apply space-y-6 h-full w-full relative;
}

.loading-container {
  @apply flex justify-center;
}

.spinner {
  @apply text-blue-600;
}

.error-container,
.detail-container {
  @apply max-w-2xl mx-auto;
}

.detail-container {
  @apply rounded-2xl shadow-lg backdrop-blur-md overflow-hidden;
}

.header-container {
  @apply relative z-10 px-6 pt-6 pb-32;
}

.pokemon-gradient {
  @apply bg-gradient-to-r from-gray-900 to-blue-800;
}

.character-gradient {
  @apply bg-gradient-to-r from-purple-500 to-pink-500;
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
  @apply sticky flex justify-center -mt-12 md:-mt-24 z-20;
}

.content {
  @apply px-6 pt-6 pb-6 space-y-6;
}

.info-grid {
  @apply grid grid-cols-2 gap-4;
}

.info-item {
  @apply bg-white/50 rounded-lg p-4 shadow-sm transition-all duration-500 hover:scale-105;
}

.info-label,
.stat-name,
.stat-value,
.list-text {
  @apply text-sm text-gray-600;
}

.info-value {
  @apply text-lg text-gray-600;
}

.stats-section,
.list-section {
  @apply bg-white/50 rounded-lg p-4 shadow-sm;
}

.section-title {
  @apply font-semibold text-gray-600 mb-4;
}

.stat-item {
  @apply flex items-center gap-4;
}

.stat-progress {
  @apply flex-1;
}

.list-item {
  @apply flex items-center gap-2 text-gray-600;
}

.list-icon {
  @apply w-5 h-5 text-gray-400;
}
</style>
