<template>
  <header class="header">
    <div
      class="float-left h-full px-[20px] flex justify-center items-center cursor-pointer text-[22px]"
      @click="sidebarStore.collapse()"
    >
      <el-icon>
        <Expand v-if="sidebarStore.collapsed" />
        <Fold v-else />
      </el-icon>
    </div>
    <h1 class="logo float-left">后台管理系统</h1>

    <div class="float-right pr-[50px]">
      <div class="head-user-con flex items-center">
        <div class="flex items-center cursor-pointer h-[30px]">
          <el-tooltip effect="dark" :content="authUser.unread ? `有${authUser.unread}条未读消息` : '消息中心'" placement="bottom">
            <el-badge is-dot @click="$router.push(TABS_ROUTE.path)">
              <el-icon :size="30">
                <Bell />
              </el-icon>
            </el-badge>
          </el-tooltip>
        </div>

        <el-avatar class="mx-3.5" :size="30" :src="authUser.avatar" />

        <el-dropdown trigger="click" @command="handleCommand">
          <span class="cursor-pointer text-white">
            {{ authUser.displayName }}
            <el-icon>
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">项目仓库</a>
              </el-dropdown-item>
              <el-dropdown-item :command="Command.User">个人中心</el-dropdown-item>
              <el-dropdown-item divided :command="Command.SignOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ArrowDown, Bell, Expand, Fold } from '@element-plus/icons-vue'

import { router } from '@/router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useSidebarState } from '@/store/modules/sidebar'
import TABS_ROUTE from '@/router/routes/modules/tabs'
import USER_ROUTE from '@/router/routes/modules/user'
import { LOGIN_ROUTE } from '@/router/routes/basic'

enum Command {
  User,
  SignOut
}

const userStore = useUserStoreWithOut()
const sidebarStore = useSidebarState()
const authUser = computed(() => userStore.authUser)

function handleCommand(command: Command) {
  switch (command) {
    case Command.User:
      router.push(USER_ROUTE.path)
      break
    case Command.SignOut:
      router.push(LOGIN_ROUTE.path)
      userStore.logOut()
      break
  }
}
</script>
