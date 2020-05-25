import { ICommonParams } from './common'
import { request } from '@/utils'

export const getRecommends = (params: ICommonParams) => {
  return request.get(`/types/novels`, { params })
}

export const getNovelsByType = (params: ICommonParams) => {
  return request.get(`/types/novels`, { params })
}