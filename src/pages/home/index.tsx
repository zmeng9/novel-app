import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '../../components'
import { MineStackNavigator as Mine } from './mine'
import { RecommendStackNavigator as Recommend } from './recommend'
import { BookrackStackNavigator as Bookrack } from './bookrack'


const Tab = createBottomTabNavigator()

export const HomeTab: React.SFC = () => {
  return (
    <Tab.Navigator
      initialRouteName='Recommend'
      tabBarOptions={{
        activeTintColor: `#333`,
        showLabel: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const routeName = route.name

          switch (routeName) {
            case `Mine`:
              return <Icon name={`ios-square${focused ? `` : `-outline`}`} />
            case `Recommend`:
              return <Icon name={`ios-${focused ? `time` : `timer`}`} />
            case `Bookrack`:
              return <Icon name={`ios-${focused ? `film` : `filing`}`} />
            default:
              return <Icon name={`ios-${focused ? `time` : `timer`}`} />
          }
        },
      })}
    >
      <Tab.Screen name='Bookrack' component={Bookrack} />
      <Tab.Screen name="Recommend" component={Recommend} />
      <Tab.Screen name="Mine" component={Mine} />
    </Tab.Navigator>
  )
}