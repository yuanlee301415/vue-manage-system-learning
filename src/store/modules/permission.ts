import type { RouteRecordRaw } from "vue-router";
import type {Role} from "@/enums/role";

import { defineStore } from "pinia";
import { router } from "@/router";
import { asyncRoutes } from "@/router/routes";
import { store } from "@/store";

type PermissionState = {
    addRoutes: RouteRecordRaw[]
    removeRouteFns: Function[]
}

export const usePermissionState = defineStore({
    id: 'permission',
    state: (): PermissionState => ({
        addRoutes: [],
        removeRouteFns: []
    }),
    actions: {
        generateRoutes(roles: Role[]) {
            this.addRoutes = filterAsyncRoutes(asyncRoutes, roles)
            for (const route of this.addRoutes) {
                this.removeRouteFns.push(router.addRoute(route))
            }
        },

        resetRoutes() {
            while (this.removeRouteFns.length) {
                this.removeRouteFns.pop()?.()
            }
        }
    }
})

function filterAsyncRoutes(routes: RouteRecordRaw[], roles: Role[]) {
    const ret = []
    for (const route of routes) {
        const temp = { ...route }
        if (hasPermission(temp, roles)) {
            if (temp.children) {
                temp.children = filterAsyncRoutes(temp.children, roles)
            }
            ret.push(temp)
        }
    }
    return ret
}

export function usePermissionStateWithOut() {
    return usePermissionState(store)
}

function hasPermission(route: RouteRecordRaw, roles: Role[]) {
    if (!route.meta?.roles) return true
    return (route.meta.roles as Role[]).some(_ => roles.includes(_))
}
