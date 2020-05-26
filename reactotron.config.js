import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { mst } from 'reactotron-mst'

Reactotron
  .setAsyncStorageHandler(AsyncStorage) 
  .configure() 
  .useReactNative()
  .use(mst())
  .connect()