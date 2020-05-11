import { types, cast } from 'mobx-state-tree'
import { uniqueById } from '../../utils'


/* 
 * Flat list state, views and actions
 */


export interface IFlatListState {
  subtype: any
  limit?: number
}

export const ItemSize = types.model({
  width: 0,
  height: 0,
})

export const FlatListState = ({
  subtype,
  limit = 3,
}: IFlatListState) => ({
  listData: types.optional(types.array(subtype), []),
  totalCount: 0,
  limit,
  offset: 0,
  refreshLimit: 0,
  isRefreshing: false,
  itemSize: types.optional(ItemSize, {
    width: 0,
    height: 0,
  }),
})

export const FlatListViews = (self: any) => ({
  get count() {
    return self.listData.length
  },
  get totalHeight() {
    const paddingV = 20
    const itemTotalHeight = self.itemSize.height * self.count
    return !!itemTotalHeight ? itemTotalHeight + paddingV : `100%`
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
  setItemSize(itemSize: any) {
    self.itemSize = itemSize
  },
})