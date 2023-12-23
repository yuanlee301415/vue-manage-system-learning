const admin = 'admin'
const user = 'user'

export enum Role {
  ADMIN = admin,
  USER = user
}

export const RoleMap = new Map([
  [admin, '管理员'],
  [user, '用户']
])
