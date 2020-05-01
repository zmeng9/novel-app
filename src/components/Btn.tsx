import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native'
import { observer } from 'mobx-react'
import { themeColor, IIhemeColorColor } from '../utils'


export interface IBtnProps {
  text: string
  color?: IIhemeColorColor
  size?: `large` | `small`
  disabled?: boolean
  isLoading?: boolean
  handle: (...params: any) => void
}

export const Btn: React.SFC<IBtnProps> = observer(({
  text,
  color = `default`,
  size = `small`,
  disabled = false,
  isLoading = false,
  handle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.root,
        styles[size],
        { backgroundColor: disabled ? `#ccc` : themeColor[color] },
      ]}
      disabled={disabled}
      onPress={handle}
    >
      {
        isLoading
          ? <ActivityIndicator />
          : (
            <Text
              style={[
                styles.text,
                styles[color],
                size === `large` ? styles.largeBtnText : styles.smallBtnText
              ]}>
              {text}
            </Text>
          )
      }
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
  text: {
    textAlign: `center`,
  },
  largeBtnText: {
    fontSize: 18,
  },
  smallBtnText: {
    fontSize: 15,
  },
})