import type {Result} from "#/axios";
import type { CreateUser, UpdateUser, UserParams } from "#/index";

import User from '@/models/User'
import request from '@/utils/http/axios'
import { HttpMethod } from "@/enums";

export enum UserApi {
  GetUserInfo = 'user/1003'
}

export function getUserInfoApi(): Promise<User> {
  return request({
    url: UserApi.GetUserInfo,
    method: HttpMethod.GET
  })
}

export function getUsersApi({username, province, state, size = 5, page = 1}: UserParams = { size: 5, page: 1}): Promise<Result<User[]>> {
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

export function createUserApi({username, email, mobile, password, address, displayName, avatar, signature}: CreateUser): Promise<Result<User>> {
  return request({
    url: 'user',
    method: HttpMethod.POST,
    data: {
      username,
      email,
      mobile,
      password,
      displayName,
      address,
      avatar,
      signature
    }
  })
}

export function updateUserApi(id: string, {username, mobile, email, password, displayName, address, avatar, signature, amount, state }: UpdateUser): Promise<Result<User>> {
  return request({
    url: `user/${id}`,
    method: HttpMethod.PATCH,
    data: {
      username,
      displayName,
      mobile,
      email,
      address,
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
