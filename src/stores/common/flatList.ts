import { types, cast } from 'mobx-state-tree'
import { uniqueById } from '../../utils'


/* 
 * Flat list state, views and actions
 */


export const FlatListState = (
  subtype: any,
  limit: number = 3,
) => ({
  listData: types.optional(types.array(subtype), []),
  totalCount: 0,
  limit,
  offset: 0,
  refreshLimit: 0,
  isRefreshing: false,
  itemHeight: 0,
})

export const FlatListViews = (self: any) => ({
  get count() {
    return self.listData.length
  },
  get totalHeight() {
    const paddingV = 10
    const h = self.itemHeight * self.listData.length
    return Boolean(h) ? h + paddingV : `100%`
  },
})

export const FlatListActions = (self: any) => ({
  setListData(listData: Array<any>) {
    const cleanListData = uniqueById(listData)
    self.listData = cast(cleanListData)
  },
  setTotalCount(totalCount: number) {
    self.totalCount = totalCount
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
  setItemHeight(itemHeight: number) {
    self.itemHeight = itemHeight
  },
})