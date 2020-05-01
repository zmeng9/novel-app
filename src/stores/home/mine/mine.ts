import { types } from 'mobx-state-tree'

export const MineStore = types
  .model({
    authToken: types.maybeNull(types.string),
  })
  .actions(self => ({
    setAuthToken(authToken: string | null) {
      self.authToken = authToken
    },
  }))