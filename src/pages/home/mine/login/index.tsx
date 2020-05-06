import React, { useEffect, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { useStores, useService } from '../../../../hooks'
import { login, getUserInfo } from '../../../../services'
import { KeyboardAvoidingScrollView, Input, Btn } from '../../../../components'
import { saveAuthToken, goBack, goToReg } from '../../../../utils'


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
    condition: [isSubmit],
  })

  const userInfoData = useService({
    store: mineStore,
    service: getUserInfo,
    isFetch: Boolean(authToken),
    immedate: false,
    condition: [authToken],
  })

  useEffect(() => {
    if (data) {
      (async () => {
        const { token = '' } = data
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
    <KeyboardAvoidingScrollView centerContent>
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
      <View style={styles.loginBtn}>
        <Btn
          fullWidth
          text='登陆'
          color='primary'
          size='large'
          disabled={unameOrPwdIsEmpty || isLoading}
          isLoading={isLoading}
          handle={handleLogin}
        />
      </View>
      <Btn
        text='去注册'
        type='text'
        size='large'
        handle={goToReg}
      />
    </KeyboardAvoidingScrollView>
  )
})

const styles = StyleSheet.create({
  loginBtn: {
    marginHorizontal: 15,
  },
})