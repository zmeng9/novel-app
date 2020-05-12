import { types } from 'mobx-state-tree'
import { CommonState, CommonActions, FormState, FormActions } from '../common'

export const Login = types
  .model(`Login`, {
    ...FormState,
    ...CommonState({
      isLoading: false,
    }),

    username: '',
    password: '',
  })
  .views(self => ({
    get unameOrPwdIsEmpty() {
      return !(self.username.trim().length && self.password.trim().length)
    }
  }))
  .actions(self => ({
    ...CommonActions(self),
    ...FormActions(self),

    setUsername(username: string) {
      self.username = username
    },
    setPassword(password: string) {
      self.password = password
    },
  }))