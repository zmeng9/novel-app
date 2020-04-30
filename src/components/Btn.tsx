import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react'
import { useWindowSize } from '../hooks'
import { themeColor, IIhemeColorColor } from '../utils'


const { width } = useWindowSize()

export interface IBtnProps {
  text: string
  color?: IIhemeColorColor
  size?: `large` | `small`
  handle?: (...params: any) => void
}

export const Btn: React.SFC<IBtnProps> = observer(({
  text,
  color = `default`,
  size = `small`,
  handle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.root,
        styles[size],
        { backgroundColor: themeColor[color] },
      ]}
      disabled={typeof handle !== `function`}
      onPress={handle}
    >
      <Text style={[
        styles[color],
        size === `large` ? styles.largeBtnText : styles.smallBtnText
      ]}>{text}</Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  root: {
  },
  large: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    paddingVertical: 10,
  },
  small: {
    margin: 5,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  default: {
    color: `#000`,
  },
  primary: {
    color: `#fff`,
  },
  secondary: {
    color: `#fff`,
  },
  largeBtnText: {
    fontSize: 18,
    textAlign: `center`,
  },
  smallBtnText: {
    fontSize: 15,
    textAlign: `center`,
  },
})