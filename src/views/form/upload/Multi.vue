<template>
  <el-card>

    <el-upload
        v-model:file-list="fileList"
        ref="uploadRef"
        :list-type="'picture-card'"
        :name="config.name"
        :accept="config.accept.join()"
        :limit="config.limit"
        :auto-upload="false"
        :on-exceed="onExceed"
        multiple
    >
      <el-icon><Plus/></el-icon>
      <template #tip>
        <div class="el-upload__tip">
          {{ config.accept.join('/') }} files with a size less than {{ formatFileSize(config.size) }}.
        </div>
      </template>
    </el-upload>

    <el-button class="my-3" :disabled="!fileList.length" @click="handleUpload">上传({{fileList.length}}/{{config.limit}})</el-button>

    <el-table :data="filesData" border>
      <el-table-column prop="originalname" label="原始文件名"/>
      <el-table-column prop="size" label="文件大小" width="90">
        <template #default="{row: {size}}">{{ formatFileSize(size) }}</template>
      </el-table-column>
      <el-table-column prop="url" label="点击查看">
        <template #default="{row: {url, originalname}}"><a :href="url" target="_blank">{{ originalname }}</a></template>
      </el-table-column>
      <el-table-column prop="time" label="上传时间" width="160">
        <template #default="{row: {time}}">{{ formatDate(time) }}</template>
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script setup lang="ts">
import type {UploadFiles} from "element-plus";

import {ref} from "vue";
import {Plus} from "@element-plus/icons-vue";
import { uploadMultiApi } from "@/api/common";
import {ElNotification} from "element-plus";
import {formatDate, formatFileSize} from "@/filters";


const config = {
  name: 'files',
  limit: 3,
  size: 1024 * 1024 * 1, // 1 MB
  accept: ['.jpg', '.jpeg', '.png', '.gif'],
}

const fileList = ref<UploadFiles>([])
const uploadRef = ref()
const filesData = ref()

function handleUpload() {
  console.log('fileList:', fileList)
  const formData = new FormData()
  for (const file of fileList.value) {
    formData.append(config.name, file.raw!)
  }
  uploadMultiApi(formData).then(res => {
    if (res.code !== 0) return
    ElNotification({ type: 'success', message: '上传成功' })
    filesData.value = res.data
    fileList.value = []
  })
}

function onExceed() {
  ElNotification({
    type: 'warning',
    message: `文件数量超出限制：${config.limit}`
  })
}

</script>
