import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import _ from 'lodash'
import ViewPager from '@react-native-community/viewpager'
import { useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react'
import { useStores, useService, useResetState, useWindowSize } from '../../../hooks'
import { formatContent, parseContent, isEvenNumber } from '../../../utils'
import { Loading } from '../../../components'
import { getDir, getChapter } from '../../../services'
import Page from './Page'
import Header from './Header'
import Footer from './Footer'
import Dir from './Dir'


const { height, width } = useWindowSize()

export const Reader: React.FC = observer(() => {
  // Route params
  const route = useRoute()
  const { id = -1 } = route.params as any

  // Use store
  const { readerStore } = useStores()
  const {
    isLoading,
    isShowSetting,
    isShowDir,
    fontSize,
    page,
    dir,
    chapterId,
    lines,
    setIsShowSetting,
    setIsShowDir,
    setDir,
    setChapterId,
    setLines,
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
    isSubmit: Boolean(~chapterId),
    condition: [chapterId],
    beforeHandle: () => {
      setIsShowSetting(false)
    },
  })

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
      const lineWidth = Math.floor((width - 40) * 2 / fontSize)
      const evenLineWidth = isEvenNumber(lineWidth) ? lineWidth : lineWidth - 1
      const cleanContent = formatContent(chapterContent)
      const lines = parseContent(cleanContent, evenLineWidth)
      lines.unshift("\n")
      lines.unshift(chapterTitle)

      // Update state
      setLines(lines)
      setChapterId(id)
    }
  }, [data])

  // Get the numbers Of the lines per pages
  const getNumbersOfLinesPerPages = () => {
    let windowHeight = height
    const margin = 40
    windowHeight -= margin * 2
    const lineHeight = fontSize + 15
    return Math.floor(windowHeight / lineHeight)
  }

  // Get the chunks of lines
  const chunks = () => {
    const numbersOfLinesPerPages = getNumbersOfLinesPerPages()
    return _.chunk(lines, numbersOfLinesPerPages)
  }

  // Get the lines Of the current page
  const linesOfCurrentPage = () => {
    const numbersOfLinesPerPages = getNumbersOfLinesPerPages()
    const linesStart = (page - 1) * numbersOfLinesPerPages
    return lines.slice(linesStart, linesStart + numbersOfLinesPerPages)
  }

  // Handlers of Clicking the content
  const pageHandle = (e: any) => {
    const { pageX, pageY } = e.nativeEvent
    if (isShowSetting)
      return setIsShowSetting(false)
    if (pageY > height / 3 && pageY < height * 2 / 3 && pageX > width / 3 && pageX < width * 2 / 3)
      return setIsShowSetting(true)
  }

  // Handler of show dir
  const openDir = () => {
    setIsShowDir(!isShowDir)
  }

  const closeDir = () => {
    setIsShowDir(false)
  }

  const switchChapter = (chapterId: number) => {
    setChapterId(chapterId)
  }

  // Get the page count
  const getPageCount = () => {
    const numbersOfLinesPerPages = getNumbersOfLinesPerPages()
    return Math.ceil(lines.length * 1.0 / numbersOfLinesPerPages)
  }

  return (
    <View style={styles.root}>
      {
        isLoading
          ? <Loading />
          : (
            <>
              <Header isShowSetting={isShowSetting} />
              <ViewPager style={styles.pager} initialPage={0}>
                {
                  chunks().map((chunk, idx) => {
                    return (
                      <Page
                        key={idx}
                        chunk={chunk}
                        chunkIdx={idx}
                        fontSize={fontSize}
                        handle={pageHandle}
                      />
                    )
                  })
                }
              </ViewPager>
              <Footer isShowSetting={isShowSetting} openDir={openDir} />
              <Dir isShowDir={isShowDir} closeDir={closeDir} dir={dir} switchChapter={switchChapter} />
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
  pager: {
    flex: 1,
  },
})