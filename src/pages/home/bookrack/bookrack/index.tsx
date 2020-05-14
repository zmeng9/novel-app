import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useStores, useService } from '../../../../hooks'
import { getCollections, removeCollection } from '../../../../services'
import { FlatList } from '../../../../components'
import { Novel } from './Novel'
import _ from 'lodash'
import { goToReader } from '../../../../utils'


export const Bookrack: React.FC = observer(() => {
  const { showActionSheetWithOptions } = useActionSheet()
  const { bookrackStore, mineStore } = useStores()
  const {
    limit,
    offset,
    removeFromListData,
    setItemSize,
  } = bookrackStore
  const { authToken, userInfo } = mineStore
  const userId = _.get(userInfo, `id`, -1)

  const data = useService({
    store: bookrackStore,
    service: getCollections,
    isFetch: !!authToken && !!~userId,
    params: [userId, { limit, offset }],
    deps: [offset, limit, userId],
  })

  const handleSetItemSize = useCallback((itemSize: any) => {
    setItemSize(itemSize)
  }, [])

  // Rmove the collection
  const handleRemoveCollection = useCallback((collection: any, id: number) => {
    showActionSheetWithOptions({
      options: [`阅读`, `删除`, `取消`],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 2,
    }, btnIdx => {
      switch (btnIdx) {
        case 0:
          goToReader(collection.novel.id)
          break
        case 1:
          removeFromListData(collection)
          removeCollection(id)
        default:
          break
      }
    },
    )
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
        contentContainerStyle={{ paddingHorizontal: 8 }}
        store={bookrackStore}
        data={data}
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