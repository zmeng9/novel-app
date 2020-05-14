import React from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import { StyleSheet, View, Text } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card, Icon, ColorfulText, Avatar } from '../../../../components'
import { goToLogin, goToUserInfo } from '../../../../utils'

export interface IListHeaderProps {
  authToken: string | null
  userInfo: any
}

export const ListHeader: React.SFC<IListHeaderProps> = observer(({
  authToken,
  userInfo,
}) => {
  const isDarkMode = useDarkMode()
  const isLogin = authToken && userInfo
  return (
    <Card handle={isLogin ? goToUserInfo : goToLogin}>
      {
        isLogin
          ? (
            <View style={styles.root}>
              <Avatar size='large' uri={userInfo.avatar} />
              <Text style={[styles.username, { color: isDarkMode ? `#aaa` : `#333` }]}>{userInfo.username}</Text>
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
  username: {
    fontSize: 16,
    fontWeight: `300`,
    color: `#333`,
    marginVertical: 10,
  },
})