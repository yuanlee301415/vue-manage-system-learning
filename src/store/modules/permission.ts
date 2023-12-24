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
            this.addRoutes = filterAsyncRoutes(roles, asyncRoutes)
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

function filterAsyncRoutes(roles: Role[], routes?: RouteRecordRaw[]): RouteRecordRaw[] {
    const ret = []
    if (!routes) return void 0 as unknown as RouteRecordRaw[];
    for (const route of routes) {
        const {children, ...temp} = { ...route }
        if (hasPermission(roles, temp)) {
            ret.push({
                ...temp,
                children: children && filterAsyncRoutes(roles, children)
            })
        }
    }
    return ret as RouteRecordRaw[]
}

export function usePermissionStateWithOut() {
    return usePermissionState(store)
}

function hasPermission(roles: Role[], route: Omit<RouteRecordRaw, 'children'>) {
    if (!route.meta?.roles) return true
    return (route.meta.roles as Role[]).some(_ => roles.includes(_))
}
