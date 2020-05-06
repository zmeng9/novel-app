import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../../hooks'
import { removeAuthToken, goBack } from '../../../../utils'
import { Card, ColorfulText } from '../../../../components'


export const Setting: React.FC = observer(() => {
  const { mineStore } = useStores()
  const { setUserInfo, setAuthToken } = mineStore

  const logout = async () => {
    await removeAuthToken()
    setAuthToken(null)
    setUserInfo(null)

    goBack()
  }

  return (
    <View style={styles.root}>
      <Card handle={logout}>
        <ColorfulText type='secondary' text='退出登陆' />
      </Card>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})