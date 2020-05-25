import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react-lite'


export const Loading: React.SFC = observer(({

}) => {
  return <ActivityIndicator style={styles.root} />
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
  },
})