import { types } from 'mobx-state-tree'
import { findById } from '@/utils'


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
})

export const FlatListActions = (self: any) => ({
  addToListData(item: any) {
    // self.ulkRemoveIsExistItemsFromListData(self.listData, item)

    self.listData.push(item)
  },
  unshiftToListData(item: any) {
    // self.ulkRemoveIsExistItemsFromListData(self.listData, item)

    self.listData.unshift(item)
  },
  removeFromListData(item: any) {
    self.listData.remove(item)
  },
  bulkAddToListData(listData: Array<any>) {
    // self.listData.forEach((item: any) => {
    //   self.ulkRemoveIsExistItemsFromListData(listData, item)
    // })

    self.listData.push(...listData)
  },
  bulkUnshiftToListData(listData: Array<any>) {
    // self.listData.forEach((item: any) => {
    //   self.ulkRemoveIsExistItemsFromListData(listData, item)
    // })

    self.listData.unshift(...listData)
  },
  // bulkRemoveIsExistItemsFromListData(listData: Array<any>, item: any) {
  //   const isFound = findById(listData, item.id)

  //   if (isFound)
  //     self.removeFromListData(item)
  // },
  resetListData() {
    self.listData.clear()
  },
  replaceListData(listData: Array<any>) {
    self.listData.replace(listData)
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