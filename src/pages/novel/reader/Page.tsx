import React from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useWindowSize } from '../../../hooks'

export interface IPageProps {
  page: string
  pageIdx: number
  fontSize: number
  handlePageClick: (e: any, index: number) => void
  handleBack: (e: any) => void
}

const { height, width } = useWindowSize()

export const Page: React.SFC<IPageProps> = observer(({
  page,
  pageIdx,
  fontSize,
  handlePageClick,
  handleBack,
}) => {
  const isDarkMode = useDarkMode()
  console.log(`render Page`, pageIdx, Page)

  return (
    <TouchableWithoutFeedback
      onPress={(e: any) => handlePageClick(e, pageIdx + 1)}
      onPressIn={handleBack}
    >
      <View style={styles.root}>
        <Text
          style={{
            fontSize,
            lineHeight: Math.ceil(fontSize + 15),
            fontWeight: `300`,
            fontVariant: ['tabular-nums'],
            color: isDarkMode ? `#aaa` : `#000`,
          }}
        >
          {page}
        </Text>
        <Text style={styles.pageCount}>{pageIdx + 1}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
})

const styles = StyleSheet.create({
  root: {
    width,
    height,
    paddingLeft: 20,
    paddingVertical: 40,
  },
  pageCount: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    textAlign: 'right',
    fontSize: 12,
    color: '#747d8c',
  },
})