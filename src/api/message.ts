import type {Result} from "#/axios";
import type {MessageParams} from "#/index";

import request from '@/utils/http/axios'
import {HttpMethod} from "@/enums";
import {Message} from "@/models/Message";
import {MessageStatus} from "@/enums/messageStatus";

export function getMessagesApi({_limit = 10, _page = 1, status}: MessageParams = {
    _limit: 10,
    _page: 1
}): Promise<Result<Message[]>> {
    return request({
        url: `message`,
        method: HttpMethod.GET,
        params: {
            status,
            _limit,
            _page
        }
    })
}

export function updateMessageStatusApi(id: number, status: MessageStatus): Promise<Result<Message>> {
    return request({
        url: `message/${id}`,
        method: HttpMethod.PATCH,
        data: {
            status
        }
    })
}

export function deleteMessageStatusApi(id: number): Promise<Result<Message>> {
    return request({
        url: `message/${id}`,
        method: HttpMethod.DELETE
    })
}
