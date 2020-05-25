import React, { useEffect, useCallback } from 'react'
import { StyleSheet, FlatList as RnFlatList } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Loading } from './Loading'
import { NoData } from './NoData'
import { useIsFirstRender, useToast } from '@/hooks'

export interface IFlatListProps {
  store: any
  data: any
  refreshData?: any
  noDataText?: string
  alwaysBounceVertical?: boolean
  contentContainerStyle?: Object
  numColumns?: number
  renderItem: ({ item }: any) => React.ReactElement | null
}

export const FlatList: React.FC<IFlatListProps> = observer(({
  store,
  data,
  refreshData,
  noDataText,
  alwaysBounceVertical = false,
  contentContainerStyle = {},
  numColumns = 1,
  renderItem,
}) => {
  const toast = useToast()
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
    itemSize,
    bulkAddToListData,
    bulkUnshiftToListData,
    replaceListData,
    setOffset,
    setRefreshLimit,
    setIsRefreshing,
    setTotalCount,
  } = store

  const totalHeight = (() => {
    const paddingV = 20
    const cloumnCount = Math.ceil(count / numColumns)
    const itemTotalHeight = itemSize.height * cloumnCount
    return !!itemTotalHeight ? itemTotalHeight + paddingV : `100%`
  })()


  useEffect(() => {
    if (data) {
      const { rows = [], count = 0 } = data

      if (offset === 0)
        replaceListData(rows)
      else
        bulkAddToListData(rows)

      setTotalCount(count)
    }
  }, [data])

  // Refreshing data
  useEffect(() => {
    if ((refreshData && isRefreshing) || (refreshData && refreshLimit > 0)) {
      const { rows = [], count = 0 } = refreshData
      // If the count of new listData is more than the pre count of listData 
      if (refreshLimit > 0) {
        bulkUnshiftToListData(rows)
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

  const loadMoreData = useCallback(() => {
    if (!isLoading && (offset < count) && (totalCount > limit))
      setOffset(offset + limit)
  }, [offset, limit, isLoading, count, totalCount])

  const handleRefreshing = useCallback(() => {
    setIsRefreshing(true)
  }, [])

  const keyExtractor = useCallback((item: any) => {
    return String(item.id)
  }, [])

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: itemSize.height,
    offset: itemSize.height * index,
    index,
  }), [])

  return (
    <RnFlatList
      contentContainerStyle={[
        styles.root,
        { height: totalHeight },
        contentContainerStyle,
      ]}
      data={numColumns > 1 ? listData.slice() : listData}
      scrollIndicatorInsets={{ right: 1 }}
      keyboardDismissMode='interactive'
      alwaysBounceVertical={isLoading || alwaysBounceVertical}
      ListEmptyComponent={isLoading ? <Loading /> : <NoData text={noDataText} />}
      ListFooterComponent={(isLoading && totalCount > 0) ? <Loading /> : null}
      refreshing={isRefreshing}
      onRefresh={refreshData === undefined ? null : handleRefreshing}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={limit}
      numColumns={numColumns}
      onEndReachedThreshold={0.1}
      onEndReached={loadMoreData}
      getItemLayout={getItemLayout}
    />
  )
})

const styles = StyleSheet.create({
  root: {
    paddingVertical: 10,
  },
})