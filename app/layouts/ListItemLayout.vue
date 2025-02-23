<template>
  <div class="list-item-container">
    <div class="flex">
      <div class="image-container">
        <slot name="avatar" />
      </div>
      <div class="content flex-1 p-4">
        <slot name="content" />
      </div>
      <div
        class="button-container"
      >
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/css/layouts/list-item-layout.css';
</style>
