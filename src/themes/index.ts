import React from 'react'
export * from './types'
import { light, dark } from './packages'
import { IPalette } from './types'


/* 
 *  The theme palette
 */


export const themes = {
  light,
  dark,
}

// Create the theme context
export const ThemeContext = React.createContext<IPalette>(themes.light)