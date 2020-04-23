import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { BlurView } from 'expo-blur'
import { Recommend } from './recommend'
import { Plaza } from './plaza'
import { Icon } from '../../../components'
import { goToPlaza, goToSearch } from '../../../utils'

const Stack = createStackNavigator()

const RecommendStackNavigator: React.SFC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: `#eee`,
        },
        headerTintColor: '#333',
        // headerTransparent: true,
        // headerBackground: () => (
        //   <BlurView intensity={100} style={StyleSheet.absoluteFill} />
        // ),
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

export default RecommendStackNavigator