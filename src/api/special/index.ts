import { HTTP } from '..'
// 获取专题列表
export const getSpecialList = (specialId: number): Promise<{ data: { data: object[] } }> => {
  return HTTP.get(`/special/${specialId}/articles`, { data: { a: 1 } })
}
