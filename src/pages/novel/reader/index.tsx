import React, { useEffect, useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import _ from 'lodash'
import { useRoute, useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { Page } from './Page'
import { Header } from './Header'
import { Footer } from './Footer'
import { Dir } from './Dir'
import { SettingBar } from './SettingBar'
import { formatContent, parseContent, isEvenNumber } from '../../../utils'
import { Loading, HorizontalFlatList } from '../../../components'
import {
  getDir,
  getChapter,
  addToCollections,
} from '../../../services'
import {
  useStores,
  useService,
  useResetState,
  useWindowSize,
  useEcb,
} from '../../../hooks'


const { height, width } = useWindowSize()

export const Reader: React.FC = observer(() => {
  const flatListRef = useRef()

  // Route params
  const route = useRoute()
  const navigation = useNavigation()
  const { id = -1 } = route.params as any

  // Use store
  const { readerStore } = useStores()
  const {
    isLoading,
    isScrollEnabled,
    isShowSetting,
    isShowDir,
    isShowSettingBar,
    fontSize,
    dir,
    chapterId,
    contentOfPage,
    currentPageNum,
    totalPageNum,
    setIsScrollEnabled,
    setIsShowSetting,
    setIsShowDir,
    setIsShowSettingBar,
    setFontSize,
    setDir,
    setChapterId,
    setContentOfPage,
    setCurrentPageNum,
  } = readerStore

  // Reset the state when unmount
  useResetState(readerStore)

  // Use service
  const dirData = useService({
    store: readerStore,
    service: getDir,
    params: [id],
  })

  const data = useService({
    store: readerStore,
    service: getChapter,
    params: [id, chapterId],
    isFetch: Boolean(~chapterId),
    deps: [chapterId],
    beforeHandle: () => {
      setIsShowSetting(false)
    },
  })

  // Set navigation param
  useEffect(() => {
    navigation.setParams({
      gestureEnabled: isShowSetting || (currentPageNum === 1)
    })
  }, [isShowSetting, currentPageNum])

  useEffect(() => {
    if (dirData) {
      const { rows = [] } = dirData
      const firstChapterId = _.get(rows, `[0].id`, -1)
      const newChapterId = Boolean(~chapterId) ? chapterId : firstChapterId

      // Update state
      setDir(rows)
      setChapterId(newChapterId)
    }
  }, [dirData])

  useEffect(() => {
    if (data) {
      const { id = -1, chapterTitle = '', chapterContent = '' } = data
      const newChapterContent = `${chapterTitle}\n${chapterContent}`
      const lineWidth = Math.floor((width - 35) * 2 / fontSize) - 1
      const evenLineWidth = isEvenNumber(lineWidth) ? lineWidth : lineWidth - 1
      const cleanContent = formatContent(newChapterContent)
      const linesNum = getNumbersOfLinesPerPages()
      const contentOfPage = parseContent(cleanContent, evenLineWidth, linesNum)

      // Update state

      setContentOfPage(contentOfPage)
      setChapterId(id)
    }
  }, [data, fontSize])

  // Get the numbers Of the lines per page
  const getNumbersOfLinesPerPages = () => {
    let windowHeight = height
    const paddingVertical = 40
    windowHeight -= paddingVertical * 2
    const lineHeight = fontSize + 15
    return Math.floor(windowHeight / lineHeight)
  }

  // Handlers of Clicking the content
  const handlePageClick = useEcb((e: any, currentPageNum: number) => {
    const { pageX } = e.nativeEvent

    if (isShowSetting)
      return setIsShowSetting(false)
    if (pageX > width / 3 && pageX < width * 2 / 3)
      return setIsShowSetting(true)

    else if (pageX < width / 3) {
      const prevPageNum = currentPageNum - 1
      if (prevPageNum >= 1) {
        (flatListRef.current as any).scrollToIndex({ index: prevPageNum - 1 })
        setCurrentPageNum(prevPageNum)
      }
    }
    else if (pageX > width * 2 / 3) {
      const lastPageNum = currentPageNum + 1
      if (lastPageNum <= totalPageNum) {
        (flatListRef.current as any).scrollToIndex({ index: currentPageNum })
        setCurrentPageNum(lastPageNum)
      }
    }
  }, [isShowSetting, totalPageNum])

  // Handle whether the page can be back
  const handleBack = useEcb((e: any) => {
    const { pageX } = e.nativeEvent
    if ((isShowSetting || currentPageNum === 1) && pageX < 50)
      setIsScrollEnabled(false)
    else
      setIsScrollEnabled(true)
  }, [isShowSetting])

  // Close the setting when begin drag
  const onScrollBeginDrag = useEcb(() => {
    if (isShowSetting)
      setIsShowSetting(false)
  }, [isShowSetting])

  // Handler of show dir
  const switchDir = useEcb(() => {
    setIsShowDir(!isShowDir)
  }, [isShowDir])

  const closeDir = useCallback(() => {
    setIsShowDir(false)
  }, [])

  const switchChapter = useEcb((chapterId: number) => {
    setChapterId(chapterId)
  }, [chapterId])

  // Handler of show setting bar
  const switchSettingBar = useEcb(() => {
    setIsShowSettingBar(!isShowSettingBar)
  }, [isShowSettingBar])

  const closeSettingBar = useCallback(() => {
    setIsShowSettingBar(false)
    setIsShowSetting(false)
  }, [])

  const handleAddToCollections = useCallback(() => {
    return addToCollections(id)
  }, [])

  const renderItem = useEcb(({ item, index }: any) => (
    <Page
      key={index}
      page={item}
      pageIdx={index}
      fontSize={fontSize}
      handlePageClick={handlePageClick}
      handleBack={handleBack}
    />
  ), [isShowSetting, totalPageNum, fontSize])

  const hanldeSetCurrentPageNum = useCallback((currentPageNum: number) => {
    setCurrentPageNum(currentPageNum)
  }, [])

  return (
    <View style={styles.root}>
      {
        isLoading
          ? <Loading />
          : (
            <>
              <Header
                isShowSetting={isShowSetting}
                handleAddToCollections={handleAddToCollections}
              />
              <HorizontalFlatList
                ref={flatListRef}
                data={contentOfPage}
                scrollEnabled={isScrollEnabled}
                renderItem={renderItem}
                onScrollBeginDrag={onScrollBeginDrag}
                setCurrentPageNum={hanldeSetCurrentPageNum}
              />
              <Dir
                isShowDir={isShowDir}
                closeDir={closeDir}
                dir={dir}
                switchChapter={switchChapter}
              />
              <SettingBar
                isShowSettingBar={isShowSettingBar}
                closeSettingBar={closeSettingBar}
                fontSize={fontSize}
                setFontSize={setFontSize}
              />
              <Footer
                isShowSetting={isShowSetting}
                switchDir={switchDir}
                switchSettingBar={switchSettingBar}
              />
            </>
          )
      }
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})