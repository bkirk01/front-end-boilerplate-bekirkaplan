import { onMounted, watch, type Ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

export function useClientSideHandlers(
  page: Ref<number>,
  isAnimating: Ref<boolean>,
  refresh: () => void
) {
  if (import.meta.client) {
    const debouncedFetch = useDebounceFn(() => refresh(), 300);

    onMounted(() => {
      watchEffect(() => debouncedFetch());
      watch(page, () => {
        if (!isAnimating.value) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    });
  }
}
