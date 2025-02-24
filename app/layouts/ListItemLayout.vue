<template>
  <div class="list-item-container">
    <slot name="listItemContainer">
      <div class="flex-container">
        <div class="image-container">
          <slot name="avatar" />
        </div>
        <div class="content flex-1 p-4">
          <slot name="content" />
        </div>
        <div
          class="button-container"
        >
          <slot name="button" />
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped>
@import '../assets/css/layouts/list-item-layout.css';
</style>
