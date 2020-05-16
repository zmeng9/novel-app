import React from 'react'
import { useDarkModeContext } from 'react-native-dark-mode'
import { themeContext } from '../themes'


export const useTheme = () => {
  const theme = React.useContext(themeContext)
  const mode = useDarkModeContext()

  if (!theme)
    throw new Error('useTheme must be used within a themeProvider')

  return theme[mode]
}