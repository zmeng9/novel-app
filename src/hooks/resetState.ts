import { useEffect } from "react"

/* 
 * Reset the state when unmount 
 */

export const useResetState = (store: any) => {
  useEffect(() => {
    return () => {
      console.log(`unmount and reset the store`)
      store.reset()
    }
  }, [])
}