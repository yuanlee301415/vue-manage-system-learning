import type {Result} from "#/axios";

import request from '@/utils/http/axios'
import {HttpMethod} from "@/enums";



export function uploadApi(formData: FormData): Promise<Result<{url: string}>> {
    return request({
        url: `upload`,
        method: HttpMethod.POST,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
