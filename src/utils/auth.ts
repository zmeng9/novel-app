import AsyncStorage from '@react-native-community/async-storage'

const tokenKeyName = `authToken`

// Load token from async storage
export const loadToken = async() => {
  return await AsyncStorage.getItem(tokenKeyName)
}

// Save token from async storage
export const saveToken = (token: string) => {
    AsyncStorage.setItem(tokenKeyName, token)
}

// Remove token from async storage
export const removeToken = () => {
  AsyncStorage.removeItem(tokenKeyName)
}