import { types, applySnapshot } from 'mobx-state-tree'
export * from './flatList'

/* 
 * Common state and action
 */

export const CommonState = {
  isLoading: false,
  error: types.maybeNull(types.string),
}

export const CommonActions = (self: any) => ({
  setIsLoading(isLoading: boolean) {
    self.isLoading = isLoading
  },
  setError(error: string | null) {
    self.error = error
  },
  reset() {
    applySnapshot(self, {})
  },
})