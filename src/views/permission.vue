<template>
  <el-card>
    <el-form>
      <el-form-item label="角色：">
        <el-select v-model="formData.role" @change="roleChange">
          <el-option
            v-for="[value, label] of RoleMap"
            :key="value"
            :value="value"
            :label="label"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜单：">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          class="basis-full"
          @change="handleCheckAllChange"
          >Check all</el-checkbox
        >
        <el-tree
          ref="treeRef"
          :data="treeData"
          :props="treeProps"
          :default-checked-keys="checkedKeys"
          node-key="name"
          default-expand-all
          show-checkbox
          @check-change="handleCheckChange"
        />
      </el-form-item>
      <el-button type="primary" @click="roleChange">重置</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import type { MenuTree } from '@/layout/SideBar/typing'

import { reactive, ref } from 'vue'
import { ElTree } from 'element-plus'
import { Role, RoleMap } from '@/enums/role'
import { asyncRoutes, basicRoutes } from '@/router/routes'
import filterAsyncRoutes from '@/utils/filterAsyncRoutes'
import generateMenuTree from '@/utils/generateMenuTree'

defineOptions({
  name: 'Permission'
})

const treeProps = {
  label: 'title',
  children: 'children'
}
const treeRef = ref<InstanceType<typeof ElTree>>()
const formData = reactive({
  role: Role.ADMIN
})
const treeData = reactive<MenuTree[]>(generateMenuTree([...basicRoutes, ...asyncRoutes]))
const checkedKeys = ref<string[]>(_getPermissionKeys([formData.role]))
const checkAll = ref(false)
const allKeys = _getAllKeys(treeData)
const isIndeterminate = ref(false)

roleChange()

function roleChange() {
  setCheckedKeys(_getPermissionKeys([formData.role]))
}

function setCheckedKeys(keys: string[]) {
  treeRef.value?.setCheckedKeys(keys)
  isIndeterminate.value = !!(keys.length && keys.length !== allKeys.length)
}

function handleCheckAllChange(checked: boolean) {
  setCheckedKeys(checked ? allKeys : [])
}

function handleCheckChange() {
  const checkedKeys = treeRef.value?.getCheckedKeys()
  isIndeterminate.value = !!(checkedKeys?.length && checkedKeys?.length !== allKeys.length)
  checkAll.value = checkedKeys?.length === allKeys.length
}

function handleSave() {
  console.log('save:', treeRef.value?.getCheckedKeys())
}

function _getAllKeys(treeData: MenuTree[]) {
  const keys: string[] = []
  for (const item of treeData) {
    keys.push(item.name)
    if (item.children) {
      keys.push(..._getAllKeys(item.children))
    }
  }
  return keys
}

function _getPermissionKeys(roles: Role[]) {
  const keys: string[] = []
  const routes: RouteRecordRaw[] = filterAsyncRoutes(roles, [...basicRoutes, ...asyncRoutes])
  function _(routes: RouteRecordRaw[]) {
    for (const route of routes) {
      if (route.children) {
        _(route.children)
      } else if (route.name) {
        keys.push(route.name as string)
      }
    }
    return keys
  }
  return _(routes)
}
</script>

<style scoped></style>
