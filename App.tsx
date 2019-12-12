import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from './src/components/Icon'
import {
  Mine,
  Recommend,
  Write,
} from './src/pages'

const App = createBottomTabNavigator(
  {
    Write,
    Recommend,
    Mine,
  },
  {
    initialRouteName: 'Recommend',
    tabBarOptions: {
      activeTintColor: '#333',
      showLabel: false,
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state

        switch (routeName) {
          case 'Mine':
            return <Icon name={`ios-square${focused ? '' : '-outline'}`} />
          case 'Recommend':
            return <Icon name={`ios-time${focused ? '' : 'r'}`} />
          case 'Write':
            return <Icon name={`ios-add-circle${focused ? '' : '-outline'}`} />
          default:
              return <Icon name={`ios-time${focused ? '' : 'r'}`} />
        }
      },
    }),
  }
)

export default createAppContainer(App)