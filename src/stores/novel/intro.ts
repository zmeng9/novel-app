import { types, Instance } from 'mobx-state-tree'
import {
  CommonState,
  CommonActions,
} from '../common'


export const Type = types.model({
  id: types.identifierNumber,
  name: '',
})

export const Author = types.model({
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

export const Novel = types.model({
  id: -1,
  title: '',
  authorId: -1,
  author: types.maybeNull(Author),
  typeId: -1,
  type: types.maybeNull(Type),
  cover: '',
  info: types.maybeNull(types.string),
  announcement: types.maybeNull(types.string),
  clickNum: 0,
  likeNum: 0,
  collectionNum: 0,
})

export const IntroStore = types
  .model({
    ...CommonState,
    novel: types.maybeNull(Novel),
  })
  .actions(self => ({
    ...CommonActions(self),

    setNovel(novel: Instance<typeof Novel>) {
      self.novel = novel
    },
  }))

