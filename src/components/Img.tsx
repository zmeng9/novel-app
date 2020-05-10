import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react-lite'
import FastImage from 'react-native-fast-image'

export interface IImgProps {
  width: number
  height: number
  borderRadius?: number
  uri: string
  resizeMode?: `contain` | `cover` | `stretch` | `center`
  handle?: () => void
}

export const Img: React.SFC<IImgProps> = observer(({
  width,
  height,
  borderRadius = 0,
  uri,
  resizeMode = `contain`,
  handle,
}) => {
  return (
    <TouchableWithoutFeedback onPress={handle} disabled={!(typeof handle === 'function')}>
      <FastImage
        style={[styles.root, { width, height, borderRadius }]}
        source={{
          uri,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode[resizeMode]}
      />
    </TouchableWithoutFeedback>
  )
})

const styles = StyleSheet.create({
  root: {
    margin: 5,
  },
})