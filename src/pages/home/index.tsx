import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '../../components'
import Mine from './mine'
import Recommend from './recommend'
import Write from './write'
import { setNavigation } from '../../utils'

const Tab = createBottomTabNavigator()

const HomeTab: React.SFC = () => {
  
  // Set navigation
  const navigation = useNavigation()
  setNavigation(navigation)
  
  return (
    <Tab.Navigator
      initialRouteName='Recommend'
      tabBarOptions={{
        activeTintColor: '#333',
        showLabel: false,
      }}
      screenOptions={({ route, navigation }) => ({
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

export default HomeTab