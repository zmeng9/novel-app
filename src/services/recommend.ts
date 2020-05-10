import { ILimitAndOffset } from '.'
import { request } from '../utils'

export const getRecommends = (params: ILimitAndOffset) => {
  return request.get(`/types/novels`, { params })
}

export const getNovelsByType = (params: ILimitAndOffset) => {
  return request.get(`/types/novels`, { params })
}