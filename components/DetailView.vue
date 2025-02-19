<template>
  <div class="space-y-6">
    <DButton icon="i-heroicons-arrow-left" variant="ghost" @click="router.back()"> Back </DButton>

    <div v-if="loading" class="flex justify-center">
      <USpinner />
    </div>
    <div v-else-if="error">
      <DAlert :title="error.title" :description="error.message" color="red" />
    </div>
    <div v-else class="max-w-2xl mx-auto">
      <DCard>
        <template #header>
          <div class="bg-gray-100">
            <img
              :src="data.image"
              :alt="data.name"
              :class="['w-full object-contain', imageClass]"
            />
          </div>
        </template>
        <div class="space-y-4">
          <h1 class="text-3xl font-bold capitalize">{{ data.name }}</h1>

          <div v-if="data.badges" class="flex gap-2">
            <DBadge v-for="badge in data.badges" :key="badge.text" :color="badge.color">
              {{ badge.text }}
            </DBadge>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div v-for="(info, index) in data.info" :key="index">
              <h2 class="font-semibold text-gray-600">{{ info.label }}</h2>
              <p>{{ info.value }}</p>
            </div>
          </div>

          <div v-if="data.stats">
            <h2 class="font-semibold text-gray-600 mb-2">Stats</h2>
            <div class="space-y-2">
              <div v-for="stat in data.stats" :key="stat.name" class="flex items-center gap-4">
                <span class="w-24 text-sm capitalize">{{ stat.name }}</span>
                <DProgress :value="stat.value" :max="stat.max" :color="stat.color" class="flex-1" />
                <span class="w-12 text-sm text-right">{{ stat.value }}</span>
              </div>
            </div>
          </div>

          <div v-if="data.list">
            <h2 class="font-semibold text-gray-600 mb-2">{{ data.list.title }}</h2>
            <ul class="list-disc list-inside">
              <li v-for="item in data.list.items" :key="item" class="capitalize">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </DCard>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Badge {
  text: string;
  color: string;
}

interface Info {
  label: string;
  value: string | number;
}

interface Stat {
  name: string;
  value: number;
  max: number;
  color: string;
}

interface List {
  title: string;
  items: string[];
}

interface DetailData {
  name: string;
  image: string;
  badges?: Badge[];
  info: Info[];
  stats?: Stat[];
  list?: List;
}

const props = defineProps<{
  data?: DetailData;
  loading: boolean;
  error?: {
    title: string;
    message: string;
  };
  imageClass?: string;
}>();

const router = useRouter();
</script>
