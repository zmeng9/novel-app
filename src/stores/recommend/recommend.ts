import { types, cast } from 'mobx-state-tree'
import { CommonState, CommonAction } from '../common'
import { unique } from '../../utils'

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

    limit: 3,
    offset: 0,
    refreshLimit: 0,
    isRefreshing: false,
    novels: types.optional(types.array(Novel), []),
    novelsCount: 0,
  })
  .actions(self => ({
    ...CommonAction(self),

    setNovels(novels: Array<any>) {
      const cleanNovels = unique(novels, `id`)
      self.novels = cast(cleanNovels)
    },
    setNovelsCount(novelsCount: number) {
      self.novelsCount = novelsCount
    },
    setLimit(limit: number) {
      self.limit = limit
    },
    setOffset(offset: number) {
      self.offset = offset
    },
    setRefreshLimit(refreshLimit: number) {
      self.refreshLimit = refreshLimit
    },
    setIsRefreshing(isRefreshing: boolean) {
      self.isRefreshing = isRefreshing
    },
  }))