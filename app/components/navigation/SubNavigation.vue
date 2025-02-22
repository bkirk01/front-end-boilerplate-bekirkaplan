<script setup lang="ts">
import { useViewStore } from '~/store/view'
import { ERoutePaths } from '~/types/common'

const route = useRoute()
const viewStore = useViewStore()

// Computed properties
const showViewToggle = computed(() => {
  return route.name !== '/'
})

const showBackButton = computed(() => {
  return route.params.id !== undefined
})

const parentPath = computed(() => {
  const pathParts = route.path.split('/')
  return `/${pathParts[pathParts.length - 2]}`
})

// TODO: must be get from centrialized config file for api
const pageTitle = computed(() => {
  if (route.name === ERoutePaths.POKEMON) {
    return 'Pokémon'
  }
  if (route.name === ERoutePaths.RICKMORTY) {
    return 'Rick & Morty Characters'
  }
  if (route.name) {
    return route.params.name
  }
  return ''
})

// TODO: must be get from centrialized config file for api
const pageIcon = computed(() => {
  if (route.name === ERoutePaths.POKEMON) {
    return 'i-heroicons-sparkles'
  }
  if (route.name === ERoutePaths.RICKMORTY) {
    return 'i-heroicons-film'
  }
  return 'i-heroicons-document'
})

const view = computed(() => {
  if (route.path.startsWith('/pokemon')) {
    return viewStore.pokemonView
  }
  return viewStore.rickAndMortyView
})
</script>

<template>
  <div class="sub-navigation">
    <UContainer>
      <div class="navigation-wrapper">
        <div class="flex items-center justify-between">
          <!-- Left Side: Back Button and Title -->
          <div class="flex items-center gap-4">
            <NuxtLink
              v-if="showBackButton"
              :to="parentPath"
              class="back-button"
            >
              <UIcon name="i-heroicons-arrow-left" class="back-icon" />
              <span class="back-text">Back</span>
            </NuxtLink>
            <div v-if="pageTitle" class="title-container">
              <UIcon :name="pageIcon" class="title-icon" />
              <h1 class="title-text">
                {{ pageTitle }}
              </h1>
            </div>
          </div>

          <!-- Right Side: View Toggle -->
          <navigation-view-toggle
            v-if="showViewToggle"
            :view="view"
            @update:view="viewStore.toggleView"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.sub-navigation {
  @apply sticky top-0 border-b border-gray-200/50 backdrop-blur-md bg-white/25 z-30;
}

.navigation-wrapper {
  @apply py-4;
}

.back-button {
  @apply inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.back-icon {
  @apply w-4 h-4 mr-2;
}

.back-text {
  @apply hidden sm:inline;
}

.title-container {
  @apply flex items-center gap-2;
}

.title-icon {
  @apply w-5 h-5 text-gray-600;
}

.title-text {
  @apply font-bold text-gray-800 truncate;
  font-size: 1.125rem;
}

@screen sm {
  .title-text {
    font-size: 1.25rem;
  }
}

@screen md {
  .title-text {
    font-size: 1.5rem;
  }

  .title-icon {
    @apply w-6 h-6;
  }
}
</style>
