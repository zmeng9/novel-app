import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '../../../hooks'
import { Bookrack } from './bookrack'

const Stack = createStackNavigator()

export const BookrackStackNavigator: React.SFC = () => {
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
        name="Bookrack"
        component={Bookrack}
        options={{
          headerTitle: `书架`,
        }}
      />
    </Stack.Navigator>
  )
}