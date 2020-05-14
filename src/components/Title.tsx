import React from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import { StyleSheet, Text } from 'react-native'
import { observer } from 'mobx-react-lite'

export interface ITitleProps {
  title: string
  margin?: number
  fontSize?: number
}

export const Title: React.SFC<ITitleProps> = observer(({
  title,
  margin = 5,
  fontSize = 16,
}) => {
  const isDarkMode = useDarkMode()

  return <Text style={[styles.root, { fontSize, margin, color: isDarkMode ? `#fff` : `#000` }]}>{title}</Text>
})

const styles = StyleSheet.create({
  root: {
    fontWeight: `bold`,
  },
})