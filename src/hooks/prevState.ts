import { useRef, useEffect } from "react"

export const usePrevState = <T>(
  value: T,
  condition: Array<any> = [],
): T => {
  const ref: any = useRef()
  useEffect(() => {
    ref.current = value
  }, condition)
  return ref.current
}