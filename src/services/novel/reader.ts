import { request } from '../../utils'

export const getDir = (novelId: number) => {
  return request.get(`/chapters/dir/${novelId}`)
}

export const getChapter = (novelId: number, chapterId: number) => {
  return request.get(`/chapters/${novelId}/${chapterId}`)
}