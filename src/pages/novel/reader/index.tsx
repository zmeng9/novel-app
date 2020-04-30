import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import _ from 'lodash'
import { useRoute, useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react'
import { useStores, useService, useResetState, useWindowSize } from '../../../hooks'
import { formatContent, parseContent, isEvenNumber } from '../../../utils'
import { Loading, HorizontalFlatList } from '../../../components'
import { getDir, getChapter } from '../../../services'
import { Page } from './Page'
import { Header } from './Header'
import { Footer } from './Footer'
import { Dir } from './Dir'
import { SettingBar } from './SettingBar'


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
    isShowSetting,
    isShowDir,
    isShowSettingBar,
    fontSize,
    dir,
    chapterId,
    contentOfPage,
    currentPageNum,
    totalPageNum,
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
    condition: [chapterId],
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
  const pageHandle = (e: any, currentPageNum: number) => {
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
      if (lastPageNum < totalPageNum) {
        (flatListRef.current as any).scrollToIndex({ index: currentPageNum })
        setCurrentPageNum(lastPageNum)
      }

    }
  }

  // Close the setting when begin drag
  const onScrollBeginDrag = () => {
    if (isShowSetting)
      setIsShowSetting(false)
  }

  // Handler of show dir
  const switchDir = () => {
    setIsShowDir(!isShowDir)
  }

  const closeDir = () => {
    setIsShowDir(false)
  }

  const switchChapter = (chapterId: number) => {
    setChapterId(chapterId)
  }

  // Handler of show setting bar
  const switchSettingBar = () => {
    setIsShowSettingBar(!isShowSettingBar)
  }

  const closeSettingBar = () => {
    setIsShowSettingBar(false)
    setIsShowSetting(false)
  }

  const renderItem = ({ item, index }: any) => (
    <Page
      key={index}
      page={item}
      pageIdx={index}
      fontSize={fontSize}
      handle={pageHandle}
    />
  )

  return (
    <View style={styles.root}>
      {
        isLoading
          ? <Loading />
          : (
            <>
              <Header isShowSetting={isShowSetting} />
              <HorizontalFlatList
                ref={flatListRef}
                data={contentOfPage}
                renderItem={renderItem}
                onScrollBeginDrag={onScrollBeginDrag}
                setCurrentPageNum={setCurrentPageNum}
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