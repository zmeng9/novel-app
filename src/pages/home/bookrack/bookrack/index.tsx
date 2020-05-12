import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View } from 'react-native'
import { useStores, useService } from '../../../../hooks'
import { getCollections, removeCollection } from '../../../../services'
import { FlatList } from '../../../../components'
import { Novel } from './Novel'
import _ from 'lodash'


export const Bookrack: React.FC = observer(() => {
  const { bookrackStore, mineStore } = useStores()
  const {
    limit,
    offset,
    refreshLimit,
    isRefreshing,
    removeFromListData,
    setItemSize,
  } = bookrackStore
  const { authToken, userInfo } = mineStore
  const userId = _.get(userInfo, `id`, -1)

  const data = useService({
    store: bookrackStore,
    service: getCollections,
    isFetch: !!authToken || !!~userId,
    params: [userId, { limit, offset }],
    deps: [offset, limit],
  })

  const refreshData = useService({
    store: bookrackStore,
    service: getCollections,
    params: [userId, { limit: refreshLimit, offset: 0 }],
    isFetch: isRefreshing || (refreshLimit > 0),
    deps: [isRefreshing, refreshLimit],
  })

  const handleSetItemSize = useCallback((itemSize: any) => {
    setItemSize(itemSize)
  }, [])

  // Rmove the collection
  const handleRemoveCollection = useCallback((collection: any, id: number) => {
    removeFromListData(collection)
    removeCollection(id)
  }, [])

  const renderItem = useCallback(({ item }: any) => (
    <Novel
      collection={item}
      setSize={handleSetItemSize}
      handleRemoveCollection={handleRemoveCollection}
    />
  ), [])

  return (
    <View style={styles.root}>
      <FlatList
        alwaysBounceVertical
        contentContainerStyle={{ paddingHorizontal: 8 }}
        store={bookrackStore}
        data={data}
        refreshData={refreshData}
        noDataText='暂无收藏'
        numColumns={3}
        renderItem={renderItem}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})