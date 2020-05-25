import { request } from '@/utils'

export interface IRatingData {
  novelId: number
  rating: number
}

export const createRating = (data: IRatingData) => {
  return request.post(`/ratings`, data)
}