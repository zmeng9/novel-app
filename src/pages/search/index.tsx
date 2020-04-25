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
import { SearchHistoryBar } from './searchHistoryBar'
import { HotNovelBar } from './HotNovelBar'
import { loadSearchHistory, saveSearchHistory } from '../../utils'

export const Search: React.FC = observer(() => {
  const { searchStore } = useStores()
  const {
    isLoading,
    searchText,
    searchHistory,
    immedate,
    isSubmit,
    limit,
    offset,
    hotLimit,
    hotNovels,
    setHotNovels,
    setSearchText,
    setSearchHistory,
    setIsSubmit,
    setListData,
    setOffset,
    setItemHeight,
  } = searchStore

  useResetState(searchStore)

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

  const hotNovelsData = useService({
    store: searchStore,
    service: getHotNovels,
    params: [{ limit: hotLimit }],
  })

  // Set List data is `[]` and offset is `0` when the search text is empty
  useEffect(() => {
    if (isSearchTextEmpty) {
      setListData([])
      setOffset(0)
    }
  }, [searchText])

  // Set hot novels
  useEffect(() => {
    if (hotNovelsData) {
      const { rows = [] } = hotNovelsData
      setHotNovels(rows)
    }
  }, [hotNovelsData])

  // Load search history
  useEffect(() => {
    if (!isLoading) {
      (async () => {
        const searchHistory = await loadSearchHistory()
        setSearchHistory(searchHistory)
      })()
    }
  }, [searchHistory, isLoading, isSubmit])

  const handleSubmit = useCallback(() => {
    setListData([])
    setOffset(0)
    setIsSubmit(true);

    (async () => {
      await saveSearchHistory(searchText)
    })()
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
          ? (
            <>
              {
                searchHistory && (
                  <SearchHistoryBar
                    handleSubmit={handleSubmit}
                    searchHistory={searchHistory}
                    setSearchText={setSearchText}
                  />
                )
              }
              <HotNovelBar hotNovels={hotNovels} />
            </>
          )
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