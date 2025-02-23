<script setup lang="ts">
import type { TGenColorKeyTypes } from '~/types/common'
import CardLayout from '~/layouts/CardLayout.vue'
import { DBadge } from '..'

const props = defineProps<{
  image: string
  title: string
  weight?: number
  height?: number
  detailsLink?: string
  type?: string
  badges?: { text: string, color: TGenColorKeyTypes }[]
}>()
</script>

<template>
  <CardLayout>
    <template #header>
      <UiBaseGradient class="relative px-4 pt-4 pb-20" opacity="80">
        <h3 class="text-xl font-bold text-white capitalize truncate">
          {{ title }}
        </h3>
      </UiBaseGradient>
    </template>

    <template #avatar>
      <UiAvatar :image="image" :alt="title" />
    </template>

    <template #content>
      <div class="flex gap-2 mb-3">
        <div v-if="badges && badges.length > 0">
          <DBadge v-for="badge in badges" :key="badge.text" :color="badge.color" style="padding: 0.5rem 1rem">
            {{ badge.text }}
          </DBadge>
        </div>
        <div v-else>
          <DBadge color="yellow" style="padding: 0.5rem 1rem">
            Unknown
          </DBadge>
        </div>
      </div>
    </template>

    <template #footer>
      <UiBaseButton :color="props.type || 'gray'" variant="solid" block trailing icon="i-heroicons-arrow-right">
        View Details
      </UiBaseButton>
    </template>
  </CardLayout>
</template>
