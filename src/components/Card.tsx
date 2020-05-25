import React, { useCallback } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useTheme } from '@/hooks'


export interface ICardProps {
  children?: React.ReactNode
  margin?: number
  startShouldSetResponderCapture?: boolean
  handle?: () => void
}

export interface ICardHeaderProps {
  children?: React.ReactNode
}

export const Card: React.SFC<ICardProps> = observer(({
  children,
  margin = 5,
  startShouldSetResponderCapture = false,
  handle,
}) => {
  const { paper, shadow } = useTheme()

  const onStartShouldSetResponderCapture = useCallback(() => {
    return startShouldSetResponderCapture
  }, [])

  return (
    <TouchableWithoutFeedback
      disabled={!(typeof handle === `function`)}
      onPress={handle}
    >
      <View
        style={[styles.root, { margin, backgroundColor: paper, ...shadow }]}
        onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
      >
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
    borderRadius: 15,
    padding: 5,
  },
  cardHeader: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
})