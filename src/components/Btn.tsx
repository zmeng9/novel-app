import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { themeColor, IIhemeColorColor } from '../utils'


export interface IBtnProps {
  text: string
  type?: `solid` | `outline` | `text`
  color?: IIhemeColorColor
  size?: `large` | `small`
  fullWidth?: boolean
  disabled?: boolean
  isLoading?: boolean
  handle: (...params: any) => void
}

export const Btn: React.SFC<IBtnProps> = observer(({
  text,
  type = `solid`,
  color = `default`,
  size = `small`,
  fullWidth = false,
  disabled = false,
  isLoading = false,
  handle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.root,
        styles[size],
        fullWidth ? { width: `100%` } : {},
        type === `solid` ? { backgroundColor: disabled ? `#ccc` : themeColor[color] } : {},
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
                size === `large` && styles.largeBtnText,
                type === `text`
                && {
                  color: color === `secondary`
                    ? themeColor.secondary
                    : themeColor.primary
                }
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
    alignSelf: `center`,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  small: {
    alignSelf: `center`,
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
    fontSize: 16,
  },
  largeBtnText: {
    fontSize: 18,
  },
})