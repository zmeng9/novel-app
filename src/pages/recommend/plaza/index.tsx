import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export interface IPlazaProps {

}

const Plaza: React.FC<IPlazaProps> = ({

}) => {
  return (
    <View style={styles.root}>
      <Text>Plaza</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
})

export default Plaza