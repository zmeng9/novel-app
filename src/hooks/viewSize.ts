import { useState } from 'react'

export const useViewSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  return {
    size,
    setSize,
  }
}