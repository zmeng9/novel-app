import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores } from '@/hooks'
import { Card } from '@/components'
import { ListHeader } from './ListHeader'


export const Mine: React.FC = observer(() => {
  const { mineStore } = useStores()
  const {
    authToken,
    userInfo,
  } = mineStore

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <ListHeader authToken={authToken} userInfo={userInfo} />
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
})