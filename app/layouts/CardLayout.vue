<template>
  <div class="rounded-lg shadow-lg overflow-hidden backdrop-blur-sm transition-transform duration-300 hover:scale-105">
    <div class="card-header">
      <slot name="header" />
    </div>
    <div class="card-body relative -mt-16 flex justify-center">
      <slot name="avatar" />
    </div>
    <div class="px-4 py-4 flex flex-col items-center">
      <slot name="content" />
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.rounded-lg {
  border-radius: 1rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>
