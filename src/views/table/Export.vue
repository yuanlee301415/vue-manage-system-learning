<template>
  <el-card>
    <div class="mb-3">
      <el-button :disabled="!studentData?.total" type="primary" @click="handleExport">导出 Excel</el-button>
    </div>

    <el-table :data="studentData.list" border stripe>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="sno" label="学号"/>
      <el-table-column prop="grade" label="班级"/>
      <el-table-column prop="age" label="年龄"/>
      <el-table-column prop="gender" label="性别">
        <template #default="{row: {gender}}">
          {{ genderFilter(gender) }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="注册时间" width="160" align="center">
        <template #default="{row: {createdAt}}">
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
import type {QueryParams} from "#/axios";
import {reactive} from "vue";

import * as XLSL from 'xlsx'
import Student from "@/models/Student";
import {GenderMap} from "@/enums/gender";
import {getStudentsApi} from "@/api/student";
import {formatDate, genderFilter} from "@/filters";

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

getStudents()

function getStudents() {
  getStudentsApi(params).then(res => {
    if (res.code !== 0) return
    studentData.list = res.data?.map(_ => new Student(_))
    studentData.total = res.total!
  })
}

function handleExport() {
  if (!studentData.total) return
  const list = [['序号', '姓名', '学号', '班级', '年龄', '性别']];
  studentData.list.map((item: Student, idx: number) => {
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
