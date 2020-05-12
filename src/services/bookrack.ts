import { request } from '../utils'
import { ICommonParams } from './common'


export const getCollections = (id: number, params: ICommonParams) => {
  return request.get(`users/${id}/collections`, { params })
}

export const removeCollection = (id: number) => {
  return request.delete(`/collections/${id}`)
}