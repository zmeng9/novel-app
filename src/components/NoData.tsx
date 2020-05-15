import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { ColorfulText } from './ColorfulText'

export interface INoDataProps {
  text?: string
}

export const NoData: React.SFC<INoDataProps> = observer(({
  text = `暂无数据`,
}) => {
  return (
    <View style={styles.root}>
      <ColorfulText color='secondary' text={text} fontSize={18} textAlign='center' />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: `center`,
    alignContent: `center`,
  },
})