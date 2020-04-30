import { types } from 'mobx-state-tree'
import { loadAuthToken } from '../../../utils'

export const MineStore = types
  .model({
  })
  .views(self => ({
    get authToken() {
      let authToken = null
      loadAuthToken()
        .then(result => {
          authToken = result
        })
        .catch(e => {
          authToken = null
        })
      return authToken
    }
  }))