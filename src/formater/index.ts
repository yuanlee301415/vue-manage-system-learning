import dayjs from 'dayjs'

import { State, StateMap } from '@/enums/state'
import { Gender, GenderMap } from '@/enums/gender'
import { Role, RoleMap } from '@/enums/role'

// 状态
export function formatState(state: State) {
  return StateMap.get(state) || '-'
}

// 性别
export function formatGender(gender: Gender) {
  return GenderMap.get(gender) || '-'
}

// 角色
export function formatRole(role: Role) {
  return RoleMap.get(role) || '-'
}

// 日期时间
export function formatDate(date: number | string, format = 'YYYY-MM-DD HH:mm:ss') {
  const time = new Date(date).getTime()
  if (Number.isNaN(time)) return '-'
  return dayjs(date).format(format)
}

// 文件大小
export function formatFileSize(size: number): string {
  const units = ['', 'K', 'M', 'G', 'T']
  function _(size: number, idx = 0) {
    if (size < 1024) return Number(size.toFixed(2)) + units[idx] + 'B'
    return _(size / 1024, idx + 1)
  }
  return _(size)
}
