import React, { useRef, useImperativeHandle, useCallback } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useWindowSize } from '@/hooks'

const { width } = useWindowSize()

export interface IHorizontalFlatListProps {
  data: Array<any>
  itemWidth?: number
  scrollEnabled?: boolean
  contentContainerStyle?: Object
  renderItem: ({ item }: any) => React.ReactElement | null
  onScrollBeginDrag?: () => void
  setCurrentPageNum?: (currentPageNum: number) => void
}

type IRef = { ref?: any }

export const HorizontalFlatList: React.SFC<IHorizontalFlatListProps & IRef> = observer((
  {
    data,
    itemWidth = width,
    scrollEnabled = true,
    contentContainerStyle = {},
    renderItem,
    onScrollBeginDrag,
    setCurrentPageNum,
  },
  ref,
) => {
  // console.log(`render HorizontalFlatList`, HorizontalFlatList)

  const flatListReg = useRef()

  // Set current number of per page
  const onMomentumScrollEnd = useCallback((e: any) => {
    const { contentOffset: { x }, layoutMeasurement: { width } } = e.nativeEvent
    if (setCurrentPageNum) {
      const currentPageNum = Math.floor((x + width) / width)
      setCurrentPageNum(currentPageNum)
    }
  }, [])

  const keyExtractor = useCallback((item: any, index: number) => {
    return String(item.id ? item.id : index)
  }, [])

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  }), [])

  useImperativeHandle(ref, () => ({
    scrollToIndex: ({ animated = false, index }: any = {}) => {
      (flatListReg.current as any).scrollToIndex({ animated, index })
    }
  }))

  return (
    <FlatList
      data={data}
      horizontal
      removeClippedSubviews
      scrollEnabled={scrollEnabled}
      onScrollBeginDrag={onScrollBeginDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      alwaysBounceHorizontal={false}
      showsHorizontalScrollIndicator={false}
      ref={(ref: any) => { flatListReg.current = ref }}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={1}
      getItemLayout={getItemLayout}
      snapToInterval={itemWidth}
      snapToAlignment='start'
      decelerationRate='fast'
      contentContainerStyle={[
        styles.root, itemWidth === width ? {} : { paddingHorizontal: 15 },
        contentContainerStyle,
      ]}
    />
  )
}, { forwardRef: true })

const styles = StyleSheet.create({
  root: {
  },
})