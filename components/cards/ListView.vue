<template>
  <NuxtLink :to="detailsLink" class="block">
    <div :class="['list-card', isPokemon ? pokemonBackground : characterBackground]">
      <div class="flex">
        <!-- Image Section -->
        <div :class="['image-container', isPokemon ? pokemonGradient : characterGradient]">
          <ui-avatar :image="image" :alt="title" size="md" />
        </div>

        <!-- Content Section -->
        <div class="content">
          <div class="content-inner">
            <h3 class="title">{{ title }}</h3>

            <!-- Badges -->
            <div v-if="badges && badges.length > 0" class="badges">
              <DBadge
                v-for="badge in badges"
                :key="badge.text"
                :color="badge.color"
                class="backdrop-blur-sm"
              >
                {{ badge.text }}
              </DBadge>
            </div>

            <!-- Details -->
            <div class="details">
              <div v-if="height" class="detail-item">
                <UIcon name="i-heroicons-arrows-up-down" class="detail-icon" />
                <span>Height: {{ height }}</span>
              </div>

              <div v-if="weight" class="detail-item">
                <UIcon name="i-heroicons-scale" class="detail-icon" />
                <span>Weight: {{ weight }}</span>
              </div>

              <div v-for="(detail, index) in details" :key="index" class="detail-item">
                <UIcon :name="getDetailIcon(detail)" class="detail-icon" />
                {{ detail }}
              </div>
            </div>
          </div>
        </div>

        <!-- Button Section -->
        <div :class="['button-container', isPokemon ? pokemonButtonStyle : characterButtonStyle]">
          <div class="details-button">
            <span>Details</span>
            <UIcon name="i-heroicons-arrow-right" class="button-icon" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { TYPE_COLORS } from '~/mappers/pokemon';

const props = defineProps<{
  image: string;
  title: string;
  details: string[];
  detailsLink: string;
  badges?: { text: string; color: string }[];
  height?: string;
  weight?: string;
  type?: string;
}>();

const route = useRoute();
const isPokemon = computed(() => route.path.includes('/pokemon'));

const getStatus = (details: string[]) => {
  const statusDetail = details.find(detail => detail.startsWith('Status:'));
  return statusDetail ? statusDetail.split(': ')[1] : 'Unknown';
};

const status = computed(() => (!isPokemon.value ? getStatus(props.details) : 'none'));

const characterBackground = computed(() => {
  switch (status.value) {
    case 'Alive':
      return 'bg-gradient-to-br from-white/30 to-green-50/30';
    case 'Dead':
      return 'bg-gradient-to-br from-white/30 to-red-50/30';
    default:
      return 'bg-gradient-to-br from-white/30 to-gray-50/30';
  }
});

const pokemonBackground = computed(() => {
  const type = props.type || 'normal';
  const color = TYPE_COLORS[type] || 'gray';
  return `bg-gradient-to-br from-white/30 to-${color}-50/30`;
});

const characterGradient = computed(() => {
  switch (status.value) {
    case 'Alive':
      return 'bg-gradient-to-br from-green-500/80 to-green-600/80';
    case 'Dead':
      return 'bg-gradient-to-br from-red-500/80 to-red-600/80';
    default:
      return 'bg-gradient-to-br from-gray-500/80 to-gray-600/80';
  }
});

const pokemonGradient = computed(() => {
  const type = props.type || 'normal';
  const color = TYPE_COLORS[type] || 'gray';
  return `bg-gradient-to-br from-${color}-500/80 to-${color}-600/80`;
});

const characterButtonStyle = computed(() => {
  switch (status.value) {
    case 'Alive':
      return 'bg-gradient-to-br from-green-500/80 to-green-600/80';
    case 'Dead':
      return 'bg-gradient-to-br from-red-500/80 to-red-600/80';
    default:
      return 'bg-gradient-to-br from-gray-500/80 to-gray-600/80';
  }
});

const pokemonButtonStyle = computed(() => {
  const type = props.type || 'normal';
  const color = TYPE_COLORS[type] || 'gray';
  return `bg-gradient-to-br from-${color}-500/80 to-${color}-600/80`;
});

const getDetailIcon = (detail: string) => {
  if (isPokemon.value) {
    if (detail.startsWith('Height')) return 'i-heroicons-arrows-up-down';
    if (detail.startsWith('Weight')) return 'i-heroicons-scale';
    return 'i-heroicons-sparkles';
  } else {
    if (detail.startsWith('Status')) return 'i-heroicons-user-circle';
    if (detail.startsWith('Species')) return 'i-heroicons-identification';
    if (detail.startsWith('Location')) return 'i-heroicons-map-pin';
    return 'i-heroicons-information-circle';
  }
};
</script>

<style scoped>
.list-card {
  @apply rounded-xl overflow-hidden backdrop-blur-md border border-white/30 shadow-sm hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300;
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
  @apply flex gap-2 mb-3;
}

.details {
  @apply space-y-2;
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
