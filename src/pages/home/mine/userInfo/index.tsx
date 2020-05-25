import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores } from '@/hooks'
import { removeAuthToken, goBack } from '@/utils'
import { ListItem } from '@/components'


export const UserInfo: React.FC = observer(() => {
  const { mineStore, bookrackStore } = useStores()

  const logout = useCallback(async () => {
    await removeAuthToken()
    
    mineStore.reset()
    bookrackStore.reset()

    goBack()
  }, [])

  return (
    <View style={styles.root}>
      <ListItem type='center' text='退出登陆' colorfulTextType='error' handle={logout} />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})