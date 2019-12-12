import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export interface IWriteProps {

}

const Write: React.FC<IWriteProps> = ({

}) => {
  return (
    <View style={styles.root}>
      <Text>Write</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
})

export default Write