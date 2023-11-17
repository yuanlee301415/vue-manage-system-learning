import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import type { DefineComponent } from 'vue'

export type Component<T = any> =
  | DefineComponent
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

type _RouteMeta = Partial<{
  title: string
  hiddenMenu: boolean
  hiddenChildrenInMenu: boolean
}>

export type AppRouteMeta = RouteMeta & _RouteMeta

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: AppRouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

export type AppRouteModule = AppRouteRecordRaw

declare module 'vue-router' {
  interface RouteMeta extends _RouteMeta {}
}
