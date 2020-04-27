import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react'
import { Card, CardHeader, Title, Icon } from '../../../components'

export interface IInfoCardProps {
  info: string
}

export const InfoCard: React.SFC<IInfoCardProps> = observer(({
  info,
}) => {
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>(8)

  const handleNumberOfLines = () => {
    setNumberOfLines(numberOfLines ? undefined : 8)
  }

  return (
    <Card>
      <View style={styles.root}>
        <CardHeader>
          <Title title='简介' fontSize={18} />
          <Icon name={`ios-arrow-${numberOfLines ? `back` : `down`}`} size={22} handle={handleNumberOfLines} />
        </CardHeader>
        <Text style={styles.text} numberOfLines={numberOfLines} >{info}</Text>
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