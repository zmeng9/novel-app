import { useState, useEffect } from 'react'
import { useIsFirstRender } from './isFirstRender'
import { toast } from '../utils'
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
  const isFirstRender = useIsFirstRender()
  const [data, setData] = useState(null)
  const { setIsLoading, setError, setIsSubmit } = store

  const isForm = typeof setIsSubmit === `function`

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const result = await service(...params)
      if (result) {
        const { code, data = null } = result.data

        if (code) {
          setData(data)
          setError(null)
        }

        setIsLoading(false)
      }
      else {
        toast(`内部服务器错误`)
      }
    } catch (error) {
      setError(error.message)

      console.log(error)

      switch (error.message) {
        case `Network Error`:
          toast(`连接失败，请检查你的网络设置`)
          break
        default:
          toast(`发生意外性错误`)
          break
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