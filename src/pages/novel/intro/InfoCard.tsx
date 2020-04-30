import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react'
import { useNumerOfLines } from '../../../hooks'
import { Card, CardHeader, Title, CollapsibleIcon, ViewSize } from '../../../components'

export interface IInfoCardProps {
  info: string
}

export const InfoCard: React.SFC<IInfoCardProps> = observer(({
  info,
}) => {
  const {
    numberOfLines,
    handleNumberOfLines,
    size,
    setSize,
    maxHeight,
  } = useNumerOfLines({
    initialNumberOfLines: 8,
    lineHeight: 20,
  })

  return (
    <Card handle={handleNumberOfLines}>
      <View style={styles.root}>
        <CardHeader>
          <Title title='简介' fontSize={18} />
          <CollapsibleIcon height={size.height} maxHeight={maxHeight} numberOfLines={numberOfLines} />
        </CardHeader>
        <ViewSize setSize={setSize}>
          <Text style={styles.text} numberOfLines={numberOfLines}>{info}</Text>
        </ViewSize>
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