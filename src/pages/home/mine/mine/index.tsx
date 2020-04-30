import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { useStores } from '../../../../hooks'
import { Login } from '../login'

export interface IMineProps {

}

const Mine: React.FC<IMineProps> = ({

}) => {
  const { mineStore } = useStores()
  const {
    authToken,
  } = mineStore

  return (
    <View style={styles.root}>
      {
        authToken
          ? <Text>Mine</Text>
          : <Login />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
})

export default Mine