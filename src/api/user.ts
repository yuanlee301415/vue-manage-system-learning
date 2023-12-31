import type { Result } from '#/axios'
import type { CreateUser, UpdateUser, UserParams } from '#/index'

import User from '@/models/User'
import request from '@/utils/http/axios'
import { HttpMethod } from '@/enums'

export function getUsersApi({
  username,
  province,
  state,
  size,
  page
}: UserParams): Promise<Result<User[]>> {
  return request({
    url: 'user',
    method: HttpMethod.GET,
    params: {
      username,
      province,
      state,
      size,
      page
    }
  })
}

export function createUserApi({
  username,
  displayName,
  password,
  roles,
  mobile,
  email,
  province,
  city,
  street,
  gender,
  avatar,
  signature
}: CreateUser): Promise<Result<User>> {
  return request({
    url: 'user',
    method: HttpMethod.POST,
    data: {
      username,
      displayName,
      password,
      roles,
      mobile,
      email,
      province,
      city,
      street,
      gender,
      avatar,
      signature
    }
  })
}

export function updateUserApi(
  id: string,
  {
    username,
    displayName,
    password,
    roles,
    email,
    mobile,
    province,
    city,
    street,
    gender,
    avatar,
    signature,
    amount,
    state
  }: UpdateUser
): Promise<Result<User>> {
  return request({
    url: `user/${id}`,
    method: HttpMethod.PATCH,
    data: {
      username,
      displayName,
      password,
      roles,
      email,
      mobile,
      province,
      city,
      street,
      gender,
      avatar,
      signature,
      amount,
      state
    }
  })
}

export function deleteUserApi(id: string): Promise<Result<User>> {
  return request({
    url: `user/${id}`,
    method: HttpMethod.DELETE
  })
}
