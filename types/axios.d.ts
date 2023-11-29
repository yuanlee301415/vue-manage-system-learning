export interface Result<T = any> {
  code: number;
  data: T;
  total: number
}

export type Params = {
  _limit?: number
  _page?: number
}
