import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export interface IMineProps {

}

const Mine: React.FC<IMineProps> = ({

}) => {
  return (
    <View style={styles.root}>
      <Text>Mine</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
})

export default Mine