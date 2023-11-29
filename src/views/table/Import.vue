<template>
  <el-card>
    <div class="flex mb-3">
      <el-upload
          :limit="1"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :http-request="handleMany"
          accept=".xlsx, .xsl"
      >
        <el-button type="success">批量导入</el-button>
      </el-upload>
      <el-button tag="a" href="/template.xlsx" download="template.xlsx" class="ml-3">下载模板</el-button>
    </div>

    <el-table :data="students" border stripe>
      <el-table-column prop="id" label="ID" width="40"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="sno" label="学号"/>
      <el-table-column prop="grade" label="班级"/>
      <el-table-column prop="age" label="年龄"/>
      <el-table-column prop="gender" label="性别">
        <template #default="{row: {gender}}">
          {{ genderStr(gender) }}
        </template>
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import * as XLSL from 'xlsx'
import {ElNotification} from "element-plus";

import Student from "@/models/Student";
import {Gender} from "@/enums/gender";
import {getStudentsApi} from "@/api/student";
import {genderFilter} from "@/filters";

const students = ref<Student[]>()
const studentTotal = ref(0)
const genderStr = computed(() => (gender: Gender) => genderFilter(gender))
const importList = ref<Student[]>([])

getStudents()

function getStudents() {
  getStudentsApi().then(res => {
    if (res.code !== 0) return
    students.value = res.data
    studentTotal.value = res.total
  })
}

async function beforeUpload(rawFile: File) {
  importList.value = await analysisExcel(rawFile)
}

function analysisExcel(file: File): Promise<Student[]> {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function (e: any) {
      const data = e.target.result
      const dataJson = XLSL.read(data, {
        type: 'binary'
      })
      const result = XLSL.utils.sheet_to_json<Student>(dataJson.Sheets[dataJson.SheetNames[0]])
      console.log('result:', result)
      resolve(result)
    }
    reader.readAsBinaryString(file)
  })
}

async function handleMany() {
  let id = studentTotal.value || 0
  const list = importList.value.map((_: any) => new Student({
    id: id++,
    name: _['姓名'],
    sno: _['学号'],
    grade: _['班级'],
    age: _['年龄'],
    gender: _['性别']
  }))
  console.log('list:', list)
  students.value = [...students.value ?? [], ...list]

  ElNotification.success({
    message: `【成功】批量导入成功.`,
    showClose: false
  })
}

</script>
