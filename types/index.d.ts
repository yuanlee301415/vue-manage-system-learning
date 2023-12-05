import type {QueryParams} from "#/axios";

import User from "@/models/User";
import {State} from "@/enums/state";
import {LetterStatus} from "@/enums/letterStatus";

export type CreateUser = Omit<User, '_id' | 'amount' | 'state'>
export type UpdateUser = Omit<User, '_id'>

export type UserParams = QueryParams & {username?: string, address?: string, displayName?: string, state?: State }
export type LetterParams = QueryParams & { status?: LetterStatus }

