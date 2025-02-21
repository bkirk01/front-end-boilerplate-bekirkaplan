// src/composables/useRouteManager.ts

import { useRouter, useRoute } from "nuxt/app";
import { ref, watch } from "vue";

/**
 * RouteManager provides an abstraction layer for managing routing logic in Nuxt 3.
 * It handles navigation, dynamic parameters, query updates, and guards using Nuxt's useRouter and useRoute.
 */
export function useRouteManager() {
  const router = useRouter();
  const route = useRoute();
  const currentPath = ref(route.path);
  const currentParams = ref(route.params);
  const currentQuery = ref(route.query);

  /**
   * Navigate to a specific path.
   * @param path - Route path to navigate to.
   * @param replace - If true, replaces the current entry in the history stack.
   */
  const navigateTo = async (path: string, replace = false) => {
    try {
      if (replace) {
        await router.replace(path);
      } else {
        await router.push(path);
      }
    } catch (error) {
      console.error(`Navigation error to ${path}:`, error);
    }
  };

  /**
   * Navigate with dynamic params.
   * @param name - Named route.
   * @param params - Dynamic params to pass.
   * @param query - Optional query parameters.
   */
  const navigateWithParams = async (
    name: string,
    params: Record<string, any>,
    query: Record<string, any> = {}
  ) => {
    try {
      await router.push({ name, params, query });
    } catch (error) {
      console.error(`Navigation error for ${name}:`, error);
    }
  };

  /**
   * Go back to the previous route.
   */
  const goBack = () => {
    router.back();
  };

  /**
   * Update query parameters without reloading the page.
   * @param query - New query parameters.
   */
  const updateQuery = async (query: Record<string, any>) => {
    try {
      await router.replace({ query: { ...route.query, ...query } });
    } catch (error) {
      console.error("Query update error:", error);
    }
  };

  /**
   * Watch route changes for dynamic behavior.
   */
  watch(
    () => route.fullPath,
    (newPath) => {
      currentPath.value = newPath;
      currentParams.value = route.params;
      currentQuery.value = route.query;
    }
  );

  return {
    currentPath,
    currentParams,
    currentQuery,
    navigateTo,
    navigateWithParams,
    goBack,
    updateQuery,
  };
}
