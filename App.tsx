import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StoreProvider } from './src/stores'
import StackNavigator from './src/pages'

const App: React.SFC = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </StoreProvider>
  )
}

export default App