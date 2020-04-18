import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { BlurView } from 'expo-blur'
import Tab from './tab'
import { Intro, Chapter } from './novel'

const Stack = createStackNavigator()

const StackNavigator: React.SFC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Tab'
      headerMode='none'
      screenOptions={{
        cardStyle: {
          backgroundColor: `#eee`,
        },
      }}
    >
      <Stack.Screen
        name='Tab'
        component={Tab}
      />
      <Stack.Screen
        name='Intro'
        component={Intro}
        options={{
          headerTitle: '简介'
        }}
      />
      <Stack.Screen
        name='Chapter'
        component={Chapter}
        options={{
          headerTitle: 'Chapter'
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator