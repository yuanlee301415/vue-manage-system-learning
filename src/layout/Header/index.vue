<template>
  <header>
    <div class="headerLeft">
      <h1>{{ title }}</h1>
    </div>

    <div class="headerRight">
      <span v-if="userInfo.userName">{{ userInfo.userName }}({{ userInfo.realName }})</span>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user'

const title = import.meta.env.VITE_APP_TITLE
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUserInfo)
</script>

<style scoped lang="less">
header {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}
</style>
