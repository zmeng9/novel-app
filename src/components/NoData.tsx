import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react'

export interface INoDataProps {
  text?: string
}

export const NoData: React.SFC<INoDataProps> = observer(({
  text = `暂无数据`,
}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: `center`,
    alignContent: `center`,
  },
  text: {
    textAlign: `center`,
    fontSize: 18,
  },
})