import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'


/* 
 * Reset the state when unmount 
 */

export const useResetState = (store: any) => {
  useFocusEffect(
    useCallback(() => {
      return () => store.reset()
    }, [])
  )
}