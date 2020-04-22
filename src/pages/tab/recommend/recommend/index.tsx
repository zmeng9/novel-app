import React, { useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native'
import {
  useStores,
  useService,
  useIsFirstRender,
} from '../../../../hooks'
import { getNovels } from '../../../../services'
import { Loading, NoData } from '../../../../components'
import { toast, unique } from '../../../../utils'
import Novel from './Novel'

const Recommend: React.FC = observer(() => {
  const { recommendStore } = useStores()
  const isFirstRender = useIsFirstRender()

  const {
    isLoading,
    error,
    limit,
    offset,
    refreshLimit,
    isRefreshing,
    novels,
    novelsCount,
    setNovels,
    setOffset,
    setRefreshLimit,
    setIsRefreshing,
    setNovelsCount,
  } = recommendStore

  // Service
  const data = useService({
    store: recommendStore,
    service: getNovels,
    params: [{ limit, offset }],
    condition: [offset, limit],
  })

  const refreshData = useService({
    store: recommendStore,
    service: getNovels,
    params: [{ limit: refreshLimit, offset: 0 }],
    isSend: isRefreshing || (refreshLimit > 0),
    condition: [isRefreshing, refreshLimit],
  })

  useEffect(() => {
    if (data) {
      const { rows = [], count = 0 } = data
      /* 
       * 1. Put the data to the behind of array
       * 2. Clean the repeat object by id in array
       */
      const newNovels = [...novels, ...rows]

      setNovels(newNovels)
      setNovelsCount(count)
    }
  }, [data])

  // Refreshing data
  useEffect(() => {
    if ((refreshData && isRefreshing) || (refreshData && refreshLimit > 0)) {
      const { rows = [], count = 0 } = refreshData
      // If the count of new novels is more than the pre count of novels 
      if (refreshLimit > 0) {
        const newNovels = [...rows, ...novels]

        setNovels(newNovels)
        setRefreshLimit(0)

        toast(`已更新一组内容`)
        return
      }
      if (count > novelsCount) {
        const newNovelCount = count - novelsCount
        setRefreshLimit(newNovelCount)
        setNovelsCount(count)
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
    if (error) {
      setIsRefreshing(false)
      setRefreshLimit(3)
    }
  }, [error, isRefreshing])

  const loadMoreData = useCallback(() => {
    if (!isFirstRender)
      setOffset(offset + limit)
  }, [isFirstRender, offset, limit])

  const handleRefreshing = useCallback(() => {
    setIsRefreshing(true)
  }, [])

  const keyExtractor = useCallback((item: any) => {
    return String(item.id)
  }, [])

  const renderItem = useCallback(({ item }: any) => (
    <Novel novel={item} />
  ), [])

  return (
    <View style={styles.root}>
      <FlatList
        contentContainerStyle={styles.container}
        data={novels}
        ListEmptyComponent={isLoading ? <Loading /> : <NoData />}
        ListFooterComponent={(isLoading && novelsCount > 0) ? <Loading /> : null}
        refreshing={isRefreshing}
        onRefresh={handleRefreshing}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={limit}
        numColumns={1}
        onEndReachedThreshold={0.01}
        onEndReached={loadMoreData}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
  },
  container: {
    minHeight: `100%`,
    padding: 5,
  },
})

export default Recommend