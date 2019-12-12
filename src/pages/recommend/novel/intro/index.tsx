import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export interface IIntroProps {

}

const Intro: React.FC<IIntroProps> = ({

}) => {
  return (
    <View style={styles.root}>
      <Text>Intro</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
})

export default Intro