import React from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import { StyleSheet, View, Text } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNumerOfLines } from '../../../hooks'
import { Card, CardHeader, Title, CollapsibleIcon, ViewSize } from '../../../components'

export interface IInfoCardProps {
  info: string
}

export const InfoCard: React.SFC<IInfoCardProps> = observer(({
  info,
}) => {
  const isDarkMode = useDarkMode()
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
          <Text style={[styles.text, { color: isDarkMode ? `#aaa` : `#333` }]} numberOfLines={numberOfLines}>{info}</Text>
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