import React from 'react'
import {
  StyleSheet,
  Text,
} from 'react-native'
import { observer } from 'mobx-react'

export interface ITitleProps {
  title: string
  fontSize?: number
}

export const Title: React.SFC<ITitleProps> = observer(({
  title,
  fontSize = 16,
}) => {
  return <Text style={[styles.root, { fontSize }]}>{title}</Text>
})

const styles = StyleSheet.create({
  root: {
    margin: 5,
    fontWeight: `bold`,
  },
})