import React, { useCallback } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Img, ViewSize, ColorfulText, IViewSizeProps } from '../../../../components'
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
          <ColorfulText text={title} fontSize={15} />
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
})