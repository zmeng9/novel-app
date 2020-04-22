import { useState, useEffect } from 'react'
import { toast } from '../utils'

export interface IService {
  store: any,
  service: any
  params?: any
  isSend?: boolean
  condition?: Array<any>
  beforeHandle?: () => void
}

export const useService = ({
  store,
  service,
  params,
  isSend = true,
  condition = [],
  beforeHandle,
}: IService): any => {
  const [data, setData] = useState(null)
  const { setIsLoading, setError, reset } = store

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await service(...params)
      const { code, data } = result.data
      if (code) {
        setData(data)
        setError(null)
        setIsLoading(false)
      }
    } catch (error) {
      setError(error.message)

      switch (error.message) {
        case `Network Error`:
          toast(`连接失败，请检查你的网络设置`)
          break
        default:
          toast(`发生意外性错误`)
          break
      }
    }
  }

  useEffect(() => {

    // Do something before 
    if (beforeHandle)
      beforeHandle()

    if (isSend)
      fetchData()
  }, condition)

  return data
}