import { types } from 'mobx-state-tree'
import { CommonState, CommonActions, FormState, FormActions } from '../../common'

export const LoginStore = types
  .model({
    ...FormState,
    ...CommonState({
      isLoading: false,
    }),

    username: '',
    password: '',
  })
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