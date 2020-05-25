import React, { useEffect, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores, useService } from '@/hooks'
import { login, getUserInfo } from '@/services'
import { KeyboardAvoidingScrollView, Input, Btn, ColorfulText } from '@/components'
import { saveAuthToken, goBack, goToReg } from '@/utils'


export const Login: React.FC = observer(() => {
  const { loginStore, mineStore } = useStores()
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
  const { authToken, setAuthToken, setUserInfo } = mineStore

  const data = useService({
    store: loginStore,
    service: login,
    params: [{ username, password }],
    isFetch: isSubmit,
    immedate: false,
    deps: [isSubmit],
  })

  const userInfoData = useService({
    store: mineStore,
    service: getUserInfo,
    isFetch: !!authToken,
    immedate: false,
    deps: [authToken],
  })

  useEffect(() => {
    if (data) {
      (async () => {
        const { token = `` } = data
        await saveAuthToken(token)
        setAuthToken(token)
      })()
    }
  }, [data])

  useEffect(() => {
    if (userInfoData) {
      setUserInfo(userInfoData)
      goBack()
    }
  }, [userInfoData])

  const handleLogin = useCallback(() => {
    setIsSubmit(true)
  }, [])

  return (
    <KeyboardAvoidingScrollView centerContent paddingHorizontal={15}>
      <Input
        placeholder='用户名'
        size='large'
        value={username}
        onChangeText={setUsername}
      />
      <Input
        secureTextEntry
        size='large'
        placeholder='密码'
        value={password}
        onChangeText={setPassword}
      />
      <Btn
        fullWidth
        text='登陆'
        color='primary'
        size='large'
        disabled={unameOrPwdIsEmpty || isLoading}
        isLoading={isLoading}
        handle={handleLogin}
      />
      <View>
        <ColorfulText
          text='去注册'
          color='primary'
          fontSize={18}
          marginTop={15}
          textAlign='center'
          handle={goToReg}
        />
      </View>
    </KeyboardAvoidingScrollView>
  )
})

const styles = StyleSheet.create({
})