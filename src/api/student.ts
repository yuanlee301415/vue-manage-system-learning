import type {QueryParams, Result} from "#/axios";

import request from '@/utils/http/axios'
import {HttpMethod} from "@/enums";
import Student from '@/models/Student'

export function getStudentsApi({size, page}: QueryParams): Promise<Result<Student[]>> {
    return request({
        url: `student`,
        method: HttpMethod.GET,
        params: {
            size,
            page
        }
    })
}

export function importStudentsApi(students: Student[]): Promise<Result<Student[]>> {
    return request({
        url: `student/import`,
        method: HttpMethod.POST,
        data: students
    })
}
