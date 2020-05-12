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


export const Type = types.model(`Type`, {
  id: types.identifierNumber,
  name: ``,
  novels: types.optional(types.array(Novel), []),
  ...TimestampsState,
})

export const Recommend = types
  .model({
    ...CommonState(),
    ...FlatListState({ subtype: Type }),
  })
  .views(self => {
    return FlatListViews(self)
  })
  .actions(self => ({
    ...CommonActions(self),
    ...FlatListActions(self),
  }))