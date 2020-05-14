import React from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import { createStackNavigator } from '@react-navigation/stack'
import { Bookrack } from './bookrack'

const Stack = createStackNavigator()

export const BookrackStackNavigator: React.SFC = () => {
  const isDarkMode = useDarkMode()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: isDarkMode ? `#fff` : `#333`,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDarkMode ? `#333` : `#fff`,
          shadowOffset: isDarkMode ? {
            width: 0,
            height: 0,
          }: {
            width: 1,
            height: 1,
          },
        },
        cardStyle: {
          backgroundColor: isDarkMode ? `#000` : `#eee`,
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