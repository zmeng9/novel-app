import React from 'react'
import { observer } from 'mobx-react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native'
import { useStores } from '../../../hooks'
import {
  Icon,
} from '../../../components'

const Recommend: NavigationStackScreenComponent = observer(({
  navigation,
}) => {
  const { recommendStore } = useStores()
  const { page, tenPage } = recommendStore

  return (
    <View style={styles.root}>
      <Text>{page} {tenPage}</Text>
      <Button title='+' onPress={() => recommendStore.changePage()} />
    </View>
  )
})

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