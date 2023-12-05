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

  constructor(_: Student = {} as Student) {
    const { _id, name, sno, grade, age, gender } = { ..._ }
    this._id = _id
    this.name = name
    this.sno = sno
    this.grade = grade
    this.age = age
    this.gender = gender
  }
}
