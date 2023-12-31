<template>
  <div class="w-full h-full text-center flex flex-col justify-center items-center bg-gray-300">
    <h2 class="text-[250px] leading-none text-red-600">
      <span>4</span>
      <span class="text-green-600">0</span>
      <span>4</span>
    </h2>
    <h3 class="text-3xl leading-[4] text-gray-600">啊哦~页面走丢了。。。</h3>
    <div class="space-x-24">
      <router-link to="/">
        <el-button type="primary">返回首页</el-button>
      </router-link>
      <el-button type="primary" @click="$router.go(-1)">返回一上面</el-button>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
