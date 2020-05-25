import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useTheme } from '@/hooks'
import { IBaseColorType } from '@/themes'


export interface IColorfulTextProps {
  color?: keyof IBaseColorType
  fontWeight?: `normal` | `bold` | `300`
  lineHeight?: number
  text: string
  numberOfLines?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  fontSize?: number
  textAlign?: `auto` | `center`
  handle?: () => void
}

export const ColorfulText: React.SFC<IColorfulTextProps> = observer(({
  color = `info`,
  fontWeight = `normal`,
  text,
  numberOfLines,
  marginTop = 5,
  marginBottom = 5,
  marginLeft = 5,
  marginRight = 5,
  fontSize = 16,
  lineHeight = fontSize + 2,
  textAlign = `auto`,
  handle,
}) => {
  const { text: themeText } = useTheme()

  return (
    <TouchableWithoutFeedback onPress={handle} disabled={!(typeof handle === `function`)}>
      <Text
        numberOfLines={numberOfLines}
        style={{
          fontSize,
          fontWeight,
          lineHeight,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          color: themeText[color],
          textAlign,
        }}
      >
        {text}
      </Text>
    </TouchableWithoutFeedback>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})