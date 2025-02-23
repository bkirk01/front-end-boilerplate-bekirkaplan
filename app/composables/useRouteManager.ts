// src/composables/useRouteManager.ts

import type { TParams, TypeRouteManager } from '~/types/route.types'
import { useRoute, useRouter } from 'nuxt/app'
import { ref, watch } from 'vue'

/**
 * RouteManager provides an abstraction layer for managing routing logic in Nuxt 3.
 * It handles navigation, dynamic parameters, query updates, and guards using Nuxt's useRouter and useRoute.
 */
export function useRouteManager<T extends TParams = Record<string, any>>(): TypeRouteManager<T> {
  const router = useRouter()
  const route = useRoute()

  const currentPath = ref(route.path)
  const currentParams = ref<T>(route.params as T)
  const currentQuery = ref(route.query)
  const isRouteChanging = ref(false)

  /**
   * Navigate to a specific path.
   * @param path - Route path to navigate to.
   * @param replace - If true, replaces the current entry in the history stack.
   */
  const navigateTo = async (path: string, replace = false) => {
    try {
      if (replace) {
        await router.replace(path)
      }
      else {
        await router.push(path)
      }
    }
    catch (error) {
      console.error(`Navigation error to ${path}:`, error)
    }
  }

  /**
   * Go back to the previous route.
   */
  const goBack = () => {
    router.back()
  }

  /**
   * Update query parameters without reloading the page.
   * @param query - New query parameters.
   */
  const updateQuery = async (query: Record<string, any>) => {
    try {
      await router.replace({ query: { ...route.query, ...query } })
    }
    catch (error) {
      console.error('Query update error:', error)
    }
  }

  /**
   * Watch route changes for dynamic behavior.
   */
  watch(
    () => route.fullPath,
    (newPath) => {
      currentPath.value = newPath
      currentParams.value = route.params as T
      currentQuery.value = route.query
    },
  )

  router.beforeEach(() => {
    isRouteChanging.value = true
  })

  router.afterEach(() => {
    isRouteChanging.value = false
  })

  return {
    isRouteChanging: isRouteChanging.value,
    currentPath: currentPath.value,
    currentParams: currentParams.value,
    currentQuery: currentQuery.value,
    navigateTo,
    goBack,
    updateQuery,
  }
}
