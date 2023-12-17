import type { Result } from '#/axios'

import request from '@/utils/http/axios'
import { HttpMethod } from '@/enums'

export function uploadSingleApi(formData: FormData): Promise<Result<{ url: string }>> {
  return request({
    url: `upload/single`,
    method: HttpMethod.POST,
    data: formData
  })
}

export function uploadMultiApi(formData: FormData): Promise<Result<{ url: string }>> {
  return request({
    url: `upload/multi`,
    method: HttpMethod.POST,
    data: formData
  })
}
