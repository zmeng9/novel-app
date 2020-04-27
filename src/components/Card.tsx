import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { observer } from 'mobx-react'
import { shadow } from '../utils'

export interface ICardProps {
  children?: React.ReactNode
  handle?: () => void
}

export interface ICardHeaderProps {
  children?: React.ReactNode
}

export const Card: React.SFC<ICardProps> = observer(({
  children,
  handle,
}) => {
  const THandle = typeof handle === 'function'

  return (
    <TouchableOpacity
      style={styles.root}
      disabled={!THandle}
      onPress={THandle ? handle : undefined}
    >
      {children}
    </TouchableOpacity>
  )
})

export const CardHeader: React.SFC<ICardHeaderProps> = observer(({
  children,
}) => {
  return (
    <View style={styles.cardHeader}>
      {children}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    ...shadow,
    
    backgroundColor: `#fff`,
    borderRadius: 15,
    margin: 5,
    padding: 10,
  },
  cardHeader: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
})