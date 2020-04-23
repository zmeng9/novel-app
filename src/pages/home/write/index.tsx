import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { BlurView } from 'expo-blur'
import Write from './write'

const Stack = createStackNavigator()

const WriteStackNavigator: React.SFC = () => {
  return (
    <Stack.Navigator
      initialRouteName='WriteIndex'
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
      <Stack.Screen name="WriteIndex" component={Write} />
    </Stack.Navigator>
  )
}

export default WriteStackNavigator