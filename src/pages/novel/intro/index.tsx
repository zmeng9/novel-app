import React, { useEffect, useCallback } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { observer } from 'mobx-react'
import { useRoute } from '@react-navigation/native'
import { Btn } from '../../../components'
import { goToChapter } from '../../../utils'
import { useStores, useService } from '../../../hooks'
import { getNovel } from '../../../services'
import { Header } from './Header'

export interface IIntroProps {

}

export const Intro: React.FC<IIntroProps> = observer(({

}) => {
  const route = useRoute()
  const { id } = route.params as any

  const { introStore } = useStores()
  const { setNovel } = introStore

  const data = useService({
    store: introStore,
    service: getNovel,
    params: [id],
  })

  useEffect(() => {
    if (data) {
      setNovel(data)
    }
  }, [data])

  const handleGoToChapter = useCallback(() => {
    return goToChapter(id)
  }, [])

  return (
    <View style={styles.root}>
      <Header />
      <Btn text='点击阅读' handle={handleGoToChapter} />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {

  },
})