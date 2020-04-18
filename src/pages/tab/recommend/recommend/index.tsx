import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'
import { useStores } from '../../../../hooks'
import { getNovels } from '../../../../services'
import Novel from './Novel'

const Recommend: React.FC = observer(() => {
  const headerHeight = useHeaderHeight()
  const { recommendStore } = useStores()

  const {
    limit,
    offset,
    novels,
    setNovels,
  } = recommendStore

  // Get novels
  useEffect(() => {
    const params = {
      limit,
      offset,
    }

    getNovels(params)
      .then((result: any) => {
        const { code, data } = result.data
        if (code) {
          const { rows } = data
          const currentNovels = novels.slice()
          const newNovels = [...rows, ...currentNovels]
          setNovels(newNovels)
        }
      })
  }, [])

  const keyExtractor = (item: any) => {
    return String(item.id)
  }

  const renderItem = ({ item }: any) => {
    return <Novel novel={item} />
  }

  return (
    <View style={styles.root}>
      <FlatList
        contentContainerStyle={{ marginTop: headerHeight }}
        data={novels}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 10,
  },
})

export default Recommend