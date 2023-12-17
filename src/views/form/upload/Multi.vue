<template>
  <el-card>

    <el-upload
        v-model:file-list="fileList"
        ref="uploadRef"
        :list-type="'picture-card'"
        :name="config.name"
        :accept="config.accept"
        :limit="config.limit"
        :auto-upload="false"
        :on-exceed="onExceed"
        :before-upload="beforeUpload"
        multiple
    >
      <el-icon><Plus/></el-icon>
      <template #tip>
        <div class="el-upload__tip">
          Image files with a size less than {{ formatFileSize(config.size) }}.
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
import type {UploadFiles, UploadInstance, UploadProps, UploadRawFile} from "element-plus";

import {ref} from "vue";
import {Plus} from "@element-plus/icons-vue";
import {ElNotification } from "element-plus";

import { uploadMultiApi } from "@/api/common";
import {formatDate, formatFileSize} from "@/filters";

const config = {
  name: 'files',
  limit: 3,
  size: 1024 * 1024, // 1 MB
  accept: 'image/*',
}

const fileList = ref<UploadFiles>([])
const uploadRef = ref<UploadInstance>()
const filesData = ref()

// Todo: beforeUpload 失效
const beforeUpload: UploadProps['beforeUpload'] = (file: UploadRawFile) => {
  if (file.type.split('/')[0] !== config.accept.split('/')[0]) {
    ElNotification({
      type: 'warning',
      message: `文件格式不支持：${file.type}`
    })
    return false
  }
  if (file.size > config.size) {
    ElNotification({
      type: 'warning',
      message: `文件大小超出限制：${formatFileSize(config.size)}`
    })
    return false
  }
  return true
}

const onExceed: UploadProps['onExceed'] = () => {
  ElNotification({
    type: 'warning',
    message: `文件数量超出限制：${config.limit}`
  })
}

function handleUpload() {
  const formData = new FormData()
  for (const file of fileList.value) {
    formData.append(config.name, file.raw!)
  }
  uploadMultiApi(formData).then(res => {
    if (res.code !== 0) return
    ElNotification({ type: 'success', message: '上传成功' })
    filesData.value = res.data
    uploadRef.value?.clearFiles()
  })
}
</script>
