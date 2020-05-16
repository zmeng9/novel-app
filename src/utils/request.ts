import axios from 'axios'
import { loadAuthToken, removeAuthToken } from './storage'
import { logger, consoleTheme } from './logger'
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
    logger.debug(`<-- ${method}`, url, `Query: `, consoleTheme.testing, params)
  if (!isEmptyObj(data))
    logger.debug(`<-- ${method}`, url, `Body: `, consoleTheme.testing, data)
  else
    logger.debug(`<-- ${method}`, url, ``, consoleTheme.testing)

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
    logger.debug(`--> ${method}`, url, `Opt fail: `, consoleTheme.fail, msg || data)
  else
    logger.debug(`--> ${method}`, url, `Result: `, consoleTheme.important, data.data || data)

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
        return logger.debug(`--> ${method}`, url, `Client error: `, consoleTheme.error, data)
      case 401:
        await removeAuthToken()
        return logger.debug(`--> ${method}`, url, `Unauthorized error: `, consoleTheme.error, data)
      case 500:
        return logger.debug(`--> ${method}`, url, `Server error: `, consoleTheme.error, data)
      default:
        return logger.debug(`--> ${method}`, url, `Unexpected error: `, consoleTheme.error, data)
    }
  }

  return Promise.reject(error)
})

export default request