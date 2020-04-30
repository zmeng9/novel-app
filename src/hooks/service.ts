import { useState, useEffect } from 'react'
import { useIsFirstRender } from './isFirstRender'
import { toast } from '../utils'

export interface IService {
  store: any,
  service: any
  params?: any
  isFetch?: boolean
  immedate?: boolean
  setDataNull?: boolean
  condition?: Array<any>
  beforeHandle?: () => void
}

export const useService = ({
  store,
  service,
  params,
  isFetch = true,
  immedate = true,
  setDataNull = false,
  condition = [],
  beforeHandle,
}: IService): any => {
  const isFirstRender = useIsFirstRender()
  const [data, setData] = useState(null)
  const { setIsLoading, setError, setIsSubmit } = store

  const fetchData = async () => {
    setIsLoading(true)

    const isForm = typeof setIsSubmit === `function`

    try {
      const result = await service(...params)
      const { code, data } = result.data

      if (code) {
        setData(data)
        setError(null)
        setIsLoading(false)

        if (isForm)
          setIsSubmit(false)
      }
    } catch (error) {
      setError(error.message)
      setIsLoading(false)

      if (isForm)
        setIsSubmit(false)

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
    if (immedate || !isFirstRender) {
      // Do something before 
      if (beforeHandle)
        beforeHandle()

      if (isFetch)
        fetchData()
    }
    if (setDataNull)
      setData(null)
  }, condition)

  return data
}