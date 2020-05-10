import { types } from 'mobx-state-tree'
import { CommonState, CommonActions } from '../common'
import { UserInfo } from '../novel'


export const MineStore = types
  .model({
    ...CommonState(),

    authToken: types.maybeNull(types.string),
    userInfo: types.maybeNull(UserInfo),
  })
  .actions(self => ({
    ...CommonActions(self),
    
    setAuthToken(authToken: string | null) {
      self.authToken = authToken
    },
    setUserInfo(userInfo: any) {
      self.userInfo = userInfo
    },
  }))