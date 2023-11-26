import type {Params} from "#/axios";

import UserModel from "@/models/UserModel";
import {State} from "@/enums/state";

export type CreateUser = Omit<UserModel, 'id' | 'date' | 'money' | 'state'>
export type UpdateUser = Omit<UserModel, 'id' | 'date' | 'name'>

export type UserParams = Params & {address?: string, name?: string, state?: State}

