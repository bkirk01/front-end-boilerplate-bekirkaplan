<script setup lang="ts">
import type { TGenColorKeyTypes } from '~/types/common'
import { computed } from 'vue'
import CardLayout from '~/layouts/CardLayout.vue'
import { DBadge } from '..'

const props = defineProps<{
  image: string
  title: string
  weight?: number
  height?: number
  detailsLink?: { to: string, text: string }
  type?: string
  badges?: { text: string, color: TGenColorKeyTypes | string }[]
}>()

// Compute default link for the details button if not provided
const defaultDetailsLink = props.detailsLink ?? computed(() => ({ ...props.detailsLink, ...{ to: props.detailsLink?.to || '/default-link' } }))

// Compute button color based on 'type' prop, defaulting to 'gray'
const buttonColor = computed(() => props.type || 'gray')
</script>

<template>
  <!-- Card layout container with named slots -->
  <CardLayout class="grid-card-container">
    <!-- Header slot with conditional rendering for custom title -->
    <template #header>
      <UiBaseGradient class="title-container" from="gray-200" to="gray-400" opacity="50" direction="b">
        <template v-if="$slots.title">
          <slot name="title">
            {{ title }}
          </slot>
        </template>
        <template v-else>
          <h3 class="text-xl sm:text-2xl font-bold text-white capitalize truncate">
            {{ title }}
          </h3>
        </template>
      </UiBaseGradient>
    </template>

    <!-- Avatar slot with fallback to UiAvatar if not provided -->
    <template v-if="$slots.avatar" #avatar>
      <slot name="avatar" />
    </template>
    <template v-else #avatar>
      <UiAvatar :image="image" :alt="title" />
    </template>

    <!-- Content slot with fallback for displaying badges -->
    <template v-if="$slots.content" #content>
      <slot name="content" />
    </template>
    <template v-else #content>
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

    <!-- Footer slot with fallback to NuxtLink and UiBaseButton -->
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
    <template v-else #footer>
      <slot name="footer">
        <NuxtLink :to="defaultDetailsLink.to" class="block">
          <UiBaseButton :color="buttonColor" variant="solid" block trailing icon="i-heroicons-arrow-right">
            {{ defaultDetailsLink.text }}
          </UiBaseButton>
        </NuxtLink>
      </slot>
    </template>
  </CardLayout>
</template>

<style scoped>
/* Import custom styles for the grid card component */
@import '../../assets/css/components/grid-card.css';
</style>
