import { request } from '@/utils'

export const getDir = (novelId: number) => {
  return request.get(`/novels/${novelId}/dir`)
}

export const getChapter = (novelId: number, chapterId: number) => {
  return request.get(`/novels/${novelId}/${chapterId}`)
}

export const addToCollections = (novelId: number) => {
  return request.post(`/collections`, { novelId })
}