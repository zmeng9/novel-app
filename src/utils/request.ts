import axios, { AxiosResponse } from 'axios'
import { loadAuthToken } from './storage'
import { logger, consoleTheme } from './logger'
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

  if (params && params !== {})
    logger.debug(url as string, method as string, `Params: `, consoleTheme.testing, params)
  if (data && data !== {})
    logger.debug(url as string, method as string, `Data: `, consoleTheme.testing, data)

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
}, (error: any) => {
  const { response, config } = error

  if (response) {
    const { status, data } = response
    const { baseURL, url, method } = config
    const regBaseURL = new RegExp((baseURL as string), '')
    const reqUrl = (url as string).replace(regBaseURL, '')

    switch (status) {
      case 400:
        logger.debug(reqUrl, method as string, `Client error: `, consoleTheme.error, data)
        break
      case 401:
        logger.debug(reqUrl, method as string, `Unauthorized error: `, consoleTheme.error, data)
        break
      case 500:
        logger.debug(reqUrl, method as string, `Server error: `, consoleTheme.error, data)
        break
      default:
        logger.debug(reqUrl, method as string, `Unexpected error: `, consoleTheme.error, data)
        break
    }
  }

  return Promise.reject(error)
})

export default request