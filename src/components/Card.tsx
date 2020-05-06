import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { shadow } from '../utils'

export interface ICardProps {
  children?: React.ReactNode
  margin?: number
  handle?: () => void
}

export interface ICardHeaderProps {
  children?: React.ReactNode
}

export const Card: React.SFC<ICardProps> = observer(({
  children,
  margin = 5,
  handle,
}) => {
  return (
    <TouchableWithoutFeedback
      disabled={!(typeof handle === 'function')}
      onPress={handle}
    >
      <View style={[styles.root, { margin }]}>
        {children}
      </View>
    </TouchableWithoutFeedback>
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
    padding: 5,
  },
  cardHeader: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
})