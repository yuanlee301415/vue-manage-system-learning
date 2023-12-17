<template>
  <el-card>
    <el-tabs v-model="tabName">
      <el-tab-pane
        :label="`未读(${letter[LetterStatus.UNREAD].total ?? 0})`"
        :name="LetterStatus.UNREAD"
      >
        <el-table :data="letter[LetterStatus.UNREAD].data" :show-header="false">
          <el-table-column prop="title" />
          <el-table-column width="160">
            <template #default="{ row: { createdAt } }">{{ formatDate(createdAt) }}</template>
          </el-table-column>
          <el-table-column width="100">
            <template #default="{ row: { _id } }">
              <el-button size="small" @click="handleRead(_id)">标为已读</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          :disabled="!letter[LetterStatus.UNREAD]?.total"
          type="primary"
          class="mt-3"
          @click="handleReadAll"
          >全部标记为已读</el-button
        >
        <el-pagination
          v-model:current-page="letter[LetterStatus.UNREAD].page"
          v-model:page-size="letter[LetterStatus.UNREAD].size"
          :total="letter[LetterStatus.UNREAD].total"
          layout="total, sizes, prev, pager, next"
          class="mt-3"
          @size-change="getLetters(LetterStatus.UNREAD)"
          @current-change="getLetters(LetterStatus.UNREAD)"
        />
      </el-tab-pane>

      <el-tab-pane
        :label="`已读(${letter[LetterStatus.READ].total ?? 0})`"
        :name="LetterStatus.READ"
      >
        <el-table :data="letter[LetterStatus.READ].data" :show-header="false">
          <el-table-column prop="title" />
          <el-table-column width="160">
            <template #default="{ row: { createdAt } }">{{ formatDate(createdAt) }}</template>
          </el-table-column>
          <el-table-column width="100">
            <template #default="{ row: { _id } }">
              <el-button size="small" type="danger" @click="handleRemove(_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          :disabled="!letter[LetterStatus.READ]?.total"
          type="danger"
          class="mt-3"
          @click="handleRemoveAll"
          >删除全部</el-button
        >
        <el-pagination
          v-model:current-page="letter[LetterStatus.READ].page"
          v-model:page-size="letter[LetterStatus.READ].size"
          :total="letter[LetterStatus.READ].total"
          layout="total, sizes, prev, pager, next"
          class="mt-3"
          @size-change="getLetters(LetterStatus.READ)"
          @current-change="getLetters(LetterStatus.READ)"
        />
      </el-tab-pane>

      <el-tab-pane
        :label="`回收站(${letter[LetterStatus.DELETED].total ?? 0})`"
        :name="LetterStatus.DELETED"
      >
        <el-table :data="letter[LetterStatus.DELETED].data" :show-header="false">
          <el-table-column prop="title" />
          <el-table-column width="160">
            <template #default="{ row: { createdAt } }">{{ formatDate(createdAt) }}</template>
          </el-table-column>
          <el-table-column width="100">
            <template #default="{ row: { _id } }">
              <el-button size="small" @click="handleRevert(_id)">还原</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          :disabled="!letter[LetterStatus.DELETED]?.total"
          type="danger"
          class="mt-3"
          @click="handleClear"
          >清空回收站</el-button
        >
        <el-pagination
          v-model:current-page="letter[LetterStatus.DELETED].page"
          v-model:page-size="letter[LetterStatus.DELETED].size"
          :total="letter[LetterStatus.DELETED].total"
          layout="total, sizes, prev, pager, next"
          class="mt-3"
          @size-change="getLetters(LetterStatus.DELETED)"
          @current-change="getLetters(LetterStatus.DELETED)"
        />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { Letter } from '@/models/Letter'

import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'

import { LetterStatus } from '@/enums/letterStatus'
import { deleteLettersApi, getLettersApi, updateLetterStatusApi } from '@/api/letter'
import { formatDate } from '@/formater'

type LetterData = {
  data: Letter[]
  total: number
  page: number
  size: number
}

const tabName = ref<LetterStatus>(LetterStatus.UNREAD)

const letter = reactive<{
  [LetterStatus.UNREAD]: LetterData
  [LetterStatus.READ]: LetterData
  [LetterStatus.DELETED]: LetterData
}>({
  [LetterStatus.UNREAD]: {
    data: [],
    total: 0,
    page: 1,
    size: 10
  },
  [LetterStatus.READ]: {
    data: [],
    total: 0,
    page: 1,
    size: 10
  },
  [LetterStatus.DELETED]: {
    data: [],
    total: 0,
    page: 1,
    size: 10
  }
})

getLetters(LetterStatus.UNREAD)
getLetters(LetterStatus.READ)
getLetters(LetterStatus.DELETED)

function getLetters(status: LetterStatus) {
  getLettersApi({ page: letter[status].page, size: letter[status].size, status }).then((res) => {
    if (res.code !== 0) return
    letter[status].data = res.data?.map((_) => new Letter(_))
    letter[status].total = res.total!
  })
}

function handleRead(id: string) {
  updateLetterStatusApi([id], LetterStatus.READ).then((res) => {
    if (res.code !== 0) return
    getLetters(LetterStatus.UNREAD)
    getLetters(LetterStatus.READ)
    ElNotification.success({
      message: `【成功】标记为已读成功.`,
      showClose: false
    })
  })
}

function handleReadAll() {
  updateLetterStatusApi(
    letter[LetterStatus.UNREAD].data.map((_) => _._id),
    LetterStatus.READ
  ).then((res) => {
    if (res.code !== 0) return
    getLetters(LetterStatus.UNREAD)
    getLetters(LetterStatus.READ)
    ElNotification.success({
      message: `【成功】全部标记为已读成功.`,
      showClose: false
    })
  })
}

function handleRemove(id: string) {
  updateLetterStatusApi([id], LetterStatus.DELETED).then((res) => {
    if (res.code !== 0) return
    getLetters(LetterStatus.READ)
    getLetters(LetterStatus.DELETED)
    ElNotification.success({
      message: `【成功】删除成功.`,
      showClose: false
    })
  })
}

function handleRemoveAll() {
  updateLetterStatusApi(
    letter[LetterStatus.READ].data.map((_) => _._id),
    LetterStatus.DELETED
  ).then((res) => {
    if (res.code !== 0) return
    getLetters(LetterStatus.READ)
    getLetters(LetterStatus.DELETED)
    ElNotification.success({
      message: `【成功】删除全部成功.`,
      showClose: false
    })
  })
}

function handleRevert(id: string) {
  updateLetterStatusApi([id], LetterStatus.READ).then((res) => {
    if (res.code !== 0) return
    getLetters(LetterStatus.DELETED)
    getLetters(LetterStatus.READ)
    ElNotification.success({
      message: `【成功】还原成功.`,
      showClose: false
    })
  })
}

function handleClear() {
  deleteLettersApi(letter[LetterStatus.DELETED].data.map((_) => _._id)).then((res) => {
    if (res.code !== 0) return
    getLetters(LetterStatus.DELETED)
    ElNotification.success({
      message: `【成功】清空回收站成功.`,
      showClose: false
    })
  })
}
</script>
