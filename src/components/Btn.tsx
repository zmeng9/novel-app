import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react'

export interface IBtnProps {
  text: string
  colorType?: `dark` | `light`
  handle: (...params: any) => void
}

export const Btn: React.SFC<IBtnProps> = observer(({
  text,
  colorType = `light`,
  handle,
}) => {
  return (
    <TouchableOpacity style={[styles.root, styles[colorType]]} onPress={handle}>
      <Text style={styles.btnText} numberOfLines={4} ellipsizeMode='tail' >{text}</Text>
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
  light: {
    backgroundColor: `#2d98da`,
  },
  dark: {
    backgroundColor: `#333`,
  },
  btnText: {
    color: `#fff`,
    fontSize: 15,
  },
})