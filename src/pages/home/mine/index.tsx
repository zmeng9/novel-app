import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Mine from './mine'

const Stack = createStackNavigator()

const MineStackNavigator: React.SFC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: `#333`,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name='Mine'
        component={Mine}
        options={{
          headerTitle: `我的`
        }}
      />
    </Stack.Navigator>
  )
}

export default MineStackNavigator