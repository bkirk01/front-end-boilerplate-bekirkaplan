<script setup lang="ts">
import { useViewStore } from '~/store/view'
import { ERoutePaths, type TCItemDetailType, type TGenColorKeyTypes } from '~/types/common'
import { DAlert, DBadge, DProgress } from '..'

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
        class="header-container"
      >
        <div class="header-info">
          <h1 class="title">
            {{ data.name }}
          </h1>
          <div v-if="data.badges" class="badges">
            <DBadge
              v-for="badge in data.badges"
              :key="badge.text"
              :color="badge.color as TGenColorKeyTypes"
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
@import '../../assets/css/components/character-detail.css';
</style>
