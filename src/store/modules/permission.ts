import type { RouteRecordRaw } from "vue-router";
import type {Role} from "@/enums/role";

import { defineStore } from "pinia";
import { router } from "@/router";
import { asyncRoutes } from "@/router/routes";
import { store } from "@/store";
import filterAsyncRoutes from "@/utils/filterAsyncRoutes";

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

export function usePermissionStateWithOut() {
    return usePermissionState(store)
}
