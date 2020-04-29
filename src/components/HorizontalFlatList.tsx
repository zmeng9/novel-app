import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { observer } from 'mobx-react'
import { useWindowSize } from '../hooks'

const { width } = useWindowSize()

export interface IHorizontalFlatListProps {
  store?: any
  data: Array<any>
  renderItem: ({ item }: any) => React.ReactElement | null
  snapToInterval?: number
}

type IRef = { ref?: any }

export const HorizontalFlatList: React.SFC<IHorizontalFlatListProps & IRef> = observer(forwardRef((
  {
    store,
    data,
    renderItem,
    snapToInterval,
  },
  ref,
) => {
  const flatListReg = useRef()

  let itemWidth = width
  if (store) {
    const { itemSize } = store
    itemWidth = itemSize.width
  }

  const keyExtractor = (item: any, index: number) => {
    return String(item.id ? item.id : index)
  }

  const getItemLayout = (data: any, index: number) => ({
    length: itemWidth,
    offset: itemWidth * index,
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
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.root, itemWidth === width ? {} : { paddingHorizontal: 15 }]}
      data={data}
      ref={(ref: any) => { flatListReg.current = ref }}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={1}
      getItemLayout={getItemLayout}
      snapToInterval={snapToInterval || width}
      snapToAlignment='start'
      decelerationRate='fast'
    />
  )
}))

const styles = StyleSheet.create({
  root: {

  },
})