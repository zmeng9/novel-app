import React, { useCallback } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Img, ViewSize, IViewSizeProps } from '../../../../components'
import { useWindowSize } from '../../../../hooks'
import { goToIntro } from '../../../../utils'

export interface INovelProps extends IViewSizeProps {
  novel: any
}

const { height, width } = useWindowSize()

export const Novel: React.FC<INovelProps> = observer(({
  novel,
  setSize,
}) => {
  const { id, cover, title } = novel

  console.log(`render novel`, id)

  const handle = useCallback(() => {
    goToIntro(id)
  }, [])

  return (
    <ViewSize setSize={setSize}>
      <View style={styles.root}>
        <Img uri={cover} height={height / 5.7} width={width / 3.8} resizeMode='stretch' handle={handle} />
        <TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    </ViewSize>
  )
})

const styles = StyleSheet.create({
  root: {
    width: width / 3.8,
    marginHorizontal: 12,
    marginVertical: 5,
    alignItems: `center`,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: `400`,
    color: `#333`,
    marginVertical: 8,
  },
})