<template>
  <div>
    <el-row :gutter="20">
      <!--user-->
      <el-col :span="8">
        <el-card shadow="hover" class="mb-[20px] h-[252px]">
          <div class="user-info flex items-center pb-[20px] mb-[20px]" style="border-bottom: 2px solid #ccc">
            <el-avatar :src="avatarUrl" :size="120"/>
            <div class="user-info-content pl-[50px] flex-1 text-[14px] text-gray-400">
              <h6 class="text-[30px] text-slate-700">Admin</h6>
              <p>超级管理员</p>
            </div>
          </div>

          <div class="text-gray-400">
            <el-row>
              <el-col :span="12">上次登录时间：</el-col>
              <el-col :span="12">2023-10-24</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">上次登录地点：</el-col>
              <el-col :span="12">上海</el-col>
            </el-row>
          </div>
        </el-card>

        <!--语言详情-->
        <el-card header="语言详情" shadow="hover" class="h-[252px]">
          <b>Vue</b>
          <el-progress :percentage="79.4" color="#42b983" />
          <b>Typescript</b>
          <el-progress :percentage="14" color="#f1e05a"/>
          <b>CSS</b>
          <el-progress :percentage="5.6"/>
          <b>HTML</b>
          <el-progress :percentage="1" color="#f56c6c"/>
        </el-card>
        <!--语言详情 End-->

      </el-col>
      <!--user End-->

      <el-col :span="16">

        <!--统计-->
        <div class="count mb-[20px]">
          <el-row :gutter="20" >
            <el-col :span="8">
              <el-card class="h-[100px]" body-style="padding:0;">
                <div class="flex items-center">
                  <el-icon size="50" class="bg-blue-500 w-[100px] h-[100px] text-white">
                    <User/>
                  </el-icon>
                  <dl class="flex-1 text-center">
                    <dd class="text-blue-500 text-3xl font-medium">1234</dd>
                    <dt class="text-sm">用户访问量</dt>
                  </dl>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="h-[100px]" body-style="padding:0">
                <div class="flex items-center">
                  <el-icon size="50" class="bg-green-500 w-[100px] h-[100px] text-white"><ChatDotRound/></el-icon>
                  <dl class="flex-1 text-center">
                    <dd class="text-green-500 text-3xl font-medium">321</dd>
                    <dt class="text-sm">系统消息</dt>
                  </dl>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="h-[100px]" body-style="padding:0">
                <div class="flex items-center">
                  <el-icon size="50" class="bg-red-500 w-[100px] h-[100px] text-white"><Goods/></el-icon>
                  <dl class="flex-1 text-center">
                    <dd class="text-red-500 text-3xl font-medium">5000</dd>
                    <dt class="text-sm">商品数量</dt>
                  </dl>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <!--统计 End-->

        <!--待办-->
        <el-card class="h-[403px]">
          <template #header>
            <span class="text-base">待办事项</span>
            <el-button text size="small" class="float-right">添加</el-button>
          </template>
          <el-table :show-header="false" :data="todos">
            <el-table-column width="40">
              <template #default="scope">
                <el-checkbox v-model="scope.row.done"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="todo">
              <template #default="scope">
                <span :class="scope.row.done ? ['line-through', 'text-gray-400'] : null">{{scope.row.todo}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <!--待办 End-->
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import {ChatDotRound, Goods, User} from "@element-plus/icons-vue";
import {reactive} from "vue";

import avatarUrl from '@/assets/img/avatar.jpg'

const todos = reactive(Array.from({ length: 6 }, (_, idx) => ({
      id: idx,
      todo: `今天要修复${(idx + 1) * 10 }个Bug`,
      done: idx > 3
    }))
)

</script>

<style scoped>

</style>
