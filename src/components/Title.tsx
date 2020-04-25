import React from 'react'
import {
  StyleSheet,
  Text,
} from 'react-native'
import { observer } from 'mobx-react'

export interface ITitleProps {
  title: string
}

export const Title: React.SFC<ITitleProps> = observer(({
  title
}) => {
  return <Text style={styles.root}>{title}</Text>
})

const styles = StyleSheet.create({
  root: {
    margin: 5,
    fontWeight: `bold`,
    fontSize: 16,
  },
})