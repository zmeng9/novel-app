import React from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Title, Btn } from '../../components'

export interface ISearchHistoryBarProps {
  searchHistory: Array<any>
  setSearchText: (searchText: string) => void
  handleSubmit: () => void
}

export const SearchHistoryBar: React.SFC<ISearchHistoryBarProps> = observer(({
  searchHistory,
  setSearchText,
  handleSubmit,
}) => {
  const handle = (searchText: string) => {
    setSearchText(searchText)
    Keyboard.dismiss()
    handleSubmit()
  }
  return (
    <View style={styles.root}>
      <Title title='搜索记录' />
      <View style={styles.hotNovelsContainer}>
        {
          searchHistory.map((searchText, idx) => {
            return <Btn key={idx} text={searchText} handle={() => handle(searchText)} />
          })
        }
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    marginTop: 5,
    padding: 5,
  },
  hotNovelsContainer: {
    marginTop: 5,
    flexDirection: `row`,
    flexWrap: `wrap`,
  },
})