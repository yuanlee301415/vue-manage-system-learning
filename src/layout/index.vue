<template>
  <LayoutHeader />

  <LayoutSideBar />

  <div :class="{ collapsed: sidebarStore.collapsed }" class="content-box">

    <LayoutTags />

    <div class="content">
      <RouterView v-slot="{ Component, route }">
        <transition name="fade-slide" mode="out-in">
          <keep-alive :include="tags.names">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </RouterView>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useSidebarState } from '@/store/modules/sidebar'
import { useTagsState } from "@/store/modules/tags";
import LayoutHeader from './Header/index.vue'
import LayoutSideBar from './SideBar/index.vue'
import LayoutTags from './Tags/index.vue'

const sidebarStore = useSidebarState()
const tags = useTagsState();

</script>
