import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '../../components'
import { MineStackNavigator as Mine } from './mine'
import { RecommendStackNavigator as Recommend } from './recommend'
import { WriteStackNavigator as Write } from './write'


const Tab = createBottomTabNavigator()

export const HomeTab: React.SFC = () => {
  return (
    <Tab.Navigator
      initialRouteName='Recommend'
      tabBarOptions={{
        activeTintColor: '#333',
        showLabel: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const routeName = route.name

          switch (routeName) {
            case `Mine`:
              return <Icon name={`ios-square${focused ? '' : '-outline'}`} />
            case `Recommend`:
              return <Icon name={`ios-time${focused ? '' : 'r'}`} />
            case `Write`:
              return <Icon name={`ios-add-circle${focused ? '' : '-outline'}`} />
            default:
              return <Icon name={`ios-time${focused ? '' : 'r'}`} />
          }
        },
      })}
    >
      <Tab.Screen name='Write' component={Write} />
      <Tab.Screen name="Recommend" component={Recommend} />
      <Tab.Screen name="Mine" component={Mine} />
    </Tab.Navigator>
  )
}