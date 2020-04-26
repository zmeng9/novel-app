import React, { useEffect, useCallback } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { observer } from 'mobx-react'
import { useRoute } from '@react-navigation/native'
import { useStores, useService } from '../../../hooks'
import { Loading } from '../../../components'
import { getNovel } from '../../../services'
import { Header } from './Header'
import { InformationCard } from './InformationCard'
import { InfoCard } from './InfoCard'
import { ScrollView } from 'react-native-gesture-handler'

export interface IIntroProps {

}

export const Intro: React.FC<IIntroProps> = observer(({

}) => {
  const route = useRoute()
  const { id } = route.params as any

  const { introStore } = useStores()
  const { isLoading, novel, setNovel } = introStore

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

  return (
    <View style={styles.root}>
      <Header />
      {
        isLoading
          ? <Loading />
          : (
            <ScrollView contentContainerStyle={styles.container}>
              <InformationCard novel={novel} />
              {novel && novel.info && <InfoCard info={novel.info} />}
            </ScrollView>
          )
      }
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingTop: 5,
    paddingBottom: 15,
  },
})