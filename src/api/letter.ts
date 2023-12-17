import type { Result } from '#/axios'
import type { LetterParams } from '#/index'

import request from '@/utils/http/axios'
import { HttpMethod } from '@/enums'
import { Letter } from '@/models/Letter'
import { LetterStatus } from '@/enums/letterStatus'

export function getLettersApi(
  { size = 10, page = 1, status }: LetterParams = {
    size: 10,
    page: 1
  }
): Promise<Result<Letter[]>> {
  return request({
    url: `letter`,
    method: HttpMethod.GET,
    params: {
      status,
      size,
      page
    }
  })
}

export function updateLetterStatusApi(
  ids: string[],
  status: LetterStatus
): Promise<Result<Letter>> {
  return request({
    url: `letter/status/${status}`,
    method: HttpMethod.PATCH,
    data: ids
  })
}

export function deleteLettersApi(ids: string[]): Promise<Result<Letter>> {
  return request({
    url: `letter`,
    method: HttpMethod.DELETE,
    data: ids
  })
}
