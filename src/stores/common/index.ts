import { types, applySnapshot } from 'mobx-state-tree'
export * from './flatList'
export * from './form'

/* 
 * Common state and action
 */

export interface ICommonState {
  isLoading?: boolean
}

export const CommonState = ({
  isLoading = true,
}: ICommonState = {}) => ({
  isLoading,
  error: types.maybeNull(types.string),
})

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