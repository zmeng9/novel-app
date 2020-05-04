import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react'
import { useStores } from '../../../../hooks'
import { Btn } from '../../../../components'
import { removeAuthToken } from '../../../../utils'
import { Login } from '../login'


const Mine: React.FC = observer(() => {
  const { mineStore } = useStores()
  const {
    authToken,
    setAuthToken,
  } = mineStore

  const logout = async () => {
    await removeAuthToken()
    setAuthToken(null)
  }

  return (
    <View style={styles.root}>
      {
        authToken
          ? <Btn text='退出登陆' handle={logout} />
          : <Login />
      }
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

export default Mine