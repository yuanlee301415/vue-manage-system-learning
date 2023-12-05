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

  createdAt: number

  constructor(user: User = {} as User) {
    this._id = user._id
    this.username = user.username
    this.displayName = user.displayName
    this.email = user.email
    this.mobile = user.mobile
    this.province = user.province
    this.city = user.city
    this.street = user.street
    this.gender = user.gender
    this.avatar = user.avatar
    this.amount = user.amount
    this.state = user.state
    this.signature = user.signature
    this.createdAt = user.createdAt
  }
}
