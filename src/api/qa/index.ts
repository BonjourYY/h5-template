import { HTTP } from '..'
import type { QA } from './type'

export const readQA = (tag: number): Promise<QA[]> => {
  return HTTP.get('client/qa', { params: { tag } })
}

export const searchQA = (search: string): Promise<QA[]> => {
  return HTTP.get('client/qa', { params: { search } })
}
