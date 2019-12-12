import { createStackNavigator } from 'react-navigation-stack'
import Recommend from './recommend'
import Plaza from './plaza'
import Intro from './novel/intro'

export default createStackNavigator(
  {
    Recommend,
    Plaza,
    Intro,
  },
  {
    initialRouteName: 'Recommend',
    defaultNavigationOptions: {
      headerTintColor: '#333',
      headerTitleStyle: {
        flexGrow: 1,
        textAlign: 'center', 
        alignSelf: 'center',
      },
    },
  }
)