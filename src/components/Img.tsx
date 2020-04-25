import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import FastImage from 'react-native-fast-image'

export interface IImgProps {
  width: number
  height: number
  uri: string
}

export const Img: React.SFC<IImgProps> = observer(({
  width,
  height,
  uri,
}) => {
  return (
    <FastImage
      style={[styles.root, { width, height }]}
      source={{
        uri,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  )
})

const styles = StyleSheet.create({
  root: {
    margin: 5,
  },
})