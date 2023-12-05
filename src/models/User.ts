import {State} from "@/enums/state";
import {Gender} from "@/enums/gender";

/**
 * 用户 Model
 */
export default class User {
  _id: string

  username: string

  displayName: string

  mobile: string;

  email: string;

  // 帐户余额
  amount: number

  province: string

  city: string

  street: string

  gender: Gender

  // 头像
  avatar: string

  // 状态
  state: State

  // 用户简介
  signature: string

  constructor(_: User = {} as User) {
    const { _id, username, displayName, email, mobile, province, city, street, gender, avatar, amount, state, signature } = { ..._ }
    this._id = _id
    this.username = username
    this.displayName = displayName
    this.email = email
    this.mobile = mobile
    this.province = province
    this.city = city
    this.street = street
    this.gender = gender
    this.avatar = avatar
    this.amount = amount
    this.state = state
    this.signature = signature
  }
}
