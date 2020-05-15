import React from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import { themeContext } from '../theme'


export const useTheme = () => {
  const theme = React.useContext(themeContext)
  const isDarkMode = useDarkMode()
  const mode = isDarkMode ? `dark` : `light`

  if (!theme)
    throw new Error('useTheme must be used within a themeProvider')

  return theme[mode]
}