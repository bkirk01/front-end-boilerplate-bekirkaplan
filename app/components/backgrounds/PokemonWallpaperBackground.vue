<script setup lang="ts">
const images = [
  { src: '/wallpapers/pokemon/1351146.png', alt: 'Pokemon Legendary Wallpaper' },
  { src: '/wallpapers/pokemon/592678.jpg', alt: 'Pokemon Battle Wallpaper' },
  { src: '/wallpapers/pokemon/481909.png', alt: 'Pokemon Adventure Wallpaper' },
  { src: '/wallpapers/pokemon/1351278.png', alt: 'Pokemon Group Wallpaper' },
]
</script>

<template>
  <backgrounds-wallpaper-background
    class="opacity-70"
    :images="images"
    overlay-class="bg-black/10"
  />
</template>
