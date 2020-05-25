import { request } from '@/utils'


export const getUserInfo = () => {
  return request.get(`/users/info`)
}