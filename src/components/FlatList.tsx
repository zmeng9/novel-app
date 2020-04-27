import React, { useEffect, useCallback } from 'react'
import { StyleSheet, FlatList as RnFlatList } from 'react-native'
import { observer } from 'mobx-react'
import { Loading } from './Loading'
import { NoData } from './NoData'
import { useIsFirstRender } from '../hooks'
import { toast } from '../utils'

export interface IFlatListProps {
  store: any
  data: any
  refreshData?: any
  renderItem: (item: any) => React.ReactElement | null
}

export const FlatList: React.FC<IFlatListProps> = observer(({
  store,
  data,
  refreshData,
  renderItem,
}) => {
  const isFirstRender = useIsFirstRender()

  const {
    isLoading,
    error,
    limit,
    offset,
    refreshLimit,
    isRefreshing,
    listData,
    count,
    totalCount,
    itemHeight,
    totalHeight,
    setListData,
    setOffset,
    setRefreshLimit,
    setIsRefreshing,
    setTotalCount,
  } = store

  useEffect(() => {
    if (data) {
      const { rows = [], count = 0 } = data

      // Put the data to the behind of array
      const newListData = [...listData, ...rows]

      setListData(newListData)
      setTotalCount(count)
    }
  }, [data])

  // Refreshing data
  useEffect(() => {
    if ((refreshData && isRefreshing) || (refreshData && refreshLimit > 0)) {
      const { rows = [], count = 0 } = refreshData
      // If the count of new listData is more than the pre count of listData 
      if (refreshLimit > 0) {

        // Put the data to the front of array
        const newListData = [...rows, ...listData]

        setListData(newListData)
        setRefreshLimit(0)

        toast(`已更新`)
        return
      }
      if (count > totalCount) {
        const newDataCount = count - totalCount
        setRefreshLimit(newDataCount)
        setTotalCount(count)
        setIsRefreshing(false)
      }
      else {
        toast(`暂无新的内容`)
      }

      setIsRefreshing(false)
    }
  }, [refreshData])

  /* 
   * 1. Refreshing new Data is happening error
   * 2. Set refresh limit be 3 beacuse the user maybe refreshing when error is not
   */

  useEffect(() => {
    if (!isFirstRender && error) {
      setIsRefreshing(false)
      setRefreshLimit(3)
    }
  }, [error, isRefreshing])

  const loadMoreData = useCallback(({ distanceFromEnd }: any) => {
    if (!isFirstRender && !isLoading && distanceFromEnd && (totalCount > limit))
      setOffset(offset + limit)
  }, [isFirstRender, offset, limit, totalCount, isLoading])

  const handleRefreshing = useCallback(() => {
    setIsRefreshing(true)
  }, [])

  const keyExtractor = useCallback((item: any) => {
    return String(item.id)
  }, [])

  const getItemLayout = (data: any, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  })

  const _renderItem = useCallback(({ item }: any) => {
    return renderItem(item)
  }, [])

  return (
    <RnFlatList
      contentContainerStyle={[styles.root, { height: totalHeight }]}
      data={listData}
      bounces={count > 0 || isLoading}
      ListEmptyComponent={isLoading ? <Loading /> : <NoData isSearch />}
      ListFooterComponent={(isLoading && totalCount > 0) ? <Loading /> : null}
      refreshing={isRefreshing}
      onRefresh={refreshData === undefined ? null : handleRefreshing}
      keyExtractor={keyExtractor}
      renderItem={_renderItem}
      initialNumToRender={limit}
      numColumns={1}
      onEndReachedThreshold={0.1}
      onEndReached={loadMoreData}
      getItemLayout={getItemLayout}
    />
  )
})

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
})