import { types } from 'mobx-state-tree'
import { Novel } from '../novel'
import {
  TimestampsState,
  CommonState,
  CommonActions,
  FlatListState,
  FlatListViews,
  FlatListActions,
} from '../common'

export const Collection = types.model({
  id: types.identifierNumber,
  novel: Novel,
  ...TimestampsState,
})


export const Bookrack = types
  .model(`Bookrack`, {
    ...CommonState(),
    ...FlatListState({
      limit: 12,
      subtype: Collection,
    }),
  })
  .views(self => {
    return FlatListViews(self)
  })
  .actions(self => ({
    ...CommonActions(self),
    ...FlatListActions(self),
  }))