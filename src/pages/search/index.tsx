import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react'
import { Header } from './Header'

export interface ISearchProps {

}

export const Search: React.FC<ISearchProps> = observer(({

}) => {
  return (
    <View style={styles.root}>
      <Header />
      <Text>Search</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})