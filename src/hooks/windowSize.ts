import { Dimensions } from 'react-native'

export const useWindowSize = () => {
  return Dimensions.get('window')
}