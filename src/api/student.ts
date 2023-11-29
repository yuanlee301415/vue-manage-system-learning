import type {Params, Result} from "#/axios";

import request from '@/utils/http/axios'
import Student from '@/models/Student'

export function getStudentsApi({_limit = 10, _page = 1}: Params = {_limit: 10, _page: 1}): Promise<Result<Student[]>> {
    return request({
        url: `student`,
        method: 'get',
        params: {
            _limit,
            _page
        }
    })
}
