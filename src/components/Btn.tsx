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
  handle: () => void
}

export const Btn: React.SFC<IBtnProps> = observer(({
  text,
  handle,
}) => {
  return (
    <TouchableOpacity style={styles.root} onPress={handle}>
      <Text style={styles.btnText}>{text}</Text>
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
    backgroundColor: '#333',
  },
  btnText: {
    color: `#fff`,
    fontSize: 16,
  },
})