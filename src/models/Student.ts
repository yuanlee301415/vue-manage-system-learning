import {Gender} from "@/enums/gender";

/**
 * 用户 Model
 */
export default class Student {
  id: number

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

  constructor(_: Student) {
    const { id, name, sno, grade, age, gender } = { ..._ }
    this.id = id
    this.name = name
    this.sno = sno
    this.grade = grade
    this.age = age
    this.gender = gender
  }
}
