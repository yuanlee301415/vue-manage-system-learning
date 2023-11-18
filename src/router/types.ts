import type { RouteMeta, RouteRecordRaw } from 'vue-router'

type _RouteMeta = Partial<{
  title: string
  hiddenMenu: boolean
  hiddenChildrenInMenu: boolean
}>

export type AppRouteMeta = RouteMeta & _RouteMeta

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'|'children'> {
  name: string
  meta: AppRouteMeta
  children?: AppRouteRecordRaw[]
  fullPath?: string
}

declare module 'vue-router' {
  interface RouteMeta extends _RouteMeta {}
}
