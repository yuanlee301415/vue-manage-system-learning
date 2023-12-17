<template>
  <div>
    <div class="flex flex-row space-x-4">
      <el-card class="basis-1/2">
        <template #header>
          <p class="text-base">基础信息</p>
        </template>
        <div class="text-center pt-8">
          <div class="relative rounded-full w-[180px] h-[180px] mx-auto group/avatar">
            <el-avatar :src="userInfo.avatar" :size="180"/>
            <div
                class="absolute top-0 left-0 w-full h-full rounded-full bg-black/[0.3] flex items-center justify-center invisible group-hover/avatar:visible"
                @click="handleOpen"
            >
              <el-icon class="text-white" size="50"><Camera /></el-icon>
            </div>
          </div>
          <h3 class="py-2">{{ userInfo.displayName }}</h3>
          <p>{{ userInfo.signature }}</p>
        </div>
      </el-card>

      <el-card class="basis-1/2">
        <template #header>
          <p class="text-base">帐户编辑</p>
        </template>
        <el-form ref="userFormRef" :model="userForm" :rules="rules" label-width="100">
          <el-form-item label="用户名">{{ userInfo.username }}</el-form-item>
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="userForm.oldPassword" type="password" maxlength="20"/>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="userForm.newPassword" type="password" maxlength="20"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="newPassword2">
            <el-input v-model="userForm.newPassword2" type="password" maxlength="20"/>
          </el-form-item>
          <el-form-item label="签名" prop="signature">
            <el-input v-model="userForm.signature" type="textarea" maxlength="200" rows="3"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <el-dialog v-model="visible" title="裁剪图片" width="600">
      <VueCropper
          ref="cropperRef"
          :src="img"
          style="width: 100%;height: 400px;"
      />
      <template #footer>
        <el-upload
            ref="elUploadRef"
            :limit="1"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="onChange"
            :on-exceed="onExceed"
            :name="fieldName"
            accept="image/*"
            style="display: inline-flex; vertical-align: middle;margin-right: 20px;"
        >
          <el-button type="primary">选择图片</el-button>
        </el-upload>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type {UploadInstance, UploadProps, UploadRawFile, FormInstance, FormRules} from "element-plus";

import {computed, reactive, ref} from "vue";
import {Camera} from "@element-plus/icons-vue";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import {ElNotification, ElUpload, genFileId} from "element-plus";

import {useUserStoreWithOut} from "@/store/modules/user";
import {uploadSingleApi} from "@/api/common";
import { NAME_REG } from "@/constants";

type UserForm = {
  oldPassword: string
  newPassword: string
  newPassword2: string
  signature: string
}

const userStore = useUserStoreWithOut()
const userInfo = computed(() => userStore.getUserInfo)
const visible = ref(false)
const cropperRef = ref<InstanceType<typeof VueCropper>>()
const elUploadRef = ref<UploadInstance>()
const img = ref()
const croppedBlob = ref<Blob>()
const fieldName = 'file'
const userForm = reactive<UserForm>({
  oldPassword: '',
  newPassword: '',
  newPassword2: '',
  signature: userInfo.value.signature
})
const userFormRef = ref<FormInstance>()
const patternRule = { pattern: NAME_REG, trigger: 'blur', message: '格式错误（只支持：字母开头，可包含：字母、数字、下划线）' }
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value !== userForm.newPassword) {
    callback(new Error('密码不一致'))
    return
  }
  callback()
}
const rules: FormRules<UserForm> = {
  oldPassword: [{ required: true, trigger: 'blur', message: '请输入旧密码'}, patternRule],
  newPassword: [{ required: true, trigger: 'blur', message: '请输入新密码'}, patternRule],
  newPassword2: [{ required: true, trigger: 'blur', message: '请输入确认密码' }, patternRule, { validator: validatePass2, trigger: 'submit' }],
}

const onChange: UploadProps['onChange'] = file => {
  if (!file) return
  const url = file.raw
  const reader = new FileReader()
  reader.onload = ev => {
    cropperRef.value.replace(ev.target?.result)
  }
  reader.readAsDataURL(url!)
}

const onExceed: UploadProps['onExceed'] = (files) => {
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  elUploadRef.value!.clearFiles()
  elUploadRef.value!.handleStart(file)
}

function handleOpen() {
  visible.value = true
  img.value = userInfo.value.avatar
}

function handleSubmit() {
  cropperRef.value.getCroppedCanvas().toBlob((blob: Blob) => {
    const formData = new FormData()
    /**
     * VueCropper 裁剪图片后，返回的 Blob 文件名默认为 `blob`(没有文件后缀名)
     * 使用 FormData.set() 方法的第 3 个参数设置文件名（用于后端根据上传的文件名生成新的文件名）
     */
    formData.set(fieldName, blob, 'avatar.png')
    return uploadSingleApi(formData).then(res => {
      if (res.code !== 0) return
      ElNotification({ type: 'success', message: '上传成功' })
      visible.value = false
      userInfo.value.avatar = res.data?.url
    })
  })
}

function handleSave() {
  userFormRef.value?.validate(valid => {
    if (!valid) return
    ElNotification.success('密码修改成功！')
  })
}
</script>

<style scoped>

</style>
