import React, { useEffect } from 'react'
import 'mobx-react-lite/batchingForReactNative'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import { useDarkModeContext } from 'react-native-dark-mode'
import { StoresContext, stores } from './src/stores'
import { ThemeContext, themes } from './src/themes'
import Reactotron from 'reactotron-react-native'
import StackNavigator from './src/pages'
import { navigationRef, isMountedRef } from './src/utils'
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'

console.disableYellowBox = true

/* 
 * 1. Start config when the development environment
 * 2. Import reactotron to watch changes in mst 
 */

if (__DEV__) {
  import('./reactotron.config')
    .then(() => {
      Reactotron.trackMstNode!(stores)
    })
}

const AppContainer: React.SFC = () => {
  // Get the theme mode
  const mode = useDarkModeContext()

  // Hide the screen image
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  // Set the mounted ref
  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  return (
    <ThemeContext.Provider value={themes[mode]}>
      <StoresContext.Provider value={stores}>
        <NavigationContainer ref={navigationRef}>
          <StackNavigator />
        </NavigationContainer>
      </StoresContext.Provider>
    </ThemeContext.Provider>
  )
}

const ConnectedApp = connectActionSheet(AppContainer)

const App: React.SFC = () => (
  <ActionSheetProvider>
    <ConnectedApp />
  </ActionSheetProvider>
)

export default App