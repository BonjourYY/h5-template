export interface PageMeta {
  isFirstPage: boolean
  isLastPage: boolean
  currentPage: number
  previousPage: number | null
  nextPage: number | null
  pageCount: number
  totalCount: number
}

// 定义整个分页响应的接口
export interface PageResponse<T> {
  list: T[]
  meta: PageMeta
}

// 分页请求参数类型
export interface PageRequest {
  page: number
  limit: number
}
