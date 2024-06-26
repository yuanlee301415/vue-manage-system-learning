<template>
  <el-card>
    <div class="flex mb-3">
      <el-upload
        ref="uploadRef"
        :limit="1"
        :on-exceed="onExceed"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :http-request="httpRequest"
        accept=".xlsx, .xsl"
      >
        <el-button type="success">批量导入</el-button>
      </el-upload>
      <el-button tag="a" href="/template.xlsx" download="学生表-模板.xlsx" class="ml-3"
        >下载模板</el-button
      >
    </div>

    <el-table :data="studentData.list" border stripe>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="sno" label="学号" />
      <el-table-column prop="grade" label="班级" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="gender" label="性别">
        <template #default="{ row: { gender } }">
          {{ formatGender(gender) }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="注册时间" width="160" align="center">
        <template #default="{ row: { createdAt } }">
          {{ formatDate(createdAt) }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="params.page"
      v-model:page-size="params.size"
      :total="studentData.total"
      layout="total, sizes, prev, pager, next"
      class="mt-3"
      @size-change="getStudents()"
      @current-change="getStudents()"
    />
  </el-card>
</template>

<script lang="ts" setup>
import type { UploadProps, UploadInstance, UploadRawFile } from 'element-plus'
import type { QueryParams } from '#/axios'

import { reactive, ref } from 'vue'
import * as XLSL from 'xlsx'

import { ElNotification, genFileId } from 'element-plus'
import Student from '@/models/Student'
import { Gender } from '@/enums/gender'
import { getStudentsApi, importStudentsApi } from '@/api/student'
import { formatDate, formatGender } from '@/formater'

defineOptions({
  name: 'TableImport'
})

const studentData = reactive<{
  list: Student[]
  total: number
}>({
  list: [],
  total: 0
})
const params = reactive<QueryParams>({
  page: 1,
  size: 10
})
const importList = ref<Student[]>([])
const uploadRef = ref<UploadInstance>()

const beforeUpload: UploadProps['beforeUpload'] = async (rawFile) => {
  try {
    importList.value = await analysisExcel(rawFile)
  } catch (e) {
    ElNotification.error('导入文件错误：' + (e as Error).message)
    return false
  }
}

const onExceed: UploadProps['onExceed'] = (files) => {
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value?.clearFiles()
  uploadRef.value?.handleStart(file)
  uploadRef.value?.submit()
}

const httpRequest: UploadProps['httpRequest'] = async () => {
  const list = importList.value.map((_: any) => {
    const gender = ['男', '女'].indexOf(_['性别'])
    return new Student({
      _id: void 0 as unknown as string,
      createdAt: void 0 as unknown as number,
      name: _['姓名'],
      sno: _['学号'],
      grade: _['班级'],
      age: _['年龄'],
      gender: (gender == -1 ? void 0 : gender) as Gender
    })
  })
  importStudentsApi(list).then((res) => {
    if (res.code !== 0) return
    getStudents()
    ElNotification.success({
      message: `【成功】批量导入成功.`,
      showClose: false
    })
  })
}

getStudents()

function getStudents() {
  getStudentsApi(params).then((res) => {
    if (res.code !== 0) return
    studentData.list = res.data
    studentData.total = res.total!
  })
}

function analysisExcel(file: File): Promise<Student[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function (evt: any) {
      const data = evt.target.result
      try {
        const dataJson = XLSL.read(data, {
          type: 'binary'
        })
        const result = XLSL.utils.sheet_to_json<Student>(dataJson.Sheets[dataJson.SheetNames[0]])
        resolve(result)
      } catch (err) {
        reject(err)
      }
    }
    reader.readAsBinaryString(file)
  })
}
</script>
