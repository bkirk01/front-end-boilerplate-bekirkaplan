<script setup lang="ts">
import type { TGenColorKeyTypes } from '~/types/common'
import { NuxtLink } from '#components'
import ListItemLayout from '~/layouts/ListItemLayout.vue'
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
      <ListItemLayout>
        <template #avatar>
          <UiAvatar :image="image" :alt="title" size="sm" />
        </template>

        <template #content>
          <h3 class="title">
            {{ title }}
          </h3>
          <div class="badges">
            <div v-if="badges && badges.length > 0">
              <DBadge v-for="badge in badges" :key="badge.text" class="w-20" :color="badge.color as TGenColorKeyTypes">
                {{ badge.text }}
              </DBadge>
            </div>
            <div v-else>
              <DBadge color="yellow">
                Unknown
              </DBadge>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="details-button">
            <span>Details</span>
            <UIcon name="i-heroicons-arrow-right" class="button-icon" />
          </div>
        </template>
      </ListItemLayout>
    </NuxtLink>
  </div>
</template>

<style scoped>
.title {
  @apply text-xl font-bold text-gray-800 capitalize mb-2;
}

.badges {
  @apply flex flex-row gap-2 mb-3;
}

.detail-item {
  @apply flex items-center gap-2 text-sm text-gray-800;
}

.detail-icon {
  @apply w-4 h-4 text-gray-600;
}

.details-button {
  @apply flex items-center gap-2 px-6 text-sm font-medium text-white;
}

.button-icon {
  @apply w-4 h-4 transition-transform duration-300 group-hover:translate-x-1;
}
</style>
