import { useDebounceFn } from '@vueuse/core'
import { onMounted, type Ref, watch } from 'vue'

export function useClientSideHandlers(
  page: Ref<number>,
  isAnimating: Ref<boolean>,
  refresh: () => Promise<void>, // Support async refresh
) {
  if (import.meta.client) {
    const debouncedFetch = useDebounceFn(async () => await refresh(), 300)

    onMounted(() => {
      watch(page, async () => {
        await debouncedFetch()
        if (!isAnimating.value) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, { immediate: true }) // Initial fetch on mount
    })
  }
}
