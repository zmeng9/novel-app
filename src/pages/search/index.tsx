import React, { useCallback, useEffect } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { observer } from 'mobx-react'
import { Header } from './Header'
import { useStores, useResetState, useService } from '../../hooks'
import { FlatList } from '../../components'
import { getHotNovels, getNovels } from '../../services'
import { Novel } from '../home/recommend/recommend/Novel'
import { HotNovel } from './HotNovel'

export const Search: React.FC = observer(() => {
  const { searchStore } = useStores()
  const {
    searchText,
    immedate,
    isSubmit,
    limit,
    offset,
    hotLimit,
    hotNovels,
    setHotNovels,
    setSearchText,
    setIsSubmit,
    setListData,
    setOffset,
    setItemHeight,
  } = searchStore

  useResetState(searchStore)

  const hotNovelsData = useService({
    store: searchStore,
    service: getHotNovels,
    params: [{ limit: hotLimit }],
  })

  useEffect(() => {
    if (hotNovelsData) {
      const { rows = [] } = hotNovelsData
      setHotNovels(rows)
    }
  }, [hotNovelsData])

  const handleSubmit = useCallback(() => {
    setListData([])
    setOffset(0)
    setIsSubmit(true)
  }, [])

  const isSearchTextEmpty = searchText.trim() === ``

  const data = useService({
    store: searchStore,
    service: getNovels,
    params: [{ limit, offset, title: searchText }],
    isSubmit: (isSubmit || offset > 0) && !isSearchTextEmpty,
    immedate,
    setDataNull: isSearchTextEmpty,
    condition: [offset, limit, isSubmit, searchText],
  })

  useEffect(() => {
    if (isSearchTextEmpty) {
      setListData([])
      setOffset(0)
    }
  }, [searchText])

  const renderItem = useCallback((item: any) => (
    <Novel novel={item} setHeight={setItemHeight} />
  ), [])

  return (
    <View style={styles.root}>
      <Header
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSubmit}
      />
      {
        isSearchTextEmpty || !data
          ? <HotNovel hotNovels={hotNovels} />
          : (
            <FlatList
              store={searchStore}
              data={data}
              renderItem={renderItem}
            />
          )
      }
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginBottom: 10,
  },
})