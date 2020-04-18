import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { BlurView } from 'expo-blur'
import Recommend from './recommend'
import Plaza from './plaza'
import { Icon } from '../../../components'
import { goToPlaza } from '../../../utils'

const Stack = createStackNavigator()

const RecommendStackNavigator: React.SFC = () => {
  return (
    <Stack.Navigator
      initialRouteName='RecommendIndex'
      screenOptions={{
        cardStyle: {
          backgroundColor: `#eee`,
        },
        headerTransparent: true,
        headerTintColor: '#333',
        headerBackground: () => (
          <BlurView intensity={100} style={StyleSheet.absoluteFill} />
        ),
      }}
    >
      <Stack.Screen
        name="RecommendIndex"
        component={Recommend}
        options={{
          headerTitle: '推荐',
          headerLeft: () => <Icon name='ios-home' handle={goToPlaza} />,
          headerRight: () => <Icon name='ios-search' handle={goToPlaza} />,
        }}
      />
      <Stack.Screen
        name="Plaza"
        component={Plaza}
        options={{
          headerTitle: '广场'
        }}
      />
    </Stack.Navigator>
  )
}

export default RecommendStackNavigator