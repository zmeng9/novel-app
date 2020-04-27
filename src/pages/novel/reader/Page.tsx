import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import { observer } from 'mobx-react'

export interface IPageProps {
  chunk: string
  chunkIdx: number
  fontSize: number
  handle: (e: any) => void
}

const { height, width } = Dimensions.get('window')

export const Page: React.SFC<IPageProps> = observer(({
  chunk,
  chunkIdx,
  fontSize,
  handle,
}) => {
  return (
    <TouchableWithoutFeedback onPress={handle}>
      <View style={styles.root}>
        <Text
          style={{
            backgroundColor: `#ccc`,
            fontSize,
            lineHeight: Math.ceil(fontSize + 15),
            fontWeight: `300`,
            letterSpacing: 4,
            fontVariant: ['tabular-nums'],
          }}
        >
          {chunk}
        </Text>
        <Text style={styles.pageCount}>{chunkIdx + 1}</Text>
      </View>
    </TouchableWithoutFeedback>

    // <TouchableWithoutFeedback onPress={handle}>
    //   <View style={styles.root}>
    //     {
    //       chunk.map((val, idx) => {
    //         return (
    //           <Text
    //             key={idx}
    //             style={{
    //               fontSize,
    //               lineHeight: Math.ceil(fontSize + 15),
    //               height: Math.ceil(fontSize + 15),
    //               fontWeight: `300`,
    //               fontVariant: ['tabular-nums'],
    //             }}
    //           >
    //             {val}
    //           </Text>
    //         )
    //       })
    //     }
    //     <Text style={styles.pageCount}>{chunkIdx + 1}</Text>
    //   </View>
    // </TouchableWithoutFeedback>
  )
})

const styles = StyleSheet.create({
  root: {
    width,
    height,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  pageCount: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    textAlign: 'right',
    fontSize: 12,
    color: '#747d8c',
  },
})