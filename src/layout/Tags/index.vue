<template>
  <div class="tags">
    <el-scrollbar>
      <div class="warp">
        <div v-for="tag of tags.list" :key="tag.name" :class="{active: $route.path === tag.path}" class="tag">
          <router-link :to="tag.path">{{ tag.title }}</router-link>
          <i v-show="tags.names.length>1" @click="handleClose(tag)">&times;</i>
        </div>
      </div>
    </el-scrollbar>

    <el-dropdown size="small" class="absolute right-[10px] top-[2px]" @command="handleCommand">
      <el-button type="primary">标签选项</el-button>
      <template #dropdown>
        <el-dropdown-item :command="Command.Other">关闭其它</el-dropdown-item>
        <el-dropdown-item :command="Command.All">关闭所有</el-dropdown-item>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import type {RouteLocationNormalized} from 'vue-router'
import type {TagItem} from "@/store/modules/tags";

import {
  useRoute,
  useRouter,
} from "vue-router";
import {useTagsState} from "@/store/modules/tags";

enum Command {
  Other,
  All
}

const tags = useTagsState()
const router = useRouter()
const route = useRoute()

/**
 * 初始加载或刷新应用后，添加当前页面到标签列表中
 */
setTag(route)

router.beforeResolve(to => {
  setTag(to)
})

function setTag(route: RouteLocationNormalized) {
  tags.addTag({
    name: route.name as string,
    title: route.meta.title as string,
    path: route.fullPath
  })
}

function handleClose(tag: TagItem) {
  const curr = tags.closeTag(tag)
  router.push({ path: curr?.path ?? '' })
}

function handleCommand(command: Command) {
  switch (command) {
    case Command.Other:
      tags.closeOther(route.name as string)
      break
    case Command.All:
      tags.closeAll()
      router.push('/')
      break
  }
}

</script>

<style scoped>

</style>
