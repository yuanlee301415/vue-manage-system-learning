import type {QueryParams, Result} from "#/axios";

import User from "@/models/User";
import {State} from "@/enums/state";
import {LetterStatus} from "@/enums/letterStatus";

export type CreateUser = Omit<User, '_id' | 'amount' | 'state' | 'createdAt' | 'roles'>
export type UpdateUser = Omit<User, '_id' | 'createdAt' | 'roles'>

export type UserParams = QueryParams & {username?: string, address?: string, displayName?: string, state?: State }
export type LetterParams = QueryParams & { status?: LetterStatus }

export type LoginParams = Pick<User, 'username'>  & {password: string}
export type LoginResult = Result<{ access_token: string }>
