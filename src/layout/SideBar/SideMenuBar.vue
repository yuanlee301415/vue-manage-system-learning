<template>
  <template v-for="item of items" :key="item.index">
    <el-sub-menu v-if="item.children" :index="item.index">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <SideMenuBar :items="item.children" />
    </el-sub-menu>

    <el-menu-item v-else :index="item.index">
      <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>{{ item.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { MenuItem } from './typing'
import { toRef } from 'vue'

const props = defineProps<{
  items: MenuItem[]
}>()

const items = toRef(props, 'items')
</script>
