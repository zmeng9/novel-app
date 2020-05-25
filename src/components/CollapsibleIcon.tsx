import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Icon } from './Icon'

export interface ICollapsibleIconProps {
  height: number
  maxHeight: number
  numberOfLines: number | undefined
}

export const CollapsibleIcon: React.SFC<ICollapsibleIconProps> = observer(({
  height,
  maxHeight,
  numberOfLines,
}) => {
  return (
    (height > maxHeight)
      ? <Icon name={`ios-arrow-${numberOfLines ? `back` : `down`}`} size={22} />
      : null
  )
})

const styles = StyleSheet.create({
  root: {
  },
})