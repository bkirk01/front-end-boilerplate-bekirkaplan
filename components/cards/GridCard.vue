<template>
  <CardsBaseCard :to="props.detailsLink">
    
      <div class="card-header">
        <UiBaseGradient
          opacity="80"
          class="relative px-4 pt-4 pb-20 backdrop-blur-sm"
        >
          <h3 class="text-xl font-bold text-white capitalize truncate">{{ title }}</h3>
        </UiBaseGradient>
      </div>

      <div class="card-body relative -mt-16 flex justify-center">
        <UiAvatar
          :image="image"
          :alt="title"
        />
      </div>

      <div class="px-4 py-4 flex flex-col items-center">
        <div class="flex gap-2 mb-3">
          <DBadge v-if="badges && badges.length > 0" 
            v-for="badge in badges"
            :key="badge.text"
            :color="badge.color"
            style="padding: 0.5rem 1rem"
          >
            {{ badge.text }}
          </DBadge>
          <DBadge v-else
            color="yellow"
            style="padding: 0.5rem 1rem"
          >
             Unknown
          </DBadge>
        </div>

        <ui-base-button
          :color="props.type || 'gray'"
          variant="solid"
          block
          trailing
          icon="i-heroicons-arrow-right"
        >
          View Details
        </ui-base-button>
      </div>
  </CardsBaseCard>
</template>

<script setup lang="ts">
const route = useRoute();

const props = defineProps<{
  image: string;
  title: string;
  weight?: number;
  height?: number;
  detailsLink?: string;
  type?: string;
  badges?: { text: string; color: string }[];
}>();
</script>
