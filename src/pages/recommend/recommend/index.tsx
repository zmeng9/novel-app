import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import {
  Icon,
} from '../../../components'

const Recommend: NavigationStackScreenComponent = ({
  navigation,
}) => {
  return (
    <View style={styles.root}>
      <Text>Recommend</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
})

Recommend.navigationOptions = ({ navigation }) => {
  const goToPlaza = () => {
    navigation.navigate('Plaza')
  }

  return {
    headerTitle: '推荐',
    headerLeft: () => <Icon name='ios-home' handle={goToPlaza} />,
    headerRight: () => <Icon name='ios-search' handle={goToPlaza} />,
  }
}

export default Recommend