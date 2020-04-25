import { ILimitAndOffset } from '../..'
import { request } from '../../../utils'

export const getRecommends = (params: ILimitAndOffset) => {
  return request.get(`/novels`, { params })
}