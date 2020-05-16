import React from 'react'
export * from './types'
import { light, dark } from './packages'


/* 
 *  The theme palette
 */


export const theme = {
  light,
  dark,
}

// Create the theme context
export const themeContext = React.createContext<typeof theme | null>(null)