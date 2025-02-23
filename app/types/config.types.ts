// Define types for the configuration structure
export interface IMainNavigationConfig {
  pageTitle: string
  bgColor: string
}

export interface ISubNavigationConfig {
  pageTitle: string
  pageTitleIcon: string
  bgColor: string
}

export interface IContentContainerConfig {
  bgColor: string
  showWallPaper?: boolean
}

export interface IContainerConfig {
  bgColor: string
}

export interface IGridPageConfig {
  bgColor: string
}

export interface IListPageConfig {
  bgColor: string
}

export interface IWallpaperConfig {
  src: string
  alt: string
}

export interface IAppConfig {
  wallpapers?: IWallpaperConfig[]
  containerConfig?: IContainerConfig
  contentContainerConfig?: IContentContainerConfig
  mainNavigationProps?: IMainNavigationConfig
  subNavigationProps?: ISubNavigationConfig
  gridPageConfig?: IGridPageConfig
  listPageConfig?: IListPageConfig
  mainLoadAnimationImage?: string | undefined
}

export interface IAppConfigs {
  [key: string]: IAppConfig
}
