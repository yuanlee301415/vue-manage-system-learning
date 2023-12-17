<template>
  <aside class="sidebar">
    <el-menu
      :default-active="currentRoute"
      :collapse="userSidebar.collapsed"
      class="sidebar-el-menu"
      text-color="#bfcbd9"
      background-color="#324157"
      router
    >
      <SideMenuBar :items="items" />
    </el-menu>
  </aside>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { MenuItem } from './typing'
import { basicRoutes } from '@/router/routes'
import SideMenuBar from './SideMenuBar.vue'
import { useSidebarState } from '@/store/modules/sidebar'

const route = useRoute()
const currentRoute = computed(() => route.path)
const items: MenuItem[] = genItems(basicRoutes)
const userSidebar = useSidebarState()

function genItems(routes: RouteRecordRaw[], items: MenuItem[] = [], index?: string): MenuItem[] {
  for (const route of routes) {
    const item: MenuItem = new MenuItem()
    if (route.meta) {
      item.index = [index, route.path].filter(Boolean).join('/')
      item.meta = route.meta
      item.children = route.children && genItems(route.children, [], item.index)
      items.push(item)
    } else {
      if (route.children) {
        genItems(route.children, items, route.path)
      }
    }
  }
  return items
}
</script>
