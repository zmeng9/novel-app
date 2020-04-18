import { request } from '../../utils'

export interface IGetNovelsParams {
  limit: number,
  offset: number,
}

export const getNovels = (params: IGetNovelsParams) => {
  return request.get(`/novels`, { params })
}