import type {Params, Result} from "#/axios";

import request from '@/utils/http/axios'
import {HttpMethod} from "@/enums";
import Student from '@/models/Student'

export function getStudentsApi({_limit = 10, _page = 1}: Params = {_limit: 10, _page: 1}): Promise<Result<Student[]>> {
    return request({
        url: `student`,
        method: HttpMethod.GET,
        params: {
            _limit,
            _page
        }
    })
}
