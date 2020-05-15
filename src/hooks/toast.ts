import Toast from 'react-native-root-toast'
import { useTheme } from './theme'

export const useToast = () => {
  const { text, paper } = useTheme()

  return (msg: string) => Toast.show(msg, {
    duration: Toast.durations.SHORT,
    position: 100,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 700,
    backgroundColor: text.info,
    textColor: paper,
  })
}