import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { observer } from 'mobx-react-lite'



export const Write: React.FC = observer(() => {
  return (
    <View style={styles.root}>
      <Text>Write</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})