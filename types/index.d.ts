import type {Params} from "#/axios";

import User from "@/models/User";
import {State} from "@/enums/state";
import {MessageStatus} from "@/enums/messageStatus";

export type CreateUser = Omit<User, 'id' | 'date' | 'money' | 'state'>
export type UpdateUser = Omit<User, 'id' | 'date' | 'name'>

export type UserParams = Params & { address?: string, name?: string, state?: State }
export type MessageParams = Params & { status?: MessageStatus }

