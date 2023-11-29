import {State} from "@/enums/state";

/**
 * 用户 Model
 */
export default class User {
  id: number

  // 用户名称
  name: string

  // 地址
  address: string

  // 头像
  avatar: string

  // 注册时间
  date: number

  // 帐户余额
  money: number

  // 状态
  state: State

  // 用户简介
  desc: string

  constructor(_: User) {
    const { id, name, address, date, avatar, money, state, desc } = { ..._ }
    this.id = id
    this.name = name
    this.address = address
    this.date = date
    this.avatar = avatar
    this.money = money
    this.state = state
    this.desc = desc
  }

  static create(_?: User) {
    const { name = '', address = '', avatar = '', desc = '' } = { ..._ }
    return new this({
      id: void 0 as unknown as number,
      date: Date.now(),
      money: 0,
      state: State.SUCCESS,
      name,
      address,
      avatar,
      desc
    })
  }
}
