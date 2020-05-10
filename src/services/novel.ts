import { ILimitAndOffset } from '.'
import { request } from '../utils'

export interface IGetNovelsParams extends ILimitAndOffset {
  title?: string
}

export const getNovels = (params: IGetNovelsParams) => {
  return request.get(`/novels`, { params })
}

export const getNovel = (novelId: number) => {
  return request.get(`/novels/${novelId}`)
}

export const getHotNovels = (params: ILimitAndOffset) => {
  return request.get(`/novels/hot`, { params })
}