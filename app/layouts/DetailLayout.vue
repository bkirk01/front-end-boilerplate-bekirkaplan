<template>
  <div class="min-h-screen bg-gray-50">
    <NavigationSubNavigation v-if="true" />
    <UContainer>
      <slot />
    </UContainer>
  </div>
</template>
