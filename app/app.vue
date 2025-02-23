<script setup lang="ts">
import { ConstAppName } from './constants'
import MainLayout from './layouts/MainLayout.vue'

useHead({
  title: ConstAppName,
})
</script>

<template>
  <VitePwaManifest />
  <MainLayout>
    <NuxtPage />
  </MainLayout>
</template>
