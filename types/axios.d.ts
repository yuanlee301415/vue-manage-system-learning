export interface Result<T = any> {
  code: number;
  data: T;
  message?: string;
  total?: number
}

export interface QueryParams {
  page?: number;
  size?: number;
  keyword?: string;
  [key: string]: any;
}
