import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Img } from './Img'

export interface IAvatarProps {
  uri: string
  size?: `large` | `small`
  handle?: () => void
}

export const Avatar: React.SFC<IAvatarProps> = observer(({
  uri,
  size = `small`,
  handle,
}) => {
  const imgSize = size === `large`
    ? { width: 50, height: 50 }
    : { width: 40, height: 40 }
  return <Img uri={uri} borderRadius={50} handle={handle} {...imgSize} />
})

const styles = StyleSheet.create({
  root: {
  },
})