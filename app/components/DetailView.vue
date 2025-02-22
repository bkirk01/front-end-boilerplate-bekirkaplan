<script setup lang="ts">
import type { TCItemDetailType } from '~/types/common'
import { CardsCharacterDetail } from '#components'
import '~/assets/css/views/detail.css'

const props = defineProps<{
  itemDetailSpecifications: TCItemDetailType
  loadingRef: boolean
  onError: string | null
  errorMessage: string
}>()
</script>

<template>
  <div>
    <!-- Content -->
    <div class="detail-container">
      <CardsCharacterDetail
        :data="props.itemDetailSpecifications"
        :loading="loadingRef"
        :error="
          onError
            ? {
              title: 'Error',
              message: `${errorMessage} not found`,
            }
            : undefined
        "
        image-class="h-64"
      />
    </div>
  </div>
</template>
