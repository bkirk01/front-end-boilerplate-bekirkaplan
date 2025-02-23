import type { IAppConfig, IAppConfigs } from '~/types/config.types'
import { useRoute } from 'vue-router'
import appConfigs from '~/config/appConfig'
import { IDefaultAppConfig } from '~/config/defaultConfig'
import { ERoutePaths } from '~/types/common'

export default function useAppStore(): {
  section: typeof section
  configuration: typeof configuration
} {
  const route = useRoute()

  // Initialize section with a valid route or default to POKEMON
  const foundedRoute: ERoutePaths | undefined = Object.values(ERoutePaths).find(
    path => route.path.includes(path),
  ) as ERoutePaths | undefined

  const section = ref<ERoutePaths>(foundedRoute || ERoutePaths.POKEMON)
  const configuration = reactive<IAppConfig>(IDefaultAppConfig)

  const getConfig = () => {
    const config = (appConfigs as IAppConfigs)[section.value]
    if (!config) {
      const defaultConfig = appConfigs[ERoutePaths.POKEMON]
      return defaultConfig
    }
    return config
  }

  watch(
    () => route.path,
    (newPath) => {
      const foundedRoute: ERoutePaths | undefined = Object.values(ERoutePaths).find(
        path => newPath.includes(path),
      ) as ERoutePaths | undefined
      section.value = foundedRoute || ERoutePaths.POKEMON
      Object.assign(configuration, getConfig())
    },
    { immediate: true },
  )

  return {
    configuration,
    section,
  }
}
