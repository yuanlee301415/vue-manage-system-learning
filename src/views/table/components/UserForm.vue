<template>
  <el-form ref="formRef" :model="user" :rules="rules" label-width="100">
    <el-form-item prop="name" label="用户名">
      <el-input v-model="user.username" :disabled="action === FormAction.EDIT" maxlength="10" placeholder="请输入用户名"/>
    </el-form-item>

    <el-form-item prop="avatar" label="头像">
      <el-select v-model="user.avatar" class="w-full">
        <el-option v-for="_ of avatars" :key="_.value" :label="_.label" :value="_.value">
          <div class="flex justify-center items-center">
            <el-avatar :size="20" :src="_.value"/>
            <span class="flex-1 text-right">{{ _.label }}</span>
          </div>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="address" label="地址">
      <el-select v-model="user.address" class="w-full">
        <el-option v-for="_ of address" :key="_" :label="_" :value="_"/>
      </el-select>
    </el-form-item>

    <el-form-item prop="signature" label="签名">
      <el-input type="textarea" rows="3" v-model="user.signature" placeholder="请输入简介" maxlength="200"/>
    </el-form-item>

    <template v-if="props.action === FormAction.EDIT">
      <el-form-item prop="state" label="状态">
        <el-select v-model="user.state" class="w-full">
          <el-option label="成功" :value="State.SUCCESS"/>
          <el-option label="失败" :value="State.FAIL"/>
        </el-select>
      </el-form-item>

      <el-form-item prop="amount" label="帐户余额">
        <el-input-number v-model="user.amount" :max="99999"/>
      </el-form-item>
    </template>


  </el-form>
</template>

<script setup lang="ts">
import type {FormInstance, FormRules} from "element-plus";

import {reactive, ref} from "vue";
import {FormAction} from "@/enums/formAction";
import User from "@/models/User";
import {State} from "@/enums/state";

const rules: FormRules<User> = {
  displayName: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  avatar: [{ required: true, trigger: 'blur', message: '请选择头像' }],
  address: [{ required: true, trigger: 'blur', message: '请选择地址' }],
  state: [{ required: true, trigger: 'blur', message: '请选择状态' }],
  amount: [{ required: true, trigger: 'blur', message: '请输入帐户余额' }]
}

const props = defineProps<{ user: User, action: FormAction }>()
const user = reactive<User>(new User(props.user))

const avatars = [
  {label: 'Alipay', value: '/logos/alipay.png'},
  {label: 'Angular', value: '/logos/angular.png'},
  {label: 'Ant', value: '/logos/ant.png'},
  {label: 'Bootstrap', value: '/logos/bootstrap.png'},
  {label: 'Pro', value: '/logos/pro.png'},
  {label: 'React', value: '/logos/react.png'},
  {label: 'Vue', value: '/logos/vue.png'},
  {label: 'Webpack', value: '/logos/webpack.png'}
]
const address = ['广东省东莞市长安镇', '广东省广州市白云区', '湖南省长沙市', '福建省厦门市鼓浪屿']
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

<style scoped>

</style>
