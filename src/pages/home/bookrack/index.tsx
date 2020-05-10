import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Bookrack } from './bookrack'

const Stack = createStackNavigator()

export const BookrackStackNavigator: React.SFC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: `#333`,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Bookrack"
        component={Bookrack}
        options={{
          headerTitle: `书架`,
        }}
      />
    </Stack.Navigator>
  )
}