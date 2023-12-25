import type {Role} from "@/enums/role";

import { State } from '@/enums/state'
import { Gender } from '@/enums/gender'

/**
 * 用户 Model
 */
export default class User {
  _id: string

  // 用户名
  username: string

  // 显示名
  displayName: string

  password: string

  roles: Role[]

  mobile: string

  email: string

  // 帐户余额
  amount: number

  // 省份
  province: string

  // 城市
  city: string

  // 街道
  street: string

  // 性别
  gender: Gender

  // 头像
  avatar: string

  // 状态
  state: State

  // 个性签名
  signature: string

  // 上次登录时间
  lastSignInTime: string

  // 未读消息数
  unread: number

  createdAt: number

  constructor(user: User = {} as User) {
    this._id = user._id
    this.username = user.username
    this.displayName = user.displayName
    this.password = user.password
    this.roles = user.roles
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
    this.lastSignInTime = user.lastSignInTime
    this.unread = user.unread
    this.createdAt = user.createdAt
  }
}
