<template>
  <div>
    <el-card>
      <el-form inline>
        <el-form-item>
          <el-input v-model="params.username" placeholder="用户名" clearable class="w-[200px]"/>
        </el-form-item>

        <el-form-item>
          <el-select v-model="params.province" placeholder="地址" clearable class="w-[200px]">
            <el-option v-for="_ of province" :key="_" :label="_" :value="_"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="params.state" placeholder="状态" clearable class="w-[200px]">
            <el-option v-for="[value, label] of StateMap" :key="value" :label="label" :value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" border stripe show-overflow-tooltip>
        <el-table-column prop="username" label="用户名" width="150" fixed/>
        <el-table-column prop="displayName" label="显示名称" width="150" fixed/>
        <el-table-column prop="amount" label="帐户余额" width="100">
          <template #default="{row: {amount}}">{{strMoney(amount)}}</template>
        </el-table-column>
        <el-table-column prop="avatar" label="头像" width="70" align="center">
          <template #default="scope">
            <el-image
                :src="scope.row.avatar"
                :alt="scope.row.name"
                :preview-src-list="[scope.row.avatar]"
                hide-on-click-modal
                preview-teleported
                style="width: 40px;height: 40px;"
            />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" width="200"/>
        <el-table-column prop="signature" label="简介"/>
        <el-table-column prop="state" label="状态" width="80" align="center">
          <template #default="{row: {state}}">
            <el-tag :type="state === State.SUCCESS ? 'success' : 'danger'">{{ stateStr(state) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="注册时间" width="160" align="center">
          <template #default="{row: {date}}">
            {{ dateStr(date) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{row}">
            <el-button-group>
              <el-button text size="small" type="primary" :icon="Edit" @click="handleEdit(row)">编辑</el-button>
              <el-popconfirm title="确定删除？" @confirm="handleDelete(row)">
                <template #reference>
                  <el-button text size="small" type="danger" :icon="Delete">删除</el-button>
                </template>
              </el-popconfirm>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-4">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="pageTotal"
            layout="total, sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <el-dialog v-model="visible" :title="formAction + '用户'" :close-on-click-modal="false">
      <UserForm
          v-if="visible"
          ref="userFormRef"
          :user="userFormData!"
          :action="formAction"
          :province="province"
          @submit="onUserFormSubmit"
      />
      <template #footer>
        <el-button type="primary" :loading="ing" @click="handleSubmit">确定</el-button>
        <el-button @click="visible=false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { UserParams} from "#/index";
import {computed, reactive, ref} from "vue";
import {Delete, Edit, Plus, Search} from "@element-plus/icons-vue";
import dayjs from "dayjs";
import {ElNotification} from "element-plus";

import User from "@/models/User";
import {createUserApi, getUsersApi, updateUserApi, deleteUserApi} from "@/api/user";
import { getProvinceApi } from "@/api/code";
import UserForm from "./components/UserForm.vue";
import {FormAction} from '@/enums/formAction'
import {State, StateMap} from "@/enums/state";
import {stateFilter} from "@/filters";

const province = ref<string[]>([])

const params = reactive<UserParams>({
  username: '',
  province: '',
  state: void 0
})

const currentPage = ref(1)
const pageSize = ref(20)
const tableData = ref<User[]>()
const pageTotal = ref(0)
const stateStr = computed(() => (state: State) => stateFilter(state))
const dateStr = computed(() => (date: number) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'))
const strMoney = computed(() => (amount: number) => '￥' + amount)
const visible = ref(false)
const userFormData = ref<User>()
const userFormRef = ref()
const ing = ref(false)
const formAction = ref<FormAction>(FormAction.ADD)

getData()
getProvince()

function getData() {
  getUsersApi({
    ...params,
    page: currentPage.value,
    size: pageSize.value
  }).then(res => {
    console.log(res)
    tableData.value = res.data
    pageTotal.value = res.total!
  })
}

function getProvince() {
  getProvinceApi().then(res => {
    province.value = res.data
  })
}

function handleSearch() {
  currentPage.value = 1
  getData()
}

function handleCurrentChange(val: number) {
  currentPage.value = val
  getData()
}

function handleSizeChange(val: number) {
  pageSize.value = val
  getData()
}

function handleAdd() {
  formAction.value = FormAction.ADD
  userFormData.value = new User()
  visible.value = true
}

function handleEdit(user: User) {
  formAction.value = FormAction.EDIT
  userFormData.value = user
  visible.value = true
}

function handleDelete(user: User) {
  deleteUserApi(user.id!).then(res => {
    if (res.code !== 0) return
    getData()
    ElNotification.success({
      message: `【成功】删除用户成功.`,
      showClose: false
    })
  })
}

function handleSubmit() {
  userFormRef.value!.validate()
}

function onUserFormSubmit(data: User) {
  console.log('onUserFormSubmit>data:', data)
  console.log('onUserFormSubmit>action:', formAction.value)
  const {id, username, displayName, mobile, email, province, city,
    street, gender, avatar, signature, amount, state} = data
  const cb = (action: FormAction) => {
    getData()
    ing.value = false
    visible.value = false
    ElNotification.success({
      message: `【成功】${action}用户成功.`,
      showClose: false
    })
  }

  ing.value = true
  switch (formAction.value) {
    case FormAction.ADD:
      createUserApi({
        username, displayName, email, mobile, province, city,
        street, gender, avatar, signature }).then(res => {
        if (res.code !== 0) return
        cb(formAction.value)
      })
      break;

    case FormAction.EDIT:
      updateUserApi(id!, {
        username, displayName, email, mobile, province, city,
        street, gender, avatar, signature, amount, state
      }).then(res => {
        if (res.code !== 0) return
        cb(formAction.value)
      })
      break
  }
}

</script>
