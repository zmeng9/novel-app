import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from '@/components'
import { useTheme } from '@/hooks'
import { goToSetting } from '@/utils'
import { Mine } from './mine'
import { Login } from './login'
import { Reg } from './reg'
import { Setting } from './setting'
import { UserInfo } from './userInfo'

const Stack = createStackNavigator()

export const MineStackNavigator: React.SFC = () => {
  const { text, paper, divider, shadowOffset, backgroundColor } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: text.info,
        headerBackTitleVisible: false,
        headerTitleAlign: `center`,
        headerStyle: {
          backgroundColor: paper,
          borderBottomColor: divider,
          shadowOffset,
        },
        cardStyle: {
          backgroundColor,
        },
      }}
    >
      <Stack.Screen
        name='Mine'
        component={Mine}
        options={{
          headerTitle: `我的`,
          headerRight: () => <Icon name='ios-cog' handle={goToSetting} />,
        }}
      />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerTitle: `登陆`
        }}
      />
      <Stack.Screen
        name='Reg'
        component={Reg}
        options={{
          headerTitle: `注册`
        }}
      />
      <Stack.Screen
        name='Setting'
        component={Setting}
        options={{
          headerTitle: `设置`
        }}
      />
      <Stack.Screen
        name='UserInfo'
        component={UserInfo}
        options={{
          headerTitle: `个人信息`
        }}
      />
    </Stack.Navigator>
  )
}