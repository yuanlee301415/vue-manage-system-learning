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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { basicRoutes } from '@/router/routes'
import { usePermissionState } from '@/store/modules/permission'
import SideMenuBar from './SideMenuBar.vue'
import { useSidebarState } from '@/store/modules/sidebar'
import generateMenuTree from '@/utils/generateMenuTree'

const route = useRoute()
const permission = usePermissionState()
const currentRoute = computed(() => route.path)
const items = generateMenuTree([...basicRoutes, ...permission.addRoutes])
const userSidebar = useSidebarState()
// console.log('Sidebar>items:', items)
</script>
