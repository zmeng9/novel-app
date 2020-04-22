import React from 'react'
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react'

export interface ICardProps {
  children?: React.ReactNode
  handle?: () => void
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

const styles = StyleSheet.create({
  root: {
    backgroundColor: `#fff`,
    borderRadius: 15,
    margin: 5,
    padding: 10,
    alignItems: `center`,
  },
})