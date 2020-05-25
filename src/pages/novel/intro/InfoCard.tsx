import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNumerOfLines } from '@/hooks'
import { Card, CardHeader, ColorfulText, CollapsibleIcon, ViewSize } from '@/components'

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
          <ColorfulText text='简介' fontSize={18} fontWeight='bold' />
          <CollapsibleIcon height={size.height} maxHeight={maxHeight} numberOfLines={numberOfLines} />
        </CardHeader>
        <ViewSize setSize={setSize}>
          <ColorfulText text={info} numberOfLines={numberOfLines} lineHeight={20} />
        </ViewSize>
      </View>
    </Card>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})