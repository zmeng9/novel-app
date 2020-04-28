import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { observer } from 'mobx-react'
import { useWindowSize } from '../hooks'

const { width } = useWindowSize()

export interface IHorizontalFlatListProps {
  data: Array<any>
  renderItem: ({ item }: any) => React.ReactElement | null
}

type IRef = { ref: any }

export const HorizontalFlatList: React.SFC<IHorizontalFlatListProps & IRef> = observer(forwardRef((
  {
    data,
    renderItem,
  },
  ref,
) => {
  const flatListReg = useRef()

  const keyExtractor = (item: any, index: number) => {
    return String(item.id ? item.id : index)
  }

  const getItemLayout = (data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  })

  useImperativeHandle(ref, () => ({
    scrollToIndex: ({ animated, index }: any) => {
      (flatListReg.current as any).scrollToIndex({ animated, index })
    }
  }))

  return (
    <FlatList
      horizontal
      removeClippedSubviews
      contentContainerStyle={styles.root}
      data={data}
      ref={(ref: any) => { flatListReg.current = ref }}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={1}
      getItemLayout={getItemLayout}
      pagingEnabled
    />
  )
}))

const styles = StyleSheet.create({
  root: {
  },
})