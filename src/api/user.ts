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

export function getUsersApi({address, name, state, _limit = 5, _page = 1}: UserParams = { _limit: 5, _page: 1}): Promise<Result<User[]>> {
  return request({
    url: 'user',
    method: HttpMethod.GET,
    params: {
      address_like: address,
      name_like: name,
      state,
      _limit,
      _page
    }
  })
}

export function createUserApi({address, name, avatar, desc}: CreateUser): Promise<Result<User>> {
  return request({
    url: 'user',
    method: HttpMethod.POST,
    data: {
      address,
      avatar,
      desc,
      name
    }
  })
}

export function updateUserApi(id: number, {address, avatar, desc, money, state }: UpdateUser): Promise<Result<User>> {
  return request({
    url: `user/${id}`,
    method: HttpMethod.PATCH,
    data: {
      address,
      avatar,
      desc,
      money,
      state
    }
  })
}

export function deleteUserApi(id: number): Promise<Result<User>> {
  return request({
    url: `user/${id}`,
    method: HttpMethod.DELETE
  })
}
