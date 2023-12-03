import type {Result} from "#/axios";

import request from '@/utils/http/axios'
import {HttpMethod} from "@/enums";

export function getProvinceApi(): Promise<Result<string[]>> {
    return request({
        url: `code/province`,
        method: HttpMethod.GET
    })
}
