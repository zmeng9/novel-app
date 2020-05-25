import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card, Icon, ColorfulText, Avatar } from '@/components'
import { goToLogin, goToUserInfo } from '@/utils'

export interface IListHeaderProps {
  authToken: string | null
  userInfo: any
}

export const ListHeader: React.SFC<IListHeaderProps> = observer(({
  authToken,
  userInfo,
}) => {
  const isLogin = authToken && userInfo
  return (
    <Card handle={isLogin ? goToUserInfo : goToLogin}>
      {
        isLogin
          ? (
            <View style={styles.root}>
              <Avatar size='large' uri={userInfo.avatar} />
              <ColorfulText text={userInfo.username} />
            </View>
          )
          : (
            <View style={styles.root}>
              <Icon name='ios-contact' size={55} />
              <ColorfulText text='去登陆' />
            </View>
          )
      }
    </Card>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
    paddingVertical: 15,
  },
})