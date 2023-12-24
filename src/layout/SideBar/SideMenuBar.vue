<template>
  <template v-for="item of items" :key="item.index">
    <el-sub-menu v-if="item.children" :index="item.index">
      <template #title>
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
      <SideMenuBar :items="item.children" />
    </el-sub-menu>

    <el-menu-item v-else :index="item.index">
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <template #title>{{ item.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { MenuTree } from './typing'
import { toRef } from 'vue'

const props = defineProps<{
  items: MenuTree[]
}>()

const items = toRef(props, 'items')
</script>
