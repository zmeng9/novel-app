import React from 'react'
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react-lite'
import { IBaseColorType } from '@/themes'
import { useTheme } from '@/hooks'


export interface IBtnProps {
  text: string
  color?: keyof IBaseColorType
  size?: `large` | `small`
  fullWidth?: boolean
  disabled?: boolean
  isLoading?: boolean
  handle: (...params: any) => void
}

export const Btn: React.SFC<IBtnProps> = observer(({
  text,
  color = `info`,
  size = `small`,
  fullWidth = false,
  disabled = false,
  isLoading = false,
  handle,
}) => {
  const { btn } = useTheme()
  const isSmall = size === `small`

  return (
    <TouchableOpacity
      style={[
        styles[size],
        {
          width: fullWidth ? `100%` : `auto`,
          backgroundColor: disabled ? btn.bg.disabled : btn.bg[color],
        },
      ]}
      disabled={disabled}
      onPress={handle}
    >
      {
        isLoading
          ? <ActivityIndicator />
          : (
            <Text
              style={{
                fontSize: isSmall ? 16 : 18, 
                color: disabled ? btn.text.disabled : btn.text[color],
                textAlign: `center`,
              }}>
              {text}
            </Text>
          )
      }
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  large: {
    alignSelf: `center`,
    marginVertical: 10,
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
})