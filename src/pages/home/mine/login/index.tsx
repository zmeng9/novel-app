import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react'
import { useStores, useService } from '../../../../hooks'
import { login } from '../../../../services'
import { KeyboardAvoidingScrollView, Input, Btn, ViewSize } from '../../../../components'
import { saveAuthToken, removeAuthToken } from '../../../../utils'


export interface ILoginProps {

}

export const Login: React.FC<ILoginProps> = observer(({

}) => {
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
    <KeyboardAvoidingScrollView hasHeader centerContent>
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
    </KeyboardAvoidingScrollView>
  )
})

const styles = StyleSheet.create({
  root: {
    backgroundColor: `#ccc`,
    flex: 1,
    justifyContent: `center`,
  },
})