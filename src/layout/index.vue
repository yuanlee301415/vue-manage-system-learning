<template>
  <LayoutHeader />

  <LayoutSideBar />

  <div :class="{ collapsed: sidebarStore.collapsed }" class="container">
    <LayoutBreadcrumbs />
    <div class="content">
      <RouterView v-slot="{ Component, route }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSidebarState } from '@/store/modules/sidebar'

import LayoutHeader from './Header/index.vue'
import LayoutSideBar from './SideBar/index.vue'
import LayoutBreadcrumbs from './Breadcrumbs/index.vue'

const sidebarStore = useSidebarState()
</script>
