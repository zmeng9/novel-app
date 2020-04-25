import { types } from 'mobx-state-tree'
import {
  CommonState,
  CommonActions,
  FlatListState,
  FlatListViews,
  FlatListActions,
} from '../../common'
import { Novel } from '../../novel'

export const RecommendStore = types
  .model({
    ...CommonState,
    ...FlatListState({ subtype: Novel }),
  })
  .views(self => {
    return FlatListViews(self)
  })
  .actions(self => ({
    ...CommonActions(self),
    ...FlatListActions(self),
  }))