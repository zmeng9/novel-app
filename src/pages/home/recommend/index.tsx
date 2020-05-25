import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@/hooks'
import { Recommend } from './recommend'
import { Plaza } from './plaza'
import { Icon } from '@/components'
import { goToPlaza, goToSearch } from '@/utils'

const Stack = createStackNavigator()

export const RecommendStackNavigator: React.SFC = () => {
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