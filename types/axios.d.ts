export interface Result<T = any> {
  code: number;
  data: T;
  message?: string;
  total?: number
}


export type Params = {
  _limit?: number
  _page?: number
}
