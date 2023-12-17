<template>
  <el-card>

    <el-upload
        v-model:file-list="fileList"
        ref="uploadRef"
        :name="config.name"
        :accept="config.accept"
        :limit="config.limit"
        :http-request="httpRequest"
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
          Image files with a size less than {{ formatFileSize(config.size) }}.
        </div>
      </template>
    </el-upload>

    <el-button @click="handleUpload">上传</el-button>

    <el-card v-if="url">
      <el-image  :src="url" />
    </el-card>

  </el-card>
</template>

<script setup lang="ts">
import type {UploadRawFile, UploadRequestOptions, UploadInstance, UploadProps } from "element-plus";

import {ref} from "vue";
import {UploadFilled} from "@element-plus/icons-vue";
import {ElNotification} from "element-plus";

import { uploadSingleApi } from "@/api/common";
import { formatFileSize } from "@/formater";

const config = {
  name: 'file',
  limit: 1,
  size: 1024 * 1024, // 1 MB
  accept: 'image/*',
}

const fileList = ref<UploadRawFile[]>([])
const uploadRef = ref<UploadInstance>()
const url = ref('')

const onExceed: UploadProps['onExceed'] = () =>{
  ElNotification({
    type: 'warning',
    message: `文件数量超出限制：${config.limit}`
  })
}

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

function handleUpload() {
  uploadRef.value?.submit()
}

function httpRequest({file}: UploadRequestOptions) {
  const formData = new FormData()
  formData.set(config.name, file)
  console.log(formData)
  uploadSingleApi(formData).then(res => {
    if (res.code !== 0) return
    ElNotification({ type: 'success', message: '上传成功' })
    url.value = res.data?.url
  })
}

</script>
