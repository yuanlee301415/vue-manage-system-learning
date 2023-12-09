<template>
  <el-card>

    <el-upload
        v-model:file-list="fileList"
        ref="coverRef"
        :name="singleConfig.name"
        :accept="singleConfig.accept.join()"
        :limit="singleConfig.limit"
        :http-request="upload"
        :auto-upload="false"
        :on-exceed="onExceed"
        :before-upload="beforeUpload"
        action=""
        drag
    >
      <el-icon class="el-icon--upload"><UploadFilled/></el-icon>

      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          {{ singleConfig.accept.join('/') }} files with a size less than {{ formatFileSize(singleConfig.size) }}.
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

import { uploadApi } from "@/api/common";
import {ElNotification} from "element-plus";
import { formatFileSize } from "@/filters";

console.log(formatFileSize(1000))
console.log(formatFileSize(1024))
console.log(formatFileSize(1024 * 1024 ))
console.log(formatFileSize(1024 * 1024 * 1024 ))

const singleConfig = {
  name: 'cover',
  limit: 1,
  size: 1024 * 1024 * 10, // 1 MB
  accept: ['.jpg', '.jpeg', '.png', '.gif'],
}

const fileList = ref<UploadRawFile[]>([])
const coverRef = ref()
const url = ref('')

function onUpload() {
  coverRef.value.submit()
}

function onExceed() {
  ElNotification({
    type: 'warning',
    message: `文件数量超出限制：${singleConfig.limit}`
  })
}

function beforeUpload(file: UploadRawFile) {
  console.log('beforeUpload:', file)
  if (file.size > singleConfig.size) {
    ElNotification({
      type: 'warning',
      message: `文件大小超出限制：${formatFileSize(singleConfig.size)}`
    })
    return false
  }
  return true
}

function upload(opt: UploadRequestOptions) {
  const formData = new FormData()
  formData.set('cover', opt.file)
  console.log(formData)
  uploadApi(formData).then(res => {
    if (res.code !== 0) return
    ElNotification({ type: 'success', message: '上传成功' })
    url.value = res.data?.url
  })
}

</script>

<style scoped>

</style>
