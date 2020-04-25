import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react'
import { themeColor, IIhemeColorColor } from '../utils'

export interface IBtnProps {
  text: string
  color?: IIhemeColorColor
  handle: (...params: any) => void
}

export const Btn: React.SFC<IBtnProps> = observer(({
  text,
  color = `default`,
  handle,
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.root, 
        {
          backgroundColor: themeColor[color],
        }
      ]} 
      onPress={handle}
    >
      <Text style={[styles.btnText, styles[color]]} numberOfLines={4} ellipsizeMode='tail' >{text}</Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  root: {
    margin: 5,
    alignItems: `center`,
    alignSelf: `flex-start`,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
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
  btnText: {
    fontSize: 15,
  },
})