import React from 'react'
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import { observer } from 'mobx-react'

const { height } = Dimensions.get('window')

export const Loading: React.SFC = observer(({

}) => {
  return <ActivityIndicator style={styles.root} />
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 10,
  },
})