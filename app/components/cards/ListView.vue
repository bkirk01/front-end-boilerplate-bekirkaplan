<script setup lang="ts">
import type { TGenColorKeyTypes } from '~/types/common'
import { NuxtLink } from '#components'
import ListItemLayout from '~/layouts/ListItemLayout.vue'
import { DBadge } from '..'

defineProps<{
  image: string
  title?: string
  detailsLink: string
  badges?: { text: string, color: string }[]
  height?: string
}>()
</script>

<template>
  <ClientOnly>
    <ListItemLayout>
      <template #avatar>
        <UiAvatar :image="image" :alt="title || 'unknown image'" size="sm" />
      </template>

      <template #content>
        <slot name="title">
          <h3 class="title">
            {{ title }}
          </h3>
        </slot>
        <slot name="contentBody">
          <div class="badges">
            <div v-if="badges && badges.length > 0">
              <DBadge v-for="badge in badges" :key="badge.text" class="w-20" :bg-color="badge.text" :color="badge.color as TGenColorKeyTypes">
                {{ badge.text }}
              </DBadge>
            </div>
            <div v-else>
              <DBadge color="yellow">
                Unknown
              </DBadge>
            </div>
          </div>
        </slot>
      </template>

      <template #button>
        <div class="details-button">
          <NuxtLink :to="detailsLink" class="w-full h-full flex justify-center items-center px-6 rounded-r-full">
            <span>Details</span>
            <UIcon name="i-heroicons-arrow-right" class="button-icon" />
          </NuxtLink>
        </div>
      </template>
    </ListItemLayout>
  </ClientOnly>
</template>

<style scoped>
@import '../../assets/css/components/list-view.css';
</style>
