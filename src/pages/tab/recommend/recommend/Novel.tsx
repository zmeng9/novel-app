import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react'
import { Card } from '../../../../components'
import { goToIntro } from '../../../../utils'

export interface INovelProps {
  novel: any
}

const Novel: React.SFC<INovelProps> = observer(({
  novel,
}) => {
  const { id, cover } = novel

  const handle = () => {
    goToIntro(id)
  }

  return (
    <Card imgUri={cover} handle={handle} ></Card>
  )
})

const styles = StyleSheet.create({
  root: {},
})

export default Novel