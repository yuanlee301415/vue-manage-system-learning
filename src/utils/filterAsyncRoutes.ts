import type { RouteRecordRaw } from 'vue-router'
import { Role } from '@/enums/role'

export default function filterAsyncRoutes(
  roles: Role[],
  routes: RouteRecordRaw[]
): RouteRecordRaw[] {
  function _(routes?: RouteRecordRaw[]) {
    const ret = []
    if (!routes) return
    for (const route of routes) {
      const temp = { ...route }
      if (hasPermission(roles, temp)) {
        temp.children = _(temp.children)
        ret.push(temp)
      }
    }
    return ret
  }
  return _(routes) as RouteRecordRaw[]
}

function hasPermission(roles: Role[], route: RouteRecordRaw) {
  if (!route.meta?.roles) return true
  return (route.meta.roles as Role[]).some((_) => roles.includes(_))
}
