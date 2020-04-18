import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react'
import FastImage from 'react-native-fast-image'

export interface ICardProps {
  children?: React.ReactNode
  imgUri: string
  handle?: () => void
}

const { height } = Dimensions.get('window')

export const Card: React.SFC<ICardProps> = observer(({
  children,
  imgUri,
  handle,
}) => {
  const THandle = typeof handle === 'function'

  return (
    <TouchableOpacity
      style={styles.root}
      disabled={!THandle}
      onPress={THandle ? handle : undefined}
    >
      <FastImage
        style={styles.img}
        source={{
          uri: imgUri,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      {children}
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  root: {
    backgroundColor: `#fff`,
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  img: {
    height: height - 80,
  },
})