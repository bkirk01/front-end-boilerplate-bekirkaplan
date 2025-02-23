export interface TParams extends Record<string, any> {}

export interface RoutePokemonRouteParams {
  id: string
}

export interface TypeRouteManager<T extends TParams = Record<string, any>> {
  currentPath: string
  currentParams: T
  currentQuery: Record<string, any>
  isRouteChanging: boolean
  navigateTo: (path: string, replace?: boolean) => Promise<void>
  goBack: () => void
  updateQuery: (query: Record<string, any>) => Promise<void>
}
