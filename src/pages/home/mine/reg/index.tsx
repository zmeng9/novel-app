import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react-lite'


export const Reg: React.FC = observer(({

}) => {
  return (
    <View style={styles.root}>
      <Text>Reg</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})