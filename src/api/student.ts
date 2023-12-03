import type {QueryParams, Result} from "#/axios";

import request from '@/utils/http/axios'
import {HttpMethod} from "@/enums";
import Student from '@/models/Student'

export function getStudentsApi({size = 10, page = 1}: QueryParams = {size: 10, page: 1}): Promise<Result<Student[]>> {
    return request({
        url: `student`,
        method: HttpMethod.GET,
        params: {
            size,
            page
        }
    })
}
