<template>
  <div class="card-layout-container">
    <div class="card-header">
      <slot name="header" />
    </div>
    <div class="card-avatar">
      <slot name="avatar" />
    </div>
    <div class="card-body">
      <slot name="content" />
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
@import '../assets/css/layouts/card-layout.css';
</style>
