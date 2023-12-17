<template>
  <div class="bg-[url('../assets/img/login-bg.jpg')] w-screen h-screen bg-cover flex items-center justify-center">
    <el-card class="w-[350px] h-[280px] mt-[-100px] bg-[rgba(255,255,255,0.5)]">
      <template #header>
        <h2 class="text-white text-center">后台管理系统</h2>
      </template>
      <el-form ref="formRef" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="User"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="Lock"/>
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
import type {FormInstance, FormRules} from "element-plus";

import {reactive, ref} from "vue";
import {ElNotification} from "element-plus";

import { router } from "@/router";

type LoginForm = {
  username: string
  password: string
}

const loginForm = reactive<LoginForm>({
  username: 'admin',
  password: '123'
})

const rules: FormRules<LoginForm> = {
  username: [{required: true, trigger: 'blur', message: '请输入用户名'}],
  password: [{required: true, trigger: 'blur', message: '请输入密码'}],
}

const formRef = ref<FormInstance>()

function handleLogin() {
  formRef.value?.validate(isValid => {
    if (!isValid) return
    ElNotification.success('登录成功')
    router.push('/')
  })
}

</script>

<style scoped>

</style>
