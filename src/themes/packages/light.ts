import { IPalette } from '../types'

export const light: IPalette = {
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
}