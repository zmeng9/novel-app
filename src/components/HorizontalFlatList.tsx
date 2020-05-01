import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { observer } from 'mobx-react'
import { useWindowSize } from '../hooks'

const { width } = useWindowSize()

export interface IHorizontalFlatListProps {
  data: Array<any>
  itemWidth?: number
  renderItem: ({ item }: any) => React.ReactElement | null
  onScrollBeginDrag?: () => void
  setCurrentPageNum?: (currentPageNum: number) => void
}

type IRef = { ref?: any }

export const HorizontalFlatList: React.SFC<IHorizontalFlatListProps & IRef> = observer(forwardRef((
  {
    data,
    itemWidth = width,
    renderItem,
    onScrollBeginDrag,
    setCurrentPageNum,
  },
  ref,
) => {
  const flatListReg = useRef()

  // Set current number of per page
  const onMomentumScrollEnd = (e: any) => {
    const { contentOffset: { x }, layoutMeasurement: { width } } = e.nativeEvent
    if (setCurrentPageNum) {
      const currentPageNum = Math.floor((x + width) / width)
      setCurrentPageNum(currentPageNum)
    }
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
    scrollToIndex: ({ animated = false, index }: any = {}) => {
      (flatListReg.current as any).scrollToIndex({ animated, index })
    }
  }))

  return (
    <FlatList
      horizontal
      removeClippedSubviews
      onScrollBeginDrag={onScrollBeginDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.root, itemWidth === width ? {} : { paddingHorizontal: 15 }]}
      data={data}
      ref={(ref: any) => { flatListReg.current = ref }}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={1}
      getItemLayout={getItemLayout}
      snapToInterval={itemWidth}
      snapToAlignment='start'
      decelerationRate='fast'
    />
  )
}))

const styles = StyleSheet.create({
  root: {
  },
})