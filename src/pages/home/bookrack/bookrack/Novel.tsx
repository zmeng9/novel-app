import React, { useCallback } from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Img, ViewSize, IViewSizeProps } from '../../../../components'
import { useWindowSize } from '../../../../hooks'
import { goToReader } from '../../../../utils'

export interface INovelProps extends IViewSizeProps {
  collection: any
  handleRemoveCollection: (collection: any, id: number) => void
}

const { height, width } = useWindowSize()

export const Novel: React.FC<INovelProps> = observer(({
  collection,
  setSize,
  handleRemoveCollection,
}) => {
  const isDarkMode = useDarkMode()
  const { id, novel } = collection
  const { id: novelId, cover, title } = novel

  console.log(`render novel`, id)

  const handleGoToReader = useCallback(() => {
    goToReader(novelId)
  }, [])

  return (
    <ViewSize setSize={setSize}>
      <TouchableWithoutFeedback onPress={handleGoToReader} onLongPress={() => handleRemoveCollection(collection, id)}>
        <View style={styles.root}>
          <Img uri={cover} height={height / 5.7} width={width / 3.8} resizeMode='stretch' />
          <Text style={[styles.title, { color: isDarkMode ? `#aaa` : `#000` }]}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </ViewSize>
  )
})

const styles = StyleSheet.create({
  root: {
    width: (width - 16) / 3,
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