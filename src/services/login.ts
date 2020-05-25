import { request } from '@/utils'

export interface ILogin {
  username: string
  password: string
}

export const login = (data: ILogin) => {
  return request.post(`/users/login`, data)
}