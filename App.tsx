import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import { storesContext, stores } from './src/stores'
import Reactotron from 'reactotron-react-native'
import StackNavigator from './src/pages'

console.disableYellowBox = true

/* 
 * 1. Start config when the development environment
 * 2. Import reactotron to watch changes in mst 
 */

if (__DEV__) {
  import('./ReactotronConfig')
    .then(() => {
      Reactotron.trackMstNode!(stores)
    })
}

const App: React.SFC = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <storesContext.Provider value={stores}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </storesContext.Provider>
  )
}

export default App