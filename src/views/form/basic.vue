<template>
  <el-card>
    <el-form :model="basicForm" :rules="rules" class="w-1/2" label-width="100" ref="formRef">
      <el-form-item prop="name" label="名称">
        <el-input v-model="basicForm.name" />
      </el-form-item>

      <el-form-item prop="type" label="类型">
        <el-select v-model="basicForm.type" class="w-full">
          <el-option v-for="_ of types" :key="_.value" :value="_.value" :label="_.label"/>
        </el-select>
      </el-form-item>

      <el-form-item label="日期时间" required>
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker v-model="basicForm.date" style="width: 100%"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="width: 100%; text-align: center;"><p>-</p></el-col>
        <el-col :span="11">
          <el-form-item prop="time">
            <el-time-picker v-model="basicForm.time" style="width: 100%"/>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item prop="required" label="是否必填">
        <el-switch v-model="basicForm.required"></el-switch>
      </el-form-item>

      <el-form-item prop="config" label="配置">
        <el-checkbox-group v-model="basicForm.config">
          <el-checkbox v-for="_ of configs" :key="_.value" :label="_.value">{{ _.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item prop="size" label="尺寸">
          <el-radio-group v-model="basicForm.size">
            <el-radio v-for="_ of sizes" :key="_.value" :label="_.value">{{ _.label }}</el-radio>
          </el-radio-group>
      </el-form-item>

      <el-form-item prop="desc" label="描述">
        <el-input v-model="basicForm.desc" type="textarea" rows="3"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import type {FormInstance, FormRules} from "element-plus";

import {reactive, ref} from "vue";
import {ElNotification} from "element-plus";

type BasicForm = {
  name: string
  type: string
  date: string
  time: string
  required: boolean
  config: string[]
  size: string
  desc: string
}

const types = [{ value: 'success', label: '成功' }, { value: 'warning', label: '警告'}, {value: 'danger', label: '错误'}]
const configs = [{ value: 'index', label: '索引'}, { value: 'unique', label: '唯一索引'}, { value: 'timestamps', label: '时间戳'}]
const sizes = [{ value: 'default', label: '默认' }, { value: 'small', label: '小'}, {value: 'mini', label: '迷你'}]

const rules: FormRules<BasicForm> = {
  name: [{ required: true, trigger: 'blur', message: 'Please input name' }],
  type: [{ required: true, trigger: 'blur', message: 'Please select name' }],
  date: [{ required: true, trigger: 'blur', message: 'Please pick date' }],
  time: [{ required: true, trigger: 'blur', message: 'Please pick time' }],
  config: [{ required: true, trigger: 'blur', message: 'Please check time' }],
  size: [{ required: true, trigger: 'blur', message: 'Please check size' }],
}

const formRef = ref<FormInstance>()

const basicForm = reactive<BasicForm>({
  name: '',
  type: '',
  date: '',
  time: '',
  required: true,
  config: ['index'],
  size: 'mini',
  desc: ''
})

function onSubmit() {
  formRef.value?.validate((valid, fields) => {
    if (!valid) {
      ElNotification({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: '提交失败：\n<pre>' + JSON.stringify(fields, null, 2) + '</pre>'
      })
      return
    }
    ElNotification({
      type: 'success',
      dangerouslyUseHTMLString: true,
      message: '提交数据：\n<pre>' + JSON.stringify(basicForm, null, 2) + '</pre>'})
  })
}

function onReset() {
  formRef.value?.resetFields()
}

</script>

