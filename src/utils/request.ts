import axios, { AxiosResponse } from 'axios'
import { loadAuthToken, removeAuthToken } from './storage'
import { logger, consoleTheme } from './logger'
import { isEmptyObj } from './helper'
import { toast } from './toast'

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
    config.headers.common['Authorization'] = `bearer ${authToken}`

  const { url, method, params, data } = config

  if (!isEmptyObj(params))
    logger.debug(url as string, method as string, `Query: `, consoleTheme.testing, params)
  if (!isEmptyObj(data))
    logger.debug(url as string, method as string, `Body: `, consoleTheme.testing, data)

  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use((res: AxiosResponse) => {
  const { data, config } = res
  const { baseURL, url, method } = config
  const regBaseURL = new RegExp((baseURL as string), '')
  const reqUrl = (url as string).replace(regBaseURL, '')

  const { code, msg, error } = data

  // Status is 200
  if (!code && !error) {
    toast(msg)
    logger.debug(reqUrl, method as string, `Opt fail: `, consoleTheme.fail, msg || data)
  }
  else
    logger.debug(reqUrl, method as string, `Result: `, consoleTheme.important, data.data || data)

  return res
}, async (error: any) => {
  const { response, config } = error

  if (response) {
    const { status, data } = response
    const { baseURL, url, method } = config
    const regBaseURL = new RegExp((baseURL as string), '')
    const reqUrl = (url as string).replace(regBaseURL, '')

    switch (status) {
      case 400:
      case 404:
        return logger.debug(reqUrl, method as string, `Client error: `, consoleTheme.error, data)
      case 401:
        await removeAuthToken()
        return logger.debug(reqUrl, method as string, `Unauthorized error: `, consoleTheme.error, data)
      case 500:
        return logger.debug(reqUrl, method as string, `Server error: `, consoleTheme.error, data)
      default:
        return logger.debug(reqUrl, method as string, `Unexpected error: `, consoleTheme.error, data)
    }
  }

  return Promise.reject(error)
})

export default request