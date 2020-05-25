import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { observer } from 'mobx-react-lite'
import { ListItem } from '@/components'

export const Setting: React.FC = observer(() => {
  return (
    <ScrollView 
      contentContainerStyle={styles.root}
      alwaysBounceVertical={false}
    >
      <ListItem leftText='隐私' isNavigator />
      <ListItem leftText='版本号' rightText='v1.0.0' />
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  root: {
    paddingVertical: 5,
  },
})