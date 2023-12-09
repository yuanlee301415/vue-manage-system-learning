<template>
  <el-card>

    <el-upload
        v-model:file-list="fileList"
        ref="uploadRef"
        :name="config.name"
        :accept="config.accept.join()"
        :limit="config.limit"
        :http-request="upload"
        :auto-upload="false"
        :on-exceed="onExceed"
        :before-upload="beforeUpload"
        drag
    >
      <el-icon class="el-icon--upload"><UploadFilled/></el-icon>

      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          {{ config.accept.join('/') }} files with a size less than {{ formatFileSize(config.size) }}.
        </div>
      </template>
    </el-upload>

    <el-button @click="onUpload">上传</el-button>

    <el-card v-if="url">
      <el-image  :src="url" />
    </el-card>

  </el-card>
</template>

<script setup lang="ts">
import type {UploadRawFile, UploadRequestOptions } from "element-plus";
import {ref} from "vue";
import {UploadFilled} from "@element-plus/icons-vue";

import { uploadSingleApi } from "@/api/common";
import {ElNotification} from "element-plus";
import { formatFileSize } from "@/filters";

const config = {
  name: 'file',
  limit: 1,
  size: 1024 * 1024 * 10, // 1 MB
  accept: ['.jpg', '.jpeg', '.png', '.gif'],
}

const fileList = ref<UploadRawFile[]>([])
const uploadRef = ref()
const url = ref('')

function onUpload() {
  uploadRef.value.submit()
}

function onExceed() {
  ElNotification({
    type: 'warning',
    message: `文件数量超出限制：${config.limit}`
  })
}

function beforeUpload(file: UploadRawFile) {
  console.log('beforeUpload:', file)
  if (file.size > config.size) {
    ElNotification({
      type: 'warning',
      message: `文件大小超出限制：${formatFileSize(config.size)}`
    })
    return false
  }
  return true
}

function upload(opt: UploadRequestOptions) {
  const formData = new FormData()
  formData.set(config.name, opt.file)
  console.log(formData)
  uploadSingleApi(formData).then(res => {
    if (res.code !== 0) return
    ElNotification({ type: 'success', message: '上传成功' })
    url.value = res.data?.url
  })
}

</script>
