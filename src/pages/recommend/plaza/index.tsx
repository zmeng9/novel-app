import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { useStores } from '../../../hooks'

export interface IPlazaProps {

}

const Plaza: React.FC<IPlazaProps> = ({

}) => {
  const { recommendStore } = useStores()
  const { page, tenPage } = recommendStore

  return (
    <View style={styles.root}>
      <Text>Plaza{tenPage} {page}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
})

export default Plaza