import type {Result} from "#/axios";

import request from '@/utils/http/axios'
import {HttpMethod} from "@/enums";
import Configure from "@/models/Configure";

export function getProvinceApi(): Promise<Result<Configure[]>> {
    return request({
        url: `configure/province`,
        method: HttpMethod.GET
    })
}
