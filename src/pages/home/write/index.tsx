import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Write } from './write'

const Stack = createStackNavigator()

export const WriteStackNavigator: React.SFC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: `#333`,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Write" component={Write} />
    </Stack.Navigator>
  )
}