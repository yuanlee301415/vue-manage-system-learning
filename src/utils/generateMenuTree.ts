import type {RouteRecordRaw} from "vue-router";
import {MenuTree} from "@/layout/SideBar/typing";

export default function generateMenuTree(routes: RouteRecordRaw[], items: MenuTree[] = [], index?: string): MenuTree[] {
    for (const route of routes) {
        const item: MenuTree = new MenuTree()
        if (route.meta?.title) {
            item.index = [index, route.path].filter(Boolean).join('/')
            item.title = route.meta.title as string
            item.icon = route.meta.icon as string
            item.name = route.name as string
            item.children = route.children && generateMenuTree(route.children, [], item.index)
            items.push(item)
        } else {
            if (route.children) {
                generateMenuTree(route.children, items, route.path)
            }
        }
    }
    return items
}
