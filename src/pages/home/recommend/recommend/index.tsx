import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { useStores, useService } from '../../../../hooks'
import { getRecommends } from '../../../../services'
import { FlatList, HorizontalFlatList } from '../../../../components'
import { Novel } from './Novel'

export const Recommend: React.FC = observer(() => {
  const { recommendStore } = useStores()
  const {
    limit,
    offset,
    refreshLimit,
    isRefreshing,
    itemSize,
  } = recommendStore

  const data = useService({
    store: recommendStore,
    service: getRecommends,
    params: [{ limit, offset }],
    condition: [offset, limit],
  })

  const refreshData = useService({
    store: recommendStore,
    service: getRecommends,
    params: [{ limit: refreshLimit, offset: 0 }],
    isFetch: isRefreshing || (refreshLimit > 0),
    condition: [isRefreshing, refreshLimit],
  })

  const renderItem = useCallback(({ item }: any) => (
    <Novel novel={item} setSize={recommendStore.setItemSize} />
  ), [])

  const renderHorizontalFlatListItem = useCallback(({ item }: any) => (
    <HorizontalFlatList
      data={item.novels}
      itemWidth={itemSize.width}
      renderItem={renderItem}
    />
  ), [])

  return (
    <View style={styles.root}>
      <FlatList
        store={recommendStore}
        data={data}
        refreshData={refreshData}
        renderItem={renderHorizontalFlatListItem}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})