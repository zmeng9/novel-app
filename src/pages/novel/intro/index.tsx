import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'
import { useRoute } from '@react-navigation/native'
import { Btn } from '../../../components'
import { goToChapter } from '../../../utils'
import { Header } from './Header'

export interface IIntroProps {

}

const Intro: React.FC<IIntroProps> = ({

}) => {
  const route = useRoute()
  const { id } = route.params as any

  const handle = () => {
    return goToChapter(id)
  }

  return (
    <View style={styles.root}>
      <Header />
      <Btn text='点击阅读' handle={handle} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {

  },
})

export default Intro