import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react'
import { Card, Title } from '../../../components'

export interface IInfoCardProps {
  info: string
}

export const InfoCard: React.SFC<IInfoCardProps> = observer(({
  info,
}) => {
  return (
    <Card>
      <View style={styles.root}>
        <Title title='简介' fontSize={18} />
        <Text style={styles.text} numberOfLines={8} >{info}</Text>
      </View>
    </Card>
  )
})

const styles = StyleSheet.create({
  root: {
  },
  text: {
    margin: 5,
    fontSize: 16,
    lineHeight: 20,
  },
})