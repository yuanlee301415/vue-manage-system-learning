<template>
  <el-card>
    <el-form>
      <el-form-item label="角色：">
        <el-select v-model="formData.role">
          <el-option v-for="[value, label] of RoleMap" :key="value" :value="value" :label="label"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜单：">
        <el-tree
            ref="treeRef"
            :data="formData.treeData"
            :props="treeProps"
            :default-checked-keys="checkedKeys"
            node-key="name"
            show-checkbox
        />
      </el-form-item>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import type {RouteRecordRaw} from "vue-router";

import {reactive, ref} from "vue";
import { ElTree } from "element-plus";
import {Role, RoleMap} from "@/enums/role";
import { basicRoutes } from '@/router/routes'

type Tree = {
  name: string | Symbol
  title: string
  children?: Tree[]
}

const treeProps = {
  label: 'title',
  children: 'children'
}
const treeRef = ref<InstanceType<typeof ElTree>>()
const formData = reactive({
  role: Role.ADMIN,
  treeData: reactive<Tree[]>(genTreeData(basicRoutes))
})
const checkedKeys: string[] = []

function handleSave() {
  console.log('save:', treeRef.value?.getCheckedKeys())
}

function genTreeData(routes: RouteRecordRaw[]): Tree[] {
  function _(routes: RouteRecordRaw[], items: Tree[] = []): Tree[] {
    for (const route of routes) {
      if (route.meta) {
        const parent: Tree = {
          name: route.name!,
          title: route.meta.title as unknown as string,
        }
        parent.children = route.children && _(route.children)
        items.push(parent)
      } else if (route.children) {
        _(route.children, items)
      }
    }
    return items
  }
  return _(routes)
}

</script>

<style scoped>

</style>
