import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View } from 'react-native'
import { useStores, useService } from '../../../../hooks'
import { getCollections } from '../../../../services'
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

  const handleSetItemSize = useCallback(({ width, height }: any) => {
    setItemSize({ width, height: Math.ceil(height / 2.6) })
  }, [])

  const renderItem = useCallback(({ item }: any) => (
    <Novel novel={item.novel} setSize={handleSetItemSize} />
  ), [])

  return (
    <View style={styles.root}>
      <FlatList
        alwaysBounceVertical
        store={bookrackStore}
        data={data}
        refreshData={refreshData}
        numColumns={3}
        renderItem={renderItem}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: `center`,
  },
})