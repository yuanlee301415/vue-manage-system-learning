<template>
  <el-card>
    <el-tabs v-model="status">

      <el-tab-pane :label="`未读(${message.unread?.length??0})`" :name="MessageStatus.UNREAD">
        <el-table :data="message.unread" :show-header="false">
          <el-table-column prop="title"/>
          <el-table-column width="160">
            <template #default="{row: { date }}">{{ formatDate(date) }}</template>
          </el-table-column>
          <el-table-column width="100">
            <template #default="{row: { id }}">
              <el-button size="small" @click="handleRead(id)">标为已读</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button :disabled="!message.unread?.length" type="primary" class="mt-3" @click="handleReadAll">全部标记为已读</el-button>
      </el-tab-pane>

      <el-tab-pane :label="`已读(${message.read?.length??0})`" :name="MessageStatus.READ">
        <el-table :data="message.read" :show-header="false">
          <el-table-column prop="title"/>
          <el-table-column width="160">
            <template #default="{row: { date }}">{{ formatDate(date) }}</template>
          </el-table-column>
          <el-table-column width="100">
            <template #default="{row: { id }}">
              <el-button size="small" type="danger" @click="handleRemove(id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button :disabled="!message.read?.length" type="danger" class="mt-3" @click="handleRemoveAll">删除全部</el-button>
      </el-tab-pane>

      <el-tab-pane :label="`回收站(${message.deleted?.length})`" :name="MessageStatus.DELETED">
        <el-table :data="message.deleted" :show-header="false">
          <el-table-column prop="title"/>
          <el-table-column width="160">
            <template #default="{row: { date }}">{{ formatDate(date) }}</template>
          </el-table-column>
          <el-table-column width="100">
            <template #default="{row: { id }}">
              <el-button size="small" @click="handleRevert(id)">还原</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button :disabled="!message.deleted?.length" type="danger" class="mt-3" @click="handleClear">清空回收站</el-button>
      </el-tab-pane>

    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import type {Message} from "@/models/Message";

import {MessageStatus} from "@/enums/messageStatus";
import {deleteMessageStatusApi, getMessagesApi, updateMessageStatusApi} from "@/api/message";
import {reactive, ref} from "vue";
import {ElNotification} from "element-plus";
import {formatDate} from "@/filters";

const message = reactive<{
  unread: Message[],
  unreadTotal: number,
  read: Message[],
  readTotal: number,
  deleted: Message[],
  deletedTotal: number
}>({
  unread: [],
  unreadTotal: 0,
  read: [],
  readTotal: 0,
  deleted: [],
  deletedTotal: 0
})

const status = ref<MessageStatus>(MessageStatus.UNREAD)

getMessage()

function getMessage() {
  getMessagesApi({status: MessageStatus.UNREAD}).then(res => {
    if (res.code !== 0) return
    message.unread = res.data
    message.unreadTotal = res.total!
    console.log('message.unread:', message.unread)
  })
  getMessagesApi({status: MessageStatus.READ}).then(res => {
    if (res.code !== 0) return
    message.read = res.data
    message.readTotal = res.total!
  })
  getMessagesApi({status: MessageStatus.DELETED}).then(res => {
    if (res.code !== 0) return
    message.deleted = res.data
    message.deletedTotal = res.total!
  })
}

function handleRead(id: number) {
  updateMessageStatusApi(id, MessageStatus.READ).then(res => {
    if (res.code !== 0) return
    getMessage()
    ElNotification.success({
      message: `【成功】标记为已读成功.`,
      showClose: false
    })
  })
}

function handleReadAll() {
  Promise.all(message.unread.map(_ => updateMessageStatusApi(_.id, MessageStatus.READ))).then(res => {
    if (res.some(_ => _.code !== 0)) return
    getMessage()
    ElNotification.success({
      message: `【成功】全部标记为已读成功.`,
      showClose: false
    })
  })
}

function handleRemove(id: number) {
  updateMessageStatusApi(id, MessageStatus.DELETED).then(res => {
    if (res.code !== 0) return
    getMessage()
    ElNotification.success({
      message: `【成功】删除成功.`,
      showClose: false
    })
  })
}

function handleRemoveAll() {
  Promise.all(message.read.map(_ => updateMessageStatusApi(_.id, MessageStatus.DELETED))).then(res => {
    if (res.some(_ => _.code !== 0)) return
    getMessage()
    ElNotification.success({
      message: `【成功】删除全部成功.`,
      showClose: false
    })
  })
}

function handleRevert(id: number) {
  updateMessageStatusApi(id, MessageStatus.READ).then(res => {
    if (res.code !== 0) return
    getMessage()
    ElNotification.success({
      message: `【成功】还原成功.`,
      showClose: false
    })
  })
}

function handleClear() {
  Promise.all(message.deleted.map(_ => deleteMessageStatusApi(_.id))).then(res => {
    if (res.some(_ => _.code !== 0)) return
    getMessage()
    ElNotification.success({
      message: `【成功】清空成功.`,
      showClose: false
    })
  })
}

</script>
