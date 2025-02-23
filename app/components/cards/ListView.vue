<script setup lang="ts">
import type { TGenColorKeyTypes } from '~/types/common'
import { NuxtLink } from '#components'
import { DBadge } from '..'

defineProps<{
  image: string
  title: string
  detailsLink: string
  badges?: { text: string, color: string }[]
  height?: string
}>()

const isClient = import.meta.client
</script>

<template>
  <div v-if="isClient">
    <NuxtLink :to="detailsLink" class="block">
      <div class="list-card">
        <div class="flex">
          <!-- Image Section -->
          <div class="image-container p-2'">
            <ui-avatar :image="image" :alt="title" size="sm" />
          </div>

          <!-- Content Section -->
          <div class="content">
            <div class="content-inner">
              <h3 class="title">
                {{ title }}
              </h3>

              <!-- Badges -->
              <div class="badges">
                <div v-if="badges && badges.length > 0">
                  <DBadge
                    v-for="badge in badges"
                    :key="badge.text"
                    :color="badge.color as TGenColorKeyTypes"
                    class="backdrop-blur-sm w-20"
                  >
                    {{ badge.text }}
                  </DBadge>
                </div>
                <div v-else>
                  <DBadge color="yellow" class="backdrop-blur-sm">
                    Unknown
                  </DBadge>
                </div>
              </div>
            </div>
          </div>

          <!-- Button Section -->
          <NuxtLink class="button-container">
            <div class="details-button">
              <span>Details</span>
              <UIcon name="i-heroicons-arrow-right" class="button-icon" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.list-card {
  @apply rounded-xl overflow-hidden backdrop-blur-md
  shadow-sm hover:shadow-lg
  transform hover:scale-[1.02] transition-all duration-300;
}

.image-container {
  @apply flex items-center justify-center p-4 backdrop-blur-sm;
}

.content {
  @apply flex-1 p-4;
}

.content-inner {
  @apply flex flex-col h-full;
}

.title {
  @apply text-xl font-bold text-gray-800 capitalize mb-2;
}

.badges {
  @apply flex flex-row gap-2 mb-3;
}

.details {
  @apply space-y-2 flex items-baseline gap-2;
}

.detail-item {
  @apply flex items-center gap-2 text-sm text-gray-800;
}

.detail-icon {
  @apply w-4 h-4 text-gray-600;
}

.button-container {
  @apply hidden md:flex items-center justify-center border-l border-white/30 backdrop-blur-sm;
}

.details-button {
  @apply flex items-center gap-2 px-6 text-sm font-medium text-white;
}

.button-icon {
  @apply w-4 h-4 transition-transform duration-300 group-hover:translate-x-1;
}
</style>
