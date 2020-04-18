import { useState, useEffect } from 'react'

export const useService = (
  service: any,
  params: any,
  isSend: boolean = true,
  condition: Array<any> = [],
  beforeHandle?: () => void,
): any => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    const result = await service(...params)
    const { code, data } = result.data
    if (code) {
      setData(data)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    
    // Do something before 
    if (beforeHandle)
      beforeHandle()
    
    if (isSend)
      fetchData()
  }, condition)

  return [data, isLoading]
}