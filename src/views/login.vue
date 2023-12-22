<template>
  <div
    class="bg-[url('../assets/img/login-bg.jpg')] w-screen h-screen bg-cover flex items-center justify-center"
  >
    <el-card class="w-[350px] h-[280px] mt-[-100px] bg-[rgba(255,255,255,0.5)]">
      <template #header>
        <h2 class="text-white text-center">{{ title }}</h2>
      </template>
      <el-form ref="formRef" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="Lock" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
      <p class="leading-10 text-white">Tips : 用户名和密码随便填。</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type {LoginParams} from "#/index";

import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import { router } from '@/router'
import { useUserStoreWithOut } from "@/store/modules/user";
import { REDIRECT_ROUTE } from "@/router/routes/basic";

const title = import.meta.env.VITE_APP_TITLE
const loginForm = reactive<LoginParams>({
  username: 'admin',
  password: '123456'
})

const rules: FormRules<LoginParams> = {
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
}

const formRef = ref<FormInstance>()
const route = useRoute()
const userStore = useUserStoreWithOut()

function handleLogin() {
  formRef.value?.validate(async (isValid) => {
    if (!isValid) return
    try {
      await userStore.logIn(loginForm)
      await userStore.getAuthUser()
      await router.push({ path: REDIRECT_ROUTE.path, query: { path: route.query.redirect }})
      ElNotification.success('登录成功')
    } catch (e) {
      console.error('登录失败:')
      console.dir(e)
      ElNotification.error('登录失败，用户名或密码错误')
    }
  })
}
</script>

<style scoped></style>
