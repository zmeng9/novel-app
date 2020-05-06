import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react-lite'

export interface INoDataProps {
  text?: string
  isSearch?: boolean
}

export const NoData: React.SFC<INoDataProps> = observer(({
  text = `暂无数据`,
  isSearch = false,
}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{isSearch ? `无搜索结果` : text}</Text>
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