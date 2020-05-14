import React from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import { createStackNavigator } from '@react-navigation/stack'
import { Recommend } from './recommend'
import { Plaza } from './plaza'
import { Icon } from '../../../components'
import { goToPlaza, goToSearch } from '../../../utils'

const Stack = createStackNavigator()

export const RecommendStackNavigator: React.SFC = () => {
  const isDarkMode = useDarkMode()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: isDarkMode ? `#fff` : `#333`,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDarkMode ? `#333` : `#fff`,
          borderBottomColor: isDarkMode ? `#222` : `#ddd`,
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
        name='Recommend'
        component={Recommend}
        options={{
          headerTitle: `推荐`,
          headerLeft: () => <Icon name='ios-home' handle={goToPlaza} />,
          headerRight: () => <Icon name='ios-search' handle={goToSearch} />,
        }}
      />
      <Stack.Screen
        name='Plaza'
        component={Plaza}
        options={{
          headerTitle: `广场`
        }}
      />
    </Stack.Navigator>
  )
}