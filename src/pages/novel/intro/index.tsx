import React, { useEffect, useCallback } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useRoute } from '@react-navigation/native'
import { useStores, useService } from '../../../hooks'
import { Loading } from '../../../components'
import { getNovel, createRating } from '../../../services'
import { Header } from './Header'
import { InformationCard } from './InformationCard'
import { Rating } from './Rating'
import { InfoCard } from './InfoCard'


export const Intro: React.FC = observer(() => {
  const route = useRoute()
  const { id } = route.params as any

  const { introStore } = useStores()
  const {
    isLoading,
    rating,
    novel,
    setRating,
    setNovel,
  } = introStore

  const data = useService({
    store: introStore,
    service: getNovel,
    params: [id],
  })

  useEffect(() => {
    if (data)
      setNovel(data)
  }, [data])

  const handleStarRating = useCallback(async (rating: number) => {
    setRating(rating * 2)

    if (novel)
      await createRating({
        novelId: novel.id,
        rating: rating * 2,
      })
  }, [rating])

  return (
    <View style={styles.root}>
      <Header />
      {
        isLoading
          ? <Loading />
          : (
            <ScrollView
              alwaysBounceVertical={false}
              contentContainerStyle={styles.container}
              scrollIndicatorInsets={{ right: 1 }}
            >
              <InformationCard novel={novel} />
              <Rating rating={rating / 2} handleStarRating={handleStarRating} />
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
    paddingHorizontal: 10,
  },
})