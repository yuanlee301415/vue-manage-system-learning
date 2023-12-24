<template>
  <el-card>
    <el-form>
      <el-form-item label="角色：">
        <el-select v-model="formData.role">
          <el-option
            v-for="[value, label] of RoleMap"
            :key="value"
            :value="value"
            :label="label"
          ></el-option>
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
import type {MenuTree} from "@/layout/SideBar/typing";

import { reactive, ref } from 'vue'
import { ElTree } from 'element-plus'
import { Role, RoleMap } from '@/enums/role'
import { basicRoutes } from '@/router/routes'
import { usePermissionState } from "@/store/modules/permission";
import generateMenuTree from "@/utils/generateMenuTree";


const treeProps = {
  label: 'title',
  children: 'children'
}
const treeRef = ref<InstanceType<typeof ElTree>>()
const permission = usePermissionState()
const formData = reactive({
  role: Role.ADMIN,
  treeData: reactive<MenuTree[]>(generateMenuTree([...basicRoutes, ...permission.addRoutes]))
})
const checkedKeys: string[] = []
console.log('treeData:', formData.treeData)

function handleSave() {
  console.log('save:', treeRef.value?.getCheckedKeys())
}

</script>

<style scoped></style>
