<template>
  <div class="list-card transform transition-transform duration-300 hover:scale-105">
    <div class="flex">
      <div class="image-container">
        <slot name="avatar" />
      </div>
      <div class="content flex-1 p-4">
        <slot name="content" />
      </div>
      <div
        class="button-container hidden md:flex items-center justify-center border-l border-white/30 backdrop-blur-sm"
      >
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-card {
  @apply rounded-xl overflow-hidden backdrop-blur-md
  shadow-sm hover:shadow-lg transform hover:scale-[1.02]
  transition-all duration-300 rounded-full;
}

.image-container {
  @apply flex items-center justify-center p-4 backdrop-blur-sm;
}

.content {
  @apply flex-1 p-4;
}

.button-container {
  @apply hidden md:flex items-center justify-center border-l border-white/30 backdrop-blur-sm;
}
</style>
