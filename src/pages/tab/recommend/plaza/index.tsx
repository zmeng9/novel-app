import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react'
import { useStores } from '../../../../hooks'

export interface IPlazaProps {

}

const Plaza: React.FC<IPlazaProps> = observer(({

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

export default Plaza