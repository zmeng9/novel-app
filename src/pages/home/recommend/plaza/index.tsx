import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores } from '@/hooks'

export interface IPlazaProps {

}

export const Plaza: React.FC<IPlazaProps> = observer(({

}) => {
  const { recommendStore } = useStores()

  return (
    <View style={styles.root}>
      <Text>Plaza</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})