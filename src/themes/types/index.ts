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