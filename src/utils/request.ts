import axios from 'axios'
import { loadAuthToken, removeAuthToken } from './storage'
import { logger } from './logger'
import { isEmptyObj } from './helper'


const localBaseURL = `http://localhost:8000`
const apiURL = `https://api.tuscanyyy.top`

const request = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': `application/json`,
  },
})

request.interceptors.request.use(async (config: any) => {
  const authToken = await loadAuthToken()

  if (authToken)
    config.headers.common['Authorization'] = `Bearer ${authToken}`

  const { url, params, data } = config
  const method = config.method.toUpperCase()

  if (!isEmptyObj(params))
    logger.info(`<-- ${method} ${url} Query: `, params)
  if (!isEmptyObj(data))
    logger.info(`<-- ${method} ${url} Body: `, data)
  else
    logger.info(`<-- ${method} ${url}`)

  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use((res: any) => {
  const { data, config } = res
  const { url } = config
  const method = config.method.toUpperCase()

  const { code, msg, error } = data

  // Status is 200
  if (!code && !error)
    logger.warn(`--> ${method} ${url} Opt fail: `, msg || data)
  else
    logger.success(`--> ${method} ${url} Result: `, data.data || data)

  return res
}, async (error: any) => {
  const { response, config } = error

  if (response) {
    const { status, data } = response
    const { url } = config
    const method = config.method.toUpperCase()

    switch (status) {
      case 400:
      case 404:
        return logger.error(`--> ${method} ${url} Client error: `, data)
      case 401:
        await removeAuthToken()
        return logger.error(`--> ${method} ${url} Unauthorized error: `, data)
      case 500:
        return logger.error(`--> ${method} ${url} Server error: `, data)
      default:
        return logger.error(`--> ${method} ${url} Unexpected error: `, data)
    }
  }

  return Promise.reject(error)
})

export default request