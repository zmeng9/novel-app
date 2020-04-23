import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { BlurView } from 'expo-blur'
import Mine from './mine'

const Stack = createStackNavigator()

const MineStackNavigator: React.SFC = () => {
  return (
    <Stack.Navigator
      initialRouteName='MineIndex'
      screenOptions={{
        cardStyle: {
          backgroundColor: `#eee`,
        },
        headerTransparent: true,
        headerTintColor: '#333',
        headerTitleStyle: {
          flexGrow: 1,
          textAlign: 'center',
          alignSelf: 'center',
        },
        headerBackground: () => (
          <BlurView intensity={100} style={StyleSheet.absoluteFill} />
        ),
      }}
    >
      <Stack.Screen name="MineIndex" component={Mine} />
    </Stack.Navigator>
  )
}

export default MineStackNavigator