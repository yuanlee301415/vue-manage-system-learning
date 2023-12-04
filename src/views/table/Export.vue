<template>
  <el-card>
    <div class="mb-3">
      <el-button :disabled="!students?.length" type="primary" @click="handleExport">导出 Excel</el-button>
    </div>

    <el-table :data="students" border stripe>
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

import Student from "@/models/Student";
import {Gender, GenderMap} from "@/enums/gender";
import {getStudentsApi} from "@/api/student";
import {genderFilter} from "@/filters";

const students = ref<Student[]>()
const genderStr = computed(() => (gender: Gender) => genderFilter(gender))

getStudents()

function getStudents() {
  getStudentsApi().then(res => {
    if (res.code !== 0) return
    students.value = res.data
  })
}

function handleExport() {
  if (!students.value) return
  const list = [['序号', '姓名', '学号', '班级', '年龄', '性别']];
  students.value.map((item: Student, idx: number) => {
    const arr: any = [idx + 1]
    arr.push(...[item.name, item.sno, item.grade, item.age, GenderMap.get(item.gender!)])
    list.push(arr)
  })

  const workSheet = XLSL.utils.aoa_to_sheet(list)
  const newWorkBook = XLSL.utils.book_new()
  XLSL.utils.book_append_sheet(newWorkBook, workSheet, '学生表')
  XLSL.writeFile(newWorkBook, '学生表.xlsx')
}
</script>
