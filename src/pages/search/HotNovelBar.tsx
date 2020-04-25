import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { observer } from 'mobx-react'
import { Title, Btn } from '../../components'
import { goToIntro } from '../../utils'

export interface IHotNovelBarProps {
  hotNovels: Array<any>
}

export const HotNovelBar: React.SFC<IHotNovelBarProps> = observer(({
  hotNovels,
}) => {
  return (
    <View style={styles.root}>
      <Title title='最近热门' />
      <View style={styles.hotNovelsContainer}>
        {
          hotNovels.map(hotNovel => {
            const { id, title } = hotNovel
            return <Btn key={id} text={title} handle={() => goToIntro(id)} />
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