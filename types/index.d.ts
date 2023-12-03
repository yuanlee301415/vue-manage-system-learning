import type {QueryParams} from "#/axios";

import User from "@/models/User";
import {State} from "@/enums/state";
import {MessageStatus} from "@/enums/messageStatus";

export type CreateUser = Omit<User, 'id' | 'state'>
export type UpdateUser = Omit<User, 'id' | 'name'>

export type UserParams = QueryParams & {username?: string, address?: string, displayName?: string, state?: State }
export type MessageParams = QueryParams & { status?: MessageStatus }

