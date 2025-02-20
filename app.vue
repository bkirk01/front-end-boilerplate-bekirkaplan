<template>
  <div class="min-h-screen bg-gray-50">
    <navigation-main-navigation />
    <navigation-sub-navigation v-if="showSubNav" />
    <main :class="['relative z-10 pt-6 pb-24 lg:pt-8 sm:pt-6']">
      <UContainer class="px-6">
        <NuxtPage />
      </UContainer>
    </main>
    <ui-loading-overlay v-if="isRouteChanging" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const showSubNav = computed(() => route.path !== "/");
const isRouteChanging = ref(false);

// Handle route changes
router.beforeEach(() => {
  isRouteChanging.value = true;
});

router.afterEach(() => {
  isRouteChanging.value = false;
});
</script>

<style>
main {
  transition: padding-top 0.3s ease;
}
</style>
