import React, { useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { useStores, useService } from '../../../../hooks'
import { getRecommends } from '../../../../services'
import { FlatList, HorizontalFlatList } from '../../../../components'
import { loadAuthToken } from '../../../../utils'
import { Novel } from './Novel'

export const Recommend: React.FC = observer(() => {
  const { recommendStore, mineStore: { authToken, setAuthToken } } = useStores()
  const {
    limit,
    offset,
    refreshLimit,
    isRefreshing,
    itemSize,
  } = recommendStore

  // Load the auth token
  useEffect(() => {
    (async () => {
      const authToken = await loadAuthToken()
      setAuthToken(authToken)
    })()
  }, [authToken])

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