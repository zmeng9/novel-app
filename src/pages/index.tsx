import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './home'
import { Search } from './search'
import { Intro, Reader } from './novel'

const Stack = createStackNavigator()

const StackNavigator: React.SFC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      headerMode='none'
      screenOptions={{
        cardStyle: {
          backgroundColor: `#eee`,
        },
      }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
      />
      <Stack.Screen
        name='Intro'
        component={Intro}
      />
      <Stack.Screen
        name='Reader'
        component={Reader}
      />
      <Stack.Screen
        name='Search'
        component={Search}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator