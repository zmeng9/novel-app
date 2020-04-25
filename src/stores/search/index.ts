import { types, cast } from 'mobx-state-tree'
import {
  CommonState,
  CommonActions,
  FlatListState,
  FlatListViews,
  FlatListActions,
} from '../common'
import { Novel } from '../novel'

export const hotNovel = types.model({
  id: types.identifierNumber,
  title: '',
  clickNum: 0,
})

export const SearchStore = types
  .model({
    ...CommonState,
    ...FlatListState({
      subtype: Novel,
      immedate: false,
    }),

    searchText: '',
    searchHistory: types.maybeNull(types.array(types.string)),
    isSubmit: false,
    hotLimit: 8,
    hotNovels: types.optional(types.array(hotNovel), []),
  })
  .views(self => {
    return FlatListViews(self)
  })
  .actions(self => ({
    ...CommonActions(self),
    ...FlatListActions(self),

    setSearchText(searchText: string) {
      self.searchText = searchText
    },
    setSearchHistory(searchHistory: Array<string> | null) {
      self.searchHistory = cast(searchHistory)
    },
    setIsSubmit(isSubmit: boolean) {
      self.isSubmit = isSubmit
    },
    setHotNovels(hotNovels: Array<any>) {
      self.hotNovels = cast(hotNovels)
    },
  }))