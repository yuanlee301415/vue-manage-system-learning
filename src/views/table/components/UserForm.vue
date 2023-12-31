<template>
  <el-form ref="formRef" :model="user" :rules="rules" label-width="100">
    <el-form-item prop="username" label="用户名">
      <el-input
        v-model="user.username"
        :disabled="action === FormAction.EDIT"
        maxlength="20"
        placeholder="请输入用户名"
      />
    </el-form-item>

    <el-form-item prop="displayName" label="显示名称">
      <el-input v-model="user.displayName" maxlength="20" placeholder="请输入显示名称" />
    </el-form-item>

    <el-form-item prop="password" label="密码">
      <el-input v-model="user.password" type="password" maxlength="20" placeholder="请输入密码" />
    </el-form-item>

    <el-form-item prop="roles" label="角色">
      <el-select v-model="user.roles" class="w-full" multiple>
        <el-option v-for="[value, label] of RoleMap" :key="value" :value="value" :label="label" />
      </el-select>
    </el-form-item>

    <el-form-item prop="mobile" label="手机号">
      <el-input v-model="user.mobile" maxlength="11" placeholder="请输入手机号" />
    </el-form-item>

    <el-form-item prop="email" label="邮箱">
      <el-input v-model="user.email" maxlength="20" placeholder="请输入邮箱" />
    </el-form-item>

    <el-form-item prop="avatar" label="头像">
      <el-select v-model="user.avatar" class="w-full" filterable>
        <el-option v-for="_ of AVATARS" :key="_.value" :label="_.label" :value="_.value">
          <div class="flex justify-center items-center">
            <el-avatar :size="20" :src="_.value" />
            <span class="flex-1 text-right">{{ _.label }}</span>
          </div>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="gender" label="性别">
      <el-select v-model="user.gender" class="w-full" placeholder="请选择性别">
        <el-option v-for="[val, label] of GenderMap" :key="val" :label="label" :value="val" />
      </el-select>
    </el-form-item>

    <template v-if="action === FormAction.EDIT">
      <el-form-item prop="amount" label="帐户余额">
        <el-input-number v-model="user.amount" :max="99999" placeholder="请输入帐户余额" />
      </el-form-item>

      <el-form-item prop="state" label="状态">
        <el-select v-model="user.state" class="w-full">
          <el-option label="成功" :value="State.SUCCESS" />
          <el-option label="失败" :value="State.FAIL" />
        </el-select>
      </el-form-item>
    </template>

    <el-form-item prop="province" label="省份">
      <el-select v-model="user.province" class="w-full" placeholder="请选择省份" filterable>
        <el-option v-for="_ of province" :key="_.value" :label="_.label" :value="_.value" />
      </el-select>
    </el-form-item>

    <el-form-item prop="city" label="城市">
      <el-input v-model="user.city" maxlength="20" placeholder="请输入城市" />
    </el-form-item>

    <el-form-item prop="street" label="街道">
      <el-input v-model="user.street" maxlength="100" placeholder="请输入街道" />
    </el-form-item>

    <el-form-item prop="signature" label="签名">
      <el-input
        type="textarea"
        rows="3"
        v-model="user.signature"
        placeholder="请输入简介"
        maxlength="200"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

import { reactive, ref } from 'vue'

import { FormAction } from '@/enums/formAction'
import User from '@/models/User'
import Configure from '@/models/Configure'
import { State } from '@/enums/state'
import { RoleMap } from '@/enums/role'
import { GenderMap } from '@/enums/gender'
import { NAME_REG, EMAIL_REG, MOBILE_REG } from '@/constants'

const AVATARS = [
  { label: 'Alipay', value: '/logos/alipay.png' },
  { label: 'Angular', value: '/logos/angular.png' },
  { label: 'Ant', value: '/logos/ant.png' },
  { label: 'Bootstrap', value: '/logos/bootstrap.png' },
  { label: 'Pro', value: '/logos/pro.png' },
  { label: 'React', value: '/logos/react.png' },
  { label: 'Vue', value: '/logos/vue.png' },
  { label: 'Webpack', value: '/logos/webpack.png' }
]

const rules: FormRules<User> = {
  username: [
    {
      required: true,
      pattern: NAME_REG,
      trigger: 'blur',
      message: '字母开头，可包含：字母、数字、下划线'
    }
  ],
  displayName: [{ required: true, trigger: 'blur', message: '请输入显示名称' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
  roles: [{ required: true, trigger: 'blur', message: '请选择角色' }],
  mobile: [{ required: true, pattern: MOBILE_REG, trigger: 'blur', message: '手机号格式错误' }],
  email: [{ required: true, pattern: EMAIL_REG, trigger: 'blur', message: '邮箱格式错误' }],
  avatar: [{ required: true, trigger: 'blur', message: '请选择头像' }],
  gender: [{ required: true, trigger: 'blur', message: '请选择性别' }],
  amount: [{ required: true, trigger: 'blur', message: '请输入帐户余额' }],
  state: [{ required: true, trigger: 'blur', message: '请选择状态' }],
  province: [{ required: true, trigger: 'blur', message: '请选择省份' }]
}

const props = defineProps<{ user: User; province: Configure[]; action: FormAction }>()
const user = reactive<User>(new User(props.user))
const formRef = ref<FormInstance>()
const emit = defineEmits(['submit'])

function validate() {
  formRef.value!.validate((valid) => {
    if (!valid) return
    emit('submit', user)
  })
}

defineExpose({
  validate
})
</script>
