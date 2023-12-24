import type {RouteRecordRaw} from "vue-router";
import {Role} from "@/enums/role";

export default function filterAsyncRoutes(roles: Role[], routes?: RouteRecordRaw[]): RouteRecordRaw[] {
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

function hasPermission(roles: Role[], route: Omit<RouteRecordRaw, 'children'>) {
    if (!route.meta?.roles) return true
    return (route.meta.roles as Role[]).some(_ => roles.includes(_))
}
