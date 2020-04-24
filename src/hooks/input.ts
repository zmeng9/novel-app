import { useState } from "react"

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue)

  const onChangeText = (text: string) => {
    setValue(text)
  }

  return {
    value,
    onChangeText,
  }
}