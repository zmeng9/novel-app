import React from 'react'


/* 
 * The interface of theme palette
 */


export interface IBaseColorType {
  info: string
  secondary: string
  primary: string
  warning: string
  success: string
  error: string
}

export interface IInputColorType {
  contain: string
  outline: string
}

export interface IBtnColorType extends IBaseColorType {
  disabled: string
}

export interface IShadowOffset {
  width: number
  height: number
}

export interface IShadow {
  shadowColor?: string
  shadowOffset?: IShadowOffset
  shadowOpacity?: number
  shadowRadius?: number
}

export interface IPalette extends IBaseColorType {
  backgroundColor: string
  paper: string
  divider: string
  text: IBaseColorType
  input: IInputColorType
  btn: {
    bg: IBtnColorType
    text: IBtnColorType
  }
  shadow: IShadow
  shadowOffset: IShadowOffset
}

export interface ITheme {
  light: IPalette
  dark: IPalette
}


/* 
 *  The theme palette
 */


export const theme: ITheme = {
  light: {
    info: `#333`,
    secondary: `#ccc`,
    primary: `#2196f3`,
    success: `#4caf50`,
    warning: `#ff9800`,
    error: `#f44336`,
    backgroundColor: `#f0f0f0`,
    paper: `#fff`,
    divider: `rgba(0, 0, 0, 0.12)`,
    text: {
      info: `#000`,
      secondary: `#333`,
      primary: `#1976d2`,
      success: `#4caf50`,
      warning: `#ff9800`,
      error: `#f44336`,
    },
    input: {
      contain: `#e2e2e2`,
      outline: `#fff`,
    },
    btn: {
      bg: {
        info: `#ddd`,
        secondary: `#ccc`,
        primary: `#2196f3`,
        success: `#4caf50`,
        warning: `#ff9800`,
        error: `#f44336`,
        disabled: `#ccc`,
      },
      text: {
        info: `#000`,
        secondary: `#333`,
        primary: `#fff`,
        success: `#4caf50`,
        warning: `#ff9800`,
        error: `#f44336`,
        disabled: `#777`
      },
    },
    shadow: {
      shadowColor: `#ccc`,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  dark: {
    info: `#ccc`,
    secondary: `#9a0036`,
    primary: `#115293`,
    success: `#388e3c`,
    warning: `#ff9800`,
    error: `#f44336`,
    backgroundColor: `#121212`,
    paper: `#212121`,
    divider: `rgba(255, 255, 255, 0.12)`,
    text: {
      info: `#ccc`,
      secondary: `#aaa`,
      primary: `#115293`,
      success: `#388e3c`,
      warning: `#ff9800`,
      error: `#f44336`,
    },
    input: {
      contain: `#333`,
      outline: `#333`,
    },
    btn: {
      bg: {
        info: `#212121`,
        secondary: `#9a0036`,
        primary: `#115293`,
        success: `#388e3c`,
        warning: `#ff9800`,
        error: `#f44336`,
        disabled: `#555`,
      },
      text: {
        info: `#ccc`,
        secondary: `#aaa`,
        primary: `#ccc`,
        success: `#388e3c`,
        warning: `#ff9800`,
        error: `#f44336`,
        disabled: `#aaa`,
      },
    },
    shadow: {},
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
}

// Create the theme context
export const themeContext = React.createContext<typeof theme | null>(null)