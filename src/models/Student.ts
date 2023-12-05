import {Gender} from "@/enums/gender";

/**
 * 学生 Model
 */
export default class Student {
  _id: string

  // 姓名
  name: string

  // 学号
  sno: string

  // 年级
  grade: string

  // 年龄
  age: number

  // 性别
  gender: Gender

  createdAt: number

  constructor(student: Student = {} as Student) {
    this._id = student._id
    this.name = student.name
    this.sno = student.sno
    this.grade = student.grade
    this.age = student.age
    this.gender = student.gender
    this.createdAt = student.createdAt
  }
}
