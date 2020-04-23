import { types, cast } from 'mobx-state-tree'
import {
  CommonState,
  CommonActions,
  FlatListState,
  FlatListViews,
  FlatListActions,
} from '../common'

const Type = types.model({
  id: types.identifierNumber,
  name: '',
})

const Author = types.model({
  id: types.identifierNumber,
  mobile: '',
  username: '',
  avatar: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  gender: types.maybeNull(types.number),
  age: types.maybeNull(types.number),
  birthday: types.maybeNull(types.Date),
  isAdmin: false,
})

const Novel = types.model({
  id: types.identifierNumber,
  title: '',
  authorId: -1,
  author: Author,
  typeId: -1,
  type: Type,
  cover: '',
  info: types.maybeNull(types.string),
})

export const RecommendStore = types
  .model({
    ...CommonState,
    ...FlatListState(Novel),
  })
  .views(self => {
    return FlatListViews(self)
  })
  .actions(self => ({
    ...CommonActions(self),
    ...FlatListActions(self),
  }))