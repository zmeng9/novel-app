import { types, cast } from 'mobx-state-tree'
import {
  CommonState,
  CommonActions,
  FlatListState,
  FlatListViews,
  FlatListActions,
  FormState,
  FormActions,
} from '../common'
import { Novel } from '../novel'

export const hotNovel = types.model({
  id: types.identifierNumber,
  title: '',
  clickNum: 0,
})

export const Search = types
  .model({
    ...FormState,
    ...CommonState(),
    ...FlatListState({ subtype: Novel }),

    searchText: '',
    searchHistory: types.maybeNull(types.array(types.string)),
    hotLimit: 8,
    hotNovels: types.optional(types.array(hotNovel), []),
  })
  .views(self => {
    return FlatListViews(self)
  })
  .actions(self => ({
    ...CommonActions(self),
    ...FlatListActions(self),
    ...FormActions(self),

    setSearchText(searchText: string) {
      self.searchText = searchText
    },
    setSearchHistory(searchHistory: Array<string> | null) {
      self.searchHistory = cast(searchHistory)
    },
    setHotNovels(hotNovels: Array<any>) {
      self.hotNovels = cast(hotNovels)
    },
  }))