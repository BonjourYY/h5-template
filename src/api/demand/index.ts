import { HTTP } from '..'
import type { PageRequest, PageResponse } from '../type'
import type { CreateDemandDto, Demand } from './type'

// 创建需求
export const createDemand = (data: CreateDemandDto) => {
  return HTTP.post('/client/demand', data)
}

// 获取需求
export const readDemand = (params: PageRequest): Promise<PageResponse<Demand>> => {
  return HTTP.get('/client/demand', { params })
}
