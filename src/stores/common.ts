import { types } from 'mobx-state-tree'
export { resetObj } from '../utils'

export const CommonState = {
  isLoading: false,
  error: types.maybeNull(types.string),
}

export const CommonAction = (self: any) => ({
  setIsLoading(isLoading: boolean) {
    self.isLoading = isLoading
  },
  setError(error: string | null) {
    self.error = error
  },
})