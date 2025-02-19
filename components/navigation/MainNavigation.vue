<template>
  <nav class="nav-container">
    <UContainer>
      <div class="nav-content">
        <NuxtLink to="/" class="logo">
          <span class="logo-text">Home</span>
        </NuxtLink>
        <div class="nav-links">
          <NuxtLink
            to="/rick-and-morty"
            :class="['nav-link', route.path.startsWith('/rick-and-morty') ? 'active' : '']"
          >
            <img src="~/assets/icons/rick.jpeg" alt="Rick" class="nav-icon rick-icon" />
            <span class="nav-text">Rick & Morty</span>
          </NuxtLink>
          <NuxtLink
            to="/pokemon"
            :class="['nav-link', route.path.startsWith('/pokemon') ? 'active' : '']"
          >
            <img src="~/assets/icons/pikacu.png" alt="Pikachu" class="nav-icon pikachu-icon" />
            <span class="nav-text">Pokémon</span>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped>
.nav-container {
  @apply fixed top-0 left-0 right-0 border-b border-gray-200/50 backdrop-blur-xl bg-white/50 z-50;
}

.nav-content {
  @apply flex items-center justify-between h-16;
}

.logo {
  @apply flex items-center gap-2 text-lg font-bold text-gray-800 hover:text-gray-900 transition-colors;
}

.logo-text {
  @apply hidden sm:inline;
}

.nav-links {
  @apply flex gap-2 sm:gap-4;
}

.nav-link {
  @apply flex items-center justify-center rounded-lg px-2 sm:px-4 py-2 text-sm font-medium transition-all;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.nav-link:not(.active) {
  @apply text-gray-700 hover:bg-gray-100/50;
}

.nav-link.active {
  @apply bg-gray-700/90 text-white hover:bg-gray-800/90 backdrop-blur-xl;
}

.nav-icon {
  @apply w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300;
}

.nav-link:hover .nav-icon {
  @apply scale-110;
}

/* Rick icon specific styles */
.rick-icon {
  @apply rounded-full;
}

/* Pikachu icon specific styles */
.pikachu-icon {
  @apply w-10 h-10 sm:w-12 sm:h-12 -my-1;
}

.nav-text {
  @apply hidden sm:inline-block ml-2;
}
</style>
