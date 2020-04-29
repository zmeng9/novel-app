import { types } from 'mobx-state-tree'
import {
  CommonState,
  CommonActions,
  FlatListState,
  FlatListViews,
  FlatListActions,
} from '../../common'
import { Novel } from '../../novel'

export const Types = types.model({
  id: types.identifierNumber,
  name: '',
  novels: types.optional(types.array(Novel), [])
})

export const RecommendStore = types
  .model({
    ...CommonState,
    ...FlatListState({ subtype: Types }),
  })
  .views(self => {
    return FlatListViews(self)
  })
  .actions(self => ({
    ...CommonActions(self),
    ...FlatListActions(self),
  }))