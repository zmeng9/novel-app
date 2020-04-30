import React from 'react'
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


const { width, height } = useWindowSize()

export interface ILoginProps {

}

export const Login: React.FC<ILoginProps> = observer(({

}) => {
  const headerHeight = useHeaderHeight()
  const { loginStore } = useStores()
  const {
    username,
    password,
    isSubmit,
    setUsername,
    setPassword,
    setIsSubmit,
  } = loginStore

  const data = useService({
    store: loginStore,
    service: login,
  })

  const handleLogin = () => {
    setIsSubmit(true)
  }

  return (
    <KeyboardAvoidingView behavior={'padding'}>
      <ScrollView
        contentContainerStyle={[styles.root, { height: height - headerHeight * 2 }]}
        scrollEnabled={false}
      >
        <Input
          placeholder='用户名'
          value={username}
          onChangeText={setUsername}
          size='large'
        />
        <Input
          placeholder='密码'
          value={password}
          onChangeText={setPassword}
          size='large'
        />
        <Btn text='登陆' color='primary' size='large' handle={handleLogin} />
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