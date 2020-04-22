import Toast from 'react-native-root-toast'

export const toast = (msg: string) => Toast.show(msg, {
  duration: Toast.durations.SHORT,
  position: 100,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 700,
})