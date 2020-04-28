import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { observer } from 'mobx-react'
import { useWindowSize } from '../hooks'

const { width } = useWindowSize()

export interface IHorizontalFlatListProps {
  data: Array<any>
  renderItem: ({ item }: any) => React.ReactElement | null
}

export const HorizontalFlatList: React.SFC<IHorizontalFlatListProps> = observer(({
  data,
  renderItem,
}) => {
  const keyExtractor = (item: any, index: number) => {
    return String(item.id ? item.id : index)
  }

  const getItemLayout = (data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  })

  return (
    <FlatList
      contentContainerStyle={styles.root}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      horizontal
      initialNumToRender={1}
      removeClippedSubviews={true}
      getItemLayout={getItemLayout}
      pagingEnabled
    />
  )
})

const styles = StyleSheet.create({
  root: {
  },
})