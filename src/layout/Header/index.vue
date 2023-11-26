<template>
  <header class="header">
    <div
      class="float-left h-full px-[20px] flex justify-center items-center cursor-pointer text-[22px]"
      @click="sidebarStore.collapse()"
    >
      <el-icon>
        <Expand/>
      </el-icon>
    </div>
    <h1 class="logo float-left">{{ title }}</h1>

    <div class="float-right pr-[50px]">
      <div class="head-user-con flex items-center">
        <div class="flex items-center cursor-pointer h-[30px]">
          <el-tooltip effect="dark" content="消息中心" placement="bottom">
            <el-badge is-dot>
              <el-icon :size="30">
                <bell />
              </el-icon>
            </el-badge>
          </el-tooltip>
        </div>

        <el-avatar class="mx-3.5" :size="30" :src="avatarUrl" />

        <el-dropdown trigger="click" @command="handleCommand">
          <span class="cursor-pointer text-white">
            {{ userInfo.name }}
            <el-icon>
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">项目仓库</a>
              </el-dropdown-item>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useSidebarState } from '@/store/modules/sidebar'
import {ArrowDown, Bell, Expand} from '@element-plus/icons-vue'
import avatarUrl from '@/assets/img/avatar.jpg'

const title = import.meta.env.VITE_APP_TITLE
const userStore = useUserStoreWithOut()
const sidebarStore = useSidebarState()
const userInfo = computed(() => userStore.getUserInfo)

function handleCommand(command: string) {
  console.log('handleCommand>command:', command)
}
</script>
