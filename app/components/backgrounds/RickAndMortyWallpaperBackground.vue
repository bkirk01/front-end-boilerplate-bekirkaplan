<script setup lang="ts">
const images = [
  { src: '/wallpapers/rick-morty/1285058.jpg', alt: 'Rick and Morty Portal Adventure' },
  { src: '/wallpapers/rick-morty/1335145.jpg', alt: 'Rick and Morty Space Scene' },
  { src: '/wallpapers/rick-morty/1335147.jpg', alt: 'Rick and Morty Universe' },
  { src: '/wallpapers/rick-morty/1335148.jpg', alt: 'Rick and Morty Dimension' },
  { src: '/wallpapers/rick-morty/633294.png', alt: 'Rick and Morty Characters' },
]
</script>

<template>
  <backgrounds-wallpaper-background :images="images" overlay-class="bg-black/60" />
</template>
