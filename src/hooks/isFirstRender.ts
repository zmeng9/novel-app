import { useRef, useEffect } from "react"

export const useIsFirstRender = () => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender)
      isFirstRender.current = false
  }, [isFirstRender])

  return isFirstRender.current
}