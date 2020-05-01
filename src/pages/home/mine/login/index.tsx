import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { observer } from 'mobx-react'
import { useHeaderHeight } from '@react-navigation/stack'
import { useStores, useWindowSize, useService } from '../../../../hooks'
import { login } from '../../../../services'
import { Input, Btn } from '../../../../components'
import { saveAuthToken, removeAuthToken } from '../../../../utils'


const { height } = useWindowSize()

export interface ILoginProps {

}

export const Login: React.FC<ILoginProps> = observer(({

}) => {
  const headerHeight = useHeaderHeight()
  const { loginStore, mineStore: { setAuthToken } } = useStores()
  const {
    isLoading,
    username,
    password,
    unameOrPwdIsEmpty,
    isSubmit,
    setUsername,
    setPassword,
    setIsSubmit,
  } = loginStore

  const data = useService({
    store: loginStore,
    service: login,
    params: [{ username, password }],
    immedate: false,
    condition: [isSubmit],
  })

  useEffect(() => {
    if (data) {
      (async () => {
        await saveAuthToken(data)
        setAuthToken(data)
      })()
    }
    else {
      (async () => {
        await removeAuthToken()
      })()
    }
  }, data)

  const handleLogin = () => {
    setIsSubmit(true)
  }

  return (
    <KeyboardAvoidingView behavior={'padding'}>
      <ScrollView
        contentContainerStyle={[styles.root, { height: height - headerHeight * 2 }]}
        keyboardShouldPersistTaps='handled'
        scrollEnabled={false}
      >
        <Input
          placeholder='用户名'
          value={username}
          onChangeText={setUsername}
          size='large'
        />
        <Input
          secureTextEntry
          placeholder='密码'
          value={password}
          onChangeText={setPassword}
          size='large'
        />
        <Btn
          text='登陆'
          color='primary'
          size='large'
          disabled={unameOrPwdIsEmpty || isLoading}
          isLoading={isLoading}
          handle={handleLogin}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
})

const styles = StyleSheet.create({
  root: {
    justifyContent: `center`,
    padding: 5,
  },
})