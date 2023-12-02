import {State} from "@/enums/state";

/**
 * 用户 Model
 */
export default class User {
  id: string

  username: string

  displayName: string

  email: string;

  mobile: string;

  password: string;

  // 帐户余额
  amount: number

  // 地址
  address: string

  // 头像
  avatar: string

  // 状态
  state: State

  // 用户简介
  signature: string

  constructor(_: User) {
    const { id, username, email, mobile, password, displayName, address, avatar, amount, state, signature } = { ..._ }
    this.id = id
    this.username = username
    this.displayName = displayName
    this.email = email
    this.mobile = mobile
    this.password = password
    this.address = address
    this.avatar = avatar
    this.amount = amount
    this.state = state
    this.signature = signature
  }

  static create(_?: User) {
    const { username = '', displayName = '', email = '', mobile = '', password = '', address = '', amount = 0, avatar = '', signature = '' } = { ..._ }
    return new this({
      id: void 0 as unknown as string,
      username,
      email,
      mobile,
      password,
      displayName,
      avatar,
      address,
      amount,
      state: State.SUCCESS,
      signature
    })
  }
}
