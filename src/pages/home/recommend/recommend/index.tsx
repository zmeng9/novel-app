import React, { useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { useStores, useService } from '../../../../hooks'
import { getRecommends, getUserInfo } from '../../../../services'
import { FlatList, HorizontalFlatList } from '../../../../components'
import { loadAuthToken } from '../../../../utils'
import { Novel } from './Novel'

export const Recommend: React.FC = observer(() => {
  const { recommendStore, mineStore } = useStores()
  const {
    limit,
    offset,
    refreshLimit,
    isRefreshing,
    itemSize,
  } = recommendStore
  const { authToken, setAuthToken, setUserInfo } = mineStore

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

  const userInfoData = useService({
    store: mineStore,
    service: getUserInfo,
    isFetch: Boolean(authToken),
    immedate: false,
    condition: [authToken],
  })

  useEffect(() => {
    if (userInfoData)
      setUserInfo(userInfoData)
  }, [userInfoData])

  // Load the auth token
  useEffect(() => {
    (async () => {
      const authToken = await loadAuthToken()
      setAuthToken(authToken)
    })()
  }, [])

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