import { useState } from 'react'
import { useViewSize } from './viewSize'

export interface IInitialValue {
  initialNumberOfLines: number
  lineHeight: number
}

export const useNumerOfLines = (initialValue: IInitialValue) => {
  const { initialNumberOfLines, lineHeight  } = initialValue
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>(initialNumberOfLines)
  const viewSize = useViewSize()

  const maxHeight = initialNumberOfLines * lineHeight

  const handleNumberOfLines = () => {
    setNumberOfLines(numberOfLines ? undefined : 8)
  }

  return {
    numberOfLines,
    handleNumberOfLines,
    maxHeight,
    ...viewSize
  }
}