import { useState, useEffect } from 'react'
import { useIsFirstRender } from './isFirstRender'
import { useToast } from './toast'
import _ from 'lodash'

export interface IService {
  store: any,
  service: (...params: any) => any
  params?: Array<any>
  isFetch?: boolean
  immedate?: boolean
  setDataNull?: boolean
  deps?: Array<any>
  beforeHandle?: () => void
}

export const useService = ({
  store,
  service,
  params = [],
  isFetch = true,
  immedate = true,
  setDataNull = false,
  deps = [],
  beforeHandle,
}: IService): any => {
  const toast = useToast()
  const isFirstRender = useIsFirstRender()
  const [data, setData] = useState(null)
  const { error, setIsLoading, setError, setIsSubmit } = store

  const isForm = typeof setIsSubmit === `function`

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const result = await service(...params)
      if (result) {
        const { code, data = null, msg } = result.data

        if (code) {
          setData(data)

          if (error)
            setError(null)
        }
        else if (!code && !error)
          toast(msg)

        setIsLoading(false)
      }
      else
        toast(`内部服务器错误`)
    } catch (error) {
      setError(error.message)

      switch (error.message) {
        case `Network Error`:
          return toast(`连接失败，请检查你的网络设置`)
        default:
          return toast(`发生意外性错误`)
      }
    } finally {
      if (isForm)
        setIsSubmit(false)
    }
  }

  useEffect(() => {
    if (setDataNull)
      setData(null)

    if (immedate || !isFirstRender) {

      // Do something before 
      if (beforeHandle)
        beforeHandle()

      if (isFetch)
        fetchData()
    }


  }, deps)

  return data
}